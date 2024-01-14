export default async function Component() {
  return (
    <main className="flex flex-col gap-5 items-center justify-center w-full px-4 py-8 md:px-6 lg:py-16 sm:mt-[30px] mt-[60px]">
      <section className="w-full max-w-6xl space-y-8">
        <div className="flex flex-col items-center text-center space-y-4">
          <h1 className="md:text-5xl sm:text-4xl text-3xl font-sans tracking-tighter none bg-clip-text text-transparent bg-gradient-to-b from-black via-black to-white dark:from-white dark:via-white/80 dark:to-black">
            About RedShield
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            RedShield is dedicated to providing secure authentication and
            efficient user management for developers.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          <div className="flex flex-col items-center space-y-2 p-4 border border-zinc-800 dark:border-zinc-500 bg-gradient-to-b from-black/70 dark:from-white/10 via-white-80 to-black">
            <CloudLightningIcon className="w-8 h-8 text-gray-200" />
            <h2 className="text-xl font-semibold text-gray-200">
              Fast Authentication
            </h2>
            <p className="text-gray-300 text-center">
              Leveraging a Redis-based database, RedShield provides
              lightning-fast authentication services.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-2 p-4 border border-zinc-800 dark:border-zinc-500 bg-gradient-to-b from-black/70 dark:from-white/10 via-white-80 to-black">
            <UsersIcon className="w-8 h-8 text-gray-200" />
            <h2 className="text-xl font-semibold text-gray-200">
              User Management
            </h2>
            <p className="text-gray-300 text-center">
              With robust user management capabilities, RedShield allows
              developers to easily handle user accounts, permissions, and roles.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-2 p-4 border border-zinc-800 dark:border-zinc-500 bg-gradient-to-b from-black/70 dark:from-white/10 via-white-80 to-black">
            <WifiIcon className="w-8 h-8 text-gray-200" />
            <h2 className="text-xl font-semibold text-gray-200">
              Low Bandwidth Support
            </h2>
            <p className="text-gray-300 text-center ">
              RedShield is optimized for low bandwidth environments, ensuring a
              smooth experience even in areas with limited internet
              connectivity.
            </p>
          </div>
        </div>
        <div className="space-y-4">
          <h2 className="text-3xl font-sans font-normal text-center text-gray-800 dark:text-gray-200">
            Our Technology
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="flex flex-col items-center space-y-2 p-4 dark:bg-gray-900/20 bg-white rounded-none border border-zinc-800 dark:border-zinc-500 bg-gradient-to-b from-black/70 dark:from-white/10 via-white-80 to-black">
              <DatabaseIcon className="w-8 h-8 text-gray-200" />
              <h3 className="text-lg font-semibold text-gray-200">
                Redis Database
              </h3>
              <p className="text-gray-300 text-center">
                RedShield utilizes a Redis-based database for efficient storage
                and retrieval of user authentication data.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 p-4  dark:bg-gray-900/20 bg-white rounded-none border border-zinc-800 dark:border-zinc-500 bg-gradient-to-b from-black/70 dark:from-white/10 via-white-80 to-black">
              <LayoutIcon className="w-8 h-8 text-gray-200" />
              <h3 className="text-lg font-semibold text-gray-200">
                Tailwind CSS
              </h3>
              <p className="text-gray-300 text-center">
                RedShield's UI is built using Tailwind CSS, a utility-first CSS
                framework that enables rapid development and easy customization.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
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

function DatabaseIcon(props: any) {
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
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M3 5V19A9 3 0 0 0 21 19V5" />
      <path d="M3 12A9 3 0 0 0 21 12" />
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
