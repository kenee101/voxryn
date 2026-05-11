import { useState, useEffect } from "react";
import { getProducts } from "../lib/sanity";
import urlFor from "../utils/urlBuilder";
import type { SanityDocument } from "@sanity/client";

const FeaturedProducts = () => {
  const [products, setProducts] = useState<SanityDocument[]>([]);

  useEffect(() => {
    (async () => {
      const sanityProducts = await getProducts();
      // Take first 2 products
      const firstTwoProducts = [sanityProducts[2], sanityProducts[4]];
      const featuredProducts = firstTwoProducts.map(
        (product: SanityDocument) => {
          return {
            ...product,
            image: product.image
              ? urlFor(product.image)?.width(400).height(400)?.url()
              : null,
          };
        },
      );
      setProducts(featuredProducts);
    })();
  }, []);

  return (
    <section className="py-12 bg-linear-to-b from-stone-50 to-white md:hidden">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-2">Featured Picks</h2>
          <p className="text-stone-600 text-sm">Products just for you</p>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
            >
              <div className="relative aspect-square">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-3">
                <h3 className="text-sm font-bold mb-1 truncate">
                  {product.name}
                </h3>
                <p className="text-emerald-600 font-semibold text-sm">
                  {new Intl.NumberFormat("en-NG", {
                    style: "currency",
                    currency: "NGN",
                  }).format(product.price)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
