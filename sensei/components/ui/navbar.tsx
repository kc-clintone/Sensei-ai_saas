import { UserButton } from "@clerk/nextjs";
import MobileMenu from "./mobile"
import { getLimit } from "@/lib/limit";
import { checkSubscriptions } from "@/lib/subs";

const Navbar = async () => {

  const appLimit = await getLimit();

  const isPremium = await checkSubscriptions();

  return (
    <div className="flex items-center p-4">
     <MobileMenu appLimit={appLimit} isPremium={isPremium}/>
     <div className="flex w-full justify-end">
         <UserButton afterSwitchSessionUrl="/"/>
     </div>
    </div>
)
}

export default Navbar;
