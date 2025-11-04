"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CheckCircle } from "lucide-react";

export default function SuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const session_id = searchParams.get("session_id");
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!session_id) return;

    const fetchSession = async () => {
      try {
        const res = await fetch(`/api/orders/session/${session_id}`);
        const data = await res.json();
        setSession(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSession();
  }, [session_id]);

  if (loading)
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-green-500"></div>
      </div>
    );

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-50 via-white to-green-100 p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md text-center">
        <div className="flex justify-center mb-4">
          <div className="bg-green-100 p-4 rounded-full">
            <CheckCircle className="text-green-600 w-16 h-16" />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-green-700 mb-2">
          Payment Successful 🎉
        </h1>
        <p className="text-gray-600 mb-6">
          Thank you for your purchase! Your payment has been processed
          successfully.
        </p>

        {session && (
          <div className="bg-gray-50 rounded-xl p-4 text-left mb-6">
            <p className="text-gray-800">
              <strong>Product:</strong> {session.productName}
            </p>
            <p className="text-gray-800">
              <strong>Email:</strong> {session.buyerEmail}
            </p>
            <p className="text-gray-800">
              <strong>Amount:</strong> {(session.amount_total / 100).toFixed(2)}{" "}
              {session.currency.toUpperCase()}
            </p>
          </div>
        )}

        <button
          onClick={() => router.push("/products")}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 shadow-md hover:shadow-lg"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
}
