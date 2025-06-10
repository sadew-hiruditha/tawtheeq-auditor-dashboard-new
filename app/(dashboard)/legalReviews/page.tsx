// file: app/(dashboard)/reviews/page.tsx
import { columns } from "./columns";
import { DataTable } from "@/components/dashboard/DataTable";
import { getReviewRequests } from "@/lib/mock-data"; // Import from our new file

export default async function LegalReviewsPage() {
  const data = await getReviewRequests(); // Use the new function

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Legal Review Requests</h1>
      </div>
      <DataTable columns={columns} data={data} />
    </div>
  );
}