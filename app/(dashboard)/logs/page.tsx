"use client";

import { getLogs } from "@/app/actions";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDate, truncateText } from "@/utils/utils";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import usePagination from "@/custom-hooks/usePagination";

export default function Logs() {
  const [page, setPage] = useState<number>(0);

  const { data: logsData } = useQuery({
    queryKey: ["logs"],
    queryFn: () => getLogs(page),
  });

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  const Pagination = usePagination(
    logsData?.count ?? 0,
    handlePageChange,
    page
  );

  return (
    <div className="flex flex-col gap-4 flex-grow">
      <div className="flex-grow">
        <Table className="">
          <TableCaption className="sr-only">A list of your logs.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="">Title</TableHead>
              <TableHead>Message</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="">Status</TableHead>
              <TableHead className="">Type</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {logsData?.logs?.map((log) => (
              <TableRow key={log.id}>
                <TableCell className="font-medium">{log.title}</TableCell>
                <TableCell>{truncateText(log.message || "", 50)}</TableCell>
                <TableCell>{formatDate(log?.created_at ?? "")}</TableCell>
                <TableCell className="capitalize">{log.status}</TableCell>
                <TableCell>{log.type}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {Pagination}
    </div>
  );
}
