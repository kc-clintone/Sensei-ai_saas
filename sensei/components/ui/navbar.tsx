import { UserButton } from "@clerk/nextjs";
import MobileMenu from "./mobile"
import { getLimit } from "@/lib/limit";

const Navbar = async () => {
  const appLimit = await getLimit();
  return (
    <div className="flex items-center p-4">
     <MobileMenu appLimit={appLimit}/>
     <div className="flex w-full justify-end">
         <UserButton afterSwitchSessionUrl="/"/>
     </div>
    </div>
)
}

export default Navbar;
