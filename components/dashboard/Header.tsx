// file: components/dashboard/Header.tsx
"use client";

// A simple header that is only visible on desktop
export const Header = () => {
  return (
    <header className="hidden md:flex h-14 items-center gap-4 border-b bg-background px-6">
      <div className="flex-1">
        <h1 className="font-semibold text-lg">Auditor Dashboard</h1>
      </div>
      {/* You can add a User profile button here later */}
    </header>
  );
};