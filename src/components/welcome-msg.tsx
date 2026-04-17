"use client";

import { useSession } from "@/lib/auth-client";
import React, { useEffect, useState } from "react";

export default function WelcomeMsg() {
  const { data, isPending } = useSession();
  const firstName = data?.user?.name?.split(" ")[0];
  const [greeting, setGreeting] = useState("Welcome back");

  useEffect(() => {
    const h = new Date().getHours();
    if (h < 12) setGreeting("Good morning");
    else if (h < 18) setGreeting("Good afternoon");
    else setGreeting("Good evening");
  }, []);

  return (
    <div className="space-y-1 mb-6">
      <h2 className="text-3xl lg:text-4xl text-white font-semibold tracking-tight">
        {greeting}
        {isPending || !firstName ? "" : `, ${firstName}`}
      </h2>
      <p className="text-sm lg:text-base text-white/75">
        Here&apos;s a snapshot of your financial activity.
      </p>
    </div>
  );
}
