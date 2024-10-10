"use client";

import TemplateForm from "@/components/templates/TemplateForm/TemplateForm";
import { useParams } from "next/navigation";

export default function EditTemplate() {
  const { id } = useParams();

  return (
    <div className="">
      <TemplateForm
        handleSubmit={(values) => {
          console.log(values, id);
        }}
        initialValues={{
          name: "My Template",
          description: "This is a template",
          template: "<p>My template content</p>",
          category: "New Subscription",
        }}
        btnText="Update Template"
        heading="Edit template"
      />
    </div>
  );
}
