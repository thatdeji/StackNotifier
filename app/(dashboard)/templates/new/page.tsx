"use client";

import { addTemplate } from "@/app/actions";
import TemplateForm from "@/components/templates/TemplateForm/TemplateForm";
import { QUERY_KEY_TEMPLATES } from "@/utils/constants";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function AddTemplate() {
  const queryClient = useQueryClient();

  const router = useRouter();

  const { mutateAsync: mutateAddTemplate, isPending: isPendingAddTemplate } =
    useMutation({
      mutationFn: addTemplate,
      onError: (error) => {
        console.log(error);
        toast.error(`${error}`);
      },
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEY_TEMPLATES],
        });
        toast.success("Template created successfully");
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
            template: values.template,
          });
        }}
        btnText="Create Template"
        heading="Create a new template"
        loading={isPendingAddTemplate}
      />
    </div>
  );
}
