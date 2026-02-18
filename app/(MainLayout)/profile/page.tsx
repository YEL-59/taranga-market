"use client"

import { useEffect, useState, useRef } from "react"
import { useAuth } from "@/hooks/useAuth"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import {
    User as UserIcon,
    Mail,
    Phone,
    Lock,
    Camera,
    Trash2,
    Save,
    Loader2,
    Share2,
    Calendar,
    ShieldCheck
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { toast } from "sonner"
import Navbar from "@/shared/navbar/page"
import Footer from "@/shared/footer/page"
import SmoothScroll from "@/components/SmoothScroll"

const profileSchema = z.object({
    first_name: z.string().min(2, "First name must be at least 2 characters"),
    last_name: z.string().min(2, "Last name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    phone_number: z.string().optional().nullable(),
    whatsapp_link: z.string().optional().nullable(),
    full_name: z.string().optional().nullable(),
})

const passwordSchema = z.object({
    current_password: z.string().min(6, "Current password must be at least 6 characters"),
    new_password: z.string().min(8, "New password must be at least 8 characters"),
    new_password_confirmation: z.string().min(8, "Confirmation must be at least 8 characters"),
}).refine((data) => data.new_password === data.new_password_confirmation, {
    message: "Passwords do not match",
    path: ["new_password_confirmation"],
})

export default function ProfilePage() {
    const { user, getProfile, updateProfile, changeProfilePhoto, removeProfilePhoto, changePassword, isLoading } = useAuth()
    const [activeTab, setActiveTab] = useState("personal")
    const fileInputRef = useRef<HTMLInputElement>(null)

    const profileForm = useForm<z.infer<typeof profileSchema>>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            first_name: "",
            last_name: "",
            email: "",
            phone_number: "",
            whatsapp_link: "",
            full_name: "",
        },
    })

    const passwordForm = useForm<z.infer<typeof passwordSchema>>({
        resolver: zodResolver(passwordSchema),
        defaultValues: {
            current_password: "",
            new_password: "",
            new_password_confirmation: "",
        },
    })

    useEffect(() => {
        const fetchUser = async () => {
            const result = await getProfile()
            if (result.success && result.data?.user) {
                const u = result.data.user
                profileForm.reset({
                    first_name: u.first_name || "",
                    last_name: u.last_name || "",
                    email: u.email || "",
                    phone_number: u.phone_number || "",
                    whatsapp_link: u.whatsapp_link || "",
                    full_name: u.full_name || "",
                })
            }
        }
        fetchUser()
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    const onProfileSubmit = async (values: z.infer<typeof profileSchema>) => {
        await updateProfile(values)
    }

    const onPasswordSubmit = async (values: z.infer<typeof passwordSchema>) => {
        const result = await changePassword(values)
        if (result.success) {
            passwordForm.reset()
        }
    }

    const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            if (file.size > 2 * 1024 * 1024) {
                toast.error("Image size must be less than 2MB")
                return
            }
            const formData = new FormData()
            formData.append("profile_photo", file)
            await changeProfilePhoto(formData)
        }
    }

    const handleRemovePhoto = async () => {
        if (window.confirm("Are you sure you want to remove your profile photo?")) {
            await removeProfilePhoto()
        }
    }

    const displayName = user?.full_name || `${user?.first_name || ""} ${user?.last_name || ""}`.trim() || "User"
    const baseUrl = "https://raymondred.thesyndicates.team/"
    const photoUrl = user?.profile_photo ? (user.profile_photo.startsWith('http') ? user.profile_photo : `${baseUrl}${user.profile_photo}`) : ""

    return (
        <>

            <main className="min-h-screen bg-slate-50/50 py-12 px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="max-w-5xl mx-auto space-y-8"
                >
                    {/* Header Section */}
                    <div className="flex flex-col md:flex-row items-center gap-8 bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
                        <div className="relative group">
                            <Avatar className="h-32 w-32 md:h-40 md:w-40 border-4 border-white shadow-xl ring-1 ring-slate-100">
                                <AvatarImage src={photoUrl} alt={displayName} />
                                <AvatarFallback className="bg-emerald-50 text-emerald-600 text-4xl font-bold uppercase">
                                    {displayName?.[0]}
                                </AvatarFallback>
                            </Avatar>
                            <div className="absolute -bottom-2 -right-2 flex gap-2">
                                <button
                                    onClick={() => fileInputRef.current?.click()}
                                    disabled={isLoading}
                                    className="p-3 bg-[#1b7d81] hover:bg-[#16666a] text-white rounded-2xl shadow-lg transition-all active:scale-95 disabled:opacity-50"
                                >
                                    <Camera className="w-5 h-5" />
                                </button>
                                {user?.profile_photo && (
                                    <button
                                        onClick={handleRemovePhoto}
                                        disabled={isLoading}
                                        className="p-3 bg-red-500 hover:bg-red-600 text-white rounded-2xl shadow-lg transition-all active:scale-95 disabled:opacity-50"
                                    >
                                        <Trash2 className="w-5 h-5" />
                                    </button>
                                )}
                            </div>
                            <input
                                type="file"
                                ref={fileInputRef}
                                className="hidden"
                                accept="image/*"
                                onChange={handlePhotoUpload}
                            />
                        </div>

                        <div className="flex-1 text-center md:text-left space-y-3">
                            <div className="space-y-1">
                                <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">{displayName}</h1>
                                <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm text-slate-500 font-medium">
                                    <span className="flex items-center gap-1.5 bg-slate-100 px-3 py-1 rounded-full text-slate-600 capitalize">
                                        <ShieldCheck className="w-4 h-4 text-emerald-500" />
                                        {user?.role || "Member"}
                                    </span>
                                    <span className="flex items-center gap-1.5">
                                        <Mail className="w-4 h-4" />
                                        {user?.email}
                                    </span>
                                </div>
                            </div>
                            <p className="text-slate-500 max-w-xl text-sm leading-relaxed">
                                Manage your personal information, account security, and notification preferences. Keep your profile up to date to ensure seamless interaction with the marketplace.
                            </p>
                        </div>
                    </div>

                    {/* Action Tabs */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                        <div className="lg:col-span-4 space-y-6">
                            <Card className="rounded-3xl shadow-sm border-slate-100 overflow-hidden h-[100px]">
                                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full h-full flex items-start justify-center">
                                    <TabsList className="flex flex-col h-auto bg-transparent p-2 gap-1">
                                        <TabsTrigger
                                            value="personal"
                                            className="w-full justify-start gap-3 px-4 py-4 rounded-2xl data-[state=active]:bg-emerald-50 data-[state=active]:text-emerald-700 data-[state=active]:shadow-none hover:bg-slate-50 transition-all font-semibold"
                                        >
                                            <UserIcon className="w-5 h-5" />
                                            Personal Information
                                        </TabsTrigger>
                                        <TabsTrigger
                                            value="security"
                                            className="w-full justify-start gap-3 px-4 py-4 rounded-2xl data-[state=active]:bg-emerald-50 data-[state=active]:text-emerald-700 data-[state=active]:shadow-none hover:bg-slate-50 transition-all font-semibold"
                                        >
                                            <Lock className="w-5 h-5" />
                                            Security & Password
                                        </TabsTrigger>
                                    </TabsList>
                                </Tabs>
                            </Card>

                            <Card className="rounded-3xl shadow-sm border-slate-100 bg-emerald-700 text-white overflow-hidden">
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-lg font-bold flex items-center gap-2">
                                        <ShieldCheck className="w-5 h-5 text-emerald-300" />
                                        Account Status
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="text-sm opacity-90 leading-relaxed font-medium">
                                        Your account is protected by industry-standard encryption. Ensure your password remains confidential.
                                    </div>
                                    <Separator className="bg-emerald-600/50" />
                                    <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider">
                                        <span>Joined:</span>
                                        <span className="flex items-center gap-1">
                                            <Calendar className="w-3 h-3" />
                                            {user?.created_at ? new Date(user.created_at).toLocaleDateString() : 'N/A'}
                                        </span>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        <div className="lg:col-span-8">
                            <Tabs value={activeTab} className="w-full h-full">
                                <AnimatePresence mode="wait">
                                    <TabsContent value="personal" className="mt-0">
                                        <motion.div
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                        >
                                            <Card className="rounded-3xl shadow-sm border-slate-100">
                                                <CardHeader className="px-8 pt-8">
                                                    <CardTitle className="text-xl font-bold text-slate-800">Personal Information</CardTitle>
                                                    <CardDescription>Update your public profile and contact details.</CardDescription>
                                                </CardHeader>
                                                <CardContent className="px-8 pb-8">
                                                    <Form {...profileForm}>
                                                        <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-6">
                                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                                <FormField
                                                                    control={profileForm.control}
                                                                    name="first_name"
                                                                    render={({ field }) => (
                                                                        <FormItem>
                                                                            <FormLabel className="text-slate-700 font-bold">First Name</FormLabel>
                                                                            <FormControl>
                                                                                <div className="relative inset-y-0 left-0">
                                                                                    <Input {...field} className="h-12 border-slate-200 focus:ring-emerald-500 rounded-xl bg-slate-50/50" />
                                                                                </div>
                                                                            </FormControl>
                                                                            <FormMessage />
                                                                        </FormItem>
                                                                    )}
                                                                />
                                                                <FormField
                                                                    control={profileForm.control}
                                                                    name="last_name"
                                                                    render={({ field }) => (
                                                                        <FormItem>
                                                                            <FormLabel className="text-slate-700 font-bold">Last Name</FormLabel>
                                                                            <FormControl>
                                                                                <Input {...field} className="h-12 border-slate-200 focus:ring-emerald-500 rounded-xl bg-slate-50/50" />
                                                                            </FormControl>
                                                                            <FormMessage />
                                                                        </FormItem>
                                                                    )}
                                                                />
                                                            </div>

                                                            <FormField
                                                                control={profileForm.control}
                                                                name="full_name"
                                                                render={({ field }) => (
                                                                    <FormItem>
                                                                        <FormLabel className="text-slate-700 font-bold">Full Name (Public Display)</FormLabel>
                                                                        <FormControl>
                                                                            <div className="relative">
                                                                                <UserIcon className="absolute left-3 top-3.5 w-5 h-5 text-slate-400" />
                                                                                <Input {...field} value={field.value || ""} className="h-12 border-slate-200 pl-11 focus:ring-emerald-500 rounded-xl bg-slate-50/50" />
                                                                            </div>
                                                                        </FormControl>
                                                                        <FormMessage />
                                                                    </FormItem>
                                                                )}
                                                            />

                                                            <FormField
                                                                control={profileForm.control}
                                                                name="email"
                                                                render={({ field }) => (
                                                                    <FormItem>
                                                                        <FormLabel className="text-slate-700 font-bold">Email Address</FormLabel>
                                                                        <FormControl>
                                                                            <div className="relative">
                                                                                <Mail className="absolute left-3 top-3.5 w-5 h-5 text-slate-400" />
                                                                                <Input {...field} disabled className="h-12 border-slate-200 pl-11 focus:ring-emerald-500 rounded-xl bg-slate-50 disabled:opacity-75" />
                                                                            </div>
                                                                        </FormControl>
                                                                        <CardDescription className="text-xs pt-1">Email cannot be changed manually. Contact support for assistance.</CardDescription>
                                                                        <FormMessage />
                                                                    </FormItem>
                                                                )}
                                                            />

                                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                                <FormField
                                                                    control={profileForm.control}
                                                                    name="phone_number"
                                                                    render={({ field }) => (
                                                                        <FormItem>
                                                                            <FormLabel className="text-slate-700 font-bold">Phone Number</FormLabel>
                                                                            <FormControl>
                                                                                <div className="relative">
                                                                                    <Phone className="absolute left-3 top-3.5 w-5 h-5 text-slate-400" />
                                                                                    <Input {...field} value={field.value || ""} className="h-12 border-slate-200 pl-11 focus:ring-emerald-500 rounded-xl bg-slate-50/50" />
                                                                                </div>
                                                                            </FormControl>
                                                                            <FormMessage />
                                                                        </FormItem>
                                                                    )}
                                                                />
                                                                <FormField
                                                                    control={profileForm.control}
                                                                    name="whatsapp_link"
                                                                    render={({ field }) => (
                                                                        <FormItem>
                                                                            <FormLabel className="text-slate-700 font-bold">WhatsApp Link</FormLabel>
                                                                            <FormControl>
                                                                                <div className="relative">
                                                                                    <Share2 className="absolute left-3 top-3.5 w-5 h-5 text-slate-400" />
                                                                                    <Input {...field} value={field.value || ""} className="h-12 border-slate-200 pl-11 focus:ring-emerald-500 rounded-xl bg-slate-50/50" placeholder="https://wa.me/..." />
                                                                                </div>
                                                                            </FormControl>
                                                                            <FormMessage />
                                                                        </FormItem>
                                                                    )}
                                                                />
                                                            </div>

                                                            <Button
                                                                type="submit"
                                                                className="w-full md:w-auto px-8 h-12 bg-[#1b7d81] hover:bg-[#16666a] text-white rounded-xl shadow-lg transition-all font-bold gap-2"
                                                                disabled={isLoading}
                                                            >
                                                                {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                                                                Save Changes
                                                            </Button>
                                                        </form>
                                                    </Form>
                                                </CardContent>
                                            </Card>
                                        </motion.div>
                                    </TabsContent>

                                    <TabsContent value="security" className="mt-0">
                                        <motion.div
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                        >
                                            <Card className="rounded-3xl shadow-sm border-slate-100">
                                                <CardHeader className="px-8 pt-8">
                                                    <CardTitle className="text-xl font-bold text-slate-800">Security & Password</CardTitle>
                                                    <CardDescription>Update your password to keep your account secure.</CardDescription>
                                                </CardHeader>
                                                <CardContent className="px-8 pb-8">
                                                    <Form {...passwordForm}>
                                                        <form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)} className="space-y-6">
                                                            <FormField
                                                                control={passwordForm.control}
                                                                name="current_password"
                                                                render={({ field }) => (
                                                                    <FormItem>
                                                                        <FormLabel className="text-slate-700 font-bold">Current Password</FormLabel>
                                                                        <FormControl>
                                                                            <div className="relative">
                                                                                <Lock className="absolute left-3 top-3.5 w-5 h-5 text-slate-400" />
                                                                                <Input type="password" {...field} className="h-12 border-slate-200 pl-11 focus:ring-emerald-500 rounded-xl bg-slate-50/50" />
                                                                            </div>
                                                                        </FormControl>
                                                                        <FormMessage />
                                                                    </FormItem>
                                                                )}
                                                            />

                                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                                <FormField
                                                                    control={passwordForm.control}
                                                                    name="new_password"
                                                                    render={({ field }) => (
                                                                        <FormItem>
                                                                            <FormLabel className="text-slate-700 font-bold">New Password</FormLabel>
                                                                            <FormControl>
                                                                                <div className="relative">
                                                                                    <ShieldCheck className="absolute left-3 top-3.5 w-5 h-5 text-slate-400" />
                                                                                    <Input type="password" {...field} className="h-12 border-slate-200 pl-11 focus:ring-emerald-500 rounded-xl bg-slate-50/50" />
                                                                                </div>
                                                                            </FormControl>
                                                                            <FormMessage />
                                                                        </FormItem>
                                                                    )}
                                                                />
                                                                <FormField
                                                                    control={passwordForm.control}
                                                                    name="new_password_confirmation"
                                                                    render={({ field }) => (
                                                                        <FormItem>
                                                                            <FormLabel className="text-slate-700 font-bold">Confirm New Password</FormLabel>
                                                                            <FormControl>
                                                                                <div className="relative">
                                                                                    <ShieldCheck className="absolute left-3 top-3.5 w-5 h-5 text-slate-400" />
                                                                                    <Input type="password" {...field} className="h-12 border-slate-200 pl-11 focus:ring-emerald-500 rounded-xl bg-slate-50/50" />
                                                                                </div>
                                                                            </FormControl>
                                                                            <FormMessage />
                                                                        </FormItem>
                                                                    )}
                                                                />
                                                            </div>

                                                            <Button
                                                                type="submit"
                                                                className="w-full md:w-auto px-8 h-12 bg-[#1b7d81] hover:bg-[#16666a] text-white rounded-xl shadow-lg transition-all font-bold gap-2"
                                                                disabled={isLoading}
                                                            >
                                                                {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Lock className="w-5 h-5" />}
                                                                Update Password
                                                            </Button>
                                                        </form>
                                                    </Form>
                                                </CardContent>
                                            </Card>
                                        </motion.div>
                                    </TabsContent>
                                </AnimatePresence>
                            </Tabs>
                        </div>

                    </div>
                </motion.div>
            </main>

        </>
    )
}
