import DashboardComponent from "@/components/Dashboard";
import ProjectList from "@/components/ProjectList";

export default function DashboardPage() {
  
  return (
    <div className="w-full flex flex-col justify-start items-center mt-[100px]">
        <DashboardComponent username={"sahil"} isVerified={false} />
        <ProjectList/>
    </div>
  );
}
