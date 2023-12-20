"use client"
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function Component() {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyToClipboard = () => {
    const commandToCopy = 'npm install redshield'; 
  
    navigator.clipboard.writeText(commandToCopy)
      .then(() => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 3000);
      })
      .catch((error) => {
        console.error('Unable to copy to clipboard', error);
      });
  };
  
  return (
    <div className="w-full flex justify-center">
      <Card className="rounded shadow-lg sm:min-w-[550px] min-w-[350px] dark:bg-[rgb(18,18,18)] dark:border-slate-300 bg-[#f8f9fa] p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TerminalIcon className="w-6 h-6 dark:text-slate-300 text-gray-700" />
            <p className="text-sm dark:text-slate-300 text-gray-700 font-mono">npm install redshield</p>
          </div>
          <Button className="p-2" variant="ghost" onClick={handleCopyToClipboard}>
            <CopyIcon className="w-4 h-4 dark:text-slate-300 text-gray-700" />
          </Button>
        </div>
        <p className={`text-xs h-[5px] text-gray-500 dark:text-slate-300 transition-opacity duration-500 ${isCopied ? 'opacity-100' : 'opacity-0'}`}>
          Command copied
        </p>
      </Card>
    </div>
  );
}
function CopyIcon(props : any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
    </svg>
  )
}


function TerminalIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="4 17 10 11 4 5" />
      <line x1="12" x2="20" y1="19" y2="19" />
    </svg>
  )
}
