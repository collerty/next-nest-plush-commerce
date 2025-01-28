import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card"
import {DataTable} from "@/components/dashboard/products-table";
import {columns} from "@/components/dashboard/columns";
import {getAllProducts} from "@/lib/actions";

export default async function ProductsPage() {
  const products = await getAllProducts();
  return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Products</h1>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Product Catalog</CardTitle>
            <CardDescription>Manage and view your product inventory</CardDescription>
          </CardHeader>
          <CardContent>
            <DataTable data={products.data} columns={columns} searchKey='name'/>
          </CardContent>
        </Card>
      </div>
  )
}


