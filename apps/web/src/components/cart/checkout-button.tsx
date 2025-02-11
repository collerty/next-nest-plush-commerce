"use client";

import {useState} from 'react';
import {loadStripe} from '@stripe/stripe-js';
import {createCheckoutSession} from '@/lib/actions';
import {Button} from '@/components/ui/button';
import {toast} from "sonner";
import {useCartStore} from "@/components/cart/cart";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!);

export default function CheckoutButton({items, customerEmail}: {
  items: { productId: number; quantity: number }[],
  customerEmail: string
}) {
  const [loading, setLoading] = useState(false);
  const {clearCart} = useCartStore();

  async function handleCheckout() {
    setLoading(true);
    try {
      const session = await createCheckoutSession(items, customerEmail);
      const stripe = await stripePromise;
      if (!session.data) {
        throw new Error("Error while creating sessionId");
      }
      if (stripe) {
        await stripe.redirectToCheckout({sessionId: session.data.sessionId});
      }
    } catch (error) {
      console.error('Checkout error:', error);
      toast.error('Error while checkout occurred');
    } finally {
      setLoading(false);
    }
  }

  return (
      <Button onClick={handleCheckout} disabled={loading} className="w-full">
        {loading ? 'Processing...' : 'Checkout'}
      </Button>
  );
}
