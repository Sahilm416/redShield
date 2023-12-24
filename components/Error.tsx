"use client";
import {
  CardHeader,
  CardContent,
  Card,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Component() {
  return (
    <Card className="max-w-md mx-auto bg-white dark:bg-[rgb(18,18,18)] rounded-xl shadow-md overflow-hidden md:max-w-2xl m-4">
      <CardHeader>
        <CardTitle className="flex flex-col text-center justify-center items-center gap-2">
          <AlertTriangleIcon className="h-12 w-12 mr-4 text-red-600" />{" "}
          <p>Oops ! something went wrong</p>
        </CardTitle>
      </CardHeader>
      <CardContent className="text-center">
        we encountered an error while loading the data please try again.
      </CardContent>
      <CardFooter>
        <Button
          onClick={() => window.location.reload()}
          className="flex mx-auto justify-center items-center gap-4"
          variant={"outline"}
        >
          Retry <RefreshCwIcon className="ml-2 h-5 w-5" />
        </Button>
      </CardFooter>
    </Card>
  );
}

function AlertTriangleIcon(props: any) {
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
      <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
      <path d="M12 9v4" />
      <path d="M12 17h.01" />
    </svg>
  );
}

function RefreshCwIcon(props: any) {
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
      <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
      <path d="M21 3v5h-5" />
      <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
      <path d="M8 16H3v5" />
    </svg>
  );
}
