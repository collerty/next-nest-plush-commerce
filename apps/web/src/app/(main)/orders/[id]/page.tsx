import { Suspense } from "react"
import {OrderDetailsSkeleton} from "@/components/orders/order-details-skeleton";
import {getOrder} from "@/lib/actions";
import {OrderDetails} from "@/components/orders/order-details";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList, BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import Link from "next/link";
//
// async function getOrder(id: string) {
//   // Simulate API call
//   await new Promise((resolve) => setTimeout(resolve, 2000))
//   return {
//     id: Number.parseInt(id),
//     status: "shipped",
//     date: "2025-02-03T03:08:15.465Z",
//     items: [
//       {
//         id: 1,
//         name: "Premium Headphones",
//         price: 199.99,
//         quantity: 1,
//         image: "/placeholder.svg?height=100&width=100",
//       },
//       {
//         id: 2,
//         name: "Wireless Mouse",
//         price: 49.99,
//         quantity: 2,
//         image: "/placeholder.svg?height=100&width=100",
//       },
//     ],
//     shipping: 10,
//     statuses: [
//       { status: "Order Placed", date: "2025-02-03T03:08:15.465Z", icon: "ShoppingCart" },
//       { status: "Payment Confirmed", date: "2025-02-03T03:10:00.000Z", icon: "CreditCard" },
//       { status: "Shipped", date: "2025-02-04T10:00:00.000Z", icon: "Truck" },
//       { status: "Out for Delivery", date: "2025-02-05T09:00:00.000Z", icon: "Package" },
//       { status: "Delivered", date: null, icon: "CheckCircle" },
//     ],
//   }
// }

export default async function OrderPage({ params }: { params: Promise<{ id: string }> }) {
  const {id} = await params;
  return (
      <div className="container mx-auto">
        <Breadcrumb className="mb-4">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/orders">Orders</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Order #{id}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <Suspense fallback={<OrderDetailsSkeleton />}>
          <OrderDetails orderId={id} getOrder={getOrder} />
        </Suspense>
      </div>
  )
}

