"use client";

import { addTemplate } from "@/app/actions";
import TemplateForm from "@/components/templates/TemplateForm/TemplateForm";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export default function AddTemplate() {
  const queryClient = useQueryClient();

  const router = useRouter();

  const { mutateAsync: mutateAddTemplate, isPending: isPendingAddTemplate } =
    useMutation({
      mutationFn: addTemplate,
      onError: (error) => {
        console.log(error);
      },
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["templates"],
        });
        router.push("/templates");
      },
    });

  return (
    <div className="">
      <TemplateForm
        handleSubmit={async (values) => {
          const res = await mutateAddTemplate({
            name: values.name,
            description: values.description,
            reminder_id: Number(values.reminder),
            template: values.template,
          });
        }}
        btnText="Create Template"
        heading="Create a new template"
      />
    </div>
  );
}
