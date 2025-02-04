import { getProductById } from "@/lib/actions";
import {EditFormSkeleton, EditProductForm} from "@/components/dashboard/edit-product-form";
import { Suspense, use } from "react";

type Params = { id: string };

export default function EditProductPage({ params }: { params: Params }) {
  const productPromise = getProductById(params.id);

  return (
      <div className="border rounded-2xl p-6 flex flex-col gap-8">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-semibold tracking-tight">Edit Product</h1>
          <h1 className="text-sm text-muted-foreground">Edit a product already available in the store</h1>
        </div>
        <Suspense fallback={<EditFormSkeleton/>}>
          <ProductData productPromise={productPromise} />
        </Suspense>
      </div>
  );
}

function ProductData({ productPromise }: { productPromise: Promise<any> }) {
  const product = use(productPromise);
  return product.data ? <EditProductForm product={product.data} /> : <div>No such product found</div>;
}

