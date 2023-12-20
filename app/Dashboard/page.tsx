import DashboardComponent from "@/components/Dashboard";
export const dynamic = 'force-dynamic'
export default function DashboardPage() {
  return (
    <div className="w-full h-screen flex justify-center items-center">
        <DashboardComponent/>
    </div>
  );
}
