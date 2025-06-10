// file: app/(dashboard)/users/page.tsx
import { columns, User } from "./columns";
import { DataTable } from "@/components/dashboard/DataTable";
import { Button } from "@/components/ui/button";

// CORRECTED: This mock data now uses the correct role terminology.
async function getUsers(): Promise<User[]> {
  return [
    {
      id: "USR-001",
      name: "Alice Johnson",
      email: "alice@example.com",
      role: "RESPONDER", // Corrected
      createdAt: "2024-01-10",
    },
    {
      id: "USR-002",
      name: "Innovate Inc.",
      email: "contact@innovate.com",
      role: "ORIGINATOR", // Corrected
      createdAt: "2024-01-15",
    },
    {
      id: "USR-003",
      name: "John Smith",
      email: "john.smith@lawfirm.com",
      role: "LAWYER",
      createdAt: "2024-02-20",
    },
    {
      id: "USR-004",
      name: "Admin User",
      email: "admin@tawtheeq.com",
      role: "ADMIN",
      createdAt: "2023-12-01",
    },
     {
      id: "USR-005",
      name: "Bob Williams",
      email: "bob@example.com",
      role: "RESPONDER", 
      createdAt: "2024-03-05",
    },
  ];
}

export default async function UsersPage() {
  const data = await getUsers();

  return (
    <div className="container mx-auto py-10 pb-20 md:pb-10">
      <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">User Management</h1>
          <Button>Add New User</Button>
      </div>
      <DataTable columns={columns} data={data} />
    </div>
  );
}