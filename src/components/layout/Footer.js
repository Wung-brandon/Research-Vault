
// components/layout/Footer.js
import Link from 'next/link';
import { Book, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-8">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <Book size={24} className="text-blue-400" />
              <span className="ml-2 text-xl font-bold">FHS Research Library</span>
            </div>
            <p className="text-gray-400 mb-4">
              Imagine a vibrant digital repository, not just storing, but meticulously curating the intellectual endeavors of our student scholars across the diverse landscape of academic disciplines. This isn't merely an archive; it's a dynamic testament to inquiry and discovery, a digital library meticulously designed to safeguard the burgeoning insights and rigorous research of each generation. By centralizing these scholarly works, we forge a powerful conduit for knowledge dissemination, ensuring that the fruits of academic exploration are readily accessible to current and future learners. More than that, this initiative actively cultivates and preserves our institution's academic legacy, building a rich tapestry of intellectual achievement that will inspire and inform for years to come.
            </p>
            <div className="flex space-x-4">
              {/* Social icons would go here */}
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              {/* <li>
                <Link href="/research" className="text-gray-400 hover:text-white transition-colors">
                  Research Works
                </Link>
              </li> */}
              <li>
                <Link href="/departments" className="text-gray-400 hover:text-white transition-colors">
                  Find Thesis
                </Link>
              </li>
              <li>
                <Link href="/research" className="text-gray-400 hover:text-white transition-colors">
                  Find Publication
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <Mail size={16} className="mr-2 text-gray-400" />
                <span className="text-gray-400">support@fhsresearchlibrary.edu</span>
              </li>
              <li className="flex items-center">
                <Phone size={16} className="mr-2 text-gray-400" />
                <span className="text-gray-400">(+237) 676325938</span>
              </li>
              <li className="flex items-center">
                <MapPin size={16} className="mr-2 text-gray-400" />
                <span className="text-gray-400">University Campus, Faculty Of Health Sciences</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} FHS Research Library. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

