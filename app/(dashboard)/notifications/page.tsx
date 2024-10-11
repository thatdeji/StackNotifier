"use client";
import { getNotifications } from "@/app/actions";
import NotificationDialog from "@/components/notifications/NotificationDialog/NotificationDialog";
import { Button } from "@/components/ui/button";
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
import { QUERY_KEY_NOTIFCATIONS } from "@/utils/constants";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export default function notifications() {
  const [notificationModal, setnotificationModal] = useState<{
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

  const { data: notificationsData, isPending: isPendingnotifications } =
    useQuery({
      queryKey: [QUERY_KEY_NOTIFCATIONS],
      queryFn: () => getNotifications(page),
    });

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  const Pagination = usePagination(
    notificationsData?.count ?? 0,
    handlePageChange,
    page
  );

  return (
    <div className="flex flex-col gap-4 flex-grow">
      <NotificationDialog
        id={notificationModal.id}
        templateId={notificationModal.templateId}
        isOpen={notificationModal.isOpen}
        onOpenChange={(open: boolean) =>
          setnotificationModal({
            isOpen: open,
            id: null,
            name: null,
            templateId: null,
          })
        }
      />

      <div className="flex-grow">
        {isPendingnotifications ? (
          <div className="space-y-6">
            <Skeleton className="h-10" />
            <Skeleton className="h-10" />
            <Skeleton className="h-10" />
          </div>
        ) : (
          <Table>
            <TableCaption className="sr-only">
              A list of your notifications.
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
              {notificationsData?.notifications?.map((notification) => (
                <TableRow key={notification.id}>
                  <TableCell className="font-medium">
                    {notification?.name}
                  </TableCell>
                  <TableCell>
                    {notification?.template?.name || "No template assigned"}
                  </TableCell>
                  <TableCell className="font-medium">
                    {notification?.description}
                  </TableCell>
                  <TableCell className="font-medium">
                    {notification?.event}
                  </TableCell>
                  <TableCell>
                    <Button
                      onClick={() =>
                        setnotificationModal({
                          isOpen: true,
                          id: notification.id,
                          name: notification?.name,
                          templateId: notification?.template?.id.toString(),
                        })
                      }
                      className="text-blue-500"
                      variant="ghost"
                    >
                      {notification?.template?.name ? "Edit" : "Assign"}
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
