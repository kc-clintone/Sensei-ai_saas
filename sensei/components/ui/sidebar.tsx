"use client";

import { cn } from "@/lib/utils";
import { CodeSquareIcon, ImageIcon, LayoutDashboard, MessageSquare, Music, Settings, VideoIcon } from "lucide-react";
import { Montserrat } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LimitCounter } from "./limitcount";

const routes = [{
    color: "text-violet-500",
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    color: "text-emerald-500",
    label: "Music",
    href: "/music",
    icon: Music
  },
  {
    color: "text-orange-500",
    label: "Video",
    href: "/video",
    icon: VideoIcon
  },
  {
    color: "text-yellow-500",
    label: "Chat",
    href: "/chat",
    icon: MessageSquare
  },
  {
    color: "text-pink-500",
    label: "Image",
    href: "/image",
    icon: ImageIcon
  },
  {
    color: "text-blue-500",
    label: "Code",
    href: "/code",
    icon: CodeSquareIcon
  },
  {
    color: "text-gray-500",
    label: "Settings",
    href: "/settings",
    icon: Settings
  },
]

interface SidebarProps {
  appLimit: number;
};

const CustomFont = Montserrat({
  subsets: ["latin"],
  weight: "600"
})

const Sidebar = ({
  appLimit = 0
}: SidebarProps) => {

  const path = usePathname();

  return (
    <div className="bg-gray-900 space-y-5 py-5 h-full flex flex-col text-white">
      <div className="p-3 flex-1">
        <Link href="/dashboard" className="flex mb-14 pl-3 items-center">
          <div className="mr-4 w-9 h-8 relative">
            <Image
              fill
              alt="sensei-logo"
              src="/sensei-logo.png"
              />
          </div>
          <h1 className={cn("text-2xl font-bold", CustomFont.className)}>
            Sensei
          </h1>
        </Link>

        <div className="space-y-1">
          {
            routes.map((routeName) => (
              <Link
                href={routeName.href}
                key={routeName.href}
                className={cn("group p-3 flex font-medium font-mediu justify-start w-full hover:text-white hover:bg-white/10 transition rounded-lg",
                path === routeName.href ? "bg-white/10 text-white" : "text-zinc-500")}
              >
                <div className="flex flex-1 items-center">
                  <routeName.icon className={cn("w-6 h-6 mr-3", routeName.color)} />
                  <div className="text-sm">
                    {routeName.label}
                  </div>
                </div>
              </Link>
            ))
          }
        </div>

      </div>
      <LimitCounter appLimit={appLimit} />
    </div>
  )
}

export default Sidebar;
