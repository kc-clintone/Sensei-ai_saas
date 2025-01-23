import { Header } from "@/components/ui/header";
import { SubBtn } from "@/components/ui/sub-btn";
import { checkSubscriptions } from "@/lib/subs";
import { SettingsIcon } from "lucide-react";

const SettingsPage = async () => {

  const isPremium = await checkSubscriptions();

  return (
    <div>
      <Header
        title="Settings"
        description="Manage your account settings"
        icon={SettingsIcon}
        iconColor="text-gray-700"
        bgColor="bg-gray-700/10"
      />

      <div className="px-4 lg:px-8 space-y-4">
        <div className="text-muted-foreground text-sm">
          {isPremium ? "You are currently on a premium plan" : "You are on a free tier"}
        </div>
        <SubBtn isPremium={isPremium}/>
      </div>
    </div>
  );
}

export default SettingsPage;
