import {ProductCards} from "@/components/products/product-cards";
import {getAllProducts} from "@/lib/actions";

export default async function Page() {
  const data = await getAllProducts();
  console.log(data.data)
  return (
      <div className="">
        <ProductCards products={data.data}/>
      </div>
  )
}