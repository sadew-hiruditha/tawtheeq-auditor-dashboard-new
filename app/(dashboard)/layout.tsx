// file: app/(dashboard)/layout.tsx
import Sidebar from "@/components/dashboard/Sidebar";
import React from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen w-full bg-white">
      <Sidebar />
      <main className="flex-1 flex flex-col overflow-y-auto">
        {/* We can add a Header component here later */}
        <div className="flex-1 p-6 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}