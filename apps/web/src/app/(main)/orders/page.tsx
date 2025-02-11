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

