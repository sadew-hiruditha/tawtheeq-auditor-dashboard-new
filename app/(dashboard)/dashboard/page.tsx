"use client";
// file: app/(dashboard)/dashboard/page.tsx
import { useEffect, useState } from "react";
import { StatCard } from "@/components/dashboard/StatCard";
import { RecentContractsTable } from "@/components/dashboard/RecentContractsTable";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  FileText,
  CheckCircle2,
  Hourglass,
  AlertTriangle,
} from "lucide-react";

// Define a type for Contract
interface Contract {
  contract_id: number;
  contract_name: string;
  contract_type: string;
  originator_id: number;
  responder_id: number;
  lawyer_id?: number;
  template_id?: number;
  file_path?: string;
  sha256_hash?: string;
  created_at?: string;
  fully_signed_at?: string | null;
}

// Update RecentContract type
export interface RecentContract {
  contract_name: string;
  contract_type: string;
  originator: string;
  responder: string;
  status: string;
  date: string;
}

export default function DashboardPage() {
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [userMap, setUserMap] = useState<Record<number, string>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchContractsAndUsers() {
      setLoading(true);
      const res = await fetch("http://localhost:5050/api/contracts");
      const data: Contract[] = await res.json();
      setContracts(data);
      // Get unique user IDs
      const userIds = Array.from(
        new Set([
          ...data.map((c) => c.originator_id),
          ...data.map((c) => c.responder_id),
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
      setUserMap(Object.fromEntries(userEntries));
      setLoading(false);
    }
    fetchContractsAndUsers();
  }, []);

  // Calculate stats from contracts
  const totalContracts = contracts.length;
  const completedContracts = contracts.filter((c) => c.fully_signed_at).length;
  const pendingContracts = contracts.filter((c) => !c.fully_signed_at).length;
  const disputedContracts = contracts.filter((c) => c.contract_type === "Disputed").length;

  const statsData = [
    {
      title: "Total Contracts",
      value: totalContracts.toString(),
      description: "All contracts in the system",
      Icon: FileText,
    },
    {
      title: "Completed Contracts",
      value: completedContracts.toString(),
      description: "Signed and verified by all parties",
      Icon: CheckCircle2,
    },
    {
      title: "Pending Contracts",
      value: pendingContracts.toString(),
      description: "Awaiting signatures or review",
      Icon: Hourglass,
    },
    {
      title: "Disputed Contracts",
      value: disputedContracts.toString(),
      description: "Contracts marked for review",
      Icon: AlertTriangle,
    },
  ];

  // Map contracts to RecentContract type for the table
  const recentContracts: RecentContract[] = contracts.slice(0, 5).map((c) => ({
    contract_name: c.contract_name,
    contract_type: c.contract_type,
    originator: userMap[c.originator_id] || c.originator_id?.toString() || "N/A",
    responder: userMap[c.responder_id] || c.responder_id?.toString() || "N/A",
    status: c.fully_signed_at
      ? "Completed"
      : c.contract_type === "Disputed"
      ? "Disputed"
      : "Pending",
    date: c.created_at ? c.created_at.slice(0, 10) : "",
  }));

  return (
    <div className="space-y-8 pb-20 md:pb-0">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          Auditor Dashboard
        </h1>
        <p className="mt-1 mb-6 text-lg text-gray-600">
          Welcome back! s an overview of the contract verification system.
        </p>

        {/* Responsive Grid for Stat Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {statsData.map((stat) => (
            <StatCard
              key={stat.title}
              title={stat.title}
              value={stat.value}
              description={stat.description}
              Icon={stat.Icon}
            />
          ))}
        </div>


        {/* Container for the recent contracts table */}
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Recent Contracts</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div>Loading...</div>
              ) : (
                <RecentContractsTable contracts={recentContracts} />
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}