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
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTemplate } from "@/app/actions";
import toast from "react-hot-toast";

const DeleteTemplate: React.FC<IDeleteTemplateProps> = ({
  isOpen,
  onOpenChange,
  id,
  name,
}) => {
  const queryClient = useQueryClient();

  const {
    mutateAsync: mutateDeleteTemplate,
    isPending: isPendingDeleteTemplate,
  } = useMutation({
    mutationFn: deleteTemplate,
    onError: (error) => {
      console.log(error);
      toast.error(`${error}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["templates"],
      });
      toast.success("Template deleted successfully");
      onOpenChange(false);
    },
  });

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
          <Button
            type="button"
            onClick={async () => {
              console.log(id);
              if (id) {
                await mutateDeleteTemplate(id);
                console.log("Template deleted id");
              }
            }}
            variant="destructive"
            loading={isPendingDeleteTemplate}
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteTemplate;
