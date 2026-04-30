import { ArrowRight, Star } from "lucide-react";
import photo from "../assets/photo_2026-04-30_10-03-20.jpg";

const HeroSection = () => {
  return (
    <section className="pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6 animate-slide-up">
          <div className="inline-block px-4 py-2 bg-emerald-50 rounded-full text-emerald-700 text-sm font-medium">
            🌿 Pure & Natural
          </div>
          <h1 className="text-5xl md:text-6xl font-bold leading-tight">
            Nourish Your Body with{" "}
            <span className="bg-linear-to-r from-emerald-600 to-teal-800 bg-clip-text text-transparent">
              Organic Goodness
            </span>
          </h1>
          <p className="text-xl text-stone-600">
            Discover premium organic products that bring nature's finest to your
            table. Health starts here.
          </p>
          <div className="flex gap-4 pt-4 justify-center">
            <button className="bg-emerald-600 text-white px-8 py-4 rounded-full hover:bg-emerald-700 transition-all hover:scale-105 flex items-center gap-2">
              Explore Products <ArrowRight className="w-5 h-5" />
            </button>
            <button className="border-2 border-stone-300 px-8 py-4 rounded-full hover:border-emerald-600 hover:text-emerald-600 transition-all">
              Learn More
            </button>
          </div>
        </div>

        <div className="relative animate-fade-in">
          <div className="absolute -top-10 -right-10 w-72 h-72 bg-emerald-100 rounded-full blur-3xl opacity-50"></div>
          <div className="relative bg-white rounded-3xl p-8 shadow-xl">
            <img
              // src="https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=600&h=600&fit=crop"
              src={photo}
              alt="Organic product"
              className="w-full h-full object-cover rounded-2xl"
              loading="lazy"
              decoding="async"
              fetchPriority="high"
            />
            <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                  <Star className="w-6 h-6 text-emerald-600 fill-emerald-600" />
                </div>
                <div>
                  <div className="font-bold text-2xl">4.8</div>
                  <div className="text-sm text-stone-600">Customer Rating</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
