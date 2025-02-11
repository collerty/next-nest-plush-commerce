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

