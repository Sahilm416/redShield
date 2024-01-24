import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card";
export default function SubHero() {
  return (
    <div className=" w-full h-max flex flex-col items-center">
      <p className="text-[max(30px,min(3vw,50px))] dark:text-[#EDEDED] text-[#171717] font-[750] font-[sans-serif]">
        Why RedShield
      </p>
      <p className="dark:text-[#A1A1A1] text-[#666666] text-center pb-5">
        These things makes us stand out
      </p>
      <div className="flex w-full justify-center max-w-[1200px] px-[5vw] bg-white dark:bg-gray-900/20">
        <div className="h-full w-full border border-[#EBEBEB] dark:border-[#1F1F1F] grid md:grid-cols-2 grid-cols-1">
          <Card className="w-full h-full border-t-0 md:border-b border-l-0 md:border-r border-r-0 border-b border-[#EBEBEB] dark:border-[#1F1F1F]  rounded-none text-center shadow-none">
            <CardHeader className="flex flex-col items-center gap-2">
              <CloudLightningIcon />
              <CardTitle className="font-normal">
                Fast Authentication
              </CardTitle>
            </CardHeader>
            <CardContent className="dark:text-[#A1A1A1] text-[#666666]">
              Leveraging a Redis-based database, RedShield provides
              lightning-fast authentication services.
            </CardContent>
          </Card>
          <Card className="w-full rounded-none text-center shadow-none border-t-0 border-r-0 border-l-0 border-b border-[#EBEBEB] dark:border-[#1F1F1F]">
            <CardHeader className="flex flex-col items-center gap-2">
              <UsersIcon />
              <CardTitle className="font-normal">
                User Management
              </CardTitle>
            </CardHeader>
            <CardContent className="dark:text-[#A1A1A1] text-[#666666]">
              With robust user management capabilities, RedShield allows
              developers to easily handle user accounts, permissions, and roles.
            </CardContent>
          </Card>
          <Card className="w-full rounded-none text-center shadow-none border-t-0 md:border-r border-r-0 border-l-0 md:border-b-0 border-b  border-[#EBEBEB] dark:border-[#1F1F1F] ">
            <CardHeader className="flex flex-col items-center gap-2">
              <WifiIcon />
              <CardTitle className="font-normal">
                Low Bandwidth Support
              </CardTitle>
            </CardHeader>
            <CardContent className="dark:text-[#A1A1A1] text-[#666666]">
              RedShield is optimized for low bandwidth environments, ensuring a
              smooth experience.
            </CardContent>
          </Card>
          <Card className="w-full rounded-none text-center shadow-none border-none">
            <CardHeader className="flex flex-col items-center gap-2">
              <LayoutIcon />
              <CardTitle className="font-normal">
                User Interface
              </CardTitle>
            </CardHeader>
            <CardContent className="dark:text-[#A1A1A1] text-[#666666]">
              RedShield's UI is built using Tailwind CSS, a utility-first CSS
              framework that enables rapid development and easy customization.
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function CloudLightningIcon(props: any) {
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
      <path d="M6 16.326A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 .5 8.973" />
      <path d="m13 12-3 5h4l-3 5" />
    </svg>
  );
}

function WifiIcon(props: any) {
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
      <path d="M5 13a10 10 0 0 1 14 0" />
      <path d="M8.5 16.5a5 5 0 0 1 7 0" />
      <path d="M2 8.82a15 15 0 0 1 20 0" />
      <line x1="12" x2="12.01" y1="20" y2="20" />
    </svg>
  );
}

function UsersIcon(props: any) {
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
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function LayoutIcon(props: any) {
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
      <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
      <line x1="3" x2="21" y1="9" y2="9" />
      <line x1="9" x2="9" y1="21" y2="9" />
    </svg>
  );
}
