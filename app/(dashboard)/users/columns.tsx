// file: app/(dashboard)/users/columns.tsx
"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// CORRECTED: Define the shape of our User data with SRS terminology
export type User = {
  id: string;
  name: string;
  email: string;
  role: "ORIGINATOR" | "RESPONDER" | "LAWYER" | "ADMIN" | "AUDITOR";
  createdAt: string;
};

// CORRECTED: Helper function to assign colors to roles
const getRoleBadgeVariant = (role: User["role"]) => {
  switch (role) {
    case "ADMIN":
    case "AUDITOR":
      return "destructive";
    case "LAWYER":
      return "default";
    case "ORIGINATOR": // Corrected from CLIENT
      return "outline";
    case "RESPONDER":  // Corrected from FREELANCER
      return "secondary";
    default:
      return "secondary";
  }
};

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "id",
    header: "User ID",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => {
      const role = row.getValue("role") as User["role"];
      // Capitalize first letter for display
      const displayRole = role.charAt(0).toUpperCase() + role.slice(1).toLowerCase();
      return (
        <Badge variant={getRoleBadgeVariant(role)}>
          {displayRole}
        </Badge>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Date Joined",
  },
  {
    id: "actions",
    cell: ({ row }) => {
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
            <DropdownMenuItem>View User Details</DropdownMenuItem>
            <DropdownMenuItem>View Associated Contracts</DropdownMenuItem>
            <DropdownMenuItem className="text-red-600">Suspend User</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];