"use client";

import { cn } from "@/lib/utils";
import { Montserrat } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

const CustomFont = Montserrat({
  subsets: ["latin"],
  weight: "600"
})

const Sidebar = () => {
  return (
    <div className="bg-gray-900 space-y-4 py-4 h-full flex flex-col text-white">
      <div className="p-[2.5] flex-1">
        <Link href="/dashboard" className="flex mb-15 pl-3 items-center">
          <div className="mr-4 w-8 h-8 relative">
            <Image
              fill
              alt="sensei-logo"
              src="/sensei-logo.png"
              />
          </div>
          <h1 className={cn(CustomFont.className, "text-2xl font-bold")}>
            Sensei
          </h1>
        </Link>
      </div>
    </div>
  )
}

export default Sidebar;
