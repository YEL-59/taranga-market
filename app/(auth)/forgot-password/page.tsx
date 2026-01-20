"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import Link from "next/link"
import Image from "next/image"
import logo from "@/assets/images/logo-nav.png"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const forgotPasswordSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
})

export default function ForgotPasswordPage() {
  const form = useForm<z.infer<typeof forgotPasswordSchema>>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  })

  function onSubmit(values: z.infer<typeof forgotPasswordSchema>) {
    console.log(values)
    // In a real app, redirect to verify-otp
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center gap-4">
        <Image src={logo} alt="Logo" width={140} height={60} className="mb-4" />
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Forget Password</h1>
        <p className="text-sm text-slate-500 text-center">No worries, we will send you reset instructions</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-slate-700 font-semibold">Email address</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your email address" {...field} className="h-12 border-slate-200" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full h-12 bg-[#1b7d81] hover:bg-[#16666a] text-white text-base font-semibold">
            Continue
          </Button>
        </form>
      </Form>
    </div>
  )
}
