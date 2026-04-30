const Footer = () => {
  return (
    <footer className="bg-stone-900 text-white py-12 px-6">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8">
        <div className="flex flex-col items-center justify-center">
          <div className="flex items-center gap-2 text-xl font-bold">
            <img
              src="/voxryn-logo.jpg"
              alt="Voxryn Logo"
              className="h-16 w-16 object-contain rounded-2xl"
            />
            Voxryn
          </div>
          <p className="text-stone-400">
            Premium organic products for a healthier lifestyle
          </p>
        </div>
        <div className="flex items-center justify-around">
          <div className="flex flex-col items-center justify-center">
            <h4 className="font-bold mb-4">Shop</h4>
            <div className="space-y-2 text-stone-400">
              <div>All Products</div>
              <div>New Arrivals</div>
              <div>Best Sellers</div>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center">
            <h4 className="font-bold mb-4">Company</h4>
            <div className="space-y-2 text-stone-400">
              <div>About Us</div>
              <div>Contact</div>
              <div>Blog</div>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center">
            <h4 className="font-bold mb-4">Follow Us</h4>
            <div className="space-y-2 text-stone-400">
              <div>Instagram</div>
              <div>Facebook</div>
              <div>Twitter</div>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-stone-800 text-center text-stone-400">
        © 2026 Voxryn. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
