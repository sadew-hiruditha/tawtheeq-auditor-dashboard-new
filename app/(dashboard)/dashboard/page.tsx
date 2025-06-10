// file: app/(dashboard)/dashboard/page.tsx
import { StatCard } from "@/components/dashboard/StatCard";
import { RecentContractsTable } from "@/components/dashboard/RecentContractsTable";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  FileText,
  CheckCircle2,
  Hourglass,
  AlertTriangle,
} from "lucide-react";

export default function DashboardPage() {
  const statsData = [
    {
      title: "Total Contracts",
      value: "4,821",
      description: "All contracts in the system",
      Icon: FileText,
    },
    {
      title: "Completed Contracts",
      value: "3,150",
      description: "Signed and verified by all parties",
      Icon: CheckCircle2,
    },
    {
      title: "Pending Contracts",
      value: "1,203",
      description: "Awaiting signatures or review",
      Icon: Hourglass,
    },
    {
      title: "Disputed Contracts",
      value: "28",
      description: "Contracts marked for review",
      Icon: AlertTriangle,
    },
  ];

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
            <RecentContractsTable />
          </CardContent>
        </Card>
      </div>
    </div>
    </div>
  );
}