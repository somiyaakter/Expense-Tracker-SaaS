"use client";
import { authClient } from "@/lib/auth-client";
import {
  ArrowRight,
  Check,
  Loader,
  ShieldCheck,
  Sparkles,
  Wallet,
} from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";

export default function SignUp() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const rawCallback = searchParams.get("callbackUrl");
  const callbackURL = rawCallback && rawCallback.startsWith("/") ? rawCallback : "/dashboard";

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const formData = new FormData(e.currentTarget);
      const name = formData.get("name") as string;
      const email = formData.get("email") as string;
      const password = formData.get("password") as string;

      await authClient.signUp.email(
        { name, email, password, callbackURL },
        {
          onRequest: () => {},
          onSuccess: () => {
            router.push(callbackURL);
            router.refresh();
          },
          onError: (ctx) => {
            setError(ctx.error.message);
            setIsLoading(false);
          },
        }
      );
    } catch {
      setError("An unexpected error occurred");
      setIsLoading(false);
    }
  }

  async function handleGoogleSignIn() {
    setIsLoading(true);
    setError("");
    try {
      await authClient.signIn.social(
        { provider: "google", callbackURL },
        {
          onRequest: () => {},
          onSuccess: () => {
            router.push(callbackURL);
            router.refresh();
          },
          onError: (ctx) => {
            setError(ctx.error.message);
            setIsLoading(false);
          },
        }
      );
    } catch {
      setError("Google sign-in failed");
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-[1fr_1.05fr] bg-background">
        {/* LEFT — FORM */}
        <div className="relative flex flex-col px-6 py-8 sm:px-10 lg:px-16">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="size-8 rounded-lg bg-gradient-to-br from-primary to-teal-900 flex items-center justify-center shadow-sm shadow-primary/30">
                <Wallet className="size-4 text-white" />
              </div>
              <span className="font-semibold text-lg tracking-tight">
                Expensify
              </span>
            </Link>
            <Link
              href="/sign-in"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Sign in →
            </Link>
          </div>

          <div className="flex-1 flex items-center justify-center py-10">
            <div className="w-full max-w-md">
              <div className="mb-8">
                <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight mb-2">
                  Create your account
                </h1>
                <p className="text-muted-foreground">
                  Free forever. No credit card required.
                </p>
              </div>

              <button
                type="button"
                onClick={handleGoogleSignIn}
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-3 border border-border bg-card hover:bg-secondary/70 rounded-xl px-4 py-3 mb-5 font-medium text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg className="size-5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                {isLoading ? (
                  <span className="inline-flex items-center gap-2">
                    <Loader className="animate-spin size-4" /> Creating...
                  </span>
                ) : (
                  "Sign up with Google"
                )}
              </button>

              <div className="relative mb-5">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-xs uppercase tracking-wider">
                  <span className="px-3 bg-background text-muted-foreground">
                    or with email
                  </span>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-foreground mb-1.5"
                  >
                    Full name
                  </label>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    required
                    disabled={isLoading}
                    autoComplete="name"
                    placeholder="Jane Doe"
                    className="w-full bg-card border border-border rounded-xl px-4 py-3 text-sm placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition disabled:opacity-50"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-foreground mb-1.5"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    required
                    disabled={isLoading}
                    autoComplete="email"
                    placeholder="you@example.com"
                    className="w-full bg-card border border-border rounded-xl px-4 py-3 text-sm placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition disabled:opacity-50"
                  />
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-foreground mb-1.5"
                  >
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    name="password"
                    required
                    disabled={isLoading}
                    autoComplete="new-password"
                    placeholder="At least 8 characters"
                    className="w-full bg-card border border-border rounded-xl px-4 py-3 text-sm placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition disabled:opacity-50"
                  />
                </div>

                {error && (
                  <div className="text-destructive text-sm bg-destructive/10 border border-destructive/20 rounded-xl px-4 py-3">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-primary hover:bg-primary/90 disabled:bg-primary/50 text-primary-foreground px-4 py-3 rounded-xl font-medium text-sm transition-colors flex items-center justify-center gap-2 shadow-md shadow-primary/20 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>
                      <Loader className="animate-spin size-4" />
                      Creating account...
                    </>
                  ) : (
                    <>
                      Create account
                      <ArrowRight className="size-4" />
                    </>
                  )}
                </button>

                <p className="text-xs text-muted-foreground text-center leading-relaxed">
                  By creating an account you agree to our{" "}
                  <a href="#" className="text-primary hover:underline">
                    Terms
                  </a>{" "}
                  &{" "}
                  <a href="#" className="text-primary hover:underline">
                    Privacy Policy
                  </a>
                  .
                </p>
              </form>

              <p className="text-center text-sm text-muted-foreground mt-8">
                Already have an account?{" "}
                <Link
                  href="/sign-in"
                  className="text-primary hover:text-primary/80 font-medium hover:underline"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT — BRAND PANEL */}
        <div className="relative hidden lg:flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary via-teal-800 to-emerald-950">
          <div className="absolute inset-0 opacity-30 bg-[radial-gradient(ellipse_at_top_left,white,transparent_55%)]" />
          <div className="absolute -top-40 -left-40 size-[500px] rounded-full bg-teal-300/20 blur-3xl" />
          <div className="absolute bottom-0 -right-40 size-[500px] rounded-full bg-emerald-400/20 blur-3xl" />

          <div className="relative z-10 max-w-md px-12 text-white">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur border border-white/20 text-xs font-medium mb-8">
              <Sparkles className="size-3.5" />
              Free forever — no credit card
            </div>
            <h2 className="text-4xl font-semibold tracking-tight leading-tight mb-6">
              Start seeing your money clearly.
            </h2>
            <p className="text-white/80 text-lg leading-relaxed mb-10">
              Everything to track, categorize, and understand your spending —
              setup takes less than two minutes.
            </p>

            <ul className="space-y-4 mb-12">
              {[
                "Unlimited accounts & transactions",
                "AI-powered smart categories",
                "Beautiful, exportable reports",
                "Cancel or export anytime",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <div className="size-6 rounded-full bg-white/15 backdrop-blur border border-white/20 flex items-center justify-center shrink-0">
                    <Check className="size-3.5 text-white" />
                  </div>
                  <span className="text-white/90">{item}</span>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-4 pt-8 border-t border-white/15">
              <div className="flex -space-x-2">
                {["A", "B", "C", "D"].map((c, i) => (
                  <div
                    key={c}
                    className="size-9 rounded-full ring-2 ring-emerald-900 bg-gradient-to-br from-white/30 to-white/10 text-white flex items-center justify-center text-xs font-semibold backdrop-blur"
                    style={{ zIndex: 4 - i }}
                  >
                    {c}
                  </div>
                ))}
              </div>
              <div>
                <p className="text-sm font-medium text-white">
                  50,000+ users joined this year
                </p>
                <p className="text-xs text-white/60 flex items-center gap-1">
                  <ShieldCheck className="size-3" /> SOC 2 Type II certified
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}
