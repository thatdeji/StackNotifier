"use client";

import { getTemplates } from "@/app/actions";
import DeleteTemplate from "@/components/templates/DeleteTemplate/DeleteTemplate";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import usePagination from "@/custom-hooks/usePagination";
import { formatDate, truncateText } from "@/utils/utils";
import { DeleteIcon } from "@/vectors/delete";
import { EditIcon } from "@/vectors/edit";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Templates() {
  const router = useRouter();

  const [page, setPage] = useState<number>(0);
  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    name: string | null;
    templateId: number | null;
  }>({
    isOpen: false,
    name: "",
    templateId: null,
  });

  const { data: templatesData } = useQuery({
    queryKey: ["templates"],
    queryFn: () => getTemplates(),
  });

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  const Pagination = usePagination(
    templatesData?.count ?? 0,
    handlePageChange,
    page
  );

  return (
    <div className="flex flex-col gap-4 flex-grow">
      <DeleteTemplate
        isOpen={deleteModal.isOpen}
        onOpenChange={(open: boolean) =>
          setDeleteModal({ isOpen: open, templateId: null, name: null })
        }
        id={deleteModal.templateId}
        name={deleteModal.name}
      />
      <div className="w-full flex flex-col lg:flex-row lg:items-center justify-between gap-3 mb-8">
        <div></div>
        <Button onClick={() => router.push("/templates/new")} className="w-fit">
          Create new template
        </Button>
      </div>
      <div className="flex-grow">
        <Table>
          <TableCaption className="sr-only">
            A list of your templates.
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="">Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Template</TableHead>
              <TableHead className="">Date Created</TableHead>
              <TableHead className=""></TableHead>
              <TableHead className=""></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {templatesData?.templates?.map((template) => (
              <TableRow key={template.id}>
                <TableCell className="font-medium">{template.name}</TableCell>
                <TableCell>
                  {truncateText(template.description || "", 20)}
                </TableCell>
                <TableCell>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: truncateText(template.template ?? "", 100),
                    }}
                  ></div>
                </TableCell>
                <TableCell>{formatDate(template?.created_at ?? "")}</TableCell>
                <TableCell className="">
                  <button
                    onClick={() => router.push(`/templates/${template.id}`)}
                  >
                    <EditIcon />
                  </button>
                </TableCell>
                <TableCell className="">
                  <button
                    onClick={() =>
                      setDeleteModal({
                        isOpen: true,
                        templateId: template.id,
                        name: template.name,
                      })
                    }
                  >
                    <DeleteIcon />
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {Pagination}
    </div>
  );
}
