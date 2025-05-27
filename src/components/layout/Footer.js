
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
              <span className="ml-2 text-xl font-bold">ResearchVault</span>
            </div>
            <p className="text-gray-400 mb-4">
              A digital library housing student research works from various academic fields, 
              making knowledge accessible and preserving academic legacy.
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
                <span className="text-gray-400">support@researchvault.edu</span>
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
          <p>&copy; {new Date().getFullYear()} ResearchVault. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

