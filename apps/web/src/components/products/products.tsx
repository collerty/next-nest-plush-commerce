import Image from "next/image";
import {StarRating} from "@/components/icons/star";

export function ProductCards() {
  const product = {};
  return (
      <div className="flex flex-wrap w-full gap-4">
        <ProductCard product={product}/>
        <ProductCard product={product}/>
        <ProductCard product={product}/>
        <ProductCard product={product}/>
        <ProductCard product={product}/>
        <ProductCard product={product}/>
        <ProductCard product={product}/>
      </div>
  )
}

export function ProductCard({product}) {
  return (
      <div
          className=" gap-2 p-3 rounded-2xl flex flex-col h-full border shadow-lg cursor-pointer hover:shadow-2xl basis-full sm:basis-[calc(50%-1rem)] md:basis-[calc(33.33%-1rem)] lg:basis-[calc(25%-1rem)]">
        <div className="p-2 relative w-full aspect-square rounded-2xl">
          <Image src={"/capybara_cute.webp"} alt={"product.name"} className={"object-cover rounded-2xl"} fill/>
        </div>
        <div className="px-2 flex flex-col">
          <span className="font-light text-base text-gray-700">Plush</span>
          <span className="font-medium text-lg">Product name</span>
          <StarRating rating={5}/>
        </div>
        <div className="px-2">
          <span className="font-medium">&#8364; 5.22</span>
        </div>
      </div>
  )
}
//
// export function Product({id}) {
//   return (
//       <div className="w-full h-full flex justify-center">
//         <div className="flex gap-8 h-full w-full max-w-7xl">
//           {/* Images */}
//           <div className="basis-[calc(50%-2rem)] flex flex-col gap-4">
//             <div className="w-full aspect-square relative overflow-hidden">
//               <Image src={"/capybara_cute.webp"} alt={"product image"} className="object-contain object-center" fill/>
//             </div>
//             <div className="flex">
//               <div className="relative w-32 h-32 border aspect-square rounded-2xl p-1">
//                 <div className="relative w-full h-full overflow-hidden rounded-xl">
//                   <Image
//                       src={"/capybara_cute.webp"}
//                       alt={"product.name"}
//                       className="object-cover"
//                       fill
//                   />
//                 </div>
//               </div>
//               <div className="relative w-32 h-32 border aspect-square rounded-2xl p-1">
//                 <div className="relative w-full h-full overflow-hidden rounded-xl">
//                   <Image
//                       src={"/capybara_cute.webp"}
//                       alt={"product.name"}
//                       className="object-cover"
//                       fill
//                   />
//                 </div>
//               </div>
//
//             </div>
//           </div>
//           {/*  Desc*/}
//           <div className="basis-[calc(50%-2rem)] flex flex-col gap-4">
//             <div className="flex flex-col">
//               <span className="font-medium text-2xl">Product name</span>
//               {/*<span className=" text-xl text-gray-700">Plush</span>*/}
//               <span className="flex gap-1">
//                 <span>5</span>
//                 <StarRating rating={5}/>
//               </span>
//               <span className="pt-2 font-medium text-xl">&#8364; 5.22</span>
//             </div>
//             {/* divider */}
//             <span className="border-t"></span>
//             <div className="flex flex-col gap-2">
//               <span className="text-base font-medium">Description:</span>
//               <span className="text-base">some description</span>
//             </div>
//           </div>
//         </div>
//       </div>
//   )
// }
//
// export function Product2({ id }) {
//   return (
//       <div className="w-full h-full flex justify-center bg-gray-50 p-8">
//         <div className="flex gap-12 h-full w-full max-w-7xl">
//           {/* Images Section */}
//           <div className="basis-1/2 flex flex-col gap-6">
//             {/* Main Image */}
//             <div className="w-full aspect-square relative overflow-hidden rounded-2xl border bg-white shadow">
//               <Image
//                   src={"/capybara_cute.webp"}
//                   alt={"product image"}
//                   className="object-contain object-center"
//                   fill
//               />
//             </div>
//             {/* Thumbnails */}
//             <div className="flex gap-4">
//               {Array(3)
//                   .fill("/capybara_cute.webp")
//                   .map((src, index) => (
//                       <div
//                           key={index}
//                           className="relative w-24 h-24 border rounded-xl p-1 hover:shadow-lg transition-transform transform hover:scale-105"
//                       >
//                         <div className="relative w-full h-full overflow-hidden rounded-lg">
//                           <Image
//                               src={src}
//                               alt={`Thumbnail ${index + 1}`}
//                               className="object-cover"
//                               fill
//                           />
//                         </div>
//                       </div>
//                   ))}
//             </div>
//           </div>
//
//           {/* Description Section */}
//           <div className="basis-1/2 flex flex-col gap-6">
//             {/* Product Info */}
//             <div className="flex flex-col gap-2">
//               <h1 className="font-bold text-3xl text-gray-800">Product Name</h1>
//               <div className="flex items-center gap-2 text-yellow-500">
//                 <StarRating rating={5} />
//                 <span className="text-gray-600">(5 reviews)</span>
//               </div>
//               <p className="text-gray-700 font-medium text-xl">
//                 &#8364; 5.22
//               </p>
//             </div>
//
//             {/* Divider */}
//             <div className="border-t pt-4"></div>
//
//             {/* Description */}
//             <div className="flex flex-col gap-2">
//               <h2 className="text-lg font-semibold text-gray-800">Description</h2>
//               <p className="text-base text-gray-600 leading-relaxed">
//                 This is a detailed description of the product. Highlight key features, benefits, and any other relevant details to make it appealing to potential buyers.
//               </p>
//             </div>
//
//             {/* Add to Cart Button */}
//             <div className="flex gap-4">
//               <button className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition">
//                 Add to Cart
//               </button>
//               <button className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg shadow-md hover:bg-gray-300 transition">
//                 Wishlist
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//   );
// }
