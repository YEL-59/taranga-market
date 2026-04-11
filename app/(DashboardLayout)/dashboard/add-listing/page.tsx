"use client"

import React, { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { motion, AnimatePresence } from "framer-motion"
import {
  Camera,
  Car,
  Home,
  Smartphone,
  Wrench,
  Briefcase,
  MapPin,
  Upload,
  X,
  Info,
  ShieldCheck,
  AlertCircle,
  Zap,
  CheckCircle2,
  Calendar
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

import { useEffect } from "react"
import {
  createListingService,
  getCategoriesService,
  getSubCategoriesService
} from "@/services/listing"
import { toast as hotToast } from "sonner"
import { useRouter } from "next/navigation"

const CATEGORIES = [
  { id: "1", name: "Vehicles", icon: Car, color: "bg-blue-50 text-blue-600 border-blue-100", slug: "vehicles" },
  { id: "2", name: "Properties", icon: Home, color: "bg-emerald-50 text-emerald-600 border-emerald-100", slug: "properties" },
  { id: "3", name: "Electronics", icon: Smartphone, color: "bg-purple-50 text-purple-600 border-purple-100", slug: "phones" },
  { id: "4", name: "Services", icon: Wrench, color: "bg-orange-50 text-orange-600 border-orange-100", slug: "services" },
  { id: "5", name: "Jobs", icon: Briefcase, color: "bg-rose-50 text-rose-600 border-rose-100", slug: "jobs" },
]

const addListingSchema = z.object({
  // Global
  title: z.string().min(10, "Title must be at least 10 characters"),
  category: z.string().min(1, "Please select a category"),
  price: z.string().min(1, "Price is required"),
  currency: z.string(),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  description: z.string().min(20, "Description must be at least 20 characters"),
  phone: z.string().min(10, "Valid phone number is required"),
  whatsapp: z.string().optional(),

  // Vehicles (Extensive)
  vehicleBrand: z.string().optional(),
  vehicleModel: z.string().optional(),
  vehicleYear: z.string().optional(),
  vehicleMileage: z.string().optional(),
  vehicleTransmission: z.string().optional(),
  vehicleFuelType: z.string().optional(),
  vehicleBodyType: z.string().optional(),
  vehicleColor: z.string().optional(),
  vehicleCondition: z.string().optional(),
  vehicleEngineSize: z.string().optional(),
  vehicleFeatures: z.array(z.string()),

  // Properties (Extensive)
  propertyType: z.string().optional(),
  propertyOfferType: z.string().optional(),
  propertyBedrooms: z.string().optional(),
  propertyBathrooms: z.string().optional(),
  propertySize: z.string().optional(),
  propertyFurnished: z.string().optional(),
  propertyFloor: z.string().optional(),
  propertyAmenities: z.array(z.string()),

  // Products/Electronics (Extensive)
  productBrand: z.string().optional(),
  productModel: z.string().optional(),
  productCondition: z.string().optional(),
  productStorage: z.string().optional(),
  productRam: z.string().optional(),
  productWarranty: z.string().optional(),
  productIncludes: z.array(z.string()),

  // Jobs (Extensive)
  jobRole: z.string().optional(),
  jobCompanyName: z.string().optional(),
  jobType: z.string().optional(),
  jobExperienceLevel: z.string().optional(),
  jobEducation: z.string().optional(),
  jobWorkMode: z.string().optional(),
  jobSalaryMin: z.string().optional(),
  jobSalaryMax: z.string().optional(),
  jobBenefits: z.array(z.string()),

  // Services (Extensive)
  serviceProviderStatus: z.string().optional(),
  serviceExperience: z.string().optional(),
  servicePricingModel: z.string().optional(),
  serviceAvailability: z.array(z.string()),
  serviceWebsite: z.string().optional(),
})

export default function AddListingPage() {
  const [categories, setCategories] = useState<any[]>([])
  const [subcategories, setSubcategories] = useState<any[]>([])
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("")
  const [selectedCategorySlug, setSelectedCategorySlug] = useState<string>("")
  const [featuredImage, setFeaturedImage] = useState<File | null>(null)
  const [galleryImages, setGalleryImages] = useState<File[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  const form = useForm<z.infer<typeof addListingSchema>>({
    resolver: zodResolver(addListingSchema),
    defaultValues: {
      title: "",
      category: "",
      price: "",
      currency: "CFA",
      city: "",
      state: "",
      description: "",
      phone: "",
      whatsapp: "",
      vehicleFeatures: [],
      propertyAmenities: [],
      productIncludes: [],
      jobBenefits: [],
      serviceAvailability: [],
    },
  })

  useEffect(() => {
    const fetchCats = async () => {
      const res = await getCategoriesService();
      if (res.success) setCategories(res.data);
    };
    fetchCats();
  }, []);

  const handleCategorySelect = async (id: string) => {
    const category = CATEGORIES.find(c => c.id === id)
    if (!category) return;

    setSelectedCategoryId(id)
    setSelectedCategorySlug(category.slug)
    form.setValue("category", id)
    setSubcategories([])
    const res = await getSubCategoriesService(id);
    if (res.success) setSubcategories(res.data);
  }

  const handleFeaturedImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setFeaturedImage(file);
  }

  const handleGalleryImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (galleryImages.length + files.length <= 8) {
      setGalleryImages([...galleryImages, ...files]);
    } else {
      hotToast.error("Maximum 8 images allowed");
    }
  }

  async function onSubmit(values: z.infer<typeof addListingSchema>) {
    setIsSubmitting(true)
    try {
      const formData = new FormData();

      formData.append("category_id", selectedCategoryId);
      // If the selected value in form is same as parent category, we send category ID as subcategory too 
      // otherwise we send the specific subcategory ID
      formData.append("subcategory", values.category);
      formData.append("title", values.title);
      formData.append("price", values.price);
      formData.append("description", values.description);
      formData.append("city", values.city);
      formData.append("state", values.state);
      formData.append("is_featured", "1");
      formData.append("status", "1");

      // Specification Mapping based on slug
      if (selectedCategorySlug === "vehicles") {
        if (values.vehicleBrand) formData.append("specification[General][]", `Brand: ${values.vehicleBrand}`);
        if (values.vehicleYear) formData.append("specification[General][]", `Year: ${values.vehicleYear}`);
        if (values.vehicleMileage) formData.append("specification[General][]", `Mileage: ${values.vehicleMileage} KM`);
        if (values.vehicleTransmission) formData.append("specification[General][]", `Transmission: ${values.vehicleTransmission}`);
        values.vehicleFeatures.forEach(f => formData.append("specification[General][]", f));
      } else if (selectedCategorySlug === "properties") {
        if (values.propertyType) formData.append("specification[General][]", `Type: ${values.propertyType}`);
        if (values.propertyOfferType) formData.append("specification[General][]", `Offer: ${values.propertyOfferType}`);
        if (values.propertyBedrooms) formData.append("specification[General][]", `Bedrooms: ${values.propertyBedrooms}`);
        if (values.propertySize) formData.append("specification[General][]", `Size: ${values.propertySize}`);
        values.propertyAmenities.forEach(a => formData.append("specification[General][]", a));
      } else if (selectedCategorySlug === "phones") {
        if (values.productBrand) formData.append("specification[Hardware][]", `Brand: ${values.productBrand}`);
        if (values.productModel) formData.append("specification[Hardware][]", `Model: ${values.productModel}`);
        if (values.productStorage) formData.append("specification[Hardware][]", `Storage: ${values.productStorage}`);
        if (values.productRam) formData.append("specification[Hardware][]", `RAM: ${values.productRam}`);
        values.productIncludes.forEach(i => formData.append("specification[Hardware][]", i));
      } else if (selectedCategorySlug === "services") {
        if (values.serviceProviderStatus) formData.append("specification[experise][]", `Status: ${values.serviceProviderStatus}`);
        if (values.serviceExperience) formData.append("specification[experise][]", `Experience: ${values.serviceExperience}`);
      } else if (selectedCategorySlug === "jobs") {
        if (values.jobRole) formData.append("specification[experise][]", `Role: ${values.jobRole}`);
        if (values.jobType) formData.append("specification[experise][]", `Job Type: ${values.jobType}`);
        if (values.jobExperienceLevel) formData.append("specification[experise][]", `Experience: ${values.jobExperienceLevel}`);
        if (values.jobSalaryMin && values.jobSalaryMax) formData.append("specification[experise][]", `Salary: ${values.jobSalaryMin} - ${values.jobSalaryMax}`);
      }

      if (featuredImage) {
        formData.append("featured_image", featuredImage);
      }
      galleryImages.forEach((img, idx) => {
        formData.append(`gallery_image[${idx}]`, img);
      });

      const res = await createListingService(formData);
      if (res.success) {
        hotToast.success("Listing created successfully!");
        router.push("/dashboard/my-listings");
      } else {
        hotToast.error(res.message || "Failed to create listing");
      }
    } catch (error) {
      console.error("Listing creation error:", error);
      hotToast.error("An error occurred while posting the ad");
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 pb-20">

      {/* LEFT: FORM AREA */}
      <div className="lg:col-span-8 space-y-8">
        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
          <h2 className="text-3xl font-bold text-slate-800 tracking-tight">Post Your Advertisement</h2>
          <p className="text-slate-500 mt-2">Fill every detail to sell your items 2x faster.</p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

            {/* 1. CATEGORY SELECTION */}
            <Card className="p-8 border-slate-100 shadow-sm">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-[#1b7d81] flex items-center justify-center text-white font-bold">1</div>
                  <h3 className="text-xl font-bold text-slate-800">What are you listing?</h3>
                </div>
                {selectedCategoryId && <CheckCircle2 className="w-6 h-6 text-emerald-500" />}
              </div>

              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {CATEGORIES.map((cat) => {
                  const isSelected = selectedCategoryId === cat.id
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => handleCategorySelect(cat.id)}
                      className={cn(
                        "flex flex-col items-center p-6 rounded-2xl border-2 transition-all duration-300 gap-3 group",
                        isSelected
                          ? `${cat.color} scale-105 shadow-xl shadow-slate-200/50`
                          : "bg-slate-50 border-transparent hover:bg-white hover:border-slate-200 text-slate-400"
                      )}
                    >
                      <cat.icon className={cn("w-8 h-8", isSelected ? "text-current" : "text-slate-300 group-hover:text-slate-500")} />
                      <span className="font-bold text-xs uppercase tracking-widest">{cat.name}</span>
                    </button>
                  )
                })}
              </div>

              {
                subcategories.length > 0 && (
                  <div className="mt-8 space-y-4">
                    <Label className="text-slate-600 font-bold uppercase text-[11px] tracking-wider">Specific Sub-category</Label>
                    <div className="flex flex-wrap gap-2">
                      {subcategories.map((sub) => (
                        <button
                          key={sub.id}
                          type="button"
                          onClick={() => form.setValue("category", String(sub.id))}
                          className={cn(
                            "px-4 py-2 rounded-xl border text-sm font-medium transition-all",
                            form.watch("category") === String(sub.id)
                              ? "bg-[#1b7d81] text-white border-[#1b7d81]"
                              : "bg-white text-slate-600 border-slate-200 hover:border-emerald-200"
                          )}
                        >
                          {sub.name}
                        </button>
                      ))}
                    </div>
                  </div>
                )
              }
            </Card>

            <AnimatePresence mode="wait">
              {selectedCategoryId && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="space-y-8"
                >
                  {/* 2. MEDIA UPLOAD */}
                  <Card className="p-8 border-slate-100 shadow-sm">
                    <div className="flex items-center justify-between mb-8">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-2xl bg-[#1b7d81] flex items-center justify-center text-white font-bold">2</div>
                        <h3 className="text-xl font-bold text-slate-800">Photos & Media</h3>
                      </div>
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{galleryImages.length + (featuredImage ? 1 : 0)}/8 Photos</span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      {featuredImage && (
                        <div className="relative aspect-[4/3] rounded-2xl overflow-hidden group border border-slate-100 shadow-sm">
                          <img
                            src={URL.createObjectURL(featuredImage)}
                            alt="Featured"
                            className="w-full h-full object-cover transition-transform group-hover:scale-110"
                          />
                          <button
                            type="button"
                            onClick={() => setFeaturedImage(null)}
                            className="absolute top-2 right-2 p-1.5 bg-white/90 rounded-lg text-rose-500 shadow-sm hover:bg-white transition-colors"
                          >
                            <X className="w-4 h-4" />
                          </button>
                          <div className="absolute bottom-0 left-0 right-0 bg-emerald-500 text-white text-[10px] font-bold py-1 text-center">MAIN COVER</div>
                        </div>
                      )}
                      {galleryImages.map((img, idx) => (
                        <div key={idx} className="relative aspect-[4/3] rounded-2xl overflow-hidden group border border-slate-100">
                          <img
                            src={URL.createObjectURL(img)}
                            alt={`Gallery ${idx}`}
                            className="w-full h-full object-cover transition-transform group-hover:scale-110"
                          />
                          <button
                            type="button"
                            onClick={() => setGalleryImages(galleryImages.filter((_, i) => i !== idx))}
                            className="absolute top-2 right-2 p-1.5 bg-white/90 rounded-lg text-rose-500 opacity-0 group-hover:opacity-100 transition-all shadow-sm hover:bg-white"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                      {galleryImages.length + (featuredImage ? 1 : 0) < 8 && (
                        <div className="relative aspect-[4/3]">
                          <label
                            className="w-full h-full rounded-2xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center gap-3 text-slate-400 hover:border-[#1b7d81] hover:bg-emerald-50/10 hover:text-[#1b7d81] transition-all group cursor-pointer"
                          >
                            <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-white group-hover:scale-110 transition-all">
                              <Upload className="w-6 h-6" />
                            </div>
                            <span className="text-xs font-bold">{!featuredImage ? "Add Cover" : "Add Photo"}</span>
                            <input
                              type="file"
                              className="hidden"
                              accept="image/*"
                              onChange={!featuredImage ? handleFeaturedImageChange : handleGalleryImagesChange}
                              multiple={!!featuredImage}
                            />
                          </label>
                        </div>
                      )}
                    </div>
                  </Card>

                  {/* 3. CORE AD DETAILS */}
                  <Card className="p-8 border-slate-100 shadow-sm space-y-8">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-2xl bg-[#1b7d81] flex items-center justify-center text-white font-bold">3</div>
                      <h3 className="text-xl font-bold text-slate-800">Advertisement Basics</h3>
                    </div>

                    <div className="grid gap-6">
                      <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-slate-600 font-bold uppercase text-[11px] tracking-wider">Item/Title Heading</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g. 2024 Tesla Model S Plaid - Special Edition" {...field} className="h-14 rounded-2xl border-slate-200 focus:ring-emerald-500 font-medium" />
                            </FormControl>
                            <FormDescription className="text-xs">Include brand, condition, and key features to attract attention.</FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <FormLabel className="text-slate-600 font-bold uppercase text-[11px] tracking-wider">Listing Price</FormLabel>
                          <div className="flex gap-2">
                            <div className="w-24 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-center font-bold text-slate-400">CFA</div>
                            <FormField
                              control={form.control}
                              name="price"
                              render={({ field }) => (
                                <FormItem className="flex-1">
                                  <FormControl>
                                    <Input type="number" placeholder="0.00" {...field} className="h-14 rounded-2xl border-slate-200 font-bold text-lg" />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:col-span-2">
                          <FormField
                            control={form.control}
                            name="city"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-slate-600 font-bold uppercase text-[11px] tracking-wider">City / Area</FormLabel>
                                <FormControl>
                                  <Input placeholder="e.g. Dhaka" {...field} className="h-14 rounded-2xl border-slate-200 font-medium" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="state"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-slate-600 font-bold uppercase text-[11px] tracking-wider">State / Region</FormLabel>
                                <FormControl>
                                  <Input placeholder="e.g. Bangladesh" {...field} className="h-14 rounded-2xl border-slate-200 font-medium" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                    </div>
                  </Card>

                  {/* 4. EXTENSIVE CATEGORY FEATURES */}
                  <Card className="p-8 border-slate-100 shadow-sm bg-slate-50/20">
                    <div className="flex items-center gap-3 mb-8">
                      <div className="w-10 h-10 rounded-2xl bg-[#1b7d81] flex items-center justify-center text-white font-bold">4</div>
                      <h3 className="text-xl font-bold text-slate-800">Detailed Specifications</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10">

                      {/* --- VEHICLE SECTION --- */}
                      {selectedCategorySlug === "vehicles" && (
                        <>
                          <FormField
                            control={form.control}
                            name="vehicleBrand"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-slate-500 font-bold text-xs">Brand Name</FormLabel>
                                <Input placeholder="e.g. Mercedes-Benz" {...field} className="h-11 rounded-xl bg-white" />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="vehicleYear"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-slate-500 font-bold text-xs">Manufacture Year</FormLabel>
                                <FormControl>
                                  <Input placeholder="e.g. 2024" {...field} className="h-11 rounded-xl bg-white" />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="vehicleMileage"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-slate-500 font-bold text-xs">Mileage (KM)</FormLabel>
                                <Input placeholder="0 km" {...field} className="h-11 rounded-xl bg-white" />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="vehicleTransmission"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-slate-500 font-bold text-xs">Transmission Type</FormLabel>
                                <RadioGroup onValueChange={field.onChange} className="flex gap-6 h-11 items-center">
                                  <div className="flex items-center space-x-2"><RadioGroupItem value="auto" id="v-auto" /><Label htmlFor="v-auto" className="text-sm font-medium">Automatic</Label></div>
                                  <div className="flex items-center space-x-2"><RadioGroupItem value="manual" id="v-manual" /><Label htmlFor="v-manual" className="text-sm font-medium">Manual</Label></div>
                                </RadioGroup>
                              </FormItem>
                            )}
                          />
                          <div className="md:col-span-2 space-y-4 pt-4 border-t border-slate-100">
                            <Label className="text-slate-800 font-bold text-sm">Car Features & Equipment</Label>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                              {["Sunroof", "AC", "Navigation", "Leather", "Reverse Cam", "Touch Screen", "Bluetooth", "ABS"].map(f => (
                                <div key={f} className="flex items-center gap-2">
                                  <Checkbox id={f} onCheckedChange={(checked) => {
                                    const current = form.getValues("vehicleFeatures") || []
                                    form.setValue("vehicleFeatures", checked ? [...current, f] : current.filter(x => x !== f))
                                  }} />
                                  <Label htmlFor={f} className="text-xs font-medium text-slate-500 cursor-pointer">{f}</Label>
                                </div>
                              ))}
                            </div>
                          </div>
                        </>
                      )}

                      {/* --- PROPERTY SECTION --- */}
                      {selectedCategorySlug === "properties" && (
                        <>
                          <FormField
                            control={form.control}
                            name="propertyOfferType"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-slate-500 font-bold text-xs">Listing Purpose</FormLabel>
                                <RadioGroup onValueChange={field.onChange} className="flex gap-4 h-11 items-center">
                                  {["For Sale", "For Rent"].map(t => (
                                    <div key={t} className="flex items-center space-x-2"><RadioGroupItem value={t} id={t} /><Label htmlFor={t} className="text-sm font-medium">{t}</Label></div>
                                  ))}
                                </RadioGroup>
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="propertyType"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-slate-500 font-bold text-xs">Type of Property</FormLabel>
                                <FormControl>
                                  <Input placeholder="e.g. Duplex" {...field} className="h-11 rounded-xl bg-white" />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="propertyBedrooms"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-slate-500 font-bold text-xs">Total Bedrooms</FormLabel>
                                <Input type="number" placeholder="2" {...field} className="h-11 rounded-xl bg-white" />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="propertySize"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-slate-500 font-bold text-xs">Square Meters (m²)</FormLabel>
                                <Input placeholder="120 m²" {...field} className="h-11 rounded-xl bg-white" />
                              </FormItem>
                            )}
                          />
                          <div className="md:col-span-2 space-y-4 pt-4 border-t border-slate-100">
                            <Label className="text-slate-800 font-bold text-sm">Property Amenities</Label>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                              {["Parking", "Swimming Pool", "Garden", "Security", "Balcony", "Gym", "Elevator", "Furnished"].map(f => (
                                <div key={f} className="flex items-center gap-2">
                                  <Checkbox id={f} onCheckedChange={(checked) => {
                                    const current = form.getValues("propertyAmenities") || []
                                    form.setValue("propertyAmenities", checked ? [...current, f] : current.filter(x => x !== f))
                                  }} />
                                  <Label htmlFor={f} className="text-xs font-medium text-slate-500 cursor-pointer">{f}</Label>
                                </div>
                              ))}
                            </div>
                          </div>
                        </>
                      )}

                      {/* --- ELECTRONICS/PHONES SECTION --- */}
                      {selectedCategorySlug === "phones" && (
                        <>
                          <FormField
                            control={form.control}
                            name="productBrand"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-slate-500 font-bold text-xs">Brand Component</FormLabel>
                                <Input placeholder="Apple / Samsung" {...field} className="h-11 rounded-xl bg-white" />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="productModel"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-slate-500 font-bold text-xs">Exact Model</FormLabel>
                                <Input placeholder="iPhone 16 Pro Max" {...field} className="h-11 rounded-xl bg-white" />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="productStorage"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-slate-500 font-bold text-xs">Internal Memory</FormLabel>
                                <FormControl>
                                  <Input placeholder="e.g. 512 GB" {...field} className="h-11 rounded-xl bg-white" />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="productRam"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-slate-500 font-bold text-xs">RAM Capacity</FormLabel>
                                <FormControl>
                                  <Input placeholder="e.g. 16 GB" {...field} className="h-11 rounded-xl bg-white" />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="productWarranty"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-slate-500 font-bold text-xs">Warranty Info</FormLabel>
                                <Input placeholder="e.g. 6 Months Remaining" {...field} className="h-11 rounded-xl bg-white" />
                              </FormItem>
                            )}
                          />
                          <div className="md:col-span-2 space-y-4 pt-4 border-t border-slate-100">
                            <Label className="text-slate-800 font-bold text-sm">Items Included in Box</Label>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                              {["Charger", "Cable", "Headphones", "Case", "Screen Guard", "Invoice", "Box", "Warranty Card"].map(f => (
                                <div key={f} className="flex items-center gap-2">
                                  <Checkbox id={f} onCheckedChange={(checked) => {
                                    const current = form.getValues("productIncludes") || []
                                    form.setValue("productIncludes", checked ? [...current, f] : current.filter(x => x !== f))
                                  }} />
                                  <Label htmlFor={f} className="text-xs font-medium text-slate-500 cursor-pointer">{f}</Label>
                                </div>
                              ))}
                            </div>
                          </div>
                        </>
                      )}

                      {/* --- JOBS SECTION --- */}
                      {selectedCategorySlug === "jobs" && (
                        <>
                          <FormField
                            control={form.control}
                            name="jobRole"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-slate-500 font-bold text-xs">Position Name</FormLabel>
                                <Input placeholder="Software Engineer" {...field} className="h-11 rounded-xl bg-white" />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="jobCompanyName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-slate-500 font-bold text-xs">Hiring Company</FormLabel>
                                <Input placeholder="Tech Ventures Ltd." {...field} className="h-11 rounded-xl bg-white" />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="jobSalaryMin"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-slate-500 font-bold text-xs">Min Monthly Salary</FormLabel>
                                <Input placeholder="150,000" {...field} className="h-11 rounded-xl bg-white" />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="jobSalaryMax"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-slate-500 font-bold text-xs">Max Monthly Salary</FormLabel>
                                <Input placeholder="300,000" {...field} className="h-11 rounded-xl bg-white" />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="jobWorkMode"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-slate-500 font-bold text-xs">Working Arrangement</FormLabel>
                                <Select onValueChange={field.onChange}><SelectTrigger className="h-11 bg-white rounded-xl"><SelectValue placeholder="Remote" /></SelectTrigger><SelectContent>{["On-site", "Remote", "Hybrid"].map(x => <SelectItem key={x} value={x}>{x}</SelectItem>)}</SelectContent></Select>
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="jobEducation"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-slate-500 font-bold text-xs">Education Requirement</FormLabel>
                                <Select onValueChange={field.onChange}><SelectTrigger className="h-11 bg-white rounded-xl"><SelectValue placeholder="Bachelor Degree" /></SelectTrigger><SelectContent>{["High School", "Bachelor Degree", "Master Degree", "No specific"].map(x => <SelectItem key={x} value={x}>{x}</SelectItem>)}</SelectContent></Select>
                              </FormItem>
                            )}
                          />
                          <div className="md:col-span-2 space-y-4 pt-4 border-t border-slate-100">
                            <Label className="text-slate-800 font-bold text-sm">Job Benefits & Perks</Label>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                              {["Health Insurance", "Remote Work", "Bonuses", "Travel", "Paid Time Off", "Stocks/EQUITY", "Training", "Gym"].map(f => (
                                <div key={f} className="flex items-center gap-2">
                                  <Checkbox id={f} onCheckedChange={(checked) => {
                                    const current = form.getValues("jobBenefits") || []
                                    form.setValue("jobBenefits", checked ? [...current, f] : current.filter(x => x !== f))
                                  }} />
                                  <Label htmlFor={f} className="text-xs font-medium text-slate-500 cursor-pointer">{f}</Label>
                                </div>
                              ))}
                            </div>
                          </div>
                        </>
                      )}

                      {/* --- SERVICES SECTION --- */}
                      {selectedCategorySlug === "services" && (
                        <>
                          <FormField
                            control={form.control}
                            name="serviceProviderStatus"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-slate-500 font-bold text-xs">Entity Type</FormLabel>
                                <RadioGroup onValueChange={field.onChange} className="flex gap-4 h-11 items-center">
                                  {["Individual Pro", "Registered Agency"].map(t => (
                                    <div key={t} className="flex items-center space-x-2"><RadioGroupItem value={t} id={t} /><Label htmlFor={t} className="text-sm font-medium">{t}</Label></div>
                                  ))}
                                </RadioGroup>
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="serviceExperience"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-slate-500 font-bold text-xs">Industry Experience</FormLabel>
                                <Input placeholder="3+ Years" {...field} className="h-11 rounded-xl bg-white" />
                              </FormItem>
                            )}
                          />
                        </>
                      )}

                    </div>
                  </Card>

                  {/* 5. DESCRIPTION */}
                  <Card className="p-8 border-slate-100 shadow-sm">
                    <div className="flex items-center gap-3 mb-8">
                      <div className="w-10 h-10 rounded-2xl bg-[#1b7d81] flex items-center justify-center text-white font-bold">5</div>
                      <h3 className="text-xl font-bold text-slate-800">Final Presentation</h3>
                    </div>

                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-600 font-bold uppercase text-[11px] tracking-wider">Detailed Description</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Describe your item in detail. Mention things like condition, warranty, features, and reason for selling."
                              {...field}
                              className="min-h-[220px] rounded-3xl border-slate-200 p-6 resize-none transition-all focus:border-emerald-200"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </Card>

                  {/* 6. CONTACT CHANNELS */}
                  <Card className="p-8 border-slate-100 shadow-sm bg-gradient-to-br from-slate-800 to-slate-900 text-white relative overflow-hidden group">
                    {/* Decorative background circle */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl pointer-events-none group-hover:bg-emerald-500/20 transition-all duration-700"></div>

                    <div className="flex items-center gap-3 mb-10 relative">
                      <div className="w-10 h-10 rounded-2xl bg-[#1b7d81] flex items-center justify-center text-white font-bold border-none">6</div>
                      <h3 className="text-xl font-bold tracking-tight">How should buyers contact you?</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative">
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">Phone Number (Required)</FormLabel>
                            <FormControl>
                              <Input placeholder="+221 ..." {...field} className="h-14 bg-white/5 border-white/10 rounded-2xl text-white font-bold placeholder:text-white/20 px-6" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="whatsapp"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">WhatsApp Link (Optional)</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter number..." {...field} className="h-14 bg-white/5 border-white/10 rounded-2xl text-white font-bold placeholder:text-white/20 px-6" />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <div className="flex items-end">
                        <Button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full h-14 bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-lg rounded-2xl shadow-2xl shadow-emerald-500/40 transition-all active:scale-95 space-x-2"
                        >
                          {isSubmitting ? (
                            <div className="flex items-center gap-2">
                              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                              <span>POSTING...</span>
                            </div>
                          ) : (
                            <>
                              <Zap className="w-5 h-5 fill-white" />
                              <span>POST MY AD NOW</span>
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </Form>
      </div>

      {/* RIGHT: SIDEBAR TIPS */}
      <div className="lg:col-span-4 space-y-6 sticky top-24 h-fit">
        <Card className="p-6 bg-[#1b7d81]/5 border-emerald-100 rounded-3xl space-y-4">
          <div className="flex items-center gap-2 text-[#1b7d81]">
            <ShieldCheck className="w-5 h-5" />
            <h4 className="font-bold">Trust & Safety Tips</h4>
          </div>
          <ul className="space-y-4">
            <li className="flex gap-3 items-start">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0"></div>
              <p className="text-xs text-slate-600 leading-relaxed"><span className="font-bold text-slate-800">Clear Photos:</span> Listings with high-quality photos get 60% more engagement.</p>
            </li>
            <li className="flex gap-3 items-start">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0"></div>
              <p className="text-xs text-slate-600 leading-relaxed"><span className="font-bold text-slate-800">Honest Pricing:</span> Check similar ads to set a competitive price.</p>
            </li>
            <li className="flex gap-3 items-start">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0"></div>
              <p className="text-xs text-slate-600 leading-relaxed"><span className="font-bold text-slate-800">Detailed Specs:</span> Fill all technical fields so buyers don't have to ask basic questions.</p>
            </li>
          </ul>
        </Card>

        <Card className="p-6 border-slate-100 rounded-3xl space-y-4 bg-slate-50">
          <div className="flex items-center gap-2 text-rose-500">
            <AlertCircle className="w-5 h-5" />
            <h4 className="font-bold">Posting Rules</h4>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center bg-white p-3 rounded-xl border border-slate-200">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Verification Required</span>
              <Zap className="w-4 h-4 text-emerald-500" />
            </div>
            <div className="flex justify-between items-center bg-white p-3 rounded-xl border border-slate-200">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">No Duplicate Ads</span>
              <CheckCircle2 className="w-4 h-4 text-blue-500" />
            </div>
            <p className="text-[10px] text-slate-400 text-center leading-relaxed px-4">By posting, you agree to our Terms of Use and Privacy Policy. Misleading ads will be removed.</p>
          </div>
        </Card>
      </div>

    </div >
  )
}
