"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { X, Store, DollarSign } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import GlobalSwitch from "@/components/ui/Switch";
import useApi from "@/lib/useApi";
import { toast } from "sonner";
import { formatCurrency, formatDate } from "@/lib/utils";

export default function MerchantViewModal({
  merchant,
  onClose,
  onStatusChange,
}: {
  merchant: any;
  onClose: () => void;
  onStatusChange: () => void;
}) {
  const handleStatusToggle = () => {
    const newStatus = merchant.status === "active" ? "inactive" : "active";
    useApi(
      `admin/update-status/`,
      { method: "PUT", data: { userId: merchant._id, status: newStatus } },
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
        <Dialog.Overlay className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50" />
        <Dialog.Content className="fixed top-1/2 left-1/2 z-50 w-full max-w-2xl max-h-[90vh] overflow-auto -translate-x-1/2 -translate-y-1/2 p-4">
          <Card className="bg-black border border-red-500/30 rounded-xl shadow-xl">
            <CardHeader className="border-b border-red-500/20 flex items-center justify-between">
              <CardTitle className="text-white text-lg">
                {merchant.name}
              </CardTitle>
              <Dialog.Close asChild>
                <button>
                  <X className="w-5 h-5 text-gray-300" />
                </button>
              </Dialog.Close>
            </CardHeader>
            <CardContent className="space-y-5 py-5">
              {/* Status */}
              <div className="flex items-center justify-between">
                <p className="text-gray-400 text-sm">Account Status</p>
                <GlobalSwitch
                  checked={merchant.status === "active"}
                  onChange={handleStatusToggle}
                />
              </div>

              {/* Email */}
              <div>
                <p className="text-gray-400 text-sm">Email</p>
                <p className="text-white mt-1">{merchant.email}</p>
              </div>

              {/* Balance */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-400 text-sm">Balance Available</p>
                  <p className="text-green-400 font-bold text-lg mt-1">
                    {formatCurrency(merchant.balance.available)}
                  </p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Balance Pending</p>
                  <p className="text-red-400 font-bold text-lg mt-1">
                    {formatCurrency(merchant.balance.pending)}
                  </p>
                </div>
              </div>

              {/* Products & Orders */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-400 text-sm">Total Products</p>
                  <p className="text-white font-bold text-lg mt-1">
                    {merchant.totalProducts}
                  </p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Total Orders</p>
                  <p className="text-white font-bold text-lg mt-1">
                    {merchant.totalOrder}
                  </p>
                </div>
              </div>

              {/* Sales & Earnings */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-400 text-sm">Total Sales</p>
                  <p className="text-red-400 font-bold text-lg mt-1">
                    {formatCurrency(merchant.totalSales)}
                  </p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Merchant Earnings</p>
                  <p className="text-green-400 font-bold text-lg mt-1">
                    {formatCurrency(merchant.totalRevenue)}
                  </p>
                </div>
              </div>

              {/* Joined */}
              <div>
                <p className="text-gray-400 text-sm">Joined</p>
                <p className="text-white font-bold text-lg mt-1">
                  {formatDate(merchant.createdAt)}
                </p>
              </div>

              <Button
                onClick={onClose}
                className="w-full bg-red-600 hover:bg-red-700"
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
