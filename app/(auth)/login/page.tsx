"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import Link from "next/link"
import { Eye, EyeOff } from "lucide-react"
import { useState } from "react"
import Image from "next/image"

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
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { useAuth } from "@/hooks/useAuth"
import Img from "@/assets/images/nav-logo.png";

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  rememberMe: z.boolean(),
})

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const { login, isLoading, error } = useAuth()

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  })

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    await login(values)
  }

  return (
    <div className="space-y-6">
      {/* <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Login</h1>
      </div> */}


      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {error && (
            <div className="bg-red-50 text-red-500 p-3 rounded-md text-sm font-medium">
              {error}
            </div>
          )}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-slate-700 font-semibold">Email address</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your email address" {...field} className="h-12 border-slate-200 focus:ring-emerald-500" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-slate-700 font-semibold">Enter your password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      {...field}
                      className="h-12 border-slate-200 focus:ring-emerald-500"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex items-center justify-between">
            <FormField
              control={form.control}
              name="rememberMe"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className="border-slate-300 data-[state=checked]:bg-emerald-600 data-[state=checked]:border-emerald-600"
                    />
                  </FormControl>
                  <FormLabel className="text-sm font-medium text-slate-500 cursor-pointer">
                    Remember me
                  </FormLabel>
                </FormItem>
              )}
            />
            <Link
              href="/forgot-password"
              className="text-sm font-semibold text-orange-500 hover:text-orange-600 transition-colors"
            >
              Forgot Password?
            </Link>
          </div>

          <Button type="submit" className="w-full h-12 bg-[#1b7d81] hover:bg-[#16666a] text-white text-base font-semibold" disabled={isLoading}>
            {isLoading ? "Logging in..." : "Login"}
          </Button>
        </form>
      </Form>

      <div className="text-center text-sm">
        <span className="text-slate-600">Don't have an account? </span>
        <Link href="/register" className="font-semibold text-orange-500 hover:text-orange-600">
          Register
        </Link>
      </div>
    </div>
  )
}
