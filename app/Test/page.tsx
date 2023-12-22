"use client"
import { EmailTemplate } from "@/components/emailTemplates/verifyMail";
const Page = () => {


  return (
    <div className="w-full h-screen flex justify-center items-center">
       <EmailTemplate firstName="sahil" project_name="auth" link="abc"/>
    </div>
  )
}

export default Page;