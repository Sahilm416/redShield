"use client"
import { Button } from "./ui/button"


const Hero = () => {
  const token = "rgcr464647xrgrgcvrc"
  const check = async ()=>{
    try {
      console.log("clicked")
      const res =  await fetch("/api/service/login",{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "authorization": `${token}`
        },
        body: JSON.stringify({
          username: "sahil_007",
          password: "12345"
        })
      })
      console.log(res)
      
    } catch (error) {
      console.log(error)
    }
}
  
  return (
    <div className="w-full h-[100vh] flex flex-col justify-center items-start p-5">
        <p className="text-5xl font-sans font-bold text-blue-500 p-3 "><span className="text-slate-800">Redis</span> based <br /> authentication library </p>
        <Button onClick={check} className="mx-4 w-[200px] h-[45px] rounded-none my-5">Explore now</Button>  
        <p  className="text-3xl mx-4 p-1">comming soon...</p>
    </div>
  )
}

export default Hero;