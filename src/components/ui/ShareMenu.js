// src/components/ui/ShareMenu.jsx
"use client"

import { useState, useRef, useEffect } from 'react';
import { 
  Share2, 
  Copy, 
  Twitter, 
  Facebook, 
  Linkedin, 
  Mail, 
  X 
} from 'lucide-react';
import { shareContent } from '@/utils/documentUtils';

/**
 * Reusable share menu component
 * @param {Object} props - Component props
 * @param {string} props.title - Title of the content to share
 * @param {string} props.url - URL to share (optional, defaults to current URL)
 * @param {string} props.className - Additional classes for the button
 * @param {boolean} props.withText - Whether to show text alongside icon
 * @param {string} props.buttonVariant - Button style variant ('primary', 'outline', 'ghost')
 */
export default function ShareMenu({ 
  title, 
  url, 
  className = "", 
  withText = true,
  buttonVariant = "outline" 
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  // Define button classes based on variant
  const buttonClasses = {
    primary: "btn-primary",
    outline: "btn-outline",
    ghost: "btn-ghost"
  };

  // Handle share action
  const handleShare = (platform) => {
    shareContent({ title, url, platform });
    setIsMenuOpen(false);
  };

  // Close menu when clicking outside
  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsMenuOpen(false);
    }
  };

  // Add/remove event listener
  useEffect(() => {
    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <div className="relative" ref={menuRef}>
      <button 
        className={`${buttonClasses[buttonVariant]} flex cursor-pointer items-center ${className}`}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label="Share"
      >
        <Share2 size={16} className="mr-2" />
        {withText && "Share"}
      </button>

      {isMenuOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 py-1 border border-gray-200">
          <div className="flex justify-between items-center px-4 py-2 border-b border-gray-100">
            <span className="text-sm font-medium">Share via</span>
            <button onClick={() => setIsMenuOpen(false)} className="text-gray-500 cursor-pointer hover:text-gray-700">
              <X size={16} />
            </button>
          </div>
          
          <button 
            onClick={() => handleShare('twitter')} 
            className="w-full cursor-pointer text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
          >
            <Twitter size={16} className="mr-3 text-blue-400" />
            Twitter
          </button>
          
          <button 
            onClick={() => handleShare('facebook')}
            className="w-full cursor-pointer text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
          >
            <Facebook size={16} className="mr-3 text-blue-600" />
            Facebook
          </button>
          
          <button 
            onClick={() => handleShare('linkedin')}
            className="w-full cursor-pointer text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
          >
            <Linkedin size={16} className="mr-3 text-blue-700" />
            LinkedIn
          </button>
          
          <button 
            onClick={() => handleShare('whatsapp')}
            className="w-full cursor-pointer text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
          >
            {/* Custom WhatsApp Icon since it's not in lucide-react */}
            <svg 
              viewBox="0 0 24 24" 
              width="16" 
              height="16" 
              className="mr-3 text-green-600 fill-current"
            >
              <path d="M17.498 14.382c-.301-.15-1.767-.867-2.04-.966-.273-.101-.473-.15-.673.15-.197.295-.771.964-.944 1.162-.175.195-.349.21-.646.075-.3-.15-1.263-.465-2.403-1.485-.888-.795-1.484-1.77-1.66-2.07-.174-.3-.019-.465.13-.615.136-.135.301-.345.451-.523.146-.181.194-.301.297-.496.1-.21.049-.375-.025-.524-.075-.15-.672-1.62-.922-2.206-.24-.584-.487-.51-.672-.51-.172-.015-.371-.015-.571-.015-.2 0-.523.074-.797.359-.273.3-1.045 1.02-1.045 2.475s1.07 2.865 1.219 3.075c.149.195 2.105 3.195 5.1 4.485.714.3 1.27.48 1.704.629.714.227 1.365.195 1.88.121.574-.091 1.767-.721 2.016-1.426.255-.705.255-1.29.18-1.425-.074-.135-.27-.21-.57-.345m-5.446 7.443h-.016c-1.77 0-3.524-.48-5.055-1.38l-.36-.214-3.75.975 1.005-3.645-.239-.375a9.869 9.869 0 0 1-1.516-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.892 6.993c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413" />
            </svg>
            WhatsApp
          </button>
          
          <button 
            onClick={() => handleShare('email')}
            className="w-full cursor-pointer text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
          >
            <Mail size={16} className="mr-3 text-gray-600" />
            Email
          </button>
          
          <button 
            onClick={() => handleShare('copy')}
            className="w-full cursor-pointer text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
          >
            <Copy size={16} className="mr-3 text-gray-600" />
            Copy Link
          </button>
        </div>
      )}
    </div>
  );
}