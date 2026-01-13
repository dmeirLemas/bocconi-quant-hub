import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, LogIn, LogOut } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about' },
    { name: 'Articles', href: '/articles' },
    { name: 'Newsletters', href: '/newsletters' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-brand-primary shadow-lg sticky top-0 z-50 border-b border-brand-accent">
      <nav className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
      <div className="flex justify-between items-center h-24">
        <Link to="/" className="flex items-center">
        {/* Logo */}
        <div className="flex items-center">
          <img 
            src="/lovable-uploads/6a9961c2-824e-4823-840b-77d534b9c6fa.png" 
            alt="BSQF Logo" 
            className="h-32 w-auto"
          />
        </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
        {navigation.map((item) => (
          <Link
          key={item.name}
          to={item.href}
          className={`px-4 py-2 rounded-lg text-lg font-medium font-gowun transition-all duration-200 ${
            isActive(item.href)
            ? 'bg-brand-accent text-white shadow'
            : 'text-brand-secondary hover:bg-brand-accent hover:text-white'
          }`}
          >
          {item.name}
          </Link>
        ))}
        <a
          href="https://docs.google.com/forms/d/e/1FAIpQLScWvrCy3SdDtJuMCow2eCqWgmUmr5jYjrvhZtD3ov60mi38CQ/viewform?usp=sharing&ouid=108960923037342736970"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-brand-accent hover:bg-brand-secondary text-white hover:text-brand-primary font-semibold font-gowun px-6 py-2 rounded-lg transition-all duration-200 shadow"
        >
          Apply
        </a>
        {user ? (
          <Button
            variant="ghost"
            onClick={handleSignOut}
            className="text-brand-secondary hover:bg-brand-accent hover:text-white"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        ) : (
          <Button
            variant="ghost"
            onClick={() => navigate('/auth')}
            className="text-brand-secondary hover:bg-brand-accent hover:text-white"
          >
            <LogIn className="h-4 w-4 mr-2" />
            Login
          </Button>
        )}
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="text-brand-secondary hover:text-white focus:outline-none focus:text-white transition duration-150 ease-in-out p-2"
        >
          {isMenuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden">
        <div className="px-4 pt-2 pb-3 space-y-2 bg-brand-accent border-t border-brand-primary">
          {navigation.map((item) => (
          <Link
            key={item.name}
            to={item.href}
            className={`block px-3 py-2 rounded-md text-lg font-medium font-gowun transition-colors duration-200 ${
            isActive(item.href)
              ? 'bg-brand-primary text-white'
              : 'text-brand-secondary hover:bg-brand-primary hover:text-white'
            }`}
            onClick={() => setIsMenuOpen(false)}
          >
            {item.name}
          </Link>
          ))}
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLScWvrCy3SdDtJuMCow2eCqWgmUmr5jYjrvhZtD3ov60mi38CQ/viewform?usp=sharing&ouid=108960923037342736970"
            target="_blank"
            rel="noopener noreferrer"
            className="block px-3 py-2 rounded-md text-lg font-medium font-gowun bg-brand-primary text-white hover:bg-brand-secondary hover:text-brand-primary transition-colors duration-200"
            onClick={() => setIsMenuOpen(false)}
          >
            Apply
          </a>
          {user ? (
            <button
              onClick={() => {
                handleSignOut();
                setIsMenuOpen(false);
              }}
              className="block w-full text-left px-3 py-2 rounded-md text-lg font-medium font-gowun text-brand-secondary hover:bg-brand-primary hover:text-white transition-colors duration-200"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/auth"
              className="block px-3 py-2 rounded-md text-lg font-medium font-gowun text-brand-secondary hover:bg-brand-primary hover:text-white transition-colors duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              Login
            </Link>
          )}
        </div>
        </div>
      )}
      </nav>
    </header>
  );
};

export default Header;
