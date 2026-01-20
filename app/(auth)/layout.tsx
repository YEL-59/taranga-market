import Image from "next/image"
import Link from "next/link"
import React from "react"
import logo from "@/assets/images/logo-nav.png"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-4 bg-gradient-to-br from-slate-50 to-emerald-50/30">
      <div className="mb-8">
        <Link href="/">
          <Image
            src={logo}
            alt="Teranga Market Logo"
            width={200}
            height={80}
            className="h-auto w-auto"
            priority
          />
        </Link>
      </div>
      <div className="w-full max-w-md bg-white rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 p-8">
        {children}
      </div>
      <div className="mt-8 flex gap-6 text-sm text-slate-500">
        <Link href="/terms" className="hover:text-emerald-600 transition-colors">Terms</Link>
        <Link href="/privacy" className="hover:text-emerald-600 transition-colors">Privacy</Link>
        <Link href="/help" className="hover:text-emerald-600 transition-colors">Helps</Link>
      </div>
    </div>
  )
}
