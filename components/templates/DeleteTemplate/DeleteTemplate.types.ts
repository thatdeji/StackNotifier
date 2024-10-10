import { Dispatch, SetStateAction } from "react";

export interface IDeleteTemplateProps {
  id: number | null;
  name: string | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  //   setIsOpen: Dispatch<SetStateAction<boolean>>;
}
