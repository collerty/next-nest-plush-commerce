import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function OrdersListSkeleton() {
  return (
      <div className="grid gap-6 md:grid-cols-2">
        {[1, 2, 3, 4].map((i) => (
            <Card key={i} className="overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-500 p-6">
                <div className="flex justify-between items-center">
                  <div>
                    <Skeleton className="h-6 w-32 bg-white/50" />
                    <Skeleton className="h-4 w-24 mt-2 bg-white/50" />
                  </div>
                  <Skeleton className="h-6 w-20 bg-white/50" />
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {[1, 2].map((j) => (
                      <div key={j} className="flex items-center space-x-4">
                        <Skeleton className="h-16 w-16 rounded-md" />
                        <div className="flex-grow">
                          <Skeleton className="h-4 w-3/4" />
                          <div className="flex justify-between items-center mt-2">
                            <Skeleton className="h-3 w-1/4" />
                            <Skeleton className="h-3 w-1/4" />
                          </div>
                        </div>
                      </div>
                  ))}
                </div>
                <div className="mt-6 space-y-2">
                  <div className="flex justify-between items-center">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-5 w-20" />
                  </div>
                </div>
                <Skeleton className="h-9 w-full mt-6" />
              </CardContent>
            </Card>
        ))}
      </div>
  )
}