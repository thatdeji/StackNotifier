import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { IDeleteTemplateProps } from "./DeleteTemplate.types";
import { DialogClose } from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";

const DeleteTemplate: React.FC<IDeleteTemplateProps> = ({
  isOpen,
  onOpenChange,
  id,
  name,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="w-[90%]">
        <DialogHeader className="flex flex-col gap-4 mb-4">
          <DialogTitle className="text-lg text-gray-950">
            Are you absolutely sure?
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-800">
            Do you want to delete {name}?. This action cannot be undone. This
            will permanently delete your account and remove your data from our
            servers.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-end">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
          <Button type="button" variant="destructive">
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteTemplate;
