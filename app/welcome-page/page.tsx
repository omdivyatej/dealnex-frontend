"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Plus } from "lucide-react";
import Link from "next/link";
import Script from "next/script";

interface DealDataItem {
  label: string
  value: string
  meta?: string
}

export default function WelcomePage() {
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFiles(e.target.files);
    }
  };

  const handleUpload = async () => {
    if (!selectedFiles || selectedFiles.length === 0) return;
    setIsUploading(true);

    const allTransactions: DealDataItem[][] = [];

    try {
      for (let i = 0; i < selectedFiles.length; i++) {
        const file = selectedFiles[i];
        const formData = new FormData();
        formData.append("file", file);

        const response = await fetch("https://c71d-2401-4900-883a-748b-346d-ef0c-f48b-f83c.ngrok-free.app/process-document", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          console.error("Error uploading file:", file.name);
          continue;
        }

        const json = await response.json();
        const parsedResults: DealDataItem[] = json.results.map((item: string) => {
          const [rawLabel, ...rest] = item.split(":");
          const label = rawLabel.trim();
          const valueWithMeta = rest.join(":").trim();
          const parts = valueWithMeta.split("::-::");
          const mainValue = parts[0] ? parts[0].trim() : "";
          const metaValue = parts[1] ? parts[1].trim() : undefined;
          return { label, value: mainValue, meta: metaValue };
        });

        allTransactions.push(parsedResults);
      }

      localStorage.setItem("allDealsData", JSON.stringify(allTransactions));
      window.location.href = "/dashboard"; 
    } catch (err) {
      console.error("Upload failed:", err);
    } finally {
      setIsUploading(false);
    }
  };

  const clairtyCode = `
  (function(c,l,a,r,i,t,y){
          c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
          t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
          y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
      })(window, document, "clarity", "script", "p32eafpv4g");`

  const googleAnalyticsCode = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-3ZRTGPQ62H');
  `;

  return (
    <>
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-white to-blue-50">
        <header className="bg-white bg-opacity-90 backdrop-blur-sm shadow-sm sticky top-0 z-10">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <Link href="/" className="text-xl font-bold text-gray-800 hover:text-blue-600 transition-colors">
              DealNex
            </Link>
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
            <div className="flex space-x-2">
              <Button variant="outline" className="text-gray-800 border-gray-300 hover:bg-gray-100">
                Login
              </Button>
              <Button className="bg-gray-800 hover:bg-gray-900 text-white">Request a Demo</Button>
            </div>
          </div>
        </header>

        <main className="flex-grow flex flex-col items-center justify-center text-center px-4 py-12">
          <h1 className="text-7xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
            DealNex
          </h1>
          <p className="text-2xl text-gray-600 mb-12 max-w-2xl">
            Data-Driven Deals
          </p>
          <div className="space-y-4 sm:space-y-0 sm:space-x-4 flex flex-col sm:flex-row items-center">
            <input 
              type="file" 
              onChange={handleFileChange} 
              className="mb-4 sm:mb-0 sm:mr-4"
              multiple
            />
            <Button 
              size="lg" 
              className="w-48 bg-gray-800 hover:bg-gray-900 text-white" 
              onClick={handleUpload}
              disabled={!selectedFiles || selectedFiles.length === 0 || isUploading}
            >
              {isUploading ? "Uploading..." : "Upload"}
            </Button>
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

        <footer className="bg-white bg-opacity-90 backdrop-blur-sm py-4">
          <div className="container mx-auto px-4 text-center text-sm text-gray-600">
            © 2024 DealNex. All rights reserved.
          </div>
        </footer>
      </div>
      <Script id="ms-clarity" strategy="afterInteractive">{clairtyCode}</Script>
      <Script src="https://www.googletagmanager.com/gtag/js?id=G-3ZRTGPQ62H" strategy="afterInteractive" />
      <Script id="google-analytics" strategy="afterInteractive">{googleAnalyticsCode}</Script>
    </>
  );
}





