"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "./card";
import { Progress } from "./progress";
import { Button } from "./button";
import { ZapIcon } from "lucide-react";
import { useModal } from "@/hooks/usemodal";

interface LimitCountProps {
  appLimit: number;
  isPremium: boolean;
};

const MAX_LIM = 10;

export const LimitCounter = ({
  appLimit = 0,
  isPremium = false
  }: LimitCountProps) => {
  const upgrade = useModal();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  if (isPremium) return null;

  return (
    <div className="px-3.5">
      <Card className="backdrop-opacity-60 border-0 shadow-sm">
        <CardContent className="py-5">
          <div className="text-center text-sm space-y-2 mb-4 text-zinc-900">
            <p className="font-medium">
              You've used {appLimit} / {MAX_LIM} of your free trials
            </p>
            <Progress
              value={appLimit / MAX_LIM * 100}
              className="h-3 bg-[#eceff1]"
            />
          </div>
          <Button className="w-full" variant="pro" onClick={upgrade.onOpen}>
            <ZapIcon className="w-5 h-5 mr-2 fill-white-700"/>
            Go premium
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
