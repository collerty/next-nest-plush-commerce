import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function OrdersPage() {
  return (
      <div className="grid gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Orders</h1>
        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
            <CardDescription>You have 3 orders this week.</CardDescription>
          </CardHeader>
          <CardContent>
            <p>View and manage your orders here.</p>
          </CardContent>
        </Card>
      </div>
  )
}

