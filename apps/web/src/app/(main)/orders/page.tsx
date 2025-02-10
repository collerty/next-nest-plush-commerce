import {Suspense} from "react"
import {OrdersListSkeleton} from "@/components/orders/orders-list-skeleton";
import {OrderCard} from "@/components/orders/order-card";
import {OrdersList} from "@/components/orders/orders-list";
import {getAllProfileOrders} from "@/lib/actions";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList, BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import Link from "next/link";

// async function getOrders() {
//   // Simulate API call
//   await new Promise((resolve) => setTimeout(resolve, 2000))
//   return [
//     {
//       id: 1,
//       status: "pending",
//       date: "2025-02-03T03:08:15.465Z",
//       items: [
//         {
//           id: 1,
//           name: "Premium Headphones",
//           price: 199.99,
//           quantity: 1,
//           image: "/placeholder.svg?height=100&width=100",
//         },
//         {
//           id: 2,
//           name: "Wireless Mouse",
//           price: 49.99,
//           quantity: 2,
//           image: "/placeholder.svg?height=100&width=100",
//         },
//       ],
//     },
//     {
//       id: 2,
//       status: "shipped",
//       date: "2025-02-01T10:30:00.000Z",
//       items: [
//         {
//           id: 3,
//           name: "4K Monitor",
//           price: 399.99,
//           quantity: 1,
//           image: "/placeholder.svg?height=100&width=100",
//         },
//         {
//           id: 4,
//           name: "Mechanical Keyboard",
//           price: 129.99,
//           quantity: 1,
//           image: "/placeholder.svg?height=100&width=100",
//         },
//       ],
//     },
//   ]
// }

export default function OrdersPage() {
  return (
      <div className="container mx-auto">
        <Breadcrumb className="mb-4">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator/>
            <BreadcrumbItem>
              <BreadcrumbPage>
                Orders
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <h1 className="text-3xl font-bold mb-6">Your Orders</h1>
        <Suspense fallback={<OrdersListSkeleton/>}>
          <OrdersList getOrders={getAllProfileOrders}/>
        </Suspense>
      </div>
  )
}

