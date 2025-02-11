"use client"
import {Button, ButtonProps} from "@/components/ui/button"
import {ScrollArea} from "@/components/ui/scroll-area"
import {Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger} from "@/components/ui/sheet"

import {create} from 'zustand'
import {persist, createJSONStorage} from 'zustand/middleware'
import {Product, User} from "@/lib/types";
import {useState} from "react";
import {ShoppingCart, Trash2} from "lucide-react";
import * as React from "react";
import Image from "next/image";
import {toast} from "sonner";
import {VariantProps} from "class-variance-authority";
import CheckoutButton from "@/components/cart/checkout-button";
import Link from "next/link";
import {cn} from "@/lib/utils";

export type CartItem = Product & {
  quantity: number;
};

type CartStore = {
  products: CartItem[];
  addProduct: (product: Product) => void;
  removeProduct: (productId: number) => void;
  clearCart: () => void;
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
              }),
          removeProduct: (productId) => set(state => ({products: state.products.filter((product) => product.id !== productId)})),
          clearCart: () => set(state => ({products: []}))
        }),
        {
          name: 'cart', // unique key in storage
          storage: createJSONStorage(() => localStorage),
        }
    )
);

interface CartProps {
  setIsCartOpen: (isOpen: boolean) => void;
  user: User | null;
}

export default function Cart({setIsCartOpen, user}: CartProps) {
  const {products: cartItems, removeProduct: removeItem} = useCartStore();
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

  function handleEmptyCartClick(e: React.MouseEvent<HTMLElement>) {
    if (cartItems.length === 0) {
    toast.error("Cart is empty");
    //   toast({
    //     className: cn(
    //         'top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4'
    //     ),
    //     variant: 'default',
    //     title: 'Uh oh! Something went wrong.',
    //     description: 'There was a problem with your request.',
    //     action: <ToastAction altText="Try again">Try again</ToastAction>
    //   })
    // // console.log("cart is empty");
    e.preventDefault();
    } else {
      toast.info("Sign in to start checkout");
    }
  }

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
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{item.name}</span>
                      <span>${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                    <div className="text-sm text-gray-500">
                      Quantity: {item.quantity} x ${item.price.toFixed(2)}
                    </div>
                  </div>
                  <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeItem(item.id)}
                      className="text-destructive hover:text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="h-4 w-4"/>
                    <span className="sr-only">Remove {item.name} from cart</span>
                  </Button>
                </li>
            ))}
          </ul>
        </ScrollArea>
        <div className="mt-4 space-y-4">
          <div className="flex justify-between font-bold text-lg">
            <span>Total:</span>
            <span>${total.toFixed(2)}</span>
          </div>
          {!user ?
              <Link
                  href={"/auth/sign-in"}
                  onClick={handleEmptyCartClick}
                  // className={cartItems.length === 0 ? 'pointer-events-none' : ''}
                  aria-disabled={cartItems.length === 0}
                  tabIndex={cartItems.length === 0 ? -1 : undefined}
              >
                <Button className={"w-full"}
                    // disabled={cartItems.length === 0}
                >Checkout</Button>
              </Link>
              :
              <CheckoutButton
                  items={cartItems.map(({id, quantity}) => ({productId: id, quantity}))}
                  customerEmail={user.email}
              />
          }
          {/*<Button*/}
          {/*    className="w-full"*/}
          {/*    onClick={() => {*/}
          {/*      console.log("Proceeding to buy...")*/}
          {/*      setIsCartOpen(false)*/}
          {/*    }}*/}
          {/*>*/}
          {/*  Proceed to Buy*/}
          {/*</Button>*/}
        </div>
      </div>
  )
}

export function CartButton({user}: { user: User | null }) {
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const {products} = useCartStore();
  return (
      <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="relative">
            <span
                className="transition-all duration-300 ease-in-out bg-black rounded-xl text-white absolute -top-2 -right-2 text-[0.75rem] w-4 h-4 flex justify-center items-center p-2.5"
                style={{opacity: products.length === 0 ? 0 : 1}}>{products.length}</span>
            <ShoppingCart className="h-4 w-4"/>
            <span className="sr-only">Open cart</span>
          </Button>
        </SheetTrigger>
        <SheetContent>
          <Cart setIsCartOpen={setIsCartOpen} user={user}/>
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