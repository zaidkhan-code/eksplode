"use client";

import { useAuth } from "@/components/Context/AuthContext";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import Loader from "./Loader";

export default function ProtectedLayout({
  children,
  allowedRole,
}: {
  children: React.ReactNode;
  allowedRole: string;
}) {
  const { user } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // If user not logged in
    if (!user) {
      router.replace("/auth/login");
      return;
    }

    // If role does not match
    if (user?.role !== allowedRole) {
      router.replace(`/${user?.role}/dashboard`);
    }
  }, [user, pathname]);

  if (!user || user?.role !== allowedRole) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader loading={true} />
      </div>
    );
  }

  return <>{children}</>;
}
