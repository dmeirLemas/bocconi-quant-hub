
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
              <a href="#" className="flex items-center text-gray-300 hover:text-white transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM.5 8h4V24h-4V8zm7.5 0h3.8v2.17h.05c.53-1 1.83-2.05 3.76-2.05 4.03 0 4.78 2.65 4.78 6.08V24h-4V15.5c0-2.04-.04-4.65-2.84-4.65-2.84 0-3.28 2.21-3.28 4.51V24h-4V8z"/>
              </svg>
              <span className="ml-2">LinkedIn</span>
              </a>
              <a href="#" className="flex items-center text-gray-300 hover:text-white transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 2A3.75 3.75 0 0 0 4 7.75v8.5A3.75 3.75 0 0 0 7.75 20h8.5A3.75 3.75 0 0 0 20 16.25v-8.5A3.75 3.75 0 0 0 16.25 4h-8.5zM12 7a5 5 0 1 1 0 10a5 5 0 0 1 0-10zm0 2a3 3 0 1 0 0 6a3 3 0 0 0 0-6zm4.5-3a1.5 1.5 0 1 1 0 3a1.5 1.5 0 0 1 0-3z"/>
              </svg>
              <span className="ml-2">Instagram</span>
              </a>
              <a href="#" className="flex items-center text-gray-300 hover:text-white transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.954 4.569c-.885.392-1.83.656-2.825.775a4.932 4.932 0 0 0 2.163-2.723c-.951.555-2.005.959-3.127 1.184a4.916 4.916 0 0 0-8.38 4.482c-4.083-.2-7.698-2.158-10.126-5.134a4.822 4.822 0 0 0-.666 2.475 4.917 4.917 0 0 0 2.188 4.096 4.903 4.903 0 0 1-2.228-.616v.061a4.923 4.923 0 0 0 3.946 4.827 4.996 4.996 0 0 1-2.224.085 4.936 4.936 0 0 0 4.604 3.417 9.867 9.867 0 0 1-6.102 2.104c-.395 0-.786-.023-1.17-.067a13.945 13.945 0 0 0 7.548 2.212c9.058 0 14.01-7.508 14.01-14.01 0-.213-.005-.425-.014-.636a10.012 10.012 0 0 0 2.46-2.548l-.047-.02z"/>
              </svg>
              <span className="ml-2">Twitter</span>
              </a>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">&copy; 2025 Bocconi Quantitative Finance Association. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
