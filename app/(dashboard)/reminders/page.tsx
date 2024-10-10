"use client";
import { getReminders } from "@/app/actions";
import ReminderDialog from "@/components/reminders/ReminderDialog/ReminderDialog";
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

  const { data: remindersData } = useQuery({
    queryKey: ["reminders"],
    queryFn: () => getReminders(),
  });

  return (
    <div className="">
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
      <Table>
        <TableCaption className="sr-only">
          A list of your reminders.
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="">Category</TableHead>
            <TableHead>Template name</TableHead>
            <TableHead>Successful Emails</TableHead>
            <TableHead>Failed Emails</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {remindersData?.map((reminder) => (
            <TableRow key={reminder.id}>
              <TableCell className="font-medium">{reminder?.name}</TableCell>
              <TableCell>
                {reminder?.template?.name || "No template assigned"}
              </TableCell>
              <TableCell className="font-medium">
                {reminder?.success_emails || 0}
              </TableCell>
              <TableCell className="font-medium">
                {reminder?.failed_emails || 0}
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
    </div>
  );
}
