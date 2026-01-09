"use client";
import { Suspense } from "react";
import qs from "query-string";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useGetSummary } from "../../features/summary/api/use-get-summary";
import { useGetAccounts } from "../../features/accounts/api/use-get-accounts";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Separate the component that uses useSearchParams
const AccountFilterContent = () => {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const accountId = params.get("accountId") || "all";
  const from = params.get("from") || "";
  const to = params.get("to") || "";

  const { isLoading: isLoadingSummary } = useGetSummary();
  const { data: accounts, isLoading: isLoadingAccounts } = useGetAccounts();

  const onChange = (newValue: string) => {
    const query = {
      accountId: newValue,
      from,
      to,
    };
    const url = qs.stringifyUrl(
      {
        url: pathname,
        query,
      },
      {
        skipNull: true,
        skipEmptyString: true,
      }
    );
    router.push(url);
  };

  return (
    <Select
      value={accountId}
      onValueChange={onChange}
      disabled={isLoadingAccounts || isLoadingSummary}
    >
      <SelectTrigger className="lg:w-auto w-full h-9 rounded-md px-3 font-normal bg-white/10 hover:bg-white/20 hover:text-white border-none focus:ring-offset-0 focus:ring-transparent outline-none text-white focus:bg-white/30 transition">
        <SelectValue placeholder="Select account" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All Accounts</SelectItem>
        {accounts?.map((account) => (
          <SelectItem key={account.id} value={account.id}>
            {account.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

// Fallback component for Suspense
const AccountFilterFallback = () => (
  <Select disabled>
    <SelectTrigger className="lg:w-auto w-full h-9 rounded-md px-3 font-normal bg-white/10 hover:bg-white/20 hover:text-white border-none focus:ring-offset-0 focus:ring-transparent outline-none text-white focus:bg-white/30 transition">
      <SelectValue placeholder="Loading..." />
    </SelectTrigger>
  </Select>
);

// Main export wrapped in Suspense
export const AccountFilter = () => {
  return (
    <Suspense fallback={<AccountFilterFallback />}>
      <AccountFilterContent />
    </Suspense>
  );
};
