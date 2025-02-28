
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-green-50 dark:bg-green-900/20 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-500 to-green-600 flex items-center justify-center">
                <span className="text-white font-bold text-lg">A</span>
              </div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-green-500">
                AgriAssist
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-300">
              Empowering farmers with smart agriculture solutions for better yields and sustainable farming.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-600 hover:text-primary dark:text-gray-300 dark:hover:text-primary transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-600 hover:text-primary dark:text-gray-300 dark:hover:text-primary transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-600 hover:text-primary dark:text-gray-300 dark:hover:text-primary transition-colors">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          <div>
            <h6 className="text-lg font-semibold mb-4">Quick Links</h6>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-600 hover:text-primary dark:text-gray-300 dark:hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/seed-guide" className="text-gray-600 hover:text-primary dark:text-gray-300 dark:hover:text-primary transition-colors">
                  Seed Guide
                </Link>
              </li>
              <li>
                <Link to="/expense-tracker" className="text-gray-600 hover:text-primary dark:text-gray-300 dark:hover:text-primary transition-colors">
                  Expense Tracker
                </Link>
              </li>
              <li>
                <Link to="/weather" className="text-gray-600 hover:text-primary dark:text-gray-300 dark:hover:text-primary transition-colors">
                  Weather Forecast
                </Link>
              </li>
              <li>
                <Link to="/iot-monitoring" className="text-gray-600 hover:text-primary dark:text-gray-300 dark:hover:text-primary transition-colors">
                  IoT Monitoring
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h6 className="text-lg font-semibold mb-4">Resources</h6>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-600 hover:text-primary dark:text-gray-300 dark:hover:text-primary transition-colors">
                  Crop Guidelines
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-primary dark:text-gray-300 dark:hover:text-primary transition-colors">
                  Pest Control
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-primary dark:text-gray-300 dark:hover:text-primary transition-colors">
                  Market Trends
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-primary dark:text-gray-300 dark:hover:text-primary transition-colors">
                  Expert Advice
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-primary dark:text-gray-300 dark:hover:text-primary transition-colors">
                  Community Forum
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h6 className="text-lg font-semibold mb-4">Contact Us</h6>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin size={20} className="text-primary mt-0.5" />
                <span className="text-gray-600 dark:text-gray-300">123 Farm Road, Agriville, Country</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={20} className="text-primary" />
                <span className="text-gray-600 dark:text-gray-300">+1 (123) 456-7890</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={20} className="text-primary" />
                <span className="text-gray-600 dark:text-gray-300">support@agriassist.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
          <p className="text-center text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} AgriAssist. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
