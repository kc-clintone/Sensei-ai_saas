"use client";

import { useAuth } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "./button";
import TypewriterComponent from "typewriter-effect";

export const Hero = () => {
  const {isSignedIn} = useAuth();

  return (
    <div className="text-gray-800 space-y-5 py-36 font-bold text-center">
      <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold space-y-5">
        <h1>The Best AI Tool For</h1>
        <div className="text-transparent bg-clip-text bg-gradient-to-r from-purple-800 to-pink-700">
          <TypewriterComponent
            options={{
              strings: [
                "Smart Text Generation.",
                "Code Generation.",
                "HD Image Creation.",
                "Quality Music Generation.",
                "Pro Video Creation."
              ],
              autoStart: true,
              loop: true
            }}
          />
        </div>
      </div>
      <div>
        <div className="text-sm md:text-xl mb-2 font-light text-gray-800">
          Sensei is multi-model and comes packed with state of the
          art AI tools that let you generate high-end content without
          ever leaving the platform.
        </div>
        <Link
          href={isSignedIn ? "/dashboard" : "/sign-up"}
        >
          <Button
            variant="pro"
            className="md:text-lg p-4 md:p-6 font-semibold rounded-md mt-1"
          >
            Start Your Free Trial Today
          </Button>
        </Link>
      </div>
    </div>
  )
}
