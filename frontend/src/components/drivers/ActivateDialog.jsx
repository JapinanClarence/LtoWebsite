import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
const ActivateDialog = ({ open, onOpenChange, cancelActivate, confirmActivate }) => {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
        <AlertDialogContent className="">
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will activate the
              driver.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={cancelActivate}>Cancel</AlertDialogCancel>
            <AlertDialogAction  onClick={confirmActivate}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
  );
};

export default ActivateDialog;
