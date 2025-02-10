import {OrderCard} from "./order-card"
import {Order} from "@/lib/types";
import {ApiResponse} from "@/lib/actions";


export async function OrdersList({getOrders}: { getOrders: () => Promise<ApiResponse<Order[]>> }) {
  const orders = await getOrders()

  return (
      <div className="grid gap-6 md:grid-cols-2">
        {!orders.data ? <div>Make an order first</div> : orders.data.map((order) => (
            <OrderCard key={order.id} order={order}/>
        ))}
      </div>
  )
}