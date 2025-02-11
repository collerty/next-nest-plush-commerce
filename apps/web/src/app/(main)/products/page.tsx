import {ProductCards} from "@/components/products/product-cards";
import {ApiResponse, getAllProducts} from "@/lib/actions";
import {Product} from "@/lib/types";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList, BreadcrumbPage,
    BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import {ProductCardSkeleton} from "@/components/products/product-card";
import {Suspense} from "react";

export default async function Page() {
  return (
      <div className="">
          <Breadcrumb className="mb-4">
              <BreadcrumbList>
                  <BreadcrumbItem>
                      <BreadcrumbLink asChild>
                          <Link href="/">Home</Link>
                      </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator/>
                  <BreadcrumbItem>
                      <BreadcrumbPage>
                          Products
                      </BreadcrumbPage>
                  </BreadcrumbItem>
              </BreadcrumbList>
          </Breadcrumb>
          <h1 className="text-3xl font-bold">Products</h1>
          <Suspense fallback={<ProductCardsSkeleton/>} >
        <ProductCards getProducts={getAllProducts}/>
          </Suspense>
      </div>
  )
}

function ProductCardsSkeleton() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 py-8">
            {Array.from({length:8}).map((_, index) => (
                <ProductCardSkeleton key={index}/>
            ))}
        </div>
    )
}