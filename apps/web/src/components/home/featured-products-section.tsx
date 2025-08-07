import Image from "next/image"
import Link from "next/link"
import {Button} from "@/components/ui/button";
import {ApiResponse} from "@/lib/actions";
import {Product} from "@/lib/types";



export async function FeaturedProductsSection({getProducts}: { getProducts: () => Promise<ApiResponse<Product[]>> }) {
    const response = await getProducts();
    const products = response.data;
    const fProducts = products?.slice(0, 4);
    return (
        <section className="w-full py-8 md:py-12 lg:py-24">

            <div className="px-4 md:px-6">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">
                    Featured Products
                </h2>
                <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl">
                    Discover our most popular plush toys and bring home a new cuddly friend today.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {fProducts?.map((product, index) => (
                        <ProductCard key={product.id} product={product}/>
                    ))}
                </div>
                {/*<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">*/}
                {/*    {secondRowProducts.map((product) => (*/}
                {/*        <ProductCard key={product.id} product={product}/>*/}
                {/*    ))}*/}
                {/*    <div className="absolute bottom-0 left-0 w-full h-40 pointer-events-none bg-gradient-to-b from-white/30 to-white dark:from-gray-900/30 dark:to-gray-900"></div>*/}
                {/*</div>*/}
                <div className="mt-12 text-center">
                    <Link
                        href="/products"
                        // className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primary-dark transition duration-150 ease-in-out"
                    >
                        <Button className="px-6 py-6 text-base font-medium">
                            View All Products
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    )
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function ProductCard({product}: { product: any }) {
    console.log(product);
    return (
        <div
            className="bg-white dark:bg-gray-700 rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105">
            <Image
                src={product.images[0] || "/placeholder.svg"}
                alt={product.name}
                width={300}
                height={300}
                className="w-full h-48 object-cover"
            />
            <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">{product.description}</p>
                <div className="flex justify-between items-center">
                    <span className="text-xl font-bold">${product.price.toFixed(2)}</span>
                    <Link
                        href={`/products/${product.id}`}
                        className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark transition duration-150 ease-in-out"
                    >
                        View Details
                    </Link>
                </div>
            </div>
        </div>
    )
}

