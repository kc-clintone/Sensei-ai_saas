"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "./card";
import { Progress } from "./progress";
import { Button } from "./button";
import { ZapIcon } from "lucide-react";

interface LimitCountProps {
  appLimit: number;
};

const MAX_LIM = 10;

export const LimitCounter = ({
  appLimit = 0
  }: LimitCountProps) => {

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="px-3.5">
      <Card className="bg-white/10 border-0">
        <CardContent className="py-5">
          <div className="text-center text-sm space-y-2 mb-4 text-white">
            <p className="font-medium">
              {appLimit} / {MAX_LIM} 
              free trials
            </p>
            <Progress
              value={appLimit / MAX_LIM * 100}
              className="h-3"
            />
          </div>
          <Button className="w-full" variant="pro">
            <ZapIcon className="w-5 h-5 mr-2 fill-yellow-500"/>
            Upgrade to Pro
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
