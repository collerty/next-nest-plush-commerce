import {Product} from "@/components/products/product";

export default function Page({ params }: { params: { id: string } }) {
  const productData = {
    id: params.id,
    name: "Cute Capybara Plush",
    description: "Adorable and soft capybara plush toy, perfect for cuddling and decorating your space. Made with high-quality materials for long-lasting enjoyment.",
    price: 24.99,
    rating: 4.7,
    images: [
      "/capybara_cute.webp",
      "/logo.png",
      "/logo2.png",
    ]
  }
  return (
      <Product {...productData} />
  )
}