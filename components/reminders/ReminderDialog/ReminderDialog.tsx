import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { IReminderDialogProps } from "./ReminderDialog.types";
import { Button } from "@/components/ui/button";

const ReminderDialog: React.FC<IReminderDialogProps> = ({
  id,
  isOpen,
  onOpenChange,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="w-[90%]">
        <DialogHeader className="flex flex-col gap-4 mb-4">
          <DialogTitle className="text-lg text-gray-950">
            Select a template for this category
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-800">
            <RadioGroup className="gap-6" defaultValue="new-subscription">
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="new-subscription"
                  id="new-subscription"
                />
                <Label htmlFor="new-subscription">New Subscription</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="subscription-renewal"
                  id="subscription-renewal"
                />
                <Label htmlFor="subscription-renewal">
                  Subscription Renewal
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="cancelled-subscription"
                  id="cancelled-subscription"
                />
                <Label htmlFor="cancelled-subscription">
                  Cancelled Subscription
                </Label>
              </div>
            </RadioGroup>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-end">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
          <Button type="button" variant="default">
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ReminderDialog;
