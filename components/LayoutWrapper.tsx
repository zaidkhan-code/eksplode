import React from "react";
import { Sidebar } from "@/components/sidebar";

interface LayoutWrapperProps {
  children: React.ReactNode;
}

export const LayoutWrapper: React.FC<LayoutWrapperProps> = ({ children }) => {
  return (
    <div className="flex flex-col md:flex-row h-screen bg-background">
      {/* Sidebar on top for mobile, left for desktop */}
      <div className="w-full md:w-auto">
        <Sidebar />
      </div>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto">{children}</main>
    </div>
  );
};
