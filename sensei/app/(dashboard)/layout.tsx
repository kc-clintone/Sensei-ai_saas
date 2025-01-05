import Navbar from "@/components/ui/navbar";
import Sidebar from "@/components/ui/sidebar";

const DashboardLayout = ({
    children
 } : {
    children: React.ReactNode;
  }) => {
  return (
    <div className="relative h-full">
      <div className="h-full hidden md:flex md:flex-col md:w-72 md:fixed md:inset-y-0 z-[60] bg-gray-900">
        <Sidebar/>
      </div>
      <main className="md:pl-72">
        <Navbar/>
        {children}
      </main>
    </div>
  );
}

export default DashboardLayout;
