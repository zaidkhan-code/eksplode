"use client";

import * as React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { uploadImageAction } from "@/app/actions/uploadImageAction";
import { toast } from "sonner";
import { formatCurrency } from "@/lib/utils";
import useApi from "@/lib/useApi";

interface Transaction {
  _id: string;
  userId: {
    _id: string;
    name: string;
    email: string;
    paymentMethod: string | null;
    zellePaymentDetails?: {
      email?: string;
      phoneNumber?: string;
    };
  };
  orderId: {
    _id: string;
    grossCents: number;
    status: string;
  };
  payoutId: any;
  type: string;
  amountCents: number;
  status: string;
  notes?: string;
  balanceAfter?: number;
  createdAt: string;
  updatedAt: string;
}

interface PaymentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedRows?: Transaction[];
  onClose: () => void;
}

export default function PaymentModal({
  open,
  selectedRows = [],
  onClose,
  fetchLedger,
}: PaymentModalProps) {
  const [mainNotes, setMainNotes] = React.useState("");
  const [paymentMethod, setPaymentMethod] = React.useState("");
  const [uploadingByUser, setUploadingByUser] = React.useState<
    Record<string, boolean>
  >({});
  const [proofUrlByUser, setProofUrlByUser] = React.useState<
    Record<string, string | null>
  >({});
  const [submitting, setSubmitting] = React.useState(false);

  // GROUP rows by user
  const uniqueUsers = React.useMemo(() => {
    const map = new Map<
      string,
      {
        userId: string;
        name: string;
        amountCents: number;
        ledgerIds: string[];
        zellePaymentDetails?: { email?: string; phoneNumber?: string };
      }
    >();

    selectedRows.forEach((t) => {
      const uid = t.userId._id;

      if (!map.has(uid)) {
        map.set(uid, {
          userId: uid,
          name: t.userId.name,
          amountCents: t.amountCents || 0,
          ledgerIds: [t._id],
          zellePaymentDetails: t.userId.zellePaymentDetails,
        });
      } else {
        const prev = map.get(uid)!;
        prev.amountCents += t.amountCents || 0;
        prev.ledgerIds.push(t._id);
      }
    });

    return Array.from(map.values());
  }, [selectedRows]);

  const totalBalance = React.useMemo(
    () => selectedRows.reduce((sum, t) => sum + (t.amountCents || 0), 0),
    [selectedRows]
  );

  // FILE UPLOAD
  const handleFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    userId: string
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 1 * 1024 * 1024) {
      toast.error("File too large. Max size is 1MB.");
      return;
    }

    const allowed = [
      "image/png",
      "image/jpeg",
      "image/jpg",
      "image/webp",
      "application/pdf",
    ];

    if (!allowed.includes(file.type)) {
      toast.error("Only images or PDF allowed.");
      return;
    }

    setUploadingByUser((s) => ({ ...s, [userId]: true }));

    try {
      const form = new FormData();
      form.append("image", file);

      const uploadRes = await uploadImageAction(form);

      if (uploadRes?.url) {
        setProofUrlByUser((s) => ({ ...s, [userId]: uploadRes.url }));
        toast.success(`Proof uploaded for ${userId}`);
      } else {
        toast.error("Upload failed.");
      }
    } catch (err) {
      toast.error("Upload failed.");
    } finally {
      setUploadingByUser((s) => ({ ...s, [userId]: false }));
    }
  };

  // CONFIRM bulk payouts
  const handleConfirm = () => {
    if (submitting) return;
    setSubmitting(true);

    const payloadUsers = uniqueUsers.map((u) => ({
      userId: u.userId,
      ledgerIds: u.ledgerIds,
      amountCents: u.amountCents,
      proofUrl: proofUrlByUser[u.userId] || null,
      notes: mainNotes,
    }));

    useApi(
      "admin/bulk-update-ledger",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        data: {
          paymentMethod,
          users: payloadUsers,
        },
      },
      (res, status) => {
        if (status) {
          toast.success("Payouts created successfully!");
          onClose();
          fetchLedger();
          setMainNotes("");
          setPaymentMethod("");
          setProofUrlByUser({});
          setSubmitting(false);
        } else {
          setSubmitting(false);
          toast.error(res?.message);
        }
      }
    );
  };

  return (
    <Dialog.Root open={open}>
      <Dialog.Portal>
        <div className="fixed inset-0 flex z-[999999999] items-center justify-center p-4">
          <Dialog.Content
            className="
              w-full max-w-3xl max-h-[80vh] rounded-2xl bg-zinc-900 text-zinc-100 
              border border-zinc-800 shadow-2xl p-6 overflow-y-auto
            "
          >
            {/* HEADER */}
            <div className="flex items-center justify-between mb-4">
              <Dialog.Title className="text-xl font-bold">
                Bulk Payment Summary
              </Dialog.Title>

              <Dialog.Close asChild>
                <button
                  className="text-zinc-400 hover:text-white"
                  onClick={onClose}
                >
                  <X size={22} />
                </button>
              </Dialog.Close>
            </div>

            {/* USER LIST */}
            <div className="bg-zinc-800/60 rounded-lg p-4 mb-4 border border-zinc-700 max-h-80 overflow-y-auto">
              <p className="text-sm font-semibold mb-2">Selected Users</p>

              {uniqueUsers.length > 0 ? (
                <ul className="text-sm divide-y divide-zinc-700/50">
                  {uniqueUsers.map((user) => (
                    <li key={user.userId} className="py-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="font-semibold">{user.name}</div>
                          <div className="text-xs text-zinc-400">
                            {user.ledgerIds.length} ledger(s)
                          </div>

                          {/* ⭐ SHOW ZELLE PAYMENT DETAILS HERE */}
                          {user.zellePaymentDetails && (
                            <div className="mt-1 text-xs text-blue-300">
                              Payment Details
                              <div>
                                Email: {user.zellePaymentDetails.email || "—"}
                              </div>
                              <div>
                                Phone:{" "}
                                {user.zellePaymentDetails.phoneNumber || "—"}
                              </div>
                            </div>
                          )}
                        </div>

                        <div className="text-green-400 font-semibold">
                          {formatCurrency(user.amountCents)}
                        </div>
                      </div>

                      {/* UPLOAD PROOF */}
                      <div className="mt-3">
                        <input
                          type="file"
                          accept="image/*,application/pdf"
                          onChange={(e) => handleFileChange(e, user.userId)}
                          className="w-full text-xs text-zinc-400 
                            file:px-4 file:py-2 file:rounded-md 
                            file:bg-blue-600 file:text-white hover:file:bg-blue-700"
                        />

                        {uploadingByUser[user.userId] && (
                          <p className="text-xs text-blue-400 mt-1">
                            Uploading...
                          </p>
                        )}

                        {proofUrlByUser[user.userId] && (
                          <div className="mt-2">
                            {proofUrlByUser[user.userId]!.endsWith(".pdf") ? (
                              <a
                                href={proofUrlByUser[user.userId]!}
                                target="_blank"
                                className="text-xs underline"
                              >
                                Open PDF proof
                              </a>
                            ) : (
                              <img
                                src={proofUrlByUser[user.userId]!}
                                className="w-28 h-28 rounded-lg border border-zinc-700 object-cover"
                              />
                            )}
                          </div>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-zinc-500">No users selected</p>
              )}
            </div>

            {/* TOTAL */}
            <div className="mb-4 text-sm">
              <span className="font-medium">Total Balance: </span>
              <span className="text-green-400 font-semibold">
                {formatCurrency(totalBalance)}
              </span>
            </div>

            {/* PAYMENT METHOD */}
            <div className="mb-4">
              <label className="block text-sm mb-1 text-zinc-400">
                Payment Method
              </label>
              <Input
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                placeholder="Bank Transfer, Walmart, etc."
              />
            </div>

            {/* NOTES */}
            <div className="mb-6">
              <label className="block text-sm mb-1 text-zinc-400">Notes</label>
              <textarea
                value={mainNotes}
                onChange={(e) => setMainNotes(e.target.value)}
                className="w-full h-24 text-sm rounded-md bg-zinc-800 border border-zinc-700 p-2"
                placeholder="Notes for all users..."
              />
            </div>

            {/* ACTION BUTTONS */}
            <div className="flex justify-end gap-3">
              <Button variant="ghost" onClick={onClose}>
                Cancel
              </Button>
              <Button disabled={submitting} onClick={handleConfirm}>
                {submitting ? "Processing..." : "Create Payouts & Mark Paid"}
              </Button>
            </div>
          </Dialog.Content>
        </div>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
