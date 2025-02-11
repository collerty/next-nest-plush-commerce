import {ProductCard} from './product-card'
import {Product} from "@/lib/types";
import {ApiResponse} from "@/lib/actions";

export async function ProductCards({getProducts}: {getProducts: () => Promise<ApiResponse<Product[]>>}) {
    const response = await getProducts();
    const products = response.data;
  return (
      <div className="mx-auto py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

          {products ? products.map(product => (
              <ProductCard key={product.id} product={product} />
          )) : <div></div>}
        </div>
      </div>
  )
}
