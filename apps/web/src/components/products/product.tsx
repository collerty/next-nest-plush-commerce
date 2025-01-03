'use client'

import {useState} from 'react'
import Image from 'next/image'
// import { StarIcon } from 'lucide-react'
import {Button} from '@/components/ui/button'
import {Card, CardContent} from '@/components/ui/card'
import {Tabs, TabsContent, TabsList, TabsTrigger} from '@/components/ui/tabs'
import {StarRating} from "@/components/icons/star";

import {Product as ProductProps} from "@/lib/types";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function Product({id, name, description, price, rating, images}: ProductProps) {
  const [selectedImage, setSelectedImage] = useState<string>(images[0])

  return (
      <div className="w-full min-h-screen flex justify-center ">
        <Card className="w-full max-w-7xl shadow-none border-none">
          <CardContent className="p-6 sm:p-10">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Images */}
              <div className="basis-full lg:basis-[calc(50%-2rem)] flex flex-col gap-4">
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
              </div>

              {/* Description */}
              <div className="basis-full lg:basis-[calc(50%-2rem)] flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                  <h1 className="font-semibold text-3xl">{name}</h1>
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      <StarRating rating={rating}/>
                    </div>
                    <span className="text-sm text-gray-600">({rating.toFixed(1)})</span>
                  </div>
                  <span className="text-2xl font-bold text-primary">€{price.toFixed(2)}</span>
                </div>

                <Tabs defaultValue="description" className="w-full">
                  <TabsList>
                    <TabsTrigger value="description">Description</TabsTrigger>
                    <TabsTrigger value="details">Details</TabsTrigger>
                    <TabsTrigger value="shipping">Shipping</TabsTrigger>
                  </TabsList>
                  <TabsContent value="description" className="mt-4">
                    <p className="text-gray-700">{description}</p>
                  </TabsContent>
                  <TabsContent value="details" className="mt-4">
                    <ul className="list-disc list-inside text-gray-700">
                      <li>Material: High-quality plush</li>
                      <li>Size: 30cm x 20cm x 15cm</li>
                      <li>Weight: 250g</li>
                      <li>Suitable for ages 3+</li>
                    </ul>
                  </TabsContent>
                  <TabsContent value="shipping" className="mt-4">
                    <p className="text-gray-700">
                      Free shipping on orders over €50. Standard delivery takes 3-5 business days.
                      Express shipping available at checkout.
                    </p>
                  </TabsContent>
                </Tabs>

                <div className="flex gap-4 mt-4">
                  <Button size="lg" className="flex-1">
                    Add to Cart
                  </Button>
                  <Button size="lg" variant="outline" className="flex-1">
                    Add to Wishlist
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
  )
}

