export interface IReminderDialogProps {
  id: number | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}
