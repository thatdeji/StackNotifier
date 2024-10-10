"use client";
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
import { useState } from "react";

const remindersData = [
  {
    id: 0,
    category: "New Subscription",
    selectedTemplate: {
      id: 0,
      name: "Welcome Template",
      description: "Send a welcome email to new customers",
    },
    successfulEmails: 30,
    failedEmails: 2,
  },
  {
    id: 1,
    category: "Subscription Renewal",
    selectedTemplate: null,
    successfulEmails: 0,
    failedEmails: 0,
  },
  {
    id: 2,
    category: "Cancelled Subscription",
    selectedTemplate: {
      id: 2,
      name: "Cancellation Follow-Up",
      description: "Send a follow-up email to customers who recently canceled",
    },
    successfulEmails: 30,
    failedEmails: 0,
  },
];

export default function Reminders() {
  const [reminderModal, setReminderModal] = useState<{
    isOpen: boolean;
    name: string | null;
    categoryId: number | null;
  }>({
    isOpen: false,
    name: "",
    categoryId: null,
  });

  return (
    <div className="">
      <ReminderDialog
        id={reminderModal.categoryId}
        isOpen={reminderModal.isOpen}
        onOpenChange={(open: boolean) =>
          setReminderModal({ isOpen: open, categoryId: null, name: null })
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
          {remindersData.map((reminder) => (
            <TableRow key={reminder.id}>
              <TableCell className="font-medium">{reminder.category}</TableCell>
              <TableCell>
                {reminder.selectedTemplate?.name || "No template assigned"}
              </TableCell>
              <TableCell className="font-medium">
                {reminder.successfulEmails}
              </TableCell>
              <TableCell className="font-medium">
                {reminder.failedEmails}
              </TableCell>
              <TableCell>
                <Button
                  onClick={() =>
                    setReminderModal({
                      isOpen: true,
                      categoryId: reminder.id,
                      name: reminder.category,
                    })
                  }
                  className="text-blue-500"
                  variant="ghost"
                >
                  {reminder.selectedTemplate ? "Edit" : "Assign"}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
