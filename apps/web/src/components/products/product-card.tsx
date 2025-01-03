import Image from 'next/image'
import Link from 'next/link'
import { StarIcon } from 'lucide-react'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {Product} from "@/lib/types";


export function ProductCard({ product }: { product: Product }) {
  return (
      <Card className="group overflow-hidden transition-all hover:shadow-lg">
        <Link href={`/products/${product.id}`} className="block">
          <div className="relative aspect-square overflow-hidden">
            {product.images[0] && <Image
                src={product.images[0]}
                alt={product.name}
                className="object-cover transition-transform ease-in-out duration-300 transform origin-center group-hover:scale-125"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />}
          </div>
          <CardContent className="p-4">
            <Badge variant="secondary" className="mb-2">
              {product.category?.name}
            </Badge>
            <h3 className="font-semibold text-lg mb-1 truncate">{product.name}</h3>
            <div className="flex items-center mb-2">
              {[...Array(5)].map((_, i) => (
                  <StarIcon
                      key={i}
                      className={`w-4 h-4 ${
                          i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                      }`}
                  />
              ))}
              <span className="text-sm text-gray-600 ml-1">({product.rating.toFixed(1)})</span>
            </div>
            <p className="font-bold text-lg">€{product.price.toFixed(2)}</p>
          </CardContent>
        </Link>
        <CardFooter className="p-4 pt-0">
          <Button variant="outline" className="w-full">Add to Cart</Button>
        </CardFooter>
      </Card>
  )
}

export function ProductCardSkeleton() {
  return (
      <Card className="group overflow-hidden transition-all hover:shadow-lg">
        <div className="block">
          <div className="relative aspect-square overflow-hidden bg-gray-200 animate-pulse"></div>
          <CardContent className="p-4">
            <div className="h-5 w-20 bg-gray-200 rounded mb-2 animate-pulse"></div>
            <div className="h-6 w-3/4 bg-gray-200 rounded mt-0.5 mb-1.5 animate-pulse"></div>
            <div className="flex items-center mb-2">
              {[...Array(5)].map((_, i) => (
                  <div
                      key={i}
                      className="w-4 h-4 bg-gray-200 rounded-full animate-pulse"
                  ></div>
              ))}
              <span className="h-4 w-8 bg-gray-200 rounded ml-1 animate-pulse"></span>
            </div>
            <div className="h-6 mt-0.5 mb-0.5 w-1/3 bg-gray-200 rounded animate-pulse"></div>
          </CardContent>
        </div>
        <CardFooter className="p-4 pt-0">
          <div className="h-10 bg-gray-200 rounded w-full animate-pulse"></div>
        </CardFooter>
      </Card>

  )
}
