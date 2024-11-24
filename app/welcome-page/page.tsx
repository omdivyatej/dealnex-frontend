import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Plus } from "lucide-react";
import Link from "next/link";
import Clarity from '@microsoft/clarity';
//import Script from "next/script";
//import Script from 'next/script';
const projectId = "p32eafpv4g"

Clarity.init(projectId);


// const clairtyCode = `
//  (function(c,l,a,r,i,t,y){
//         c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
//         t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
//         y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
//     })(window, document, "clarity", "script", "p32eafpv4g");`

export default function WelcomePage() {
  return (
    <>
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-white to-blue-50">
        {/* Header */}
        <header className="bg-white bg-opacity-90 backdrop-blur-sm shadow-sm sticky top-0 z-10">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            {/* Logo */}
            <Link href="/" className="text-xl font-bold text-gray-800 hover:text-blue-600 transition-colors">
              DealNex
            </Link>
            {/* Navigation */}
            <nav className="hidden md:flex space-x-6">
              {["Home", "Solutions", "Features", "Pricing", "Contact"].map((item) => (
                <Link
                  key={item}
                  href={`/${item.toLowerCase()}`}
                  className="text-gray-600 hover:text-blue-600 transition-colors text-sm uppercase tracking-wide"
                >
                  {item}
                </Link>
              ))}
            </nav>
            {/* Buttons */}
            <div className="flex space-x-2">
              <Button variant="outline" className="text-gray-800 border-gray-300 hover:bg-gray-100">
                Login
              </Button>
              <Button className="bg-gray-800 hover:bg-gray-900 text-white">Request a Demo</Button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-grow flex flex-col items-center justify-center text-center px-4 py-12">
          <h1 className="text-7xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
            DealNex
          </h1>
          <p className="text-2xl text-gray-600 mb-12 max-w-2xl">
            Data-Driven Deals
          </p>
          <div className="space-y-4 sm:space-y-0 sm:space-x-4 flex flex-col sm:flex-row items-center">
            {/* Upload Button */}
            <Link href="https://dealnex-v1.onrender.com/">
              <Button size="lg" className="w-48 bg-gray-800 hover:bg-gray-900 text-white">
                Upload
              </Button>
            </Link>
            {/* Dropdown Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="lg" variant="outline" className="w-48 text-gray-800 border-gray-300 hover:bg-gray-100">
                  Practice Group <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-48">
                <DropdownMenuItem>M&A</DropdownMenuItem>
                <DropdownMenuItem>Private Equity</DropdownMenuItem>
                <DropdownMenuItem>Venture Capital</DropdownMenuItem>
                <DropdownMenuItem>Project Finance</DropdownMenuItem>
                <DropdownMenuItem>Real Estate</DropdownMenuItem>
                <DropdownMenuItem>
                  <Plus className="mr-2 h-4 w-4" /> More
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-white bg-opacity-90 backdrop-blur-sm py-4">
          <div className="container mx-auto px-4 text-center text-sm text-gray-600">
            © 2024 DealNex. All rights reserved.
          </div>
        </footer>
      </div>
        {/* <Script id="ms-clarity" strategy="afterInteractive">
          {clairtyCode}
        </Script> */}
    </>
  );
}
