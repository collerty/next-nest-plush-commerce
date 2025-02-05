"use client";

import {toast} from "sonner";
import {useCartStore} from "@/components/cart/cart";
import {useEffect} from "react";

export function Success() {
  const {clearCart} = useCartStore();
  useEffect(() =>{
    clearCart();
  }, [])
  toast.success("Order has been proceeded")
  return (
      <></>
  )
}