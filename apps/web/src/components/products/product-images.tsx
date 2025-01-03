"use client";
import {useState} from "react";
import Image from "next/image";

export function ProductImages({images, name} : {images: string[], name: string}) {
  const [selectedImage, setSelectedImage] = useState<string>(images[0])
  return (
      <>
        <div className="w-full aspect-square relative overflow-hidden rounded-lg">
          {selectedImage && <Image
              src={selectedImage}
              alt={name}
              className="object-contain object-center"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />}
        </div>
        <div className="flex gap-4 overflow-x-auto pb-2 justify-center">
          {images.map((img, index) => (
              <button
                  key={index}
                  className={`relative w-24 h-24 border-2 rounded-lg overflow-hidden flex-shrink-0 transition-all ${
                      selectedImage === img ? 'border-primary' : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setSelectedImage(img)}
              >
                <Image
                    src={img}
                    alt={`${name} thumbnail ${index + 1}`}
                    className="object-cover"
                    fill
                    sizes="96px"
                />
              </button>
          ))}
        </div>
      </>
  )
}
