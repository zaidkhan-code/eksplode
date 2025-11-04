export const dynamic = "force-dynamic";
import { Suspense } from "react";
import SuccessPage from "../../components/Pages/Success";

export default function Success() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SuccessPage />
      {/* <div></div> */}
    </Suspense>
  );
}
