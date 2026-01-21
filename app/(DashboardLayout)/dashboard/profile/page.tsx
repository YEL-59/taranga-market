"use client"

import React from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function ProfileDetailsPage() {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-[0_4px_24px_rgba(0,0,0,0.02)] p-8 space-y-8">
      <div>
        <h3 className="text-lg font-bold text-slate-800">My Account Details</h3>
        <p className="text-slate-400 text-sm mt-1">Manage your account information and preferences.</p>
      </div>

      <div className="space-y-6">
        <div>
          <h4 className="text-sm font-bold text-slate-600 mb-4">Profile Photo</h4>
          <div className="flex items-center gap-8">
            <Avatar className="w-20 h-20 border-4 border-slate-50">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>EH</AvatarFallback>
            </Avatar>
            <div className="flex gap-4">
              <button className="text-sm font-bold text-slate-500 hover:text-slate-700">Remove photo</button>
              <Button variant="outline" className="rounded-xl h-10 px-6 border-slate-200 font-bold text-slate-600">
                Change photo
              </Button>
            </div>
          </div>
        </div>

        <div className="grid gap-6">
          <div className="space-y-2">
            <Label className="text-slate-600 font-bold text-sm">Name</Label>
            <div className="flex gap-4">
              <Input defaultValue="Esther Howard" className="h-12 border-slate-200 rounded-xl flex-1" />
              <div className="flex gap-2">
                <Button variant="outline" className="h-12 px-8 rounded-xl font-bold border-slate-200">Cancel</Button>
                <Button className="h-12 px-10 rounded-xl bg-[#1b7d81] hover:bg-[#16666a] font-bold">Save</Button>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-slate-600 font-bold text-sm">Email</Label>
            <div className="flex gap-4">
              <Input defaultValue="esther@gmail.com" readOnly className="h-12 border-slate-200 rounded-xl flex-1 bg-slate-50/50" />
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="h-12 px-10 rounded-xl font-bold border-slate-200">Edit</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md rounded-3xl p-8 border-none shadow-2xl">
                  <DialogHeader className="space-y-3">
                    <DialogTitle className="text-xl font-bold text-slate-800">Confirm email change</DialogTitle>
                    <DialogDescription className="text-sm text-slate-500 leading-relaxed">
                      To confirm your new email at <span className="font-bold text-slate-700">hilda@gmail.com</span>, please enter the code we just sent there.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="py-6">
                    <Input placeholder="Enter code" className="h-12 border-slate-200 rounded-xl text-center text-lg font-bold tracking-[0.5em]" />
                  </div>
                  <DialogFooter className="sm:justify-start flex-col gap-4">
                    <Button className="w-full h-12 bg-[#1b7d81] hover:bg-[#16666a] rounded-xl font-bold">
                      Continue
                    </Button>
                    <p className="text-xs text-center w-full text-slate-400 font-medium">
                      Didn&apos;t get the code? Resend in 24 seconds
                    </p>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
