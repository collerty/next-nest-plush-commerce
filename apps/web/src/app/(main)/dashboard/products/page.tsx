import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card"
import {Button} from "@/components/ui/button";
import {PlusIcon} from "lucide-react";
import Link from "next/link";

export default function ProductsPage() {
  return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Products</h1>
          <Link href="/dashboard/products/add" passHref>
            <Button>
              <PlusIcon/>
              Add Product
            </Button>
          </Link>
        </div>
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


