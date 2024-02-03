"use client";
import { useState } from "react";
import SyntaxHighlighter from "react-syntax-highlighter/dist/esm/default-highlight";
import { irBlack } from "react-syntax-highlighter/dist/esm/styles/hljs";
export default function Code({
  codeString,
  fileName,
}: {
  codeString: string;
  fileName: string;
}) {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyToClipboard = () => {
    navigator.clipboard
      .writeText(codeString)
      .then(() => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 3000);
      })
      .catch((error) => {
        console.error("Unable to copy to clipboard", error);
      });
  };

  return (
    <div className="flex flex-col w-full">
      <div className="w-full border-2 border-zinc-200 dark:border-[#171717] p-2 bg-black text-white flex justify-between">
        <p className="text-zinc-200 text-sm">{fileName}</p>
        <div className=" cursor-pointer" onClick={handleCopyToClipboard}>
          {" "}
          {isCopied ? (
            <TickMark className="w-[25px] h-[25px] p-1" />
          ) : (
            <CopyIcon className="w-[25px] h-[25px] p-1" />
          )}
        </div>
      </div>
      <SyntaxHighlighter
        className="border-x-2 border-b-2 border-zinc-200 dark:border-[#171717] w-full"
        language="javascript"
        style={irBlack}
      >
        {codeString}
      </SyntaxHighlighter>
    </div>
  );
}

function CopyIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
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
  );
}

function TickMark(props: any) {
  return (
    <svg
      {...props}
      data-testid="geist-icon"
      fill="none"
      height="15"
      shape-rendering="geometricPrecision"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="1.5"
      viewBox="0 0 24 24"
    >
      <path d="M20 6L9 17l-5-5"></path>
    </svg>
  );
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
  );
}
