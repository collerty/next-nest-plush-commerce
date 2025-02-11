import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function CategoryCardsSkeleton() {
    return (
        <section className="py-8 bg-purple-50">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                {[...Array(5)].map((_, i) => (
                    <Card key={i} className="h-full rounded-lg">
                        <CardHeader className="flex-1 text-center">
                            <Skeleton className="h-12 w-12 rounded-full mx-auto" />
                            <Skeleton className="h-6 w-24 mt-2 mx-auto" />
                        </CardHeader>
                        <CardContent className="pt-2">
                            <Skeleton className="h-4 w-20 mx-auto" />
                        </CardContent>
                    </Card>
                ))}
            </div>
        </section>
    )
}

