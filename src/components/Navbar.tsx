
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronDown, Sun, Moon, Menu, X, LogOut, Leaf } from 'lucide-react';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useToast } from '@/hooks/use-toast';

const Navbar = () => {
  const { setTheme, theme, resolvedTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<{ email: string } | null>(null);
  const [mounted, setMounted] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Check authentication on mount
  useEffect(() => {
    setMounted(true);
    
    const authStatus = localStorage.getItem('isAuthenticated') === 'true';
    setIsAuthenticated(authStatus);
    
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    setUser(null);
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
    navigate('/');
  };

  // Handle theme toggle
  const toggleTheme = () => {
    const currentTheme = resolvedTheme || theme;
    setTheme(currentTheme === 'dark' ? 'light' : 'dark');
  };

  return (
    <header className={cn(
      "fixed top-0 w-full z-40 transition-all duration-200",
      isScrolled 
        ? "bg-white dark:bg-gray-900 shadow-md py-3" 
        : "bg-transparent py-5"
    )}>
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="bg-primary rounded-full p-1.5">
            <Leaf className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="font-bold text-xl">AgriAssist</span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-sm font-medium hover:text-primary transition-colors">
            Home
          </Link>
          <Link to="/seed-guide" className="text-sm font-medium hover:text-primary transition-colors">
            Seed Guide
          </Link>
          <div className="relative group">
            <button className="flex items-center gap-1 text-sm font-medium hover:text-primary transition-colors">
              Features <ChevronDown className="h-4 w-4" />
            </button>
            <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 transition-all duration-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible">
              <div className="py-1">
                <Link to="/expense-tracker" className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700">
                  Expense Tracker
                </Link>
                <Link to="/iot-monitoring" className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700">
                  IoT Monitoring
                </Link>
                <Link to="/weather" className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700">
                  Weather Forecast
                </Link>
              </div>
            </div>
          </div>
          <Link to="/contact" className="text-sm font-medium hover:text-primary transition-colors">
            Contact
          </Link>
        </nav>
        
        {/* Action Buttons */}
        <div className="hidden md:flex items-center gap-2">
          {mounted && (
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleTheme}
              className="rounded-full"
              aria-label={resolvedTheme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          )}
          
          {isAuthenticated ? (
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">{user?.email}</span>
              <Button variant="ghost" size="icon" onClick={handleLogout}>
                <LogOut className="h-5 w-5" />
              </Button>
            </div>
          ) : (
            <>
              <Link to="/login">
                <Button variant="ghost">Login</Button>
              </Link>
              <Link to="/register">
                <Button>Sign Up</Button>
              </Link>
            </>
          )}
        </div>
        
        {/* Mobile Menu */}
        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[280px]">
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between py-4 border-b">
                <Link to="/" className="flex items-center gap-2">
                  <div className="bg-primary rounded-full p-1.5">
                    <Leaf className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <span className="font-bold text-xl">AgriAssist</span>
                </Link>
              </div>
              
              <nav className="flex flex-col gap-1 py-4">
                <Link to="/" className="px-4 py-2 text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md">
                  Home
                </Link>
                <Link to="/seed-guide" className="px-4 py-2 text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md">
                  Seed Guide
                </Link>
                <details className="group w-full">
                  <summary className="px-4 py-2 text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md list-none flex justify-between cursor-pointer">
                    Features <ChevronDown className="h-4 w-4" />
                  </summary>
                  <div className="ml-4 border-l pl-2 mt-1">
                    <Link to="/expense-tracker" className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md">
                      Expense Tracker
                    </Link>
                    <Link to="/iot-monitoring" className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md">
                      IoT Monitoring
                    </Link>
                    <Link to="/weather" className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md">
                      Weather Forecast
                    </Link>
                  </div>
                </details>
                <Link to="/contact" className="px-4 py-2 text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md">
                  Contact
                </Link>
              </nav>
              
              <div className="mt-auto p-4 border-t">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-medium">Switch Theme</span>
                  {mounted && (
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={toggleTheme}
                      className="rounded-full"
                    >
                      <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                      <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                      <span className="sr-only">Toggle theme</span>
                    </Button>
                  )}
                </div>
                
                {isAuthenticated ? (
                  <div className="space-y-2">
                    <div className="text-sm font-medium">{user?.email}</div>
                    <Button className="w-full" variant="outline" onClick={handleLogout}>
                      <LogOut className="h-4 w-4 mr-2" /> Logout
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Link to="/login">
                      <Button className="w-full" variant="outline">Login</Button>
                    </Link>
                    <Link to="/register">
                      <Button className="w-full">Sign Up</Button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Navbar;
