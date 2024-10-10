"use client";

import DeleteTemplate from "@/components/templates/DeleteTemplate/DeleteTemplate";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { truncateText } from "@/utils/utils";
import { DeleteIcon } from "@/vectors/delete";
import { EditIcon } from "@/vectors/edit";
import { useRouter } from "next/navigation";
import { useState } from "react";

const templates = [
  {
    id: 0,
    name: "Welcome Template",
    description: "Send a welcome email to new customers",
    logo: "https://via.placeholder.com/150",
    template: "Hello, {{name}}! Welcome to our platform.",
    category: "New Subscriptionw",
  },
  {
    id: 1,
    name: "Renewal Reminder",
    description: "Send a reminder to customers to renew their subscription",
    logo: "https://via.placeholder.com/150",
    template: "Hi {{name}}, your subscription is about to expire.",
    category: "Subscription Renewal",
  },
  {
    id: 2,
    name: "Cancellation Follow-Up",
    description: "Send a follow-up email to customers who recently canceled",
    logo: "https://via.placeholder.com/150",
    template: "We're sorry to see you go. Can we help with anything?",
    category: "Cancelled Subscription",
  },
  {
    id: 3,
    name: "Welcome Template 2",
    description: "Integrate to send a welcome email to new customers",
    logo: "https://via.placeholder.com/150",
    template: "How was your experience with our product?",
    category: "Customer Feedback",
  },
];

export default function Templates() {
  const router = useRouter();
  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    name: string | null;
    templateId: number | null;
  }>({
    isOpen: false,
    name: "",
    templateId: null,
  });

  return (
    <div className="">
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
      <Table>
        <TableCaption className="sr-only">
          A list of your templates.
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="">Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Template</TableHead>
            <TableHead className="">Category</TableHead>
            <TableHead className=""></TableHead>
            <TableHead className=""></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {templates.map((template) => (
            <TableRow key={template.id}>
              <TableCell className="font-medium">{template.name}</TableCell>
              <TableCell>{truncateText(template.description, 50)}</TableCell>
              <TableCell>{truncateText(template.template, 100)}</TableCell>
              <TableCell>{template.category}</TableCell>
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
        {/* <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">$2,500.00</TableCell>
        </TableRow>
      </TableFooter> */}
      </Table>
    </div>
  );
}
