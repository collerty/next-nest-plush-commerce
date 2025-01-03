import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card"

export default function ProductsPage() {

  console.log("ProductsPage mounted");
  return (
      <div className="grid gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Products</h1>
        <Card>
          <CardHeader>
            <CardTitle>Product Catalog</CardTitle>
            <CardDescription>You have 15 products in your catalog.</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Manage your product catalog in this section.</p>
          </CardContent>
        </Card>
      </div>
  )
}


