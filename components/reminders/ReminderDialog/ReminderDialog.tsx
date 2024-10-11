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
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { editReminder, getTemplates } from "@/app/actions";
import { useState } from "react";

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
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["reminders"],
      });
    },
  });

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="w-[90%]">
        <DialogHeader className="flex flex-col gap-4 mb-4">
          <DialogTitle className="text-lg text-gray-950">
            Select a template for this category
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-800">
            <RadioGroup
              onValueChange={(value) => {
                console.log(value);
                setSelectedTemplate(value);
              }}
              className="gap-6"
              defaultValue={templateId?.toString() || ""}
            >
              {templatesData?.templates?.map((template) => (
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value={template.id.toString()}
                    id={template.name}
                  />
                  <Label htmlFor={template.name}>{template.name}</Label>
                </div>
              ))}
            </RadioGroup>
          </DialogDescription>
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
          >
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ReminderDialog;
