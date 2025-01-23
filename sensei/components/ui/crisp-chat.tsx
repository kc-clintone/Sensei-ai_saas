"use client";

import { Crisp } from "crisp-sdk-web";
import { useEffect } from "react";

export const ChatBot = () => {
  useEffect(() => {
    Crisp.configure("CRISP_ID");
  }, [])

  return null;
}
