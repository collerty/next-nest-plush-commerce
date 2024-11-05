import {Card, CardContent,  CardFooter, CardHeader} from "@/components/ui/card";

export default async function Home() {
  const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/product`);
  const products = await data.json();
  // console.log(products);
  return (
      <div className="w-full h-full flex flex-col">
        <div className="flex">
          {/* eslint-disable-next-line*/}
          {products.map((product:any) => {
            return (
                <Card key={product.id}>
                  {/*<CardTitle>{products.name}</CardTitle>*/}
                  <CardHeader>{product.id}</CardHeader>
                  <CardContent>{product.name}</CardContent>
                  <CardFooter>{product.price}</CardFooter>
                  {/*<CardDescription>Card description</CardDescription>*/}
                </Card>
            )
          })}

        </div>
      </div>
  );
}
