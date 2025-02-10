"use client";

import {toast} from "sonner";
import {useCartStore} from "@/components/cart/cart";
import {useEffect} from "react";

export function Success() {
  const {clearCart} = useCartStore();
  // renders twice only in development mode due to Strict Mode being active
  useEffect(() =>{
    clearCart();
  }, [clearCart])
  toast.success("Order has been proceeded")
  return null
}