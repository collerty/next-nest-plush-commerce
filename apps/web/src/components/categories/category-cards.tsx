import { CategoryCard} from "@/components/categories/category-card";
import {categories} from "@/lib/categories";


export function CategoryCards() {
    return (
        <section className="py-8 ">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                {categories.map((category) => (
                    <CategoryCard key={category.id} category={category} />
                ))}
            </div>
        </section>
    )
}

