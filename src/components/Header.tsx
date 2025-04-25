import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
    // Implement search functionality
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 animate-fade-in">
          <span className="text-2xl font-bold text-tasty">
            Tasty<span className="text-foreground">AI</span>
          </span>
        </Link>
        
        {/* Desktop: Search Bar */}
        <form 
          onSubmit={handleSearch} 
          className="hidden md:flex relative max-w-sm items-center animate-fade-in"
        >
          <input
            type="text"
            placeholder="Поиск тестов..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 pr-10"
          />
          <button 
            type="submit" 
            className="absolute right-3 text-muted-foreground hover:text-foreground"
          >
            <Search size={18} />
          </button>
        </form>
        
        {/* Desktop: Navigation */}
        <nav className="hidden md:flex items-center gap-1 animate-fade-in">
          <Link 
            to="/tests" 
            className={`nav-link ${isActive('/tests') ? 'text-tasty after:w-full' : ''}`}
          >
            Готовые тесты
          </Link>
          <Link 
            to="/create" 
            className={`nav-link ${isActive('/create') ? 'text-tasty after:w-full' : ''}`}
          >
            Создать тест
          </Link>
          <Link to="/auth">
            <Button 
              variant="outline" 
              className="ml-2 border-tasty text-tasty hover:bg-tasty hover:text-white"
            >
              Авторизация
            </Button>
          </Link>
        </nav>
        
        {/* Mobile: Menu Button */}
        <Button 
          variant="ghost" 
          className="md:hidden"
          onClick={toggleMenu}
        >
          {isMenuOpen ? <X /> : <Menu />}
        </Button>
      </div>
      
      {/* Mobile: Menu */}
      {isMenuOpen && (
        <div className="md:hidden animate-fade-in">
          <div className="container py-4 flex flex-col gap-4">
            <form 
              onSubmit={handleSearch} 
              className="flex relative items-center"
            >
              <input
                type="text"
                placeholder="Поиск тестов..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 pr-10"
              />
              <button 
                type="submit" 
                className="absolute right-3 text-muted-foreground hover:text-foreground"
              >
                <Search size={18} />
              </button>
            </form>
            
            <nav className="flex flex-col items-start gap-3">
              <Link 
                to="/tests" 
                className={`text-lg font-medium ${isActive('/tests') ? 'text-tasty' : 'text-foreground'}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Готовые тесты
              </Link>
              <Link 
                to="/create" 
                className={`text-lg font-medium ${isActive('/create') ? 'text-tasty' : 'text-foreground'}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Создать тест
              </Link>
              <Link 
                to="/auth"
                onClick={() => setIsMenuOpen(false)}
              >
                <Button className="w-full bg-tasty hover:bg-tasty-dark text-white">
                  Авторизация
                </Button>
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
