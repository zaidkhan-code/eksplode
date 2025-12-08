"use client";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Loader from "@/components/ui/Loader";
import { useAuth } from "@/components/Context/AuthContext";
import { Copy } from "lucide-react";
import { toast } from "sonner";
import useApi from "@/lib/useApi";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function WebhookSetupPage() {
  const { user, setUser } = useAuth();
  const [webhookSecret, setWebhookSecret] = useState(user?.webhookSecret || "");
  const [loading, setLoading] = useState(false);
  const [setupComplete, setSetupComplete] = useState(false);
  const apiURL = process.env.NEXT_PUBLIC_API_URL;
  const router = useRouter();
  const handleCopy = () => {
    navigator.clipboard.writeText(
      `${apiURL}webhook/stripe/${user?.id || user?._id}`
    );
    toast.success("Webhook URL copied!");
  };

  const handleSave = async () => {
    if (!webhookSecret) {
      toast.error("Please enter the webhook secret");
      return;
    }

    setLoading(true);
    useApi(
      "auth/update-profile",
      {
        method: "PUT",
        data: {
          stripeWebhookSecret: webhookSecret,
        },
      },
      (res, status) => {
        setLoading(false);
        if (status) {
          localStorage.setItem("user", JSON.stringify(res.user));
          setUser(res.user);
          toast.success("Webhook setup completed successfully!");
          setSetupComplete(true);
        } else {
          toast.error("Failed to update profile");
        }
      }
    );
  };

  const handleGoToDashboard = () => {
    router.push("/merchent/dashboard");
  };

  return (
    <div className="min-h-screen bg-black relative">
      <div className="max-w-4xl mx-auto px-4 py-10">
        <h1 className="text-white text-3xl font-bold mb-2">
          Merchant Webhook Setup
        </h1>
        <p className="text-gray-400 mb-10">
          Follow the steps below to connect your Stripe account with our system
          for referral tracking.
        </p>

        <div className="space-y-6">
          {/* STEP 1 */}
          <Card className="bg-black border border-red-500/20 p-6">
            <h2 className="text-xl text-white font-semibold mb-1">
              Step 1 — Copy Your Webhook URL
            </h2>
            <p className="text-gray-400 mb-4">
              This URL must be added inside your Stripe Dashboard.
            </p>

            <div className="relative bg-gray-900 p-4 rounded-lg border border-gray-700 text-red-400 font-mono break-all">
              {`${apiURL}webhook/${user?.id || user?._id}`}
              <button
                onClick={handleCopy}
                className="absolute right-2 top-2 p-1 hover:bg-gray-800 rounded-md"
              >
                <Copy size={18} className="text-gray-300" />
              </button>
            </div>
          </Card>

          {/* STEP 2 */}
          <Card className="bg-black border border-red-500/20 p-6">
            <h2 className="text-xl text-white font-semibold mb-2">
              Step 2 — Add Webhook to Stripe Dashboard
            </h2>
            <p className="text-gray-400 mb-4">
              Login to Stripe → Developers → Webhooks → Add Endpoint
            </p>

            <ol className="list-decimal ml-6 space-y-2 text-gray-300">
              <li>
                Click <b>Add Endpoint</b>
              </li>
              <li>Paste the Webhook URL shown above</li>
              <li>
                Select event →{" "}
                <span className="text-red-400">checkout.session.completed</span>
              </li>
              <li>Click Create Endpoint</li>
              <li>
                Copy the <b>Signing Secret</b> shown by Stripe
              </li>
            </ol>
          </Card>

          {/* STEP 3 */}
          <Card className="bg-black border border-red-500/20 p-6">
            <h2 className="text-xl text-white font-semibold mb-2">
              Step 3 — Add Webhook Secret in Our System
            </h2>

            <div className="space-y-4">
              <Input
                label="Stripe Webhook Secret"
                value={webhookSecret}
                onChange={(e) => setWebhookSecret(e.target.value)}
                placeholder="whsec_xxxxxxxxxxx"
                disabled={setupComplete}
              />

              {!setupComplete ? (
                <Button onClick={handleSave} disabled={loading}>
                  {loading ? "loading..." : "Save Webhook Settings"}
                </Button>
              ) : (
                <Button
                  onClick={handleGoToDashboard}
                  className="bg-green-600 hover:bg-green-700"
                >
                  Go to Dashboard
                </Button>
              )}
            </div>
          </Card>

          {/* STEP 4 */}
          <Card className="bg-black border border-red-500/20 p-6">
            <h2 className="text-xl text-white font-semibold mb-2">
              Step 4 — How Your Referral System Works
            </h2>

            <ul className="list-disc ml-6 space-y-3 text-gray-300">
              <li>
                Every product you create in the system generates a
                <span className="text-red-400 font-semibold">
                  {" "}
                  unique merchant referral link
                </span>
                .
              </li>

              <li>
                When users click your link, it contains a special parameter:
                <span className="text-red-400 font-semibold"> attributeId</span>
                .
              </li>

              <li>
                The user is redirected to your website along with this
                attributeId.
              </li>

              <li>
                <span className="text-red-400 font-semibold">
                  IMPORTANT — You must send this exact same attributeId to
                  Stripe inside the payment metadata.
                </span>

                <ul className="ml-6 list-disc mt-2 space-y-1 text-gray-400">
                  <li>
                    In Stripe Checkout, locate the <b>metadata</b> section
                  </li>
                  <li>
                    Add a new metadata field with:
                    <pre className="bg-black border border-red-500/30 p-2 mt-1 rounded text-white text-sm">
                      metadata: {"{"} attributeId: "THE_ID_YOU_RECEIVED" {"}"}
                    </pre>
                  </li>
                  <li>
                    This ensures Stripe sends the attributeId back to our
                    system.
                  </li>
                </ul>
              </li>

              <li>
                When Stripe triggers your webhook, our system reads the
                <span className="text-red-400 font-semibold">
                  {" "}
                  attributeId
                </span>{" "}
                from metadata and:
                <ul className="ml-6 list-disc mt-2 space-y-1">
                  <li>Updates the User profile (adds reward credit)</li>
                  <li>Updates the Merchant profile (tracks the purchase)</li>
                </ul>
              </li>
            </ul>
          </Card>
        </div>
        <div className="my-5 flex justify-center">
          <Link className="w-full" href={"/merchant/dashboard"}>
            <Button className="bg-red-600 w-full hover:bg-red-700 px-6 py-3 text-lg">
              Go to Dashboard
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
