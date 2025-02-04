"use client"
import {Button, ButtonProps} from "@/components/ui/button"
import {ScrollArea} from "@/components/ui/scroll-area"
import {Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger} from "@/components/ui/sheet"

import {create} from 'zustand'
import {persist, createJSONStorage} from 'zustand/middleware'
import {Product} from "@/lib/types";
import {useState} from "react";
import {ShoppingCart} from "lucide-react";
import * as React from "react";
import Image from "next/image";
import {toast} from "sonner";
import {VariantProps} from "class-variance-authority";

export type CartItem = Product & {
  quantity: number;
};

type CartStore = {
  products: CartItem[];
  addProduct: (product: Product) => void;
  // (Optional) You might also add removeProduct or updateQuantity functions.
};

export const useCartStore = create<CartStore>()(
    persist(
        (set, get) => ({
          products: [],
          addProduct: (product: Product) =>
              set((state) => {
                // Find if the product already exists in the cart.
                const existingItem = state.products.find(item => item.id === product.id);
                if (existingItem) {
                  // If it exists, update its quantity.
                  return {
                    products: state.products.map(item =>
                        item.id === product.id
                            ? {...item, quantity: item.quantity + 1}
                            : item
                    )
                  };
                } else {
                  // If it does not exist, add it with quantity 1.
                  return {
                    products: [...state.products, {...product, quantity: 1}]
                  };
                }
              })
        }),
        {
          name: 'cart', // unique key in storage
          storage: createJSONStorage(() => localStorage),
        }
    )
);

interface CartProps {
  setIsCartOpen: (isOpen: boolean) => void
}

export default function Cart({setIsCartOpen}: CartProps) {
  const {products: cartItems} = useCartStore();
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
      <div className="flex flex-col h-full">
        <SheetHeader>
          <SheetTitle>Your Cart</SheetTitle>
        </SheetHeader>
        <ScrollArea className="flex-grow">
          <ul className="divide-y">
            {cartItems.map((item) => (
                <li key={item.id} className="py-4 flex items-center space-x-4">
                  <Image
                      src={item.images[0] || "/placeholder.svg"}
                      alt={item.name}
                      width={50}
                      height={50}
                      className="rounded-md"
                  />
                  <div className="flex-grow">
                    <div className="flex justify-between">
                      <span className="font-medium">{item.name}</span>
                      <span>${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                    <div className="text-sm text-gray-500">
                      Quantity: {item.quantity} x ${item.price.toFixed(2)}
                    </div>
                  </div>
                </li>
            ))}
          </ul>
        </ScrollArea>
        <div className="mt-4 space-y-4">
          <div className="flex justify-between font-bold text-lg">
            <span>Total:</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <Button
              className="w-full"
              onClick={() => {
                console.log("Proceeding to buy...")
                setIsCartOpen(false)
              }}
          >
            Proceed to Buy
          </Button>
        </div>
      </div>
  )

}

export function CartButton() {
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const {products} = useCartStore();
  return (
      <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="relative">
            <span
                className="transition-all duration-300 ease-in-out bg-black rounded-xl text-white absolute -top-2 -right-2 text-[0.75rem] w-4 h-4 flex justify-center items-center p-2.5" style={{opacity: products.length === 0 ? 0 : 1}}>{products.length}</span>
            <ShoppingCart className="h-4 w-4"/>
            <span className="sr-only">Open cart</span>
          </Button>
        </SheetTrigger>
        <SheetContent>
          <Cart setIsCartOpen={setIsCartOpen}/>
        </SheetContent>
      </Sheet>
  )
}

export function AddToCartButton({product, variant}: { product: Product, variant?: ButtonProps['variant'] }) {
  const {addProduct} = useCartStore();

  function handleAddProduct() {
    addProduct(product);
    toast.success("Product was added to the cart!");
  }

  return (
      <Button size="lg" className="flex-1" variant={variant ? variant : 'default'} onClick={handleAddProduct}>
        Add to Cart
      </Button>
  )
}