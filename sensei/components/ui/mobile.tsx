"use client"

import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import Sidebar from "./sidebar";
import { useEffect, useState } from "react";

interface MobileMenuProps {
  appLimit: number;
}

const MobileMenu = ({
  appLimit
  }: MobileMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(true);
  }, []);

  if (!isOpen) {
    return null
  }
  
  return (
    <Sheet>
      <SheetTrigger>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu/>
        </Button>
      </SheetTrigger>
      <SheetContent className="p-0" side="right">
        <Sidebar appLimit={appLimit}/>
      </SheetContent>
    </Sheet>
)
}

export default MobileMenu;
