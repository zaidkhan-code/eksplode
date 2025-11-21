import { Button } from "@/components/ui/button";
import useApi from "@/lib/useApi";
import { DollarSign, Ban, X, CheckCircle } from "lucide-react";
import { toast } from "sonner";

export default function TopActionPanel({
  selectedRows,
  setOpenPaymentModal,
  onClose,
  fetchLedger,
}: {
  selectedRows: any[];
  setOpenPaymentModal: (open: boolean) => void;
  onClose: () => void;
}) {
  const ledgerIds = selectedRows?.map((item) => item?._id);
  function updateStatus() {
    useApi(
      "admin/bulk-Update-Ledger-Status",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        data: {
          ledgerIds,
          status: "available",
        },
      },
      (res, status) => {
        if (status) {
          toast.success("ledger is successfully updated!");
          fetchLedger();
        } else {
          toast.error(res?.message);
        }
      }
    );
  }
  return (
    <div
      className={`fixed top-0 left-0 right-0 z-50 overflow-hidden transition-all duration-500 ease-in-out
        ${
          selectedRows?.length > 0
            ? "max-h-40 sm:max-h-24 opacity-100 translate-y-0"
            : "max-h-0 -translate-y-full"
        }
      `}
    >
      <div className="bg-gray-900/95 backdrop-blur-md p-3 sm:p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-red-500/20 shadow-lg">
        {/* Selected count */}
        <span className="text-white font-medium text-sm sm:text-base">
          {selectedRows?.length} selected
        </span>

        {/* Buttons */}
        <div
          className="
          grid grid-cols-2 sm:flex 
          gap-2 w-full sm:w-auto
        "
        >
          {/* Mark as Paid */}
          <Button
            onClick={() => {
              setOpenPaymentModal(true);
            }}
            className="bg-green-600 hover:bg-green-700 flex items-center gap-1 justify-center text-sm"
          >
            <DollarSign size={16} />
            <span className="hidden sm:block">Mark as Paid</span>
            <span className="sm:hidden">Paid</span>
          </Button>

          {/* Mark as Available */}
          <Button
            onClick={updateStatus}
            className="bg-blue-600 hover:bg-blue-700 flex items-center gap-1 justify-center text-sm"
          >
            <CheckCircle size={16} />
            <span className="hidden sm:block">Mark as Available</span>
            <span className="sm:hidden">Available</span>
          </Button>

          {/* Close Button (Icon Only) */}
          <Button
            onClick={onClose}
            variant="ghost"
            className="hover:bg-gray-800 bg-gray-700 text-white rounded-full w-10 h-10 flex items-center justify-center"
          >
            <X size={18} />
          </Button>
        </div>
      </div>
    </div>
  );
}
