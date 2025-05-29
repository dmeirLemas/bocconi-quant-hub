
const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <p className="text-gray-300 mb-2">Università Bocconi</p>
            <p className="text-gray-300 mb-2">Via Sarfatti, 25</p>
            <p className="text-gray-300 mb-2">20136 Milano, Italy</p>
            <p className="text-gray-300">quantfinance@bocconi.it</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/" className="text-gray-300 hover:text-white transition-colors">Home</a></li>
              <li><a href="/about" className="text-gray-300 hover:text-white transition-colors">About Us</a></li>
              <li><a href="/apply" className="text-gray-300 hover:text-white transition-colors">Apply</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white transition-colors">LinkedIn</a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">Instagram</a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">Twitter</a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">&copy; 2024 Bocconi Quantitative Finance Association. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
