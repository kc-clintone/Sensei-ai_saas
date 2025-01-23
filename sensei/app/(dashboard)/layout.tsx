import Navbar from "@/components/ui/navbar";
import Sidebar from "@/components/ui/sidebar";
import { getLimit } from "@/lib/limit";
import { checkSubscriptions } from "@/lib/subs";

const DashboardLayout = async ({
    children
 } : {
    children: React.ReactNode;
  }) => {

  const appLimit = await getLimit();

  const isPremium = await checkSubscriptions();

  return (
    <div className="relative h-full">
      <div className="h-full hidden md:flex md:flex-col md:w-72 md:fixed md:inset-y-0 bg-gray-900">
        <Sidebar isPremium={isPremium} appLimit={appLimit}/>
      </div>
      <main className="md:pl-72">
        <Navbar/>
        {children}
      </main>
    </div>
  );
}

export default DashboardLayout;
