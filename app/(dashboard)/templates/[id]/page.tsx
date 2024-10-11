"use client";

import { editTemplate, getSingleTemplate } from "@/app/actions";
import TemplateForm from "@/components/templates/TemplateForm/TemplateForm";
import { QUERY_KEY_TEMPLATES } from "@/utils/constants";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function EditTemplate() {
  const { id } = useParams();

  const queryClient = useQueryClient();

  const router = useRouter();

  const { data: templateData } = useQuery({
    queryKey: [QUERY_KEY_TEMPLATES, id],
    queryFn: () => getSingleTemplate(Number(id)),
  });

  const { mutateAsync: mutateEditemplate, isPending: isPendingEditTemplate } =
    useMutation({
      mutationFn: editTemplate,
      onError: (error) => {
        console.log(error);
        toast.error(`${error}`);
      },
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEY_TEMPLATES],
        });
        toast.success("Template updated successfully");
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
          loading={isPendingEditTemplate}
        />
      ) : null}
    </div>
  );
}
