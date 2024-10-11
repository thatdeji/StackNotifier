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

export default function Logs() {
  const { data: logsData } = useQuery({
    queryKey: ["logs"],
    queryFn: () => getLogs(),
  });

  return (
    <div className="">
      <Table>
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
          {logsData?.map((log) => (
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
  );
}
