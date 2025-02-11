import {Product} from "@/components/products/product";
import {getProductById} from "@/lib/actions";

export default async function Page({params,}: { params: Promise<{ id: string }> }) {
  const id = (await params).id;
  const product = await getProductById(id);
  if (!product.data) {
    return (
        <div>
          Product not available...
        </div>
    )
  }
  return (
      <Product {...product.data} />
  )
}