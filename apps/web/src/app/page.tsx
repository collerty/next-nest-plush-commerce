import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";

export default function Home() {
  return (
      <div className="w-full h-full flex flex-col">
        <div className="flex">
          <Card>
            <CardTitle>Card title</CardTitle>
            <CardHeader>Card header</CardHeader>
            <CardContent>Card content</CardContent>
            <CardFooter>Card footer</CardFooter>
            <CardDescription>Card description</CardDescription>
          </Card>
        </div>
      </div>
  );
}
