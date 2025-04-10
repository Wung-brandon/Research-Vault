"use client";

import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import {
  Share2,
  Copy,
  Twitter,
  Facebook,
  Linkedin,
  Mail,
  X,
  MessageCircle, // Import WhatsApp icon
} from "lucide-react";
import { shareContent } from "@/utils/documentUtils";

export default function ShareMenu({
  title,
  url,
  className = "",
  withText = true,
  buttonVariant = "outline",
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const [dropdownPosition, setDropdownPosition] = useState({});

  const buttonClasses = {
    primary: "btn-primary",
    outline: "btn-outline",
    ghost: "btn-ghost",
  };

  const handleShare = (platform) => {
    if (platform === "whatsapp") {
      const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(
        `${title} - ${url}`
      )}`;
      window.open(whatsappUrl, "_blank");
    } else {
      shareContent({ title, url, platform });
    }
    setIsMenuOpen(false);
  };

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  const calculateDropdownPosition = (button) => {
    const rect = button.getBoundingClientRect();
    setDropdownPosition({
      top: rect.bottom + window.scrollY,
      left: rect.left + window.scrollX,
    });
  };

  const handleButtonClick = (event) => {
    setIsMenuOpen(!isMenuOpen);
    calculateDropdownPosition(event.currentTarget);
  };

  return (
    <div className="relative">
      <button
        className={`${buttonClasses[buttonVariant]} flex cursor-pointer items-center ${className}`}
        onClick={handleButtonClick}
        aria-label="Share"
      >
        <Share2 size={16} className="mr-2" />
        {withText && "Share"}
      </button>

      {isMenuOpen &&
        createPortal(
          <div
            ref={menuRef}
            style={{
              position: "absolute",
              top: dropdownPosition.top,
              left: dropdownPosition.left,
              zIndex: 1000,
            }}
            className="mt-2 w-48 bg-white rounded-md shadow-lg py-1 border border-gray-200"
          >
            <div className="flex justify-between items-center px-4 py-2 border-b border-gray-100">
              <span className="text-sm font-medium">Share via</span>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="text-gray-500 cursor-pointer hover:text-gray-700"
              >
                <X size={16} />
              </button>
            </div>

            <button
              onClick={() => handleShare("twitter")}
              className="w-full cursor-pointer text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
            >
              <Twitter size={16} className="mr-3 text-blue-400" />
              Twitter
            </button>

            <button
              onClick={() => handleShare("facebook")}
              className="w-full cursor-pointer text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
            >
              <Facebook size={16} className="mr-3 text-blue-600" />
              Facebook
            </button>

            <button
              onClick={() => handleShare("linkedin")}
              className="w-full cursor-pointer text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
            >
              <Linkedin size={16} className="mr-3 text-blue-700" />
              LinkedIn
            </button>

            <button
              onClick={() => handleShare("email")}
              className="w-full cursor-pointer text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
            >
              <Mail size={16} className="mr-3 text-gray-600" />
              Email
            </button>

            <button
              onClick={() => handleShare("whatsapp")}
              className="w-full cursor-pointer text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
            >
              <MessageCircle size={16} className="mr-3 text-green-500" />
              WhatsApp
            </button>

            <button
              onClick={() => handleShare("copy")}
              className="w-full cursor-pointer text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
            >
              <Copy size={16} className="mr-3 text-gray-600" />
              Copy Link
            </button>
          </div>,
          document.body
        )}
    </div>
  );
}