"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="fixed top-0 w-full z-50 animate-fadeIn">
      {/* Main Navigation Bar */}
      <div className="bg-[#800000] text-white px-4 py-4 shadow-lg">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            {/* Left Side - University Name */}
            <div className="hidden md:block flex-1">
              <h1 className="text-3xl font-bold text-white animate-slideDown whitespace-nowrap">
                Sorsogon State University
              </h1>
            </div>

            {/* Center - Logo */}
            <div className="flex-1 flex justify-center">
              <div className="w-14 h-14 relative animate-slideDown">
                <Image
                  src="/SSU.png"
                  alt="SSU Logo"
                  width={56}
                  height={56}
                  className="object-contain"
                />
              </div>
            </div>

            {/* Right Side - Desktop Links and Button */}
            <div className="hidden md:flex flex-1 items-center justify-end gap-8">
              <div className="flex items-center gap-8">
                {/* Navigation Links */}
                <Link
                  href="#about"
                  className="text-white text-xl hover:bg-white hover:text-[#800000] px-4 py-2 rounded transition-all duration-300 transform hover:scale-105 animate-slideDown"
                >
                  About
                </Link>

                <Link
                  href="#features"
                  className="text-white text-xl hover:bg-white hover:text-[#800000] px-4 py-2 rounded transition-all duration-300 transform hover:scale-105 animate-slideDown"
                >
                  Features
                </Link>
              </div>

              {/* Get Started Button */}
              <Link
                href="/auth"
                className="bg-white text-[#800000] px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 text-center whitespace-nowrap"
                onClick={() => setIsOpen(false)}
              >
                Get Started
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="md:hidden text-white hover:text-gray-200 transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isOpen && (
            <div className="md:hidden mt-4 pb-4 border-t border-gray-400 animate-slideDown">
              <div className="flex flex-col gap-4 pt-4">
                <Link
                  href="https://sorsu.edu.ph/about-sorsogon-state-university/"
                  className="text-white text-lg hover:bg-white hover:text-[#800000] px-4 py-3 rounded transition-all duration-300 block"
                  onClick={() => setIsOpen(false)}
                >
                  About
                </Link>

                <Link
                  href="#features"
                  className="text-white text-lg hover:bg-white hover:text-[#800000] px-4 py-3 rounded transition-all duration-300 block"
                  onClick={() => setIsOpen(false)}
                >
                  Features
                </Link>
                <Link
                  href="/auth"
                  className="bg-white text-[#800000] px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 text-center"
                  target="_blank"
                  onClick={() => setIsOpen(false)}
                >
                  Get Started
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
