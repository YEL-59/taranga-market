"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function PasswordPage() {
  return (
    <div className="space-y-8">
      <div className="bg-white rounded-2xl border border-slate-100 shadow-[0_4px_24px_rgba(0,0,0,0.02)] p-8">
        <h3 className="text-lg font-bold text-slate-800 mb-8">Change Password</h3>
        
        <form className="space-y-6 max-w-2xl">
          <div className="space-y-2">
            <Label className="text-slate-600 font-bold text-sm">Current Password</Label>
            <Input type="password" placeholder="Enter your current password" className="h-12 border-slate-200 rounded-xl" />
          </div>

          <div className="space-y-2">
            <Label className="text-slate-600 font-bold text-sm">New Password</Label>
            <Input type="password" placeholder="Enter new password" className="h-12 border-slate-200 rounded-xl" />
          </div>

          <div className="space-y-2">
            <Label className="text-slate-600 font-bold text-sm">Confirm New Password</Label>
            <Input type="password" placeholder="Confirm new password" className="h-12 border-slate-200 rounded-xl" />
          </div>

          <Button className="h-12 px-10 rounded-xl bg-[#1b7d81] hover:bg-[#16666a] font-bold">
            Update password
          </Button>
        </form>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-[0_4px_24px_rgba(0,0,0,0.02)] p-8">
        <h3 className="text-lg font-bold text-slate-800">Delete your account</h3>
        <p className="text-slate-400 text-sm mt-3 leading-relaxed">
          By deleting your account, you&apos;ll no longer be able to access any of your designs or log In to Teranga Market.
        </p>
        
        <Button variant="outline" className="mt-8 h-12 px-10 rounded-xl border-slate-200 font-bold text-slate-400 hover:text-red-500 hover:border-red-200 hover:bg-red-50 transition-all">
          Delete account
        </Button>
      </div>
    </div>
  )
}
