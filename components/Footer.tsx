import React from 'react';
import Link from 'next/link';
import { Facebook, Twitter, Instagram, Youtube, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Newdream Car</h3>
            <p className="text-gray-400 mb-4">Find your perfect car with the most comprehensive car search platform.</p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Youtube size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/new-cars" className="text-gray-400 hover:text-white transition-colors">New Cars</Link></li>
              <li><Link href="/used-cars" className="text-gray-400 hover:text-white transition-colors">Used Cars</Link></li>
              <li><Link href="/sell-car" className="text-gray-400 hover:text-white transition-colors">Sell Your Car</Link></li>
              <li><Link href="/compare" className="text-gray-400 hover:text-white transition-colors">Compare Cars</Link></li>
              <li><Link href="/news" className="text-gray-400 hover:text-white transition-colors">Automotive News</Link></li>
              <li><Link href="/about" className="text-gray-400 hover:text-white transition-colors">About Us</Link></li>
            </ul>
          </div>
          
          {/* Popular Cars */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Popular Cars</h3>
            <ul className="space-y-2">
              <li><Link href="/cars/tata-nexon" className="text-gray-400 hover:text-white transition-colors">Tata Nexon</Link></li>
              <li><Link href="/cars/maruti-baleno" className="text-gray-400 hover:text-white transition-colors">Maruti Baleno</Link></li>
              <li><Link href="/cars/hyundai-creta" className="text-gray-400 hover:text-white transition-colors">Hyundai Creta</Link></li>
              <li><Link href="/cars/mahindra-xuv700" className="text-gray-400 hover:text-white transition-colors">Mahindra XUV700</Link></li>
              <li><Link href="/cars/kia-seltos" className="text-gray-400 hover:text-white transition-colors">Kia Seltos</Link></li>
              <li><Link href="/cars/toyota-fortuner" className="text-gray-400 hover:text-white transition-colors">Toyota Fortuner</Link></li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="mr-2 h-5 w-5 text-gray-400 flex-shrink-0 mt-0.5" />
                <span className="text-gray-400">123 Car Street, Auto City, 12345</span>
              </li>
              <li className="flex items-center">
                <Phone className="mr-2 h-5 w-5 text-gray-400" />
                <span className="text-gray-400">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center">
                <Mail className="mr-2 h-5 w-5 text-gray-400" />
                <span className="text-gray-400">info@NewdreamCar.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Bottom Footer */}
        <div className="pt-8 border-t border-gray-800 text-sm text-gray-400">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p>&copy; 2025 NewdreamCar. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
              <Link href="/sitemap" className="hover:text-white transition-colors">Sitemap</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}