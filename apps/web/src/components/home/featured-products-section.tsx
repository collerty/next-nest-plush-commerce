import Image from "next/image"
import Link from "next/link"
import {Button} from "@/components/ui/button";

type Product = {
    id: string
    name: string
    description: string
    price: number
    image: string
}

const featuredProducts: Product[] = [
    {
        id: "1",
        name: "Cuddly Bear",
        description: "A soft and huggable teddy bear, perfect for all ages.",
        price: 24.99,
        image: "/placeholder.svg",
    },
    {
        id: "2",
        name: "Sleepy Sloth",
        description: "This adorable sloth plush will make you want to take a nap.",
        price: 29.99,
        image: "/placeholder.svg",
    },
    {
        id: "3",
        name: "Playful Penguin",
        description: "A charming penguin plush that brings arctic joy to your home.",
        price: 19.99,
        image: "/placeholder.svg",
    },
    {
        id: "4",
        name: "Friendly Fox",
        description: "A clever and cute fox plush to keep you company.",
        price: 22.99,
        image: "/placeholder.svg",
    },
]

const secondRowProducts: Product[] = [
    {
        id: "5",
        name: "Happy Hedgehog",
        description: "A spiky yet snuggly friend for your collection.",
        price: 21.99,
        image: "/placeholder.svg"
    },
    {
        id: "6",
        name: "Bouncy Bunny",
        description: "This playful bunny will hop right into your heart.",
        price: 25.99,
        image: "/placeholder.svg"
    },
    {
        id: "7",
        name: "Gentle Giraffe",
        description: "A tall and cuddly giraffe for endless hugs.",
        price: 27.99,
        image: "/placeholder.svg"
    },
    {
        id: "8",
        name: "Cheerful Chick",
        description: "A tiny but adorable chick to brighten your day.",
        price: 18.99,
        image: "/placeholder.svg"
    },
];


export function FeaturedProductsSection() {
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
                    {featuredProducts.map((product) => (
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

function ProductCard({product}: { product: Product }) {
    return (
        <div
            className="bg-white dark:bg-gray-700 rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105">
            <Image
                src={product.image || "/placeholder.svg"}
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

