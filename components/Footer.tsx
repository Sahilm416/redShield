import React from "react";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Footer() {
  return (
    <footer className="bg-gray-900">
      <div className="container flex flex-col flex-wrap px-4 py-16 mx-auto md:items-center lg:items-start md:flex-row md:flex-nowrap">
        <div className="flex-shrink-0 w-64 mx-auto text-center md:mx-0 md:text-left">
          <a href="/" className="text-2xl text-white">
            My Website
          </a>
          <p className="mt-2 text-xs text-justify text-gray-400">
            Footer is a valuable resource that complements the main content of
            the website by providing quick links, legal information, and ways to
            connect
          </p>
        </div>
        <div className="flex-grow flex-shrink-0 mt-6 lg:mt-0 lg:pl-24 md:flex md:flex-col md:items-start md:text-left">
          <h2 className="text-xs font-medium tracking-widest text-white uppercase title-font">
            Quick Links
          </h2>
          <nav className="list-none mb-10">
            <ul>
              <li>
                <a href="/" className="text-gray-400 hover:text-white">
                  Home
                </a>
              </li>
              <li>
                <a href="/about" className="text-gray-400 hover:text-white">
                  About Us
                </a>
              </li>
              <li>
                <a href="/services" className="text-gray-400 hover:text-white">
                  Services
                </a>
              </li>
              <li>
                <a href="/contact" className="text-gray-400 hover:text-white">
                  Contact
                </a>
              </li>
            </ul>
          </nav>
        </div>
        <div className="flex-grow flex-shrink-0 mt-8 lg:mt-0 lg:pl-24 md:flex md:flex-col md:items-start md:text-left">
          <h2 className="text-xs font-medium tracking-widest text-white uppercase title-font">
            Legal
          </h2>
          <nav className="list-none mb-10">
            <ul>
              <li>
                <a href="/privacy" className="text-gray-400 hover:text-white">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/terms" className="text-gray-400 hover:text-white">
                  Terms of Service
                </a>
              </li>
            </ul>
          </nav>
        </div>
        <div className="flex-grow flex-shrink-0 mt-8 lg:mt-0 lg:pl-24 md:flex md:flex-col md:items-start md:text-left">
          <h2 className="text-xs font-medium tracking-widest text-white uppercase title-font">
            Connect With Us
          </h2>
          <nav className="list-none mb-10">
            <ul>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Facebook
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Twitter
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Instagram
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      <div className="bg-gray-800">
        <div className="container mx-auto py-4 px-5 flex flex-wrap flex-col sm:flex-row">
          <p className="text-gray-400 text-sm text-center sm:text-left">
            © 2023 My Website —
            <a
              href="/"
              rel="noopener noreferrer"
              className="text-gray-500 ml-1"
              target="_blank"
            >
              @MyWebsite
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
