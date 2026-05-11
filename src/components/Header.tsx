import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-scroll";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const whatsappNumber = "+2348033279599";
  const whatsappMessage = "Hi! I'm interested in Voxryn products.";

  const navItems = [
    { id: "home", label: "Home" },
    { id: "features", label: "Features" },
    { id: "products", label: "Products" },
    { id: "about", label: "About" },
    // { id: "contact", label: "Contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      if (isMenuOpen) setIsMenuOpen(false);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMenuOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-2xl shadow-sm py-3"
            : "bg-transparent py-5"
        } ${isMenuOpen ? "bg-white/95 backdrop-blur-2xl" : ""}`}
      >
        <nav className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <Link
            to="home"
            spy={true}
            smooth={true}
            offset={-80}
            duration={500}
            className="flex items-center gap-2 text-2xl font-bold cursor-pointer"
          >
            <img
              src="/voxryn-logo.jpg"
              alt="Voxryn Logo"
              className="h-32 w-32 md:h-24 md:w-24 object-contain rounded-xl"
            />
            <span className="hidden sm:block text-emerald-700">Voxryn</span>
          </Link>

          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            {navItems.map((item) => (
              <Link
                key={item.id}
                activeClass="text-emerald-600 font-medium"
                to={item.id}
                spy={true}
                smooth={true}
                offset={-80}
                duration={500}
                onClick={() => setIsMenuOpen(false)}
                className="cursor-pointer text-gray-700 hover:text-emerald-600 transition-colors relative after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:bg-emerald-600 after:transition-all after:duration-300 after:w-0 hover:after:w-full text-sm lg:text-base"
              >
                {item.label}
              </Link>
            ))}
            <a
              href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
                whatsappMessage,
              )}`}
              className="bg-emerald-600 text-white px-5 py-2 rounded-full hover:bg-emerald-700 transition-all hover:scale-105 active:scale-95 cursor-pointer text-sm lg:text-base font-medium"
            >
              Shop Now
            </a>
          </div>

          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>
      </header>

      {/* Mobile Menu Backdrop */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed top-0 right-0 h-full w-64 bg-white z-50 md:hidden shadow-xl transform transition-transform duration-300 ease-in-out">
          <div className="p-6">
            <div className="flex items-center justify-between mb-8">
              <span className="text-xl font-bold text-emerald-700">Menu</span>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                aria-label="Close menu"
              >
                <X size={24} />
              </button>
            </div>
            <div className="flex flex-col gap-4">
              {navItems.map((item) => (
                <Link
                  key={item.id}
                  activeClass="text-emerald-600 font-medium"
                  to={item.id}
                  spy={true}
                  smooth={true}
                  offset={-80}
                  duration={500}
                  onClick={() => setIsMenuOpen(false)}
                  className="cursor-pointer text-gray-700 hover:text-emerald-600 transition-colors py-2 text-lg"
                >
                  {item.label}
                </Link>
              ))}
              <a
                href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
                  whatsappMessage,
                )}`}
                className="bg-emerald-600 text-white px-6 py-3 rounded-full hover:bg-emerald-700 transition-all hover:scale-105 active:scale-95 cursor-pointer text-center font-medium mt-4"
              >
                Shop Now
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
