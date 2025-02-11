import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile, UploadedFiles, BadRequestException,
} from '@nestjs/common';
import {FileInterceptor, FilesInterceptor} from '@nestjs/platform-express';
import { CloudinaryService } from './cloudinary.service';
import { Express } from 'express';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Upload')
@Controller('upload')
export class UploadController {
  constructor(private readonly cloudinaryService: CloudinaryService) {}

  @Post('video')
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ summary: 'Upload a video file to Cloudinary' })
  @ApiResponse({
    status: 200,
    description: 'The video has been successfully uploaded.',
    schema: {
      type: 'object',
      properties: {
        videoUrl: {
          type: 'string',
          example: 'https://cloudinary.com/video_url',
        },
      },
    },
  })
  @ApiResponse({ status: 400, description: 'No file uploaded.' })
  async uploadVideo(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new Error('No file uploaded');
    }

    const videoUrl = await this.cloudinaryService.uploadVideo(file);
    return { videoUrl };
  }

  @Post('image')
  @UseInterceptors(FileInterceptor('file')) // Match form field name for image uploads
  @ApiOperation({ summary: 'Upload an image file to Cloudinary' })
  @ApiResponse({
    status: 200,
    description: 'The image has been successfully uploaded.',
    schema: {
      type: 'object',
      properties: {
        imageUrl: {
          type: 'string',
          example: 'https://cloudinary.com/image_url',
        },
      },
    },
  })
  @ApiResponse({ status: 400, description: 'No file uploaded.' })
  async uploadImage(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new Error('No file uploaded');
    }

    const imageUrl = await this.cloudinaryService.uploadImage(file);
    return { imageUrl }; // Return the Cloudinary URL
  }
  @Post('images')
  @UseInterceptors(FilesInterceptor('images', 10)) // 'images' matches the form field, 10 is the max file count
  @ApiOperation({ summary: 'Upload multiple image files to Cloudinary' })
  @ApiResponse({
    status: 200,
    description: 'The images have been successfully uploaded.',
    schema: {
      type: 'array',
      items: {
        type: 'string',
        example: 'https://cloudinary.com/image_url',
      },
    },
  })

  @ApiResponse({ status: 400, description: 'No files uploaded or an error occurred.' })
  async uploadImages(@UploadedFiles() files: Express.Multer.File[]) {
    if (!files || files.length === 0) {
      throw new BadRequestException('No files uploaded');
    }

    const uploadPromises = files.map((file) =>
        this.cloudinaryService.uploadImage(file)
    );

    try {
      const imageUrls = await Promise.all(uploadPromises);
      return imageUrls; // Return array of image URLs
    } catch (error) {
      console.error('Error uploading images:', error);
      throw new BadRequestException('Error uploading images to Cloudinary');
    }
  }
}
