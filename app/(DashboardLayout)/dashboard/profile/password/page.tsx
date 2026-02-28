"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/hooks/useAuth"
import { Loader2 } from "lucide-react"

export default function PasswordPage() {
  const { changePassword, isLoading } = useAuth();
  const [passwords, setPasswords] = useState({
    current_password: "",
    new_password: "",
    new_password_confirmation: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setPasswords(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await changePassword(passwords);
    if (result.success) {
      setPasswords({
        current_password: "",
        new_password: "",
        new_password_confirmation: ""
      });
    }
  };

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-2xl border border-slate-100 shadow-[0_4px_24px_rgba(0,0,0,0.02)] p-2 md:p-8">
        <h3 className="text-lg font-bold text-slate-800 mb-8">Change Password</h3>

        <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
          <div className="space-y-2">
            <Label htmlFor="current_password" className="text-slate-600 font-bold text-sm">Current Password</Label>
            <Input
              id="current_password"
              type="password"
              value={passwords.current_password}
              onChange={handleChange}
              placeholder="Enter your current password"
              className="h-12 border-slate-200 rounded-xl"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="new_password" className="text-slate-600 font-bold text-sm">New Password</Label>
            <Input
              id="new_password"
              type="password"
              value={passwords.new_password}
              onChange={handleChange}
              placeholder="Enter new password"
              className="h-12 border-slate-200 rounded-xl"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="new_password_confirmation" className="text-slate-600 font-bold text-sm">Confirm New Password</Label>
            <Input
              id="new_password_confirmation"
              type="password"
              value={passwords.new_password_confirmation}
              onChange={handleChange}
              placeholder="Confirm new password"
              className="h-12 border-slate-200 rounded-xl"
              required
            />
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="h-12 px-10 rounded-xl bg-[#1b7d81] hover:bg-[#16666a] font-bold flex items-center gap-2"
          >
            {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
            Update password
          </Button>
        </form>
      </div>

    </div>
  )
}

