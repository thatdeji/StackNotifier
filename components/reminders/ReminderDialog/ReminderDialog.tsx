import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { IReminderDialogProps } from "./ReminderDialog.types";
import { Button } from "@/components/ui/button";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { editReminder, getTemplates } from "@/app/actions";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const ReminderDialog: React.FC<IReminderDialogProps> = ({
  id,
  isOpen,
  onOpenChange,
  templateId,
}) => {
  // Access the client
  const queryClient = useQueryClient();

  const { data: templatesData } = useQuery({
    queryKey: ["templates"],
    queryFn: () => getTemplates(),
  });

  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

  const {
    mutateAsync: editReminderMutation,
    isPending: isPendingEditReminder,
  } = useMutation({
    mutationFn: editReminder,
    onError: (error) => {
      console.log(error);
      toast.error(`${error}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["reminders"],
      });
      toast.success("Reminder updated successfully");
      onOpenChange(false);
    },
  });

  useEffect(() => {
    setSelectedTemplate(templateId);
  }, [templateId]);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="w-[90%]">
        <DialogHeader className="flex flex-col gap-4 mb-4">
          <DialogTitle className="text-lg text-gray-950">
            Select a template for this reminder
          </DialogTitle>
          <DialogDescription className="sr-only">
            Set a template for this reminder
          </DialogDescription>
          <div className="text-sm text-gray-800">
            <div className="space-y-6">
              {templatesData?.templates?.map((template) => (
                <div className="flex items-center space-x-2">
                  <Checkbox
                    defaultChecked={
                      !!(
                        template.id.toString() === selectedTemplate?.toString()
                      )
                    }
                    checked={
                      !!(
                        template.id.toString() === selectedTemplate?.toString()
                      )
                    }
                    id={template.name}
                    onCheckedChange={(checked) => {
                      if (
                        template.id.toString() === selectedTemplate?.toString()
                      ) {
                        setSelectedTemplate(
                          checked ? template.id.toString() : null
                        );
                      } else {
                        setSelectedTemplate(template.id.toString());
                      }
                    }}
                  />
                  <label
                    htmlFor={template.name}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {template.name}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </DialogHeader>
        <DialogFooter className="sm:justify-end">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
          <Button
            onClick={async () => {
              if (!id || !selectedTemplate) return;
              const res = await editReminderMutation({
                id: id,
                template_id: Number(selectedTemplate),
              });
              onOpenChange(false);
            }}
            type="button"
            variant="default"
            loading={isPendingEditReminder}
          >
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ReminderDialog;
