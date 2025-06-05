import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about' },
    { name: 'Apply', href: '/apply' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-gray-900 shadow-lg sticky top-0 z-50 border-b border-gray-800">
      <nav className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
      <div className="flex justify-between items-center h-24">
        <Link to="/" className="flex items-center">
        {/* Enhanced Logo */}
        <div className="bg-gradient-to-br from-gray-600 to-gray-800 text-white px-5 py-3 rounded-lg font-bold text-2xl shadow-md">
          QFA
        </div>
        <div className="ml-5">
          <h1 className="text-3xl font-extrabold text-blue-300 leading-tight">
          Bocconi Quant Finance
          </h1>
          <p className="text-base font-medium text-gray-300">
          Student Association
          </p>
        </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
        {navigation.map((item) => (
          <Link
          key={item.name}
          to={item.href}
          className={`px-4 py-2 rounded-lg text-lg font-medium transition-all duration-200 ${
            isActive(item.href)
            ? 'bg-blue-700 text-white shadow'
            : 'text-blue-300 hover:bg-blue-700 hover:text-white'
          }`}
          >
          {item.name}
          </Link>
        ))}
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="text-blue-300 hover:text-white focus:outline-none focus:text-white transition duration-150 ease-in-out p-2"
        >
          {isMenuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden">
        <div className="px-4 pt-2 pb-3 space-y-2 bg-blue-900 border-t border-blue-800">
          {navigation.map((item) => (
          <Link
            key={item.name}
            to={item.href}
            className={`block px-3 py-2 rounded-md text-lg font-medium transition-colors duration-200 ${
            isActive(item.href)
              ? 'bg-blue-700 text-white'
              : 'text-blue-300 hover:bg-blue-700 hover:text-white'
            }`}
            onClick={() => setIsMenuOpen(false)}
          >
            {item.name}
          </Link>
          ))}
        </div>
        </div>
      )}
      </nav>
    </header>
  );
};

export default Header;
