"use client";

import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { ChevronRightSquareIcon, CodeSquareIcon, ImageIcon, MessageSquare, Music, Video } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react'

const items = [
  {
    label: "Music generation",
    icon: Music,
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10",
    href: "/music",
  },
  {
    label: "Video generation",
    icon: Video,
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
    href: "/video",
  },
  {
    label: "Chat with Sensei",
    icon: MessageSquare,
    color: "text-yellow-500",
    bgColor: "bg-yellow-500/10",
    href: "/chat",
  },
  {
    label: "Image generation",
    icon: ImageIcon,
    color: "text-pink-500",
    bgColor: "bg-pink-500/10",
    href: "/image",
  },
  {
    label: "Code generation",
    icon: CodeSquareIcon,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
    href: "/code",
  },
]

function Dashboard() {

  const router = useRouter();

  return (
    <div>
      <div className="mb-8 space-y-4">
        <h2 className="text-2xl md:text-4xl font-bold text-center">
          Feel the power of Sensei AI
        </h2>
        <p className="text-center text-muted-foreground text-sm md:text-lg">
          Sensei AI is a powerful AI tool that simplifies most of your daily tasks.
        </p>
      </div>

      <div className="px-4 md:px-20 lg:px-32 space-y-4">
        {
          items.map((item) => (
            <Card
              onClick={() => router.push(item.href)}
              className="border-black/5 p-4 items-center flex justify-between hover:shadow-md cursor-pointer transition"
              key={item.href}
            >
              <div className="gap-x-4 flex items-center">
                <div className={cn("w-fit rounded-md p-2", item.bgColor)}>
                  <item.icon className={cn("w-8 h-8", item.color)} />
                </div>
                <div className="font-semibold">{item.label}</div>
              </div>
              <ChevronRightSquareIcon className="w-5 h-5"/>
            </Card>
          ))
        }
      </div>
    </div>
  )
}

export default Dashboard;

