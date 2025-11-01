import React from "react";
import { Sidebar } from "@/components/ui/sidebar";

interface LayoutWrapperProps {
  children: React.ReactNode;
}

export const LayoutWrapper: React.FC<LayoutWrapperProps> = ({ children }) => {
  return (
    <div className="flex flex-col md:flex-row  overflow-y-hidden h-screen  ">
      <div className="w-full md:w-auto ">
        <Sidebar />
      </div>
      <main className="flex-1 overflow-y-auto">{children}</main>
    </div>
  );
};
