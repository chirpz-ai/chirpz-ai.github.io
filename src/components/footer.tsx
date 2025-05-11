import Link from "next/link";

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-6">
        {/* Top section with logo and navigation */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-gray-800">
          <div className="md:col-span-5 lg:col-span-4">
            <Link href="/" className="inline-block mb-6">
              <span className="font-bold text-xl text-white">
                chirpz<span className="text-blue-400">.ai</span>
              </span>
            </Link>
            <p className="text-gray-400 mb-6 max-w-md">
              Automating model governance reporting for insurance SaaS companies with AI agents that turn complex metrics into ready-to-ship reports.
            </p>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-blue-600 hover:text-white transition-all"
                aria-label="LinkedIn"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
              </a>
              <a 
                href="#" 
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-blue-600 hover:text-white transition-all"
                aria-label="Twitter"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
              </a>
            </div>
          </div>
          
          <div className="md:col-span-7 lg:col-span-8">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <h3 className="font-semibold text-lg mb-4">Product</h3>
                <ul className="space-y-3">
                  <li>
                    <Link 
                      href="#features" 
                      className="text-gray-400 hover:text-blue-400 transition-colors"
                    >
                      Features
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href="#about" 
                      className="text-gray-400 hover:text-blue-400 transition-colors"
                    >
                      About
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href="#contact" 
                      className="text-gray-400 hover:text-blue-400 transition-colors"
                    >
                      Contact
                    </Link>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold text-lg mb-4">Legal</h3>
                <ul className="space-y-3">
                  <li>
                    <Link 
                      href="#" 
                      className="text-gray-400 hover:text-blue-400 transition-colors"
                    >
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href="#" 
                      className="text-gray-400 hover:text-blue-400 transition-colors"
                    >
                      Terms of Service
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href="#" 
                      className="text-gray-400 hover:text-blue-400 transition-colors"
                    >
                      Cookie Policy
                    </Link>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold text-lg mb-4">Company</h3>
                <ul className="space-y-3">
                  <li>
                    <Link 
                      href="#" 
                      className="text-gray-400 hover:text-blue-400 transition-colors"
                    >
                      Blog
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href="#" 
                      className="text-gray-400 hover:text-blue-400 transition-colors"
                    >
                      Careers
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href="#" 
                      className="text-gray-400 hover:text-blue-400 transition-colors"
                    >
                      Partners
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom section with copyright */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            &copy; {currentYear} ChirpZ.AI. All rights reserved.
          </p>
          <div className="flex items-center space-x-2">
            <span className="text-xs text-gray-500">Made with</span>
            <span className="text-red-400">❤</span>
            <span className="text-xs text-gray-500">in San Francisco</span>
          </div>
        </div>
      </div>
    </footer>
  );
} 