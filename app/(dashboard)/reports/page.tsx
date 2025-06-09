// file: app/(dashboard)/reports/page.tsx
import { StatCard } from "@/components/dashboard/StatCard";
import { InsightCard } from "@/components/dashboard/InsightCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileCheck, Ban, AlertCircle, FileText } from "lucide-react";

export default function ReportsPage() {
  return (
    <div>
      {/* Page Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Reports & Analytics</h1>
          <p className="text-lg text-gray-600">
            Contract performance metrics and insights.
          </p>
        </div>
        {/* We can add a Date Picker or Download Button here later */}
      </div>

      {/* Top-level Stat Cards Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <StatCard title="Verification Rate" value="98.5%" description="Contracts successfully verified" Icon={FileCheck} />
        <StatCard title="Rejection Rate" value="1.5%" description="Contracts failed verification" Icon={Ban} />
        <StatCard title="Average Processing Time" value="< 2s" description="From signature to timestamp" Icon={FileText} />
        <StatCard title="Disputes Raised" value="28" description="Contracts currently in dispute" Icon={AlertCircle} />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        
        {/* Left Side: Performance Insights */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Performance Insights</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <InsightCard title="Target Achievement" value={85} colorClass="bg-blue-600" />
            <InsightCard title="Originator Satisfaction" value={92} colorClass="bg-green-600" />
            <InsightCard title="Responder Engagement" value={67} colorClass="bg-yellow-500" />
          </CardContent>
        </Card>

        {/* Right Side: Status Breakdown */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Status Breakdown</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Completed Contracts</span>
              <span className="font-bold text-lg text-green-600">3,150</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Pending Contracts</span>
              <span className="font-bold text-lg text-yellow-600">1,203</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Disputed Contracts</span>
              <span className="font-bold text-lg text-red-600">28</span>
            </div>
             <div className="flex items-center justify-between">
              <span className="text-gray-600">Drafts</span>
              <span className="font-bold text-lg text-gray-500">440</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}