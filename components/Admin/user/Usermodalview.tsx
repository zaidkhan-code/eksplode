"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { X, Mail, Phone } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import GlobalSwitch from "@/components/ui/Switch";
import { Button } from "@/components/ui/button";
import useApi from "@/lib/useApi";
import { toast } from "sonner";
import { formatCurrency } from "@/lib/utils";

export default function UserViewModal({
  user,
  onClose,
  onStatusChange,
}: {
  user: any;
  onClose: () => void;
  onStatusChange: () => void;
}) {
  const handleStatusToggle = () => {
    const newStatus = user.status === "active" ? "inactive" : "active";

    useApi(
      `admin/update-status/`,
      { method: "PUT", data: { status: newStatus, userId: user?._id } },
      (res: any, success: boolean) => {
        if (success) {
          toast.success("Status updated!");
          onStatusChange();
          onClose();
        } else toast.error("Failed to update status");
      }
    );
  };

  return (
    <Dialog.Root open={true} onOpenChange={onClose}>
      <Dialog.Portal>
        {/* Overlay */}
        <Dialog.Overlay className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50" />

        {/* Centered Modal */}
        <Dialog.Content
          className="
            fixed top-1/2 left-1/2 z-50 
            w-[95%] sm:w-[90%] md:w-[80%] lg:w-[70%] max-w-2xl  max-h-[90vh] overflow-auto
            -translate-x-1/2 -translate-y-1/2
          "
        >
          <Card className="bg-black border border-red-500/30 rounded-xl shadow-2xl">
            {/* Header */}
            <CardHeader className="border-b border-red-500/20 flex flex-row items-center justify-between p-5">
              <CardTitle className="text-white text-xl font-semibold">
                {user.name}
              </CardTitle>

              <Dialog.Close asChild>
                <button className="p-1 hover:bg-red-600/20 rounded-lg transition">
                  <X className="w-5 h-5 text-gray-300" />
                </button>
              </Dialog.Close>
            </CardHeader>

            {/* Content */}
            <CardContent className="space-y-6 p-6">
              {/* Status Toggle */}
              <div className="flex items-center justify-between">
                <p className="text-gray-400 text-sm">Account Status</p>
                <GlobalSwitch
                  checked={user.status === "active"}
                  onChange={handleStatusToggle}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Email */}
                <div>
                  <p className="text-gray-400 text-sm">Email</p>
                  <p className="text-white flex items-center gap-2 mt-1 break-all">
                    <Mail className="w-4 h-4" />
                    {user.email}
                  </p>
                </div>

                {/* Phone */}
                <div>
                  <p className="text-gray-400 text-sm">Phone</p>
                  <p className="text-white flex items-center gap-2 mt-1">
                    <Phone className="w-4 h-4" />
                    {user.zellePaymentDetails?.phoneNumber || "N/A"}
                  </p>
                </div>

                {/* Zelle Email */}
                <div>
                  <p className="text-gray-400 text-sm">Zelle Email</p>
                  <p className="text-white mt-1 break-all">
                    {user.zellePaymentDetails?.email || "N/A"}
                  </p>
                </div>

                {/* Balance */}
                <div>
                  <p className="text-gray-400 text-sm">Balance</p>
                  <p className="text-red-400 text-lg leading-relaxed">
                    Available: {formatCurrency(user.balance.available)} <br />
                    Pending: {formatCurrency(user.balance.pending)}
                  </p>
                </div>

                {/* Shares */}
                <div>
                  <p className="text-gray-400 text-sm">Total Shares</p>
                  <p className="text-blue-400 text-xl font-semibold">
                    {user.totalShares}
                  </p>
                </div>

                {/* Conversions */}
                <div>
                  <p className="text-gray-400 text-sm">Total Conversions</p>
                  <p className="text-purple-400 text-xl font-semibold">
                    {user.totalConversions}
                  </p>
                </div>

                {/* Earnings (full row) */}
                <div className="sm:col-span-2">
                  <p className="text-gray-400 text-sm">Total Earnings</p>
                  <p className="text-green-400 text-2xl font-bold mt-1">
                    {formatCurrency(user.totalEarnings)}
                  </p>
                </div>
              </div>

              {/* Close Button */}
              <Button
                onClick={onClose}
                className="w-full bg-red-600 hover:bg-red-700 py-3 text-lg"
              >
                Close
              </Button>
            </CardContent>
          </Card>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
