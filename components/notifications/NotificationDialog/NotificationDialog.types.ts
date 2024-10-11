export interface INotificationDialogProps {
  id: number | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  templateId: string | null;
}
