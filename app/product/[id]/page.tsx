"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Logo } from "@/components/ui/logo";
import { useAuth } from "@/components/Context/AuthContext";
import { Share2, Download, Copy, Check, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import useApi from "@/lib/useApi";
import Loader from "@/components/ui/Loader";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import ProductDetailPage from "@/components/User/Product/ProductDetailPage";

export default function Page({ loginUser = false }) {
  return <ProductDetailPage />;
}
