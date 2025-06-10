// file: components/dashboard/BottomNavBar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, FileText, Users, BarChart } from "lucide-react";

export const BottomNavBar = () => {
  const pathname = usePathname();

  // We can use the same navLinks array or a simplified version for mobile
  const navLinks = [
    { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { href: "/contracts", icon: FileText, label: "Contracts" },
    { href: "/users", icon: Users, label: "Users" },
    { href: "/reports", icon: BarChart, label: "Reports" },
  ];

  return (
    // This entire component is hidden on medium screens and up (md:hidden)
    <nav className="md:hidden fixed bottom-0 w-full border-t bg-background z-50">
      <div className="grid h-16 grid-cols-4">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`flex flex-col items-center justify-center gap-1 transition-colors hover:text-primary ${
              // Highlight the active link by changing the text color
              pathname === link.href
                ? "text-primary font-semibold"
                : "text-muted-foreground"
            }`}
          >
            <link.icon className="h-5 w-5" />
            <span className="text-xs">{link.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
};