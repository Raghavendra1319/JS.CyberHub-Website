import { Facebook, Linkedin, Instagram, Shield, Mail, Phone, Github, Youtube } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold">JS.CyberHub</h3>
            </div>
            <p className="text-gray-400 leading-relaxed mb-6">
              Protecting and growing your business with expert security solutions, custom development, and strategic guidance.
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-gray-400 text-sm">
                <Mail className="h-4 w-4" />
                <span>raghavendrakanade13@gmail.com</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400 text-sm">
                <Phone className="h-4 w-4" />
                <span>+91 8446173815</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-lg">Security Services</h4>
            <ul className="space-y-3 text-gray-400">
              <li><a href="#services" className="hover:text-white transition-colors hover:translate-x-1 inline-block">Malware Security</a></li>
              <li><a href="#services" className="hover:text-white transition-colors hover:translate-x-1 inline-block">Device Protection</a></li>
              <li><a href="#services" className="hover:text-white transition-colors hover:translate-x-1 inline-block">Network Security</a></li>
              <li><a href="#services" className="hover:text-white transition-colors hover:translate-x-1 inline-block">Risk Management</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-lg">Development</h4>
            <ul className="space-y-3 text-gray-400">
              <li><a href="#services" className="hover:text-white transition-colors hover:translate-x-1 inline-block">Software Development</a></li>
              <li><a href="#services" className="hover:text-white transition-colors hover:translate-x-1 inline-block">Website Development</a></li>
              <li><a href="#services" className="hover:text-white transition-colors hover:translate-x-1 inline-block">App Development</a></li>
              <li><a href="#services" className="hover:text-white transition-colors hover:translate-x-1 inline-block">Business Consulting</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-lg">Company</h4>
            <ul className="space-y-3 text-gray-400 mb-6">
              <li><a href="#about" className="hover:text-white transition-colors hover:translate-x-1 inline-block">About Us</a></li>
              <li><a href="#services" className="hover:text-white transition-colors hover:translate-x-1 inline-block">Services</a></li>
              <li><a href="#contact" className="hover:text-white transition-colors hover:translate-x-1 inline-block">Contact</a></li>
              <li><a href="#" className="hover:text-white transition-colors hover:translate-x-1 inline-block">Careers</a></li>
            </ul>
            <div>
              <h4 className="font-semibold mb-4">Follow Us</h4>
              <div className="flex gap-3">
                <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-all hover:scale-110">
                  <Facebook className="h-5 w-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-blue-400 rounded-lg flex items-center justify-center transition-all hover:scale-110">
                  <Linkedin className="h-5 w-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-pink-600 rounded-lg flex items-center justify-center transition-all hover:scale-110">
                  <Instagram className="h-5 w-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-gray-500 rounded-lg flex items-center justify-center transition-all hover:scale-110">
                  <Github className="h-5 w-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-red-500 rounded-lg flex items-center justify-center transition-all hover:scale-110">
                  <Youtube className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              &copy; 2026 JS.CyberHub. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm text-gray-400">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}