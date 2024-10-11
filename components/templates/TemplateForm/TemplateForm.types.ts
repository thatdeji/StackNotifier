import { z } from "zod";

export const formSchema = z.object({
  name: z.string().min(2).max(100),
  description: z.string().min(2).max(200),
});

interface ITemplateValues {
  name: string;
  description: string;
  template: string;
  logo?: string;
}

export interface ITemplateFormProps {
  handleSubmit: (values: ITemplateValues) => void;
  initialValues?: ITemplateValues;
  btnText?: string;
  heading: string;
}
