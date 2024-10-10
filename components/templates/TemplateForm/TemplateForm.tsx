"use client";
import { useEffect, useState } from "react";
import { ITemplateFormProps, formSchema } from "./TemplateForm.types";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import TemplateEditor from "../TemplateEditor/TemplateEditor";
import { stateFromHTML } from "draft-js-import-html";
import { EditorState } from "draft-js";
import { stateToHTML } from "draft-js-export-html";
import { useRouter } from "next/navigation";

const TemplateForm: React.FC<ITemplateFormProps> = ({
  handleSubmit,
  initialValues,
  btnText,
  heading,
}) => {
  const [editorState, setEditorState] = useState<EditorState>(() =>
    EditorState.createEmpty()
  );
  const [logo, setLogo] = useState("");

  const router = useRouter();

  useEffect(() => {
    const contentState = stateFromHTML(initialValues?.template || "");
    const newEditorState = EditorState.createWithContent(contentState);

    setEditorState(newEditorState);
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialValues?.name || "",
      description: initialValues?.description || "",
      category: initialValues?.category || "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
    let htmlContent = "";
    if (editorState) {
      htmlContent = stateToHTML(editorState?.getCurrentContent());
    }
    handleSubmit({
      name: values.name,
      description: values.description,
      template: htmlContent,
      logo,
      category: values.category,
    });
  }

  return (
    <div className="max-w-xl w-full mx-auto">
      <div className="w-full flex items-center justify-between gap-3 mb-16">
        <h1 className="heading-one">{heading}</h1>
        <button
          onClick={() => router.back()}
          className="text-sm text-gray-500 hover:underline"
        >
          Cancel
        </button>
      </div>
      {/* Form goes here */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter name for template" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="space-y-2">
            <FormLabel>Template</FormLabel>
            <TemplateEditor
              editorState={editorState}
              setEditorState={setEditorState}
            />
          </div>
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter a short description for the template"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category for the template" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="New Subscription">
                      New Subscription
                    </SelectItem>
                    <SelectItem value="Subscription Renewal">
                      Subscription Renewal
                    </SelectItem>
                    <SelectItem value="Cancelled Subscription">
                      Cancelled Subscription
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">{btnText || "Submit"}</Button>
        </form>
      </Form>
    </div>
  );
};

export default TemplateForm;
