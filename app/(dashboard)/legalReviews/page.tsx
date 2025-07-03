// file: app/(dashboard)/reviews/page.tsx
"use client";

import { columns, Contract as TableContract } from "./columns";
import { DataTable } from "@/components/dashboard/DataTable";
import { useEffect, useState } from "react";

export default function LegalReviewsPage() {
  const [data, setData] = useState<TableContract[]>([]);
  const [userMap, setUserMap] = useState<Record<number, string>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchContractsAndUsers() {
      setLoading(true);
      const res = await fetch("http://localhost:5050/api/contracts");
      const contracts = await res.json();
      // Get unique user IDs
      const userIds = Array.from(
        new Set([
          ...contracts.map((c: any) => c.originator_id),
          ...contracts.map((c: any) => c.responder_id),
        ])
      ).filter(Boolean);
      // Fetch all user names in parallel
      const userEntries = await Promise.all(
        userIds.map(async (id) => {
          const res = await fetch(`http://localhost:5050/api/users/${id}`);
          if (!res.ok) return [id, `User ${id}`];
          const user = await res.json();
          return [id, user.name || `User ${id}`];
        })
      );
      const userMap = Object.fromEntries(userEntries);
      setUserMap(userMap);
      // Map backend contracts to table columns
      const mapped: TableContract[] = contracts.map((c: any) => ({
        id: `CTR-${c.contract_id?.toString().padStart(3, "0")}`,
        title: c.contract_name,
        status: c.fully_signed_at
          ? "Completed"
          : c.contract_type === "Disputed"
          ? "Disputed"
          : "Pending",
        originator: userMap[c.originator_id] || c.originator_id?.toString() || "N/A",
        responder: userMap[c.responder_id] || c.responder_id?.toString() || "N/A",
        createdAt: c.created_at ? c.created_at.slice(0, 10) : "",
      }));
      setData(mapped);
      setLoading(false);
    }
    fetchContractsAndUsers();
  }, []);

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Legal Review Requests</h1>
      </div>
      {loading ? <div>Loading...</div> : <DataTable columns={columns} data={data} />}
    </div>
  );
}