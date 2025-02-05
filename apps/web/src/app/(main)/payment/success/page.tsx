import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {CheckCircle} from "lucide-react";
import {Success} from "@/components/payment/sucess";

export default function SuccessPage() {
  return (
      <div className="w-full flex justify-center mt-[20vh]">
        <Success />
        <Card className="w-full max-w-md border sm:border border-none shadow-none sm:shadow">
          <CardHeader>
            <div className="flex items-center justify-center mb-4">
              <CheckCircle className="h-12 w-12 text-green-500"/>
            </div>
            <CardTitle className="text-2xl font-bold text-center">Payment Successful</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-center text-gray-600 mb-4">
              Thank you for your purchase! Your payment has been processed successfully.
            </p>
            {/* TODO */}
            <p className="text-center text-gray-600">
              An email confirmation has been sent to your registered email address. ( actually not.  )
            </p>
          </CardContent>
          <CardFooter className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild variant="outline">
              <Link href={"/orders"}>View Order</Link>
            </Button>
            <Button asChild>
              <Link href={"/products"}>Continue Shopping</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
  );
}
