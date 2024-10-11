"use client";
import { getReminders } from "@/app/actions";
import ReminderDialog from "@/components/reminders/ReminderDialog/ReminderDialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Skeleton } from "@/components/ui/skeleton";
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
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export default function Reminders() {
  const [reminderModal, setReminderModal] = useState<{
    isOpen: boolean;
    name: string | null;
    id: number | null;
    templateId: string | null;
  }>({
    isOpen: false,
    name: "",
    id: null,
    templateId: null,
  });
  const [page, setPage] = useState<number>(0);

  const { data: remindersData, isPending: isPendingReminders } = useQuery({
    queryKey: ["reminders"],
    queryFn: () => getReminders(),
  });

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  const Pagination = usePagination(
    remindersData?.count ?? 0,
    handlePageChange,
    page
  );

  return (
    <div className="flex flex-col gap-4 flex-grow">
      <ReminderDialog
        id={reminderModal.id}
        templateId={reminderModal.templateId}
        isOpen={reminderModal.isOpen}
        onOpenChange={(open: boolean) =>
          setReminderModal({
            isOpen: open,
            id: null,
            name: null,
            templateId: null,
          })
        }
      />

      <div className="flex-grow">
        {isPendingReminders ? (
          <div className="space-y-6">
            <Skeleton className="h-10" />
            <Skeleton className="h-10" />
            <Skeleton className="h-10" />
          </div>
        ) : (
          <Table>
            <TableCaption className="sr-only">
              A list of your reminders.
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="">Category</TableHead>
                <TableHead>Template name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Event</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {remindersData?.reminders?.map((reminder) => (
                <TableRow key={reminder.id}>
                  <TableCell className="font-medium">
                    {reminder?.name}
                  </TableCell>
                  <TableCell>
                    {reminder?.template?.name || "No template assigned"}
                  </TableCell>
                  <TableCell className="font-medium">
                    {reminder?.description}
                  </TableCell>
                  <TableCell className="font-medium">
                    {reminder?.event}
                  </TableCell>
                  <TableCell>
                    <Button
                      onClick={() =>
                        setReminderModal({
                          isOpen: true,
                          id: reminder.id,
                          name: reminder?.name,
                          templateId: reminder?.template?.id.toString(),
                        })
                      }
                      className="text-blue-500"
                      variant="ghost"
                    >
                      {reminder?.template?.name ? "Edit" : "Assign"}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>

      {Pagination}
    </div>
  );
}
