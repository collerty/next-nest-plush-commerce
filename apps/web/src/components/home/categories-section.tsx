import {CategoryCards} from "@/components/categories/category-cards";

export function CategoriesSection() {
    return (
        <div className="w-full flex flex-col">
            <h2 className="text-3xl font-bold">Categories</h2>
            <CategoryCards/>
        </div>
    )
}

