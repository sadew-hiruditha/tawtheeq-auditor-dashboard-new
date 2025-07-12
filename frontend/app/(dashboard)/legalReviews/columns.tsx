// file: app/(dashboard)/legalReviews/columns.tsx
"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Define the shape of our data
export type Contract = {
  id: string;
  title: string;
  status: "Completed" | "Pending" | "Disputed" | "Draft";
  originator: string;
  responder: string;
  createdAt: string;
};

const getStatusBadgeVariant = (status: Contract["status"]) => {
  switch (status) {
    case "Completed": return "default";
    case "Pending": return "secondary";
    case "Disputed": return "destructive";
    default: return "outline";
  }
};

export const columns: ColumnDef<Contract>[] = [
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => {
      const title = row.getValue("title") as string;
      return (
        <Link href={`/legalReviews/CTR-001`} className="hover:underline text-blue-600 font-medium">
          {title}
        </Link>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as Contract["status"];
      return (
        <Badge variant={getStatusBadgeVariant(status)}>
          {status}
        </Badge>
      );
    },
  },
  {
    accessorKey: "originator",
    header: "Originator",
  },
  {
    accessorKey: "responder",
    header: "Responder",
  },
  {
    accessorKey: "createdAt",
    header: "Creation Date",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const contract = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>
              <Link href={`/legalReviews/${contract.id}`}>
                Start Review
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(contract.id)}>
              Copy Contract ID
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
