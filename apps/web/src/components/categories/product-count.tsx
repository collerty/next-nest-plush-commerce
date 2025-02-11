import { getProductCountByCategoryId} from "@/lib/actions";
import {CategoryIcons} from "@/components/categories/category-icons";

interface ProductCountProps {
    categoryId: number
}

export async function ProductCount({ categoryId }: ProductCountProps) {
    const count = await getProductCountByCategoryId(categoryId)

    return (
        <div className="flex w-fit items-center text-[0.8rem] text-muted-foreground mx-auto">
            <CategoryIcons.product className="mr-1.5 size-3.5" aria-hidden="true" />
            {count.data ? count.data : 0} products
        </div>
    )
}