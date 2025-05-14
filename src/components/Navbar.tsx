
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  return (
    <header 
      className={cn(
        'fixed top-0 left-0 w-full z-50 transition-all duration-300 py-4 px-6 md:px-10 lg:px-20',
        scrolled ? 'bg-portfolio-dark/90 backdrop-blur-md shadow-lg' : 'bg-transparent'
      )}
    >
      <nav className="max-w-7xl mx-auto flex justify-between items-center">
        <a href="#hero" className="text-2xl font-bold text-portfolio-light">
          Portfolio<span className="text-portfolio-teal">.</span>
        </a>

        {/* Desktop navigation */}
        <ul className="hidden md:flex space-x-8">
          {['About', 'Projects', 'Skills', 'Contact'].map((item) => (
            <li key={item}>
              <a 
                href={`#${item.toLowerCase()}`}
                className="text-portfolio-light hover:text-portfolio-teal transition-colors duration-300"
              >
                {item}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile menu button */}
        <button 
          onClick={toggleMenu} 
          className="md:hidden text-portfolio-light hover:text-portfolio-teal"
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile navigation */}
        <div className={cn(
          'fixed inset-0 bg-portfolio-dark/95 z-50 flex flex-col items-center justify-center md:hidden transform transition-transform duration-300',
          isOpen ? 'translate-x-0' : 'translate-x-full'
        )}>
          <button 
            onClick={closeMenu} 
            className="absolute top-6 right-6 text-portfolio-light hover:text-portfolio-teal"
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
          <ul className="flex flex-col space-y-8 text-center">
            {['About', 'Projects', 'Skills', 'Contact'].map((item) => (
              <li key={item} className="text-xl">
                <a 
                  href={`#${item.toLowerCase()}`}
                  className="text-portfolio-light hover:text-portfolio-teal transition-colors duration-300"
                  onClick={closeMenu}
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
