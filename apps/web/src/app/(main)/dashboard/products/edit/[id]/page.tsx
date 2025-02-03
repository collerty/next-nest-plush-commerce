import {getProductById} from "@/lib/actions";
import {EditProductForm} from "@/components/dashboard/edit-product-form";

type Params = Promise<{ id: string }>;
export default async function EditProductPage({params}: { params: Params }) {
  const {id} = await params;
  const product = await getProductById(id);
  return (
      <div className="border rounded-2xl p-6 flex flex-col gap-8">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-semibold tracking-tight">Edit Product</h1>
          <h1 className="text-sm text-muted-foreground">Edit a product already available in the store</h1>
        </div>
        {product.data ?
        <EditProductForm product={product.data}/> :
            <div>No such product found</div>
        }
      </div>
  )
}