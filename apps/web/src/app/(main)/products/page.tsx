import {ProductCards} from "@/components/products/product-cards";
import {ApiResponse, getAllProducts} from "@/lib/actions";
import {Product} from "@/lib/types";

export default async function Page() {
  const products: ApiResponse<Product[]> = await getAllProducts();
  return (
      <div className="">
        {!products.error && products.data && <ProductCards products={products.data}/>}
      </div>
  )
}