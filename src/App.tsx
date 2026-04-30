import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Element } from "react-scroll";
import { motion } from "motion/react";
import HeroSection from "./components/HeroSection";
import Header from "./components/Header";
import Features from "./components/Features";
import Products from "./components/Products";
import CTASection from "./components/CTASection";
import Footer from "./components/Footer";
import { MessageCircle } from "lucide-react";
// import WhatsAppFAB from "./components/WhatappFAB";
// import TestSanity from "./pages/TestSanity";

function Home() {
  const whatsappNumber = "+2348033279599";
  const whatsappMessage = "Hi! I'm interested in Voxryn products.";

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900">
      <div className="max-w-7xl mx-auto p-4 text-center">
        {/* <div className="space-y-4 mt-12">
          <Link
            to="/test-sanity"
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
            Test Sanity Connection
            </Link>
            </div> */}

        {/* Header */}
        <Header />

        {/* Hero Section */}
        <Element name="home" className="section">
          <HeroSection />
        </Element>

        {/* Features */}
        <Element name="features" className="section">
          <Features />
        </Element>

        {/* Products */}
        <Element name="products" className="section bg-white">
          <Products />
        </Element>

        {/* About */}
        <Element name="about" className="section bg-white">
          <div className="py-20 px-4 sm:px-6">
            <div className="max-w-7xl mx-auto text-center">
              <h2 className="text-4xl font-bold mb-6">About Us</h2>
              <p className="text-lg text-stone-600 max-w-3xl mx-auto">
                We are dedicated to bringing you the finest organic products,
                carefully sourced and crafted with love.
              </p>
            </div>
          </div>
        </Element>

        {/* Contact */}
        <Element name="contact" className="section">
          <CTASection />
        </Element>

        {/* Footer */}
        <Element name="footer" className="section bg-stone-100">
          <Footer />
        </Element>

        {/* WhatsApp Button */}
        <motion.a
          href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
            whatsappMessage,
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-all hover:scale-110 z-50"
          aria-label="Contact us on WhatsApp"
          initial={{ scale: 0, rotate: 180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          whileHover={{
            scale: 1.1,
            boxShadow: "0 8px 25px rgba(0, 0, 0, 0.2)",
          }}
        >
          <MessageCircle className="w-6 h-6" />
        </motion.a>

        <style>{`
          @keyframes slide-up {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes fade-in {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }

          .animate-slide-up {
            animation: slide-up 0.8s ease-out;
          }

          .animate-fade-in {
            animation: fade-in 0.6s ease-out;
          }
        `}</style>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/test-sanity" element={<TestSanity />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
