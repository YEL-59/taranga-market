"use client"

import React, { useEffect, useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/hooks/useAuth"
import { Loader2 } from "lucide-react"

export default function ProfileDetailsPage() {
  const { user, updateProfile, changeProfilePhoto, removeProfilePhoto, getProfile } = useAuth();
  const [isPhotoLoading, setIsPhotoLoading] = useState(false);
  const [isRemovingPhoto, setIsRemovingPhoto] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const [formData, setFormData] = useState({
    full_name: "",
    whatsapp_link: "",
    phone_number: "",
    email: ""
  });

  useEffect(() => {
    if (user) {
      setFormData({
        full_name: user?.full_name || "",
        whatsapp_link: user?.whatsapp_link || "",
        phone_number: user?.phone_number || "",
        email: user?.email || ""
      });
    }
  }, [user]);

  useEffect(() => {
    getProfile();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    const { full_name, whatsapp_link, phone_number } = formData;
    await updateProfile({ full_name, whatsapp_link, phone_number });
    setIsSaving(false);
  };

  const handlePhotoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsPhotoLoading(true);
      const formData = new FormData();
      formData.append("profile_photo", file);
      await changeProfilePhoto(formData);
      setIsPhotoLoading(false);
    }
  };

  const handleRemovePhoto = async () => {
    setIsRemovingPhoto(true);
    await removeProfilePhoto();
    setIsRemovingPhoto(false);
  };

  const displayName = user?.full_name || `${user?.first_name || ""} ${user?.last_name || ""}`.trim() || "User";
  const photoUrl = user?.profile_photo || "";

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-[0_4px_24px_rgba(0,0,0,0.02)] p-2 md:p-8 space-y-8">
      <div>
        <h3 className="text-lg font-bold text-slate-800">My Account Details</h3>
        <p className="text-slate-400 text-sm mt-1">Manage your account information and preferences.</p>
      </div>

      <div className="space-y-8">
        <div>
          <h4 className="text-sm font-bold text-slate-600 mb-4">Profile Photo</h4>
          <div className="flex flex-wrap items-center gap-8">
            <Avatar className="w-20 h-20 border-4 border-slate-50">
              <AvatarImage src={photoUrl} />
              <AvatarFallback className="bg-emerald-100 text-emerald-700 font-bold text-xl">
                {displayName?.[0]}
              </AvatarFallback>
            </Avatar>
            <div className="flex gap-4">
              <button
                onClick={handleRemovePhoto}
                disabled={isRemovingPhoto || isPhotoLoading}
                className="text-sm font-bold text-slate-500 hover:text-red-500 disabled:opacity-50"
              >
                {isRemovingPhoto ? <Loader2 className="w-4 h-4 animate-spin inline mr-1" /> : "Remove photo"}
              </button>
              <div className="relative">
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                  disabled={isPhotoLoading || isRemovingPhoto}
                />
                <Button variant="outline" className="rounded-xl h-10 px-6 border-slate-200 font-bold text-slate-600">
                  {isPhotoLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Change photo"}
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="full_name" className="text-slate-600 font-bold text-sm">Full Name</Label>
            <Input
              id="full_name"
              value={formData.full_name}
              onChange={handleInputChange}
              placeholder="Enter your full name"
              className="h-12 border-slate-200 rounded-xl w-full"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-slate-600 font-bold text-sm">Email</Label>
            <Input
              id="email"
              value={formData.email}
              readOnly
              className="h-12 border-slate-200 rounded-xl w-full bg-slate-50/50 cursor-not-allowed"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone_number" className="text-slate-600 font-bold text-sm">Phone Number</Label>
            <Input
              id="phone_number"
              value={formData.phone_number}
              onChange={handleInputChange}
              placeholder="Enter your phone number"
              className="h-12 border-slate-200 rounded-xl w-full"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="whatsapp_link" className="text-slate-600 font-bold text-sm">WhatsApp Link</Label>
            <Input
              id="whatsapp_link"
              value={formData.whatsapp_link}
              onChange={handleInputChange}
              placeholder="Enter WhatsApp link"
              className="h-12 border-slate-200 rounded-xl w-full"
            />
          </div>
        </div>

        <div className="pt-4 flex justify-end">
          <Button
            onClick={handleSave}
            disabled={isSaving}
            className="h-12 px-12 rounded-xl bg-[#1b7d81] hover:bg-[#16666a] font-bold text-white shadow-lg shadow-emerald-900/10 transition-all flex items-center gap-2"
          >
            {isSaving && <Loader2 className="w-4 h-4 animate-spin" />}
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  )
}


