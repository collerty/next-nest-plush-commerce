import {Card, CardContent, CardFooter, CardHeader} from "@/components/ui/card";
import {headers} from "next/headers";
import {fetcher} from "@/lib/fetcher";
import {apiUrl} from "@/lib/api-url";

export default async function Home() {
  const products = await fetcher(`${apiUrl}/products`, {
    method: "GET",
    // headers: new Headers({'Authorization': 'Basic ' + cookies.get})
  });
  // const products: any[] = await data.json();
  console.log(products);
  return (
      <div className="w-full h-full flex flex-col">
        <div className="flex">
          {/* eslint-disable-next-line*/}
          {products.map((product: any) => {
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
