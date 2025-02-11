"use client";

import {cn} from "@/lib/utils";
import {Button, buttonVariants} from "@/components/ui/button";
import {X} from "lucide-react";
import {useState} from "react";
interface ImageUploadProps {
  value: (string | File)[]; // Accept URLs and File objects
  onChange: (images: (string | File)[]) => void;
  isLoading: boolean;
}

export const ImageUpload = ({ value = [], onChange, isLoading }: ImageUploadProps) => {
  const [previewUrls, setPreviewUrls] = useState<string[]>(value.map((img) =>
      typeof img === "string" ? img : URL.createObjectURL(img)
  ));

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newFiles = Array.from(files);

    // Add new file objects to the state
    onChange([...value, ...newFiles]);

    // Update preview URLs
    const newUrls = newFiles.map((file) => URL.createObjectURL(file));
    setPreviewUrls((prev) => [...prev, ...newUrls]);
  };

  const handleRemoveFile = (index: number) => {
    const newImages = value.filter((_, i) => i !== index);
    onChange(newImages);

    setPreviewUrls((prev) => prev.filter((_, i) => i !== index));
  };

  return (
      <div>
        {previewUrls.length > 0 && (
            <div className="pb-5 flex flex-wrap gap-4 justify-center sm:justify-start">
              {previewUrls.map((url, index) => (
                  <div key={index} className="relative w-[200px] h-[200px] rounded-md">
                    <Button
                        type="button"
                        disabled={isLoading}
                        className="z-10 absolute -top-4 -right-4 hover:bg-destructive rounded-full p-0 h-6 w-6"
                        variant={"destructive"}
                        onClick={() => handleRemoveFile(index)}
                    >
                      <X width={16} height={16} className="w-4 h-4" />
                    </Button>
                    <img src={url} alt={`Preview ${index}`} className="object-cover w-full h-full" />
                  </div>
              ))}
            </div>
        )}

        <input type="file" accept="image/*" multiple id="image-upload" className="hidden" onChange={handleFileChange} />
        <label htmlFor="image-upload" className={cn(buttonVariants({ variant: "outline" }), "cursor-pointer")}>
          Choose Images
        </label>
      </div>
  );
};
