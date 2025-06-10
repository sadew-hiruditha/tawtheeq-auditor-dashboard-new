// file: app/(dashboard)/layout.tsx
import Sidebar from "@/components/dashboard/Sidebar";
import { Header } from "@/components/dashboard/Header";
import { BottomNavBar } from "@/components/dashboard/BottomNavBar";
import React from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // Use a React Fragment <> to have two top-level sibling elements
    <>
      {/* SIBLING 1: The main content of the page */}
      <div className="flex h-screen w-full bg-white">
        <Sidebar /> {/* Desktop sidebar */}
        <div className="flex flex-1 flex-col">
          <Header /> {/* Desktop header */}
          <main className="flex-1 overflow-y-auto p-6 lg:p-8 pb-24 md:pb-6">
            {/* 
              This padding is the key for mobile scrolling:
              - pb-24: Adds 6rem of padding at the bottom on mobile.
              - md:pb-6: Resets the padding to the default on desktop.
            */}
            {children}
          </main>
        </div>
      </div>

      {/* SIBLING 2: The mobile-only bottom nav bar */}
      <BottomNavBar />
    </>
  );
}