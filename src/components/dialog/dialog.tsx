import React from "react";
import './dialog.scss';
import { Dialog, DialogContent, DialogClose, DialogTitle } from "../ui/dialog";

interface DialogProps {
  title?: string;
  description?: string;
  triggerText?: string;
  closeButtonText?: string;
  open?: boolean;
  onClose?: () => void;
  children?: React.ReactNode;
}

const DialogComponent: React.FC<DialogProps> = ({ closeButtonText, children, open, onClose, title }) => {
  return (
    <div className="container-dialog">
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent className="bg-white p-6 rounded-lg shadow-lg max-w-[64rem] custom-dialog-content">
          <DialogTitle>{title}</DialogTitle>
          {children}
          <DialogClose asChild>
            <button className="bg-gray-500 text-white p-2 rounded-md">{closeButtonText}</button>
          </DialogClose>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DialogComponent;