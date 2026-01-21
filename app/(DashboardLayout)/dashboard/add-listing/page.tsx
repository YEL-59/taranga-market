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

const CATEGORIES = [
  { id: "vehicles", name: "Vehicles", icon: Car, color: "bg-blue-50 text-blue-600 border-blue-100" },
  { id: "properties", name: "Properties", icon: Home, color: "bg-emerald-50 text-emerald-600 border-emerald-100" },
  { id: "phones", name: "Electronics", icon: Smartphone, color: "bg-purple-50 text-purple-600 border-purple-100" },
  { id: "services", name: "Services", icon: Wrench, color: "bg-orange-50 text-orange-600 border-orange-100" },
  { id: "jobs", name: "Jobs", icon: Briefcase, color: "bg-rose-50 text-rose-600 border-rose-100" },
]

const addListingSchema = z.object({
  // Global
  title: z.string().min(10, "Title must be at least 10 characters"),
  category: z.string().min(1, "Please select a category"),
  price: z.string().min(1, "Price is required"),
  currency: z.string(),
  location: z.string().min(1, "Location is required"),
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
  const [selectedCategory, setSelectedCategory] = useState<string>("")
  const [images, setImages] = useState<string[]>([])

  const form = useForm<z.infer<typeof addListingSchema>>({
    resolver: zodResolver(addListingSchema),
    defaultValues: {
      title: "",
      category: "",
      price: "",
      currency: "CFA",
      location: "",
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

  function onSubmit(values: z.infer<typeof addListingSchema>) {
    console.log({ ...values, images })
    alert("Listing posted successfully with all details!")
  }

  const handleCategorySelect = (id: string) => {
    setSelectedCategory(id)
    form.setValue("category", id)
  }

  const addMockImage = () => {
    if (images.length < 8) {
      setImages([...images, `https://picsum.photos/seed/${Math.random()}/600/400`])
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
                {selectedCategory && <CheckCircle2 className="w-6 h-6 text-emerald-500" />}
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => handleCategorySelect(cat.id)}
                    className={cn(
                      "flex flex-col items-center p-6 rounded-2xl border-2 transition-all duration-300 gap-3 group",
                      selectedCategory === cat.id 
                        ? `${cat.color} scale-105 shadow-xl shadow-slate-200/50` 
                        : "bg-slate-50 border-transparent hover:bg-white hover:border-slate-200 text-slate-400"
                    )}
                  >
                    <cat.icon className={cn("w-8 h-8", selectedCategory === cat.id ? "text-current" : "text-slate-300 group-hover:text-slate-500")} />
                    <span className="font-bold text-xs uppercase tracking-widest">{cat.name}</span>
                  </button>
                ))}
              </div>
            </Card>

            <AnimatePresence mode="wait">
              {selectedCategory && (
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
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{images.length}/8 Photos</span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      {images.map((img, idx) => (
                        <div key={idx} className="relative aspect-[4/3] rounded-2xl overflow-hidden group border border-slate-100">
                          <img src={img} alt="" className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                          <button 
                            type="button"
                            onClick={() => setImages(images.filter((_, i) => i !== idx))}
                            className="absolute top-2 right-2 p-1.5 bg-white/90 rounded-lg text-rose-500 opacity-0 group-hover:opacity-100 transition-all shadow-sm"
                          >
                            <X className="w-4 h-4" />
                          </button>
                          {idx === 0 && <div className="absolute bottom-0 left-0 right-0 bg-emerald-500 text-white text-[10px] font-bold py-1 text-center">MAIN COVER</div>}
                        </div>
                      ))}
                      {images.length < 8 && (
                        <button
                          type="button"
                          onClick={addMockImage}
                          className="aspect-[4/3] rounded-2xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center gap-3 text-slate-400 hover:border-[#1b7d81] hover:bg-emerald-50/10 hover:text-[#1b7d81] transition-all group"
                        >
                          <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-white group-hover:scale-110 transition-all">
                            <Upload className="w-6 h-6" />
                          </div>
                          <span className="text-xs font-bold">Add Photo</span>
                        </button>
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

                        <FormField
                          control={form.control}
                          name="location"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-slate-600 font-bold uppercase text-[11px] tracking-wider">Where is it located?</FormLabel>
                              <Select onValueChange={field.onChange}>
                                <FormControl>
                                  <SelectTrigger className="h-14 rounded-2xl border-slate-200 font-medium">
                                    <SelectValue placeholder="Select Area / City" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="dakar-a">Almadies, Dakar</SelectItem>
                                  <SelectItem value="dakar-b">Plateau, Dakar</SelectItem>
                                  <SelectItem value="thies">Thies Central</SelectItem>
                                  <SelectItem value="st-louis">Saint-Louis North</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
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
                      {selectedCategory === "vehicles" && (
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
                                <Select onValueChange={field.onChange}>
                                  <SelectTrigger className="h-11 rounded-xl bg-white"><SelectValue placeholder="2024" /></SelectTrigger>
                                  <SelectContent>{[2024, 2023, 2022, 2021, 2020].map(yr => <SelectItem key={yr} value={yr.toString()}>{yr}</SelectItem>)}</SelectContent>
                                </Select>
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
                      {selectedCategory === "properties" && (
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
                                <Select onValueChange={field.onChange}><SelectTrigger className="h-11 bg-white rounded-xl"><SelectValue placeholder="Apartment" /></SelectTrigger><SelectContent>{["Apartment", "House", "Villa", "Land", "Office"].map(x => <SelectItem key={x} value={x}>{x}</SelectItem>)}</SelectContent></Select>
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
                      {selectedCategory === "phones" && (
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
                                <Select onValueChange={field.onChange}><SelectTrigger className="h-11 bg-white rounded-xl"><SelectValue placeholder="256 GB" /></SelectTrigger><SelectContent>{["64 GB", "128 GB", "256 GB", "512 GB", "1 TB"].map(x => <SelectItem key={x} value={x}>{x}</SelectItem>)}</SelectContent></Select>
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="productRam"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-slate-500 font-bold text-xs">RAM Capacity</FormLabel>
                                <Select onValueChange={field.onChange}><SelectTrigger className="h-11 bg-white rounded-xl"><SelectValue placeholder="8 GB" /></SelectTrigger><SelectContent>{["4 GB", "8 GB", "12 GB", "16 GB", "32 GB"].map(x => <SelectItem key={x} value={x}>{x}</SelectItem>)}</SelectContent></Select>
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
                      {selectedCategory === "jobs" && (
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
                      {selectedCategory === "services" && (
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
                         <Button type="submit" className="w-full h-14 bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-lg rounded-2xl shadow-2xl shadow-emerald-500/40 transition-all active:scale-95 space-x-2">
                           <Zap className="w-5 h-5 fill-white" />
                           <span>POST MY AD NOW</span>
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

    </div>
  )
}
