"use client";

import { useEffect, useState } from "react";

interface LimitCountProps {
  appLimit: number;
};

export const LimitCounter = ({
  appLimit = 0
  }: LimitCountProps) => {

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="flex justify-center items-center">
      <p className="text-3xl font-bold text-gray-800">App Limit: {appLimit}</p>
    </div>
  );
};
