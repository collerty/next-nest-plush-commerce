"use client";

import {cn} from "@/lib/utils";
import {Button, buttonVariants} from "@/components/ui/button";
import {X} from "lucide-react";
import {useState} from "react";

interface ImageUploadProps {
  value: FileList | null;
  onChange: (files: FileList) => void;
  isLoading: boolean;
}

export const ImageUpload = ({value, onChange, isLoading}: ImageUploadProps) => {
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const dataTransfer = new DataTransfer();

    // Add existing files to the new FileList
    if (value) {
      Array.from(value).forEach((file) => dataTransfer.items.add(file));
    }

    // Add new files
    Array.from(files).forEach((file) => dataTransfer.items.add(file));

    // Update the state
    onChange(dataTransfer.files);

    // Update preview URLs
    const newUrls = Array.from(files).map((file) =>
        URL.createObjectURL(file)
    );
    setPreviewUrls((prev) => [...prev, ...newUrls]);
  };

  const handleRemoveFile = (index: number) => {
    const dataTransfer = new DataTransfer();

    // Add back all files except the one being removed
    Array.from(value || []).forEach((file, i) => {
      if (i !== index) dataTransfer.items.add(file);
    });

    // Update the state
    onChange(dataTransfer.files);

    // Remove the corresponding preview URL
    setPreviewUrls((prev) => prev.filter((_, i) => i !== index));
  };

  return (
      <div>
        {previewUrls.length > 0 && (
            <div className="pb-5 flex flex-wrap gap-4 justify-center sm:justify-start">
              {previewUrls.map((url, index) => (
                  <div
                      key={index}
                      className="relative w-[200px] h-[200px] rounded-md"
                  >
                    <Button
                        type="button"
                        disabled={isLoading}
                        className="z-10 absolute -top-4 -right-4 hover:bg-destructive rounded-full p-0 h-6 w-6"
                        variant={"destructive"}
                        onClick={() => handleRemoveFile(index)}
                    >
                        <X width={16} height={16} className="w-4 h-4"/>
                    </Button>
                    <img
                        src={url}
                        alt={`Preview ${index}`}
                        className="object-cover w-full h-full"
                    />
                  </div>
              ))}
            </div>
        )}

        <input
            type="file"
            accept="image/*"
            multiple
            id="image-upload"
            className="hidden"
            onChange={handleFileChange}
        />
        <label
            htmlFor="image-upload"
            className={cn(buttonVariants({variant: "outline"}), "cursor-pointer")}
        >
          Choose Images
        </label>
      </div>
  );
};
