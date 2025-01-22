"use client";

import { useModal } from "@/hooks/usemodal";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./dialog";
import { Badge } from "./badge";
import {
  CheckIcon,
  CodeSquareIcon,
  ImageIcon,
  MessageSquare,
  Music4Icon,
  VideoIcon,
} from "lucide-react";
import { Card } from "./card";
import { cn } from "@/lib/utils";
import { Button } from "./button";


const items = [
  {
    label: "Music generation",
    icon: Music4Icon,
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10",
  },
  {
    label: "Video generation",
    icon: VideoIcon,
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
  },
  {
    label: "Chat with Sensei",
    icon: MessageSquare,
    color: "text-yellow-500",
    bgColor: "bg-yellow-500/10",
  },
  {
    label: "Image generation",
    icon: ImageIcon,
    color: "text-pink-500",
    bgColor: "bg-pink-500/10",
  },
  {
    label: "Code generation",
    icon: CodeSquareIcon,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
  },
]


export const Modal = () => {
  const upgrade = useModal();
  return (
    <Dialog open={upgrade.isOpen} onOpenChange={upgrade.onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex-col pb-2 gap-y-4 items-center justify-center flex">
            <div className="flex gap-x-2 itemsc-center justify-center font-bold py-1">
              Upgrade to Sensei AI
              <Badge className="py-1 uppercase text-sm" variant="pro">
                pro
              </Badge>
                to get unlimited access to all features
            </div>
          </DialogTitle>
          <DialogDescription className="space-y-2 text-zinc-500 font-medium pt-2 text-center">
            {items.map((item) => (
              <Card
                className="border-black/5 flex justify-between items-center p-3"
                key={item.label}
              >
                <div className="gap-x-4 items-center flex">
                  <div className={cn("p-2 wfit rounded-md", item.bgColor)}>
                    <item.icon className={cn("w-6 h-6", item.color)} />
                  </div>
                  <div className="text-sm font-semibold">
                    {item.label}
                  </div>
                </div>
                <CheckIcon className="w-5 h-5 text-primary"/>
              </Card>
            ))}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            className="w-full"
            size="lg"
          >
            Upgrade now
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
