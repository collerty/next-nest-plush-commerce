import Image from "next/image";
import StarRating from "@/components/icons/star";

export function Products() {
  const product = {};
  return (
      <div className="flex flex-wrap w-full gap-4">
        <ProductCard product={product}/>
        <ProductCard product={product}/>
        <ProductCard product={product}/>
        <ProductCard product={product}/>
        <ProductCard product={product}/>
        <ProductCard product={product}/>
        <ProductCard product={product}/>
      </div>
  )
}

export function ProductCard({product}) {
  return (
      <div
          className=" gap-2 p-3 rounded-2xl flex flex-col h-full border shadow-lg cursor-pointer hover:shadow-2xl basis-full sm:basis-[calc(50%-1rem)] md:basis-[calc(33.33%-1rem)] lg:basis-[calc(25%-1rem)]">
        <div className="p-2 relative w-full aspect-square rounded-2xl">
          <Image src={"/capybara_cute.webp"} alt={"product.name"} className={"object-cover rounded-2xl"} fill/>
        </div>
        <div className="px-2 flex flex-col">
          <span className="font-light text-base text-gray-700">Plush</span>
          <span className="font-medium text-lg">Product name</span>
          <StarRating rating={5}/>
        </div>
        <div className="px-2">
          <span className="font-medium">&#8364; 5.22</span>
        </div>
      </div>
  )
}