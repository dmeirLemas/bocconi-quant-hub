
const Footer = () => {
  return (
    <footer className="bg-brand-primary text-white font-gowun">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold font-gloock mb-4">Contact Us</h3>
            <p className="text-brand-secondary mb-2">Università Bocconi</p>
            <p className="text-brand-secondary mb-2">Via Sarfatti, 25</p>
            <p className="text-brand-secondary mb-2">20136 Milano, Italy</p>
            <p className="text-brand-secondary">quantfinance@bocconi.it</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold font-gloock mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/" className="text-brand-secondary hover:text-white transition-colors">Home</a></li>
              <li><a href="https://bocconistudentsquantitativefinance.com/about" className="text-brand-secondary hover:text-white transition-colors">About Us</a></li>
              {/* <li><a href="https://bocconistudentsquantitativefinance.com/apply" className="text-brand-secondary hover:text-white transition-colors">Apply</a></li> */}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold font-gloock mb-4">Follow Us</h3>
            <div className="space-y-3">
              <a href="https://www.instagram.com/bocconistream" target="_blank" rel="noopener noreferrer" className="flex items-center text-brand-secondary hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M7.75 2A5.757 5.757 0 002 7.75v8.5A5.757 5.757 0 007.75 22h8.5A5.757 5.757 0 0022 16.25v-8.5A5.757 5.757 0 0016.25 2h-8.5zM12 7a5 5 0 110 10 5 5 0 010-10zm4.5-2a1.5 1.5 0 110 3 1.5 1.5 0 010-3z"/>
                </svg>
                <span className="ml-2">Instagram</span>
              </a>
            </div>
            <div className="space-y-3">
              <a href="https://www.linkedin.com/company/bocconi-students-quantitative-finance/posts/?feedView=all" target="_blank" rel="noopener noreferrer" className="flex items-center text-brand-secondary hover:text-white transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM.5 8h4V24h-4V8zm7.5 0h3.8v2.17h.05c.53-1 1.83-2.05 3.76-2.05 4.03 0 4.78 2.65 4.78 6.08V24h-4V15.5c0-2.04-.04-4.65-2.84-4.65-2.84 0-3.28 2.21-3.28 4.51V24h-4V8z"/>
              </svg>
              <span className="ml-2">LinkedIn</span>
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-brand-accent mt-8 pt-8 text-center">
          <p className="text-brand-secondary">&copy; 2025 Bocconi Quantitative Finance Association. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
