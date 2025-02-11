import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const recentSales = [
  { name: "Alice Johnson", email: "alice@example.com", amount: "$350.00" },
  { name: "Bob Smith", email: "bob@example.com", amount: "$240.00" },
  { name: "Charlie Brown", email: "charlie@example.com", amount: "$550.00" },
  { name: "Diana Ross", email: "diana@example.com", amount: "$920.00" },
  { name: "Ethan Hunt", email: "ethan@example.com", amount: "$180.00" },
]

export function RecentSales() {
  return (
      <Card className="col-span-3">
        <CardHeader>
          <CardTitle>Recent Sales</CardTitle>
          <CardDescription>You made 265 sales this month.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            {recentSales.map((sale, index) => (
                <div key={index} className="flex items-center">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src={`https://avatar.vercel.sh/${sale.name.toLowerCase().replace(' ', '-')}.png`} alt={sale.name} />
                    <AvatarFallback>{sale.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">{sale.name}</p>
                    <p className="text-sm text-muted-foreground">{sale.email}</p>
                  </div>
                  <div className="ml-auto font-medium">{sale.amount}</div>
                </div>
            ))}
          </div>
        </CardContent>
      </Card>
  )
}

