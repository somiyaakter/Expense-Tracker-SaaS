"use client";

import {
  LayoutDashboard,
  LogOut,
  Settings,
  Sparkles,
  User,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { authClient, useSession } from "@/lib/auth-client";

function getInitials(nameOrEmail?: string) {
  if (!nameOrEmail) return "U";
  const trimmed = nameOrEmail.trim();
  if (trimmed.includes(" ")) {
    return trimmed
      .split(" ")
      .slice(0, 2)
      .map((p) => p[0])
      .join("")
      .toUpperCase();
  }
  return trimmed[0]?.toUpperCase() ?? "U";
}

export function HeaderUserButton() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data, isPending } = useSession();

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          queryClient.clear();
          router.push("/sign-in");
          router.refresh();
        },
      },
    });
  };

  if (isPending) {
    return (
      <div className="size-9 rounded-full bg-white/10 animate-pulse border border-white/10" />
    );
  }

  if (!data) return null;

  const user = data.user;
  const initials = getInitials(user.name || user.email);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          aria-label="Account menu"
          className="relative size-9 rounded-full outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent transition-transform hover:scale-105"
        >
          <Avatar className="size-9 ring-2 ring-white/40 hover:ring-white transition-all shadow-md">
            <AvatarImage src={user.image || ""} alt={user.name || ""} />
            <AvatarFallback className="bg-white text-primary text-sm font-semibold">
              {initials}
            </AvatarFallback>
          </Avatar>
          <span className="absolute -bottom-0.5 -right-0.5 size-2.5 rounded-full bg-emerald-400 ring-2 ring-teal-800" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-72 rounded-xl p-1.5"
        align="end"
        sideOffset={8}
      >
        <DropdownMenuLabel className="p-0 font-normal">
          <div className="flex items-center gap-3 px-2 py-2.5">
            <Avatar className="size-11 rounded-full ring-1 ring-border">
              <AvatarImage src={user.image || ""} alt={user.name || ""} />
              <AvatarFallback className="rounded-full bg-gradient-to-br from-primary to-teal-900 text-white text-sm font-semibold">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div className="grid flex-1 leading-tight">
              <span className="truncate text-sm font-semibold">
                {user.name || "User"}
              </span>
              <span className="truncate text-xs text-muted-foreground">
                {user.email}
              </span>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href="/dashboard" className="cursor-pointer">
              <LayoutDashboard className="size-4" />
              Dashboard
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/settings" className="cursor-pointer">
              <User className="size-4" />
              Account
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/settings" className="cursor-pointer">
              <Settings className="size-4" />
              Settings
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/#pricing" className="cursor-pointer">
            <Sparkles className="size-4 text-primary" />
            Upgrade to Pro
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={handleSignOut}
          className="cursor-pointer text-destructive focus:text-destructive focus:bg-destructive/10"
        >
          <LogOut className="size-4" />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
