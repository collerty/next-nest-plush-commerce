import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function OrderDetailsSkeleton() {
  return (
      <div className="space-y-6">
        <Card className="overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-500 p-6">
            <div className="flex justify-between items-center">
              <div>
                <Skeleton className="h-8 w-48 bg-white/50" />
                <Skeleton className="h-4 w-32 mt-2 bg-white/50" />
              </div>
              <div className="space-x-2">
                <Skeleton className="h-9 w-24 bg-white/50 inline-block" />
                <Skeleton className="h-9 w-24 bg-white/50 inline-block" />
              </div>
            </div>
          </CardHeader>
        </Card>

        <div className="grid gap-6 md:grid-cols-3">
          <Card className="md:col-span-2">
            <CardContent className="p-6">
              <table className="w-full">
                <thead>
                <tr className="border-b">
                  <th className="text-left pb-2">
                    <Skeleton className="h-4 w-16" />
                  </th>
                  <th className="text-center pb-2">
                    <Skeleton className="h-4 w-16 mx-auto" />
                  </th>
                  <th className="text-right pb-2">
                    <Skeleton className="h-4 w-16 ml-auto" />
                  </th>
                  <th className="text-right pb-2">
                    <Skeleton className="h-4 w-16 ml-auto" />
                  </th>
                </tr>
                </thead>
                <tbody>
                {[1, 2, 3].map((i) => (
                    <tr key={i} className="border-b last:border-b-0">
                      <td className="py-4">
                        <div className="flex items-center space-x-3">
                          <Skeleton className="h-12 w-12 rounded-md" />
                          <Skeleton className="h-4 w-24" />
                        </div>
                      </td>
                      <td className="text-center">
                        <Skeleton className="h-4 w-8 mx-auto" />
                      </td>
                      <td className="text-right">
                        <Skeleton className="h-4 w-16 ml-auto" />
                      </td>
                      <td className="text-right">
                        <Skeleton className="h-4 w-20 ml-auto" />
                      </td>
                    </tr>
                ))}
                </tbody>
                <tfoot>
                <tr className="border-t">
                  <td colSpan={3} className="pt-4 text-right">
                    <Skeleton className="h-4 w-20 ml-auto" />
                  </td>
                  <td className="pt-4 text-right">
                    <Skeleton className="h-4 w-24 ml-auto" />
                  </td>
                </tr>
                <tr>
                  <td colSpan={3} className="text-right">
                    <Skeleton className="h-4 w-16 ml-auto" />
                  </td>
                  <td className="text-right">
                    <Skeleton className="h-4 w-20 ml-auto" />
                  </td>
                </tr>
                <tr>
                  <td colSpan={3} className="text-right">
                    <Skeleton className="h-5 w-24 ml-auto" />
                  </td>
                  <td className="text-right">
                    <Skeleton className="h-5 w-28 ml-auto" />
                  </td>
                </tr>
                </tfoot>
              </table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-32" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="flex items-center space-x-3">
                      <Skeleton className="h-10 w-10 rounded-full" />
                      <div>
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-3 w-32 mt-1" />
                      </div>
                    </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
  )
}

