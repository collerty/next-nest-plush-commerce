import Image from "next/image"
import Link from "next/link"
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"
import {Badge} from "@/components/ui/badge"
import {Button} from "@/components/ui/button"
import {Order, OrderStatus} from "@/lib/types";

// interface OrderItem {
//   id: number
//   name: string
//   price: number
//   quantity: number
//   image: string
// }
//
// interface Order {
//   id: number
//   status: string
//   date: string
//   items: OrderItem[]
// }
const statusVariantMap: Record<OrderStatus, "secondary" | "default" | "outline" | "destructive"> = {
  [OrderStatus.PENDING]: "secondary",
  [OrderStatus.PROCESSING]: "outline",
  [OrderStatus.PAID]: "default",
  [OrderStatus.SHIPPED]: "default",
  [OrderStatus.DELIVERED]: "default",
  [OrderStatus.CANCELLED]: "destructive",
};

export function OrderCard({ order }: { order: Order }) {
  const totalAmount = order.items.reduce((sum, item) => sum + Number(item.pricePerUnit) * item.quantity, 0)

  return (
      <Card className="overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-2xl">Order #{order.id}</CardTitle>
              <p className="text-sm opacity-80">{new Date(order.created_at).toLocaleDateString()}</p>
            </div>
            <Badge variant={statusVariantMap[order.status]} className="uppercase">
              {order.status}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            {order.items.slice(0, 2).map((item) => (
                <div key={item.id} className="flex items-center space-x-4">
                  <Image
                      src={item.product.images[0] || "/placeholder.svg"}
                      alt={item.product.name}
                      width={60}
                      height={60}
                      className="rounded-md object-cover"
                  />
                  <div className="flex-grow">
                    <h3 className="font-semibold">{item.product.name}</h3>
                    <div className="flex justify-between items-center mt-1 text-sm text-gray-600">
                      <span>Qty: {item.quantity}</span>
                      <span>${Number(item.pricePerUnit).toFixed(2)} each</span>
                    </div>
                  </div>
                </div>
            ))}
          </div>
          {order.items.length > 2 && (
              <p className="mt-4 text-sm text-gray-600">And {order.items.length - 2} more item(s)</p>
          )}
          <div className="mt-6 flex justify-between items-center">
            <span className="font-semibold">Total Amount:</span>
            <span className="text-lg font-bold">${totalAmount.toFixed(2)}</span>
          </div>
          <div className="mt-6">
            <Link href={`/orders/${order.id}`} passHref>
              <Button variant="outline" className="w-full">
                View Order Details
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
  )
}

