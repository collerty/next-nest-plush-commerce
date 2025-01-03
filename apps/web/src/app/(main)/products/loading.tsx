import {ProductCardSkeleton} from "@/components/products/product-card";

export default function Loading() {
  return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Array.from({length:8}).map((_, index) => (
            <ProductCardSkeleton key={index}/>
        ))}
      </div>
  )
}