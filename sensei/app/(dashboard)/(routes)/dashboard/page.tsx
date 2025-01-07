"use client";

import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { MessageSquare } from 'lucide-react';
import React from 'react'

const items = [
  {
    label: "Chat",
    icon: MessageSquare,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
    href: "/chat",
  },
]

function Dashboard() {
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
              className="border-black/5 p-4 items-center flex justify-between hover:shadow-md cursor-pointer transition"
              key={item.href}
            >
              <div className="gap-x-4 flex items-center">
                <div className={cn("w-fit rounded-md pr-2", item.bgColor)}>
                  <item.icon className={cn("w-8 h-8", item.color)} />
                  <div className="font-semibold">{item.label}</div>
                </div>
              </div>
            </Card>
          ))
        }
      </div>
    </div>
  )
}

export default Dashboard;

