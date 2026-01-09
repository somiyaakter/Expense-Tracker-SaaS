"use client";

import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface ProtectedRouteProps {
  children: React.ReactNode;
  redirectTo?: string;
}

export function ProtectedRoute({
  children,
  redirectTo = "/sign-in",
}: ProtectedRouteProps) {
  const { data: session, isPending } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!isPending && !session) {
      router.push(redirectTo);
    }
  }, [session, isPending, router, redirectTo]);

  if (isPending) {
    return <div>Loading...</div>; // Or your loading component
  }

  if (!session) {
    return null; // Component will redirect
  }

  return <>{children}</>;
}
