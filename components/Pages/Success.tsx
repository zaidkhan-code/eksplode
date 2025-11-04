"use client";

import { useEffect } from "react";
import { CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SuccessPage() {
  const router = useRouter();

  useEffect(() => {
    // Optionally scroll to top when loaded
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-6 text-white">
      {/* Success Icon */}
      <div className="flex flex-col items-center text-center">
        <CheckCircle
          className="text-red-600 w-20 h-20 mb-4 animate-bounce"
          strokeWidth={1.5}
        />
        <h1 className="text-3xl font-bold mb-2">
          Payment <span className="text-red-600">Successful!</span>
        </h1>
        <p className="text-gray-400 mb-8 max-w-md">
          Thank you for your purchase! Your order has been successfully placed
          and is being processed.
        </p>
      </div>

      {/* Order Summary Card */}
      <div className="bg-[#111] border border-gray-800 rounded-2xl shadow-lg hover:shadow-red-600/40 transition-all duration-300 w-full max-w-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4 text-red-500">
          Order Summary
        </h2>

        <div className="space-y-3 text-sm">
          <div className="flex justify-between text-gray-300">
            <span>Order ID</span>
            <span>#12345678</span>
          </div>
          <div className="flex justify-between text-gray-300">
            <span>Amount</span>
            <span className="text-white font-semibold">$249.00</span>
          </div>
          <div className="flex justify-between text-gray-300">
            <span>Status</span>
            <span className="text-green-500">Completed</span>
          </div>
          <div className="flex justify-between text-gray-300">
            <span>Date</span>
            <span>Nov 04, 2025</span>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={() => router.push("/")}
          className="bg-red-600 hover:bg-red-700 text-white font-medium px-6 py-3 rounded-xl transition-all duration-300"
        >
          Back to Home
        </button>

        {/* <button
          onClick={() => router.push("/orders")}
          className="border border-red-600 hover:bg-red-600/10 text-white font-medium px-6 py-3 rounded-xl transition-all duration-300"
        >
          View Orders
        </button> */}
      </div>
    </div>
  );
}
