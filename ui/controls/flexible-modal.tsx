import React from 'react';
import { Dialog, DialogContent, DialogTitle } from "@/ui/controls/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";`
`
interface FlexibleModalProps {
  isOpen: boolean;
  onDismiss: () => void;
  children: React.ReactNode;
  title?: string;
  width?: string;
  height?: string;
}

export function FlexibleModal({ 
  isOpen, 
  onDismiss, 
  children, 
  title = "Modal Title", 
  width = '50vw', 
  height = 'auto' 
}: FlexibleModalProps) {
  return (
    <div className='z-1'>
    <Dialog open={isOpen} onOpenChange={onDismiss}>
    
      <DialogContent 
        style={{ width, height, maxWidth: '100vw', maxHeight: '100vh' }}
        className="overflow-auto"
      >
         <VisuallyHidden>
          <DialogTitle>{title}</DialogTitle>
        </VisuallyHidden>
        
        {children}
      </DialogContent>
    </Dialog>
    </div>
  );
}
