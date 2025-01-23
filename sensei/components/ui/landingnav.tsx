import { useAuth } from "@clerk/nextjs";
import { Montserrat } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./button";
import { cn } from "@/lib/utils";

const font = Montserrat({
  subsets: ["latin"],
  weight: "600"
})

export const LandingNav = () => {
  const { isSignedIn } = useAuth();

  return (
    <nav className="justify-between flex items-center bg-transparent p-4">
      <Link className="flex items-center" href="/">
        <div className="h-9 w-9 relative mr-4">
          <Image
            fill
            alt="Sensei AI logo"
            src="/sensei-logo.png"
          />
        </div>
        <h1 className={cn("text-2xl text-white font-bold", font.className)}>Sensei</h1>
      </Link>
      <div className="flex items-center gap-x-2">
        <Link href={isSignedIn ? "/dashboard" : "/sign-up"}>
          <Button>
            Get started
          </Button>
        </Link>
      </div>
    </nav>
  )
}
