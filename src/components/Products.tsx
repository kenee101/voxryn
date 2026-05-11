import { ShoppingBag, Star, ChevronLeft, ChevronRight, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
// @ts-ignore
import "swiper/css";
// @ts-ignore
import "swiper/css/navigation";
// @ts-ignore
import "swiper/css/pagination";
import { getProducts } from "../lib/sanity";
import urlFor from "../utils/urlBuilder";
import type { SanityDocument } from "@sanity/client";

// const products = [
//   {
//     id: 1,
//     name: "Organic Olive Oil",
//     price: "$24.99",
//     image:
//       "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=500&h=500&fit=crop",
//     rating: 4.9,
//     description: "Cold-pressed extra virgin",
//   },
//   {
//     id: 2,
//     name: "Raw Honey",
//     price: "$18.99",
//     image:
//       "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=500&h=500&fit=crop",
//     rating: 4.8,
//     description: "Pure & unfiltered",
//   },
//   {
//     id: 3,
//     name: "Herbal Tea Set",
//     price: "$32.99",
//     image:
//       "https://images.unsplash.com/photo-1564890369478-c89ca6d9cda9?w=500&h=500&fit=crop",
//     rating: 5.0,
//     description: "Premium organic blend",
//   },
//   {
//     id: 4,
//     name: "Almond Butter",
//     price: "$15.99",
//     image:
//       "https://images.unsplash.com/photo-1520419684733-5f43147e9d2f?w=500&h=500&fit=crop",
//     rating: 4.7,
//     description: "100% natural",
//   },
//   {
//     id: 5,
//     name: "Breast Milk",
//     price: "$15.99",
//     image:
//       "https://images.unsplash.com/photo-1520419684733-5f43147e9d2f?w=500&h=500&fit=crop",
//     rating: 4.7,
//     description: "100% natural",
//   },
//   {
//     id: 6,
//     name: "Coconut Oil",
//     price: "$15.99",
//     image:
//       "https://images.unsplash.com/photo-1520419684733-5f43147e9d2f?w=500&h=500&fit=crop",
//     rating: 4.7,
//     description: "100% natural",
//   },
// ];

const Products = () => {
  const navigationPrevRef = useRef<HTMLButtonElement>(null);
  const navigationNextRef = useRef<HTMLButtonElement>(null);
  const paginationRef = useRef<HTMLDivElement>(null);
  const [products, setProducts] = useState<SanityDocument[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<SanityDocument | null>(
    null,
  );
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    (async () => {
      const sanityProducts = await getProducts();
      const modifiedProducts = sanityProducts.map((product: SanityDocument) => {
        return {
          ...product,
          image: product.image
            ? // ? urlFor(product.image)?.width(550).height(310)?.url()
              urlFor(product.image)?.width(810).height(1080)?.url()
            : null,
        };
      });
      setProducts(modifiedProducts);
      // console.log(modifiedProducts);
    })();
  }, []);

  const openModal = (product: SanityDocument, index: number) => {
    setSelectedProduct(product);
    setSelectedIndex(index);
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
    document.body.style.overflow = "unset";
  };

  const navigatePrev = () => {
    const newIndex =
      selectedIndex === 0 ? products.length - 1 : selectedIndex - 1;
    setSelectedProduct(products[newIndex]);
    setSelectedIndex(newIndex);
  };

  const navigateNext = () => {
    const newIndex =
      selectedIndex === products.length - 1 ? 0 : selectedIndex + 1;
    setSelectedProduct(products[newIndex]);
    setSelectedIndex(newIndex);
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isModalOpen) return;
      if (e.key === "Escape") closeModal();
      if (e.key === "ArrowLeft") navigatePrev();
      if (e.key === "ArrowRight") navigateNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isModalOpen, selectedIndex]);

  return (
    <section id="products" className="py-20 px-4 sm:px-6 relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Our Products</h2>
          <p className="text-xl text-stone-600">
            Handpicked organic essentials for a healthier you
          </p>
        </div>

        <div className="relative">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            breakpoints={{
              640: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 4,
              },
            }}
            navigation={{
              prevEl: navigationPrevRef.current,
              nextEl: navigationNextRef.current,
            }}
            pagination={{
              clickable: true,
              el: paginationRef.current,
              renderBullet: (_, className) => {
                return `<span class="${className}"></span>`;
              },
            }}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            loop={true}
            className="py-4"
            onInit={(swiper) => {
              // @ts-ignore
              swiper.params.navigation.prevEl = navigationPrevRef.current;
              // @ts-ignore
              swiper.params.navigation.nextEl = navigationNextRef.current;
              // @ts-ignore
              swiper.params.pagination.el = paginationRef.current;
              swiper.navigation.init();
              swiper.navigation.update();
              swiper.pagination.init();
              swiper.pagination.render();
            }}
          >
            {products.map((product, index) => (
              <SwiperSlide key={product._id}>
                <div className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 h-full mx-2">
                  <div
                    className="relative overflow-hidden aspect-square cursor-pointer"
                    onClick={() => openModal(product, index)}
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 right-4 bg-white/90 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1 backdrop-blur-sm">
                      <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                      {product.rating}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-sm font-bold mb-2">{product.name}</h3>
                    <p className="text-stone-600 text-sm mb-4 line-clamp-2">
                      {product.description}
                    </p>
                    <div className="flex items-center justify-around mb-4">
                      <span className="text-2xl font-bold text-emerald-600">
                        {new Intl.NumberFormat("en-NG", {
                          style: "currency",
                          currency: "NGN",
                        }).format(product.price)}
                      </span>
                      <button
                        className="bg-emerald-600 text-white p-3 rounded-full hover:bg-emerald-700 transition-all hover:scale-110 active:scale-95"
                        aria-label={`Add ${product.name} to cart`}
                        onClick={() => openModal(product, index)}
                      >
                        <ShoppingBag className="w-5 h-5" />
                      </button>
                    </div>
                    {/* <span className="text-md font-bold text-emerald-600">
                      {product.stock} products left
                    </span> */}
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Navigation Buttons */}
          <button
            ref={navigationPrevRef}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-emerald-600 hover:bg-emerald-50 transition-colors -ml-4 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
            aria-label="Previous product"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            ref={navigationNextRef}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-emerald-600 hover:bg-emerald-50 transition-colors -mr-4 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
            aria-label="Next product"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Pagination */}
          <div className="mt-8 flex justify-center space-x-4">
            <div ref={paginationRef} className="swiper-pagination" />
          </div>
        </div>
      </div>

      {/* Image Modal */}
      {isModalOpen && selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/90 backdrop-blur-sm"
            onClick={closeModal}
          />

          {/* Modal Content */}
          <div className="relative z-10 w-full h-full flex flex-col items-center justify-center p-4">
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-2 right-4 z-20 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full transition-colors"
              aria-label="Close modal"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Navigation Buttons */}
            <button
              onClick={navigatePrev}
              className="absolute left-4 z-20 bg-white/10 hover:bg-white/20 text-white p-4 rounded-full transition-colors"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>
            <button
              onClick={navigateNext}
              className="absolute right-4 z-20 bg-white/10 hover:bg-white/20 text-white p-4 rounded-full transition-colors"
              aria-label="Next image"
            >
              <ChevronRight className="w-8 h-8" />
            </button>

            {/* Image */}
            <img
              src={selectedProduct.image}
              alt={selectedProduct.name}
              className="max-w-full max-h-[85vh] object-contain rounded-lg"
            />

            {/* Product Info */}
            <div className="mt-4 text-center text-white">
              <h3 className="text-2xl font-bold mb-2">
                {selectedProduct.name}
              </h3>
              <p className="text-stone-300 text-sm mb-2 line-clamp-2 max-w-2xl mx-auto">
                {selectedProduct.description}
              </p>
              <span className="text-xl font-semibold text-emerald-400">
                {new Intl.NumberFormat("en-NG", {
                  style: "currency",
                  currency: "NGN",
                }).format(selectedProduct.price)}
              </span>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .swiper-pagination-bullet {
          background: rgba(5, 150, 105, 0.3); /* emerald-600 with 30% opacity */
          width: 10px;
          height: 10px;
          opacity: 1;
          transition: all 0.3s ease;
        }
        
        .swiper-pagination-bullet-active {
          background: #059669; /* emerald-600 */
          transform: scale(1.2);
        }
      `}</style>
    </section>
  );
};

export default Products;
