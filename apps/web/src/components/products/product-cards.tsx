'use client'

import { useState, useMemo } from 'react'
import { ProductCard } from './product-card'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import {Product} from "@/lib/types";

export function ProductCards({products} : {products: Product[]}) {
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('name')

  // Memoize filtered and sorted products
  const filteredAndSortedProducts = useMemo(() => {
    return products
        .filter(product =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.category.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .sort((a, b) => {
          if (sortBy === 'price') return a.price - b.price
          if (sortBy === 'rating') return b.rating - a.rating
          return a.name.localeCompare(b.name)
        })
  }, [searchTerm, sortBy]) // Only re-run when searchTerm or sortBy changes

  return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
          <Input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-xs"
          />
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">Name</SelectItem>
              <SelectItem value="price">Price</SelectItem>
              <SelectItem value="rating">Rating</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredAndSortedProducts.map(product => (
              <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
  )
}
