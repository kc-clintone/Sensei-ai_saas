"use client";

import axios from "axios";
import { Button } from "./button";
import { ZapIcon } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";


interface SubBtnProps {
  isPremium: boolean;
}

export const SubBtn = ({
  isPremium = false
}: SubBtnProps) => {

  const [loading, setLoading] = useState(false);

  const onClick = async () => {
    try {
      setLoading(true);
      const res = await axios.get("api/mpesa");

      window.location.href = res.data.url;
    } catch (error) {
      toast.error("Oops, Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={onClick}
      variant={isPremium ? "default" : "pro"}
      disabled={loading}
    >
      {!isPremium && <ZapIcon className="w-4 h-4 fill-yellow mr-2"/>}
      {isPremium ? "Manage subscription" : "Go premium"}
    </Button>
  );
}
