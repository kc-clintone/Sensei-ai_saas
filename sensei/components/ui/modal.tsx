"use client";

import { useModal } from "@/hooks/usemodal";
import {
Dialog,
DialogContent,
DialogHeader,
DialogTitle,
} from "./dialog";
import { Badge } from "./badge";

export const Modal = () => {
  const upgrade = useModal();
  return (
    <Dialog open={upgrade.isOpen} onOpenChange={upgrade.onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex-col pb-2 gap-y-4 items-center justify-center flex">
            <div className="flex gap-x-2 itemsc-center justify-center font-bold py-1.5">
              Upgrade to Sensei AI
              <Badge className="py-1 uppercase text-sm">
                premeium
              </Badge>
            </div>
          </DialogTitle>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
