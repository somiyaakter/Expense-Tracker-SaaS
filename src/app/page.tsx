"use client"

import { ArrowRight, Wallet, Tags, TrendingDown, BarChart3, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import UserButton from "@/components/user-button"
import Image from "next/image"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation Header */}
      <header className="sticky top-0 z-50 backdrop-blur-sm bg-background/95 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
         
          <Link href="/">
      <div className="items-center hidden lg:flex">
        <Wallet className="fill-primary/60 text-primary h-6 w-6" />
        <p className="font-semibold  text-primary text-2xl ml-2.5">Expensify</p>
      </div>
    </Link>
          <nav className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm hover:text-primary transition-colors">
              Features
            </a>
            <a href="#accounts" className="text-sm hover:text-primary transition-colors">
              Accounts
            </a>
            <a href="#pricing" className="text-sm hover:text-primary transition-colors">
              Pricing
            </a>
          </nav>
          <UserButton />
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 sm:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Announcement Badge */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/50 border border-border text-sm">
              <span className="w-2 h-2 rounded-full bg-primary"></span>
              <span>Now supporting 50+ expense categories</span>
            </div>
          </div>

          {/* Hero Content */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h1 className="text-5xl sm:text-6xl font-bold tracking-tight mb-6 text-balance">
              Take Control of Your <span className="text-primary">Financial Life</span>
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground mb-8 text-balance leading-relaxed">
              Track every expense, categorize spending, and gain clear insights into your financial habits. All your
              accounts in one secure place.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/sign-up">
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground text-base px-8 py-6 h-auto">
                  Start Tracking <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Button
                variant="outline"
                className="border-border text-foreground hover:bg-secondary text-base px-8 py-6 h-auto bg-transparent"
              >
                View Demo
              </Button>
            </div>
          </div>

          {/* Hero Visual - Dashboard Preview */}
          <div className="relative mt-16 rounded-2xl overflow-hidden border border-border bg-card">
            <div className="aspect-video relative">
               <Image 
                 src="/dashboard.png" 
                 alt="dashboard-preview" 
                 fill
                 className="object-cover"
               />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8 bg-secondary/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-balance">Powerful Features for Smart Spending</h2>
            <p className="text-lg text-muted-foreground text-balance">
              Everything you need to manage your finances effectively
            </p>
          </div>

          {/* Feature Cards Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {/* Account Management */}
            <div className="rounded-xl border border-border bg-card p-8 hover:shadow-lg hover:border-primary/50 transition-all">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
                <Wallet className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-4">Account Management</h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Connect and manage multiple accounts from one dashboard. Track balances across all your financial
                accounts in real-time.
              </p>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1">✓</span>
                  <span>Add unlimited accounts</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1">✓</span>
                  <span>Real-time balance updates</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1">✓</span>
                  <span>Set account limits and alerts</span>
                </li>
              </ul>
            </div>

            {/* Transaction Categories */}
            <div className="rounded-xl border border-border bg-card p-8 hover:shadow-lg hover:border-primary/50 transition-all">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
                <Tags className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-4">Smart Categories</h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Organize transactions with 50+ pre-built categories. Create custom categories to match your unique
                spending patterns.
              </p>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1">✓</span>
                  <span>Pre-built categories</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1">✓</span>
                  <span>Custom category creation</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1">✓</span>
                  <span>Auto-categorization with AI</span>
                </li>
              </ul>
            </div>

            {/* Transaction Tracking */}
            <div className="rounded-xl border border-border bg-card p-8 hover:shadow-lg hover:border-primary/50 transition-all">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
                <TrendingDown className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-4">Transaction Insights</h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Log every transaction with detailed notes. Get insights into your spending patterns with advanced
                analytics and reports.
              </p>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1">✓</span>
                  <span>Quick transaction logging</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1">✓</span>
                  <span>Detailed spending analytics</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1">✓</span>
                  <span>Monthly & yearly reports</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Features Section */}
      <section className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              <h2 className="text-4xl font-bold mb-6 text-balance">Security & Privacy First</h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Your financial data is precious. We use bank-level encryption and security protocols to keep your
                information safe and private at all times.
              </p>
              <ul className="space-y-4">
                <li className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Lock className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-muted-foreground">End-to-end encryption</span>
                </li>
                <li className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Lock className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-muted-foreground">GDPR compliant</span>
                </li>
                <li className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Lock className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-muted-foreground">Regular security audits</span>
                </li>
              </ul>
            </div>

            {/* Right Visual */}
            <div className="rounded-2xl aspect-square flex items-center justify-center">
              {/* <Lock className="w-20 h-20 text-muted-foreground/40" /> */}

              <Image src="/security.png" alt="security" height={800} width={800}/>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8 bg-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 text-balance">Trusted by Thousands</h2>
          <div className="grid md:grid-cols-3 gap-12 text-center">
            <div>
              <div className="text-5xl font-bold mb-2">50K+</div>
              <p className="text-primary-foreground/80">Active Users</p>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">$500M+</div>
              <p className="text-primary-foreground/80">Transactions Tracked</p>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">4.9★</div>
              <p className="text-primary-foreground/80">App Rating</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-balance">Ready to Take Control?</h2>
          <p className="text-lg text-muted-foreground mb-10 text-balance">
            Join thousands of users who are already managing their finances smarter. Get started free, no credit card
            required.
          </p>
          <Link href="/sign-up">
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground text-base px-8 py-6 h-auto">
              Create Your Free Account <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12 px-4 sm:px-6 lg:px-8 bg-secondary/30">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Link href="/">
      <div className="items-center hidden lg:flex">
        <Wallet className="fill-primary/60 text-primary h-6 w-6" />
        <p className="font-semibold  text-primary text-2xl ml-2.5">Expensify</p>
      </div>
    </Link>
            
            </div>
            <p className="text-sm text-muted-foreground">Smart expense tracking for modern finances.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Features
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Security
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Privacy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Terms
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Cookies
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; 2026 ExpenseTracker. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
