"use client";

import { Loader2 } from "lucide-react";
import { redirect, useRouter } from "next/navigation";
import { trpc } from "../_trpc/client";

const Page = () => {
  const router = useRouter();

  trpc.authCallback.useQuery(undefined, {
    onSuccess: ({ success }) => {
      if (success) {
        // user is synced to db
        router.push("/board");
      }
    },
    onError: (err) => {
      if (err.data?.code === "UNAUTHORIZED") {
        router.push("/sign-in");
      }
    },
    retry: true,
    retryDelay: 1000,
  });

  return (
    <div className="w-full mt-24 flex justify-center">
      <div className="flex flex-col items-center gap-2">
        <Loader2 className="h-8 w-8 animate-spin" />
        <h3 className="font-semibold text-xl">Setting up your account...</h3>
        <p>You will be redirected automatically.</p>
      </div>
    </div>
  );
};

export default Page;
