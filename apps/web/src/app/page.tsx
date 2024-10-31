import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";

export default async function Home() {
  const data = await fetch("http://localhost:4000/product");
  const products = await data.json();
  console.log(products);
  return (
      <div className="w-full h-full flex flex-col">
        <div className="flex">
          {products.map((product) => {
            return (
                <Card>
                  {/*<CardTitle>{product.name}</CardTitle>*/}
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
