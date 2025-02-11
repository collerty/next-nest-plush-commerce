import {AddProductForm} from "@/components/dashboard/add-product-form";

export default function AddProductPage() {
  return (
      <div className="border rounded-2xl p-6 flex flex-col gap-8">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-semibold tracking-tight">Add Product</h1>
          <h1 className="text-sm text-muted-foreground">Add a new product to the store</h1>
        </div>
        <AddProductForm/>
      </div>
  )
}