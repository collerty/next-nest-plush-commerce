import Image from "next/image"
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"
import {Button} from "@/components/ui/button"
import {ShoppingCart, CreditCard, Truck, Package, CheckCircle, Printer, Download} from "lucide-react"
import {DownloadOrderButton, PrintOrderButton} from "@/components/orders/order-buttons";
import {Order} from "@/lib/types";
import {ApiResponse} from "@/lib/actions";

// interface OrderItem {
//   id: number
//   name: string
//   price: number
//   quantity: number
//   image: string
// }
//
// interface OrderStatus {
//   status: string
//   date: string | null
//   icon: string
// }
//
// interface Order {
//   id: number
//   status: string
//   date: string
//   items: OrderItem[]
//   shipping: number
//   statuses: OrderStatus[]
// }
//
interface OrderDetailsProps {
  orderId: string
  getOrder: (id: string) => Promise<ApiResponse<Order>>
}


export async function OrderDetails({orderId, getOrder}: OrderDetailsProps) {
  const response = await getOrder(orderId)
  const order = response.data;
  if (!order) {
    return <div>Order was not found</div>
  }
  console.log(order)

  const statuses = [
    {status: "Order Placed", date: order.created_at, icon: "ShoppingCart"},
    {status: "Payment Confirmed", date: order.created_at, icon: "CreditCard"},
    {status: "Shipped", date: null, icon: "Truck"},
    {status: "Out for Delivery", date: null, icon: "Package"},
    {status: "Delivered", date: null, icon: "CheckCircle"},
  ]
  const totalAmount = order.items.reduce((sum, item) => sum + Number(item.pricePerUnit) * item.quantity, 0)
  const finalTotal = totalAmount + 0; // + order.shipping


  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "ShoppingCart":
        return <ShoppingCart className="h-6 w-6"/>
      case "CreditCard":
        return <CreditCard className="h-6 w-6"/>
      case "Truck":
        return <Truck className="h-6 w-6"/>
      case "Package":
        return <Package className="h-6 w-6"/>
      case "CheckCircle":
        return <CheckCircle className="h-6 w-6"/>
      default:
        return null
    }
  }

  return (
      <div className="space-y-6">
        <Card className="overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-6">
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-3xl">Order #{order.id}</CardTitle>
                <p className="text-lg opacity-80">{new Date(order.created_at).toLocaleDateString()}</p>
              </div>
              <div className="space-x-2">
                <PrintOrderButton/>
                <DownloadOrderButton/>
              </div>
            </div>
          </CardHeader>
        </Card>

        <div className="grid gap-6 md:grid-cols-3">
          <Card className="md:col-span-2">
            <CardContent className="p-6 h-full">
              <table className="w-full">
                <thead>
                <tr className="border-b">
                  <th className="text-left pb-2">Item</th>
                  <th className="text-center pb-2">Quantity</th>
                  <th className="text-right pb-2">Rate</th>
                  <th className="text-right pb-2">Total</th>
                </tr>
                </thead>
                <tbody>
                {order.items.map((item) => (
                    <tr key={item.id} className="border-b last:border-b-0">
                      <td className="py-4">
                        <div className="flex items-center space-x-3">
                          <Image
                              src={item.product.images[0] || "/placeholder.svg"}
                              alt={item.product.name}
                              width={50}
                              height={50}
                              className="rounded-md object-cover"
                          />
                          <span className="font-medium">{item.product.name}</span>
                        </div>
                      </td>
                      <td className="text-center">{item.quantity}</td>
                      <td className="text-right">€{Number(item.pricePerUnit).toFixed(2)}</td>
                      <td className="text-right font-medium">€{(Number(item.pricePerUnit) * item.quantity).toFixed(2)}</td>
                    </tr>
                ))}
                </tbody>
                <tfoot className="">
                <tr className="border-t">
                  <td colSpan={3} className="pt-4 text-right font-semibold">
                    Subtotal:
                  </td>
                  <td className="pt-4 text-right font-semibold">€{totalAmount.toFixed(2)}</td>
                </tr>
                <tr>
                  <td colSpan={3} className="text-right">Shipping:</td>
                  <td className="text-right relative inline-block w-full">
                    {/*<span*/}
                    {/*    className="text-gray-500 relative inline-block px-1 after:content-[''] after:absolute after:top-1/2 after:left-0 after:right-0 after:border-t after:border-gray-500">€10*/}
                    {/*</span>*/}
                    €0
                  </td>
                </tr>


                <tr>
                  <td colSpan={3} className="text-right font-bold text-lg">
                    Total:
                  </td>
                  <td className="text-right font-bold text-lg">€{finalTotal.toFixed(2)}</td>
                </tr>
                </tfoot>
              </table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Order Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {statuses.map((status, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className={`rounded-full p-2 ${status.date ? "text-purple-500" : "text-gray-500"}`}>
                        {getIcon(status.icon)}
                      </div>
                      <div>
                        <p className={`font-semibold ${status.date ? "" : "text-gray-500"}`}>{status.status}</p>
                        {status.date &&
                            <p className="text-sm text-gray-600">{new Date(status.date).toLocaleString()}</p>}
                      </div>
                    </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
  )
}

