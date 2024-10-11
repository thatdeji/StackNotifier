"use client";

import { editTemplate, getSingleTemplate } from "@/app/actions";
import TemplateForm from "@/components/templates/TemplateForm/TemplateForm";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";

export default function EditTemplate() {
  const { id } = useParams();

  const queryClient = useQueryClient();

  const router = useRouter();

  const { data: templateData } = useQuery({
    queryKey: ["templates", id],
    queryFn: () => getSingleTemplate(Number(id)),
  });

  const { mutateAsync: mutateEditemplate, isPending: isPendingEditTemplate } =
    useMutation({
      mutationFn: editTemplate,
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["templates"],
        });
        router.push("/templates");
      },
    });

  const initialValues = templateData && {
    name: templateData?.name,
    description: templateData?.description || "",
    template: templateData?.template || "",
  };

  return (
    <div className="">
      {initialValues ? (
        <TemplateForm
          handleSubmit={async (values) => {
            console.log(values, id);
            const res = await mutateEditemplate({
              id: Number(id),
              name: values.name,
              description: values.description,
              template: values.template,
            });
          }}
          initialValues={initialValues}
          btnText="Update Template"
          heading="Edit template"
        />
      ) : null}
    </div>
  );
}
