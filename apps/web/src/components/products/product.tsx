import {Button} from '@/components/ui/button'
import {Card, CardContent} from '@/components/ui/card'
import {Tabs, TabsContent, TabsList, TabsTrigger} from '@/components/ui/tabs'
import {StarRating} from "@/components/icons/star";
import {Product as ProductProps} from "@/lib/types";
import {ProductImages} from "@/components/products/product-images";
import {AddToCartButton} from "@/components/cart/cart";
// import {cn} from "@/lib/utils";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function Product({id, name, description, price, rating, images, category}: ProductProps) {
  return (
      <div className="w-full min-h-screen flex justify-center ">
        <Card className="w-full max-w-7xl shadow-none border-none">
          <CardContent className="p-6 sm:p-10">
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="basis-full lg:basis-[calc(50%-2rem)] flex flex-col gap-4">
                <ProductImages images={images} name={name}/>
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
                  {/*<Button size="lg" className="flex-1">*/}
                  {/*  Add to Cart*/}
                  {/*</Button>*/}
                  <AddToCartButton product={{id, name, description, price, rating, images, category}}/>
                  <Button size="lg" variant="outline" className="flex-1">
                    Buy now
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
  )
}

export function ProductSkeleton() {
  return (
      <div className="w-full min-h-screen flex justify-center">
        <Card className="w-full max-w-7xl shadow-none border-none">
          <CardContent className="p-6 sm:p-10">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Image Skeleton */}
              <div className="basis-full lg:basis-[calc(50%-2rem)] flex flex-col gap-4">
                <div className="w-full aspect-square relative overflow-hidden rounded-lg bg-gray-200 animate-pulse"></div>
                <div className="flex gap-4 overflow-x-auto pb-2 justify-center">
                  {[...Array(5)].map((_, index) => (
                      <div
                          key={index}
                          className="relative w-24 h-24 border-2 rounded-lg overflow-hidden flex-shrink-0 bg-gray-200 animate-pulse"
                      ></div>
                  ))}
                </div>
              </div>

              {/* Description Skeleton */}
              <div className="basis-full lg:basis-[calc(50%-2rem)] flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                  <div className="h-8 w-3/4 bg-gray-200 rounded animate-pulse"></div>
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                          <div
                              key={i}
                              className="w-5 h-5 bg-gray-200 rounded-full animate-pulse"
                          ></div>
                      ))}
                    </div>
                    <div className="h-4 w-12 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                  <div className="h-8 w-1/3 bg-gray-200 rounded animate-pulse"></div>
                </div>

                <div className="w-full">
                  {/* Static Tabs List */}
                  <div
                      className="inline-flex w-[16.25rem] h-10 items-center justify-start rounded-md bg-gray-200 animate-pulse p-1 text-muted-foreground">
                    {/*{[...Array(3)].map((_, i) => (*/}
                    {/*    <button*/}
                    {/*        key={i}*/}
                    {/*        className={cn(i === 0 ? "bg-background text-foreground shadow-sm w-[6.25rem] h-full" : "", "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all pointer-events-none opacity-50")}*/}
                    {/*    ></button>*/}
                    {/*))}*/}
                    <span
                        className={"bg-background text-foreground shadow-sm w-[6.25rem] h-full inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all pointer-events-none opacity-50"}
                    ></span>
                  </div>

                  <div className="flex flex-col gap-2 mt-4">
                    {[...Array(3)].map((_, i) => (
                        <div
                            key={i}
                            className={`h-4 ${i === 2 ? 'w-1/2' : 'w-full'} bg-gray-200 rounded animate-pulse`}
                        ></div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-4 mt-4">
                  <div className="h-12 w-full bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-12 w-full bg-gray-200 rounded animate-pulse"></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
  );
}
