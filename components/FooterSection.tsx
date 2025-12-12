"use client";

import { Facebook, Twitter, Github, Mail } from "lucide-react";
import Link from "next/link";

export default function FooterSection() {
  return (
    <footer className="bg-[#800000] text-white py-16 mt-20">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-4 gap-15">
        {/* AUTHOR */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Author</h3>
          <p className="text-lg text-gray-200 leading-relaxed">
            Mark Julius P. Bongalbal <br />
            Michaela Deticio <br />
            Lorelyn Habal
          </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-3">Developer</h3>
          <p className="text-lg text-gray-200 leading-relaxed">
            Mark Julius P. Bongalbal
          </p>
        </div>

        {/* ACKNOWLEDGEMENT */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Acknowledgement</h3>
          <p className="text-lg text-gray-200 leading-relaxed">
            We would like to acknowledge the support and guidance of Sorsogon
            State University in the development of the AskSorSU AI assistant.
          </p>
        </div>

        {/* SOCIAL MEDIA */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Social Media</h3>
          <div className="text-lg flex flex-col space-y-3 text-gray-200">
            <Link
              href="https://www.facebook.com/SorSUAdmissionServicesUnit"
              target="_blank"
              className="flex items-center gap-2 hover:text-gray-100 transition"
            >
              <Facebook size={18} />
              Facebook
            </Link>

            <Link
              href="https://twitter.com"
              target="_blank"
              className="flex items-center gap-2 hover:text-gray-100 transition"
            >
              <Twitter size={18} />
              Twitter / X
            </Link>

            <Link
              href="https://github.com"
              target="_blank"
              className="flex items-center gap-2 hover:text-gray-100 transition"
            >
              <Github size={18} />
              GitHub
            </Link>

            <Link
              href="mailto:send2hire.mark@gmail.com"
              target="_blank"
              className="flex items-center gap-2 hover:text-gray-100 transition"
            >
              <Mail size={18} />
              Email
            </Link>
          </div>
        </div>
      </div>

      {/* RESOURCES */}
      <div className="max-w-6xl mx-auto px-6 mt-14 border-t border-white/20 pt-10">
        <h3 className="text-xl font-semibold mb-3">Resources</h3>
        <ul className="text-gray-200 space-y-2">
          <li>
            <Link href="/docs" className="hover:text-white transition">
              Documentation
            </Link>
          </li>
          <li>
            <Link href="/updates" className="hover:text-white transition">
              System Updates
            </Link>
          </li>
          <li>
            <Link href="/support" className="hover:text-white transition">
              Support
            </Link>
          </li>
          <li>
            <Link href="/privacy" className="hover:text-white transition">
              Privacy Policy
            </Link>
          </li>
        </ul>
      </div>

      {/* BOTTOM FOOTER */}
      <div className="text-center text-gray-300 mt-12 text-sm">
        © {new Date().getFullYear()} AskSorSU — All Rights Reserved.
      </div>
    </footer>
  );
}
