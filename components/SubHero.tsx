export default function SubHero() {
    return (
    
        <section className="min-w-[350px] , max-w-[500px] py-12 md:py-24 lg:py-32 xl:py-10 m-4">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-5xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl none bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-600">
                <span className="font-semibold font-sans line-through dark:text-slate-200 text-slate-500 pr-2">Fast</span>
                Faster{"\n                      "}
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                Experience the speed of redis with a extreme low bandwidth support. 
              </p>
            </div>
          </div>
        </div>
      </section>
 
    )
  }
  
  