import {Product} from "@/components/products/product";
import {getProductById} from "@/lib/actions";

export default async function Page({params,}: { params: Promise<{ id: string }> }) {
  const id = (await params).id;
  const data = await getProductById(id);
  console.log(data.data);
  const dataWithRating = {
    ...data.data,
    rating: 5
  }
  const productData = {
    id: (await params).id,
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
      <Product {...dataWithRating} />
  )
}