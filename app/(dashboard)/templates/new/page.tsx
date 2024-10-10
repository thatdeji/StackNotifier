"use client";

import TemplateForm from "@/components/templates/TemplateForm/TemplateForm";

export default function AddTemplate() {
  return (
    <div className="">
      <TemplateForm
        handleSubmit={(values) => {
          console.log(values);
        }}
        btnText="Create Template"
        heading="Create a new template"
      />
    </div>
  );
}
