import Link from 'next/link';
import { Instagram, Facebook, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-green-50 to-yellow-50 border-t border-teddy-green/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-teddy-green to-teddy-gold bg-clip-text text-transparent mb-4">
              Teddy Decor
            </h3>
            <p className="text-gray-600 mb-4 max-w-md">
              Creating unforgettable moments through stunning event decor and meticulous planning.
              Your vision, brought to life with creativity and precision.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="p-2 bg-white rounded-full hover:bg-green-100 transition-colors shadow-sm">
                <Instagram className="w-5 h-5 text-teddy-green" />
              </a>
              <a href="#" className="p-2 bg-white rounded-full hover:bg-green-100 transition-colors shadow-sm">
                <Facebook className="w-5 h-5 text-teddy-green" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href="/services" className="text-gray-600 hover:text-teddy-green transition-colors">Services</Link></li>
              <li><Link href="/process" className="text-gray-600 hover:text-teddy-green transition-colors">Our Process</Link></li>
              <li><Link href="/about" className="text-gray-600 hover:text-teddy-green transition-colors">About</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-center text-gray-600">
                <Mail className="w-4 h-4 mr-2 text-teddy-green" />
                <a href="mailto:yonigoteddy@gmail.com" className="text-sm hover:text-teddy-green transition-colors">yonigoteddy@gmail.com</a>
              </li>
              <li className="flex items-center text-gray-600">
                <Phone className="w-4 h-4 mr-2 text-teddy-green" />
                <a href="tel:+12067392365" className="text-sm hover:text-teddy-green transition-colors">(206) 739-2365</a>
              </li>
              <li className="flex items-start text-gray-600">
                <MapPin className="w-4 h-4 mr-2 text-teddy-green mt-1" />
                <span className="text-sm">www.teddydecor.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-teddy-green-200 text-center text-gray-600 text-sm">
          <p>&copy; {new Date().getFullYear()} Teddy Decor. All rights reserved. Creating memories, one detail at a time.</p>
        </div>
      </div>
    </footer>
  );
}
