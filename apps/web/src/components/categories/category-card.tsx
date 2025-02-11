import Link from "next/link"
import { Suspense } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import {ProductCount} from "@/components/categories/product-count";
import {CategoryIcons} from "@/components/categories/category-icons";




interface Category {
    id: number
    name: string
    slug: string
    icon: keyof typeof CategoryIcons
}

interface CategoryCardProps {
    category: Category
}

export function CategoryCard({ category }: CategoryCardProps) {
    const Icon = CategoryIcons[category.icon]

    return (
        <Link href={`/categories/${category.slug}`}>
            <Card className="h-full rounded-lg transition-colors hover:bg-muted/25 flex flex-col gap-4">
                <CardHeader className="flex-1 text-center flex flex-col items-center pb-0 gap-2">
                    <Icon className=" h-12 w-12 text-purple-600" />
                    <CardTitle className="capitalize flex-grow flex items-center justify-center">{category.name}</CardTitle>
                </CardHeader>
                <CardContent className="flex items-cente justify-center">
                    <Suspense fallback={<Skeleton className="h-4 w-20" />}>
                        <ProductCount categoryId={category.id} />
                    </Suspense>
                </CardContent>
            </Card>
        </Link>
    )
}