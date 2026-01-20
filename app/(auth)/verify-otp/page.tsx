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
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"

const otpSchema = z.object({
  otp: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
})

export default function VerifyOtpPage() {
  const form = useForm<z.infer<typeof otpSchema>>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: "",
    },
  })

  function onSubmit(values: z.infer<typeof otpSchema>) {
    console.log(values)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center gap-4">
        <Image src={logo} alt="Logo" width={140} height={60} className="mb-4" />
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">OTP Verification</h1>
        <p className="text-sm text-slate-500 text-center leading-relaxed">
          Enter the verification code we send you on:<br />
          <span className="font-medium text-slate-700">Alberts******@gmail.com</span>
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 flex flex-col items-center">
          <FormField
            control={form.control}
            name="otp"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <InputOTP maxLength={6} {...field}>
                    <InputOTPGroup className="gap-2 sm:gap-4">
                      <InputOTPSlot index={0} className="h-12 w-12 sm:h-14 sm:w-14 rounded-md border text-lg font-semibold" />
                      <InputOTPSlot index={1} className="h-12 w-12 sm:h-14 sm:w-14 rounded-md border text-lg font-semibold" />
                      <InputOTPSlot index={2} className="h-12 w-12 sm:h-14 sm:w-14 rounded-md border text-lg font-semibold" />
                      <InputOTPSlot index={3} className="h-12 w-12 sm:h-14 sm:w-14 rounded-md border text-lg font-semibold" />
                      <InputOTPSlot index={4} className="h-12 w-12 sm:h-14 sm:w-14 rounded-md border text-lg font-semibold" />
                      <InputOTPSlot index={5} className="h-12 w-12 sm:h-14 sm:w-14 rounded-md border text-lg font-semibold border-orange-200" />
                    </InputOTPGroup>
                  </InputOTP>
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

      <div className="text-center text-sm">
        <span className="text-slate-600">Don't receive the code? </span>
        <button className="font-semibold text-orange-500 hover:text-orange-600 clickable">
          Click to resend code
        </button>
      </div>
    </div>
  )
}
