import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {XCircle} from "lucide-react";
import {Button} from "@/components/ui/button";
import Link from "next/link";

export default function CancelPage() {

  return (
      <div className="w-full flex justify-center mt-[20vh]">
        <Card className="w-full max-w-md border sm:border border-none shadow-none sm:shadow">
          <CardHeader>
            <div className="flex items-center justify-center mb-4">
              <XCircle className="h-12 w-12 text-red-500"/>
            </div>
            <CardTitle className="text-2xl font-bold text-center">Payment Canceled</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-center text-gray-600 mb-4">
              Your payment has been canceled. No charges have been made to your account.
            </p>
            {/*<p className="text-center text-gray-600">*/}
            {/*  If you have any questions or concerns, please contact our customer support.*/}
            {/*</p>*/}
          </CardContent>
          <CardFooter className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild variant="outline">
              <Link href="/cart">Return to Cart</Link>
            </Button>
            <Button asChild>
              <Link href="/">Continue Shopping</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
  );
}
