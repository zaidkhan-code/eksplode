"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PageHeader } from "@/components/ui/page-header";
import { Mail, Lock, User, Shield, LogOut, Camera } from "lucide-react";

import { toast } from "sonner";
import { useAuth } from "../Context/AuthContext";
import { uploadImageAction } from "@/app/actions/uploadImageAction";
import useApi from "@/lib/useApi";

export default function ProfilePage() {
  const { user, logout, setUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(user?.profilePic || "");

  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    profilePic: user?.profilePic || "",
  });

  // ✅ Image Upload Handler (using your global uploadImageAction)
  const handleImageChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const form = new FormData();
      form.append("image", file);

      const uploadRes = await uploadImageAction(form);
      if (uploadRes?.url) {
        setFormData({ ...formData, profilePic: uploadRes.url });
        setPreview(uploadRes.url);
        toast.success("Image uploaded successfully!");
      }
    } catch (error) {
      console.error(error);
      toast.error("Image upload failed!");
    } finally {
      setUploading(false);
    }
  };

  // ✅ Save Changes (API Call)
  const handleSave = async () => {
    try {
      setLoading(true);
      useApi(
        "auth/update-profile",
        { method: "PUT", data: formData },
        (res, status) => {
          if (status) {
            localStorage.setItem("user", JSON.stringify(res.user));
            toast.success("Profile updated successfully!");
            setUser(res.user);
            setIsEditing(false);
          } else {
            toast.error("Failed to update profile");
          }
        }
      );
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black">
      <PageHeader
        title="Profile Settings"
        description="Manage your account information"
      />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid gap-6">
          {/* Profile Card */}
          <Card className="bg-black border-red-500/20">
            <CardHeader className="flex flex-row items-center justify-between border-b border-red-500/20">
              <div>
                <CardTitle className="text-white">
                  Personal Information
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Update your profile details
                </CardDescription>
              </div>
              <Button
                onClick={() => setIsEditing(!isEditing)}
                className="bg-red-600 hover:bg-red-700"
              >
                {isEditing ? "Cancel" : "Edit"}
              </Button>
            </CardHeader>

            <CardContent className="space-y-6 pt-6">
              {/* Profile Picture */}
              <div className="flex items-center gap-4">
                <div className="relative w-16 h-16 rounded-full overflow-hidden bg-red-900/30 flex items-center justify-center">
                  {preview ? (
                    <img
                      src={preview}
                      alt="Profile"
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <User className="w-8 h-8 text-red-400" />
                  )}
                  {isEditing && (
                    <>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="absolute inset-0 opacity-0 cursor-pointer"
                      />
                      <div className="absolute bottom-0 right-0 bg-red-700 p-1 rounded-full">
                        <Camera className="w-4 h-4 text-white" />
                      </div>
                    </>
                  )}
                </div>
                <div>
                  <p className="font-semibold text-white">{formData.name}</p>
                  <p className="text-sm text-gray-400">
                    {user?.createdAt
                      ? `Member since ${new Date(
                          user.createdAt
                        ).toLocaleDateString()}`
                      : ""}
                  </p>
                </div>
              </div>

              {/* Form Fields */}
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-white">
                    Full Name
                  </label>
                  <Input
                    disabled={!isEditing}
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="mt-2 bg-black border-red-500/20 text-white"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-white">
                    Email
                  </label>
                  <Input
                    disabled={!isEditing}
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="mt-2 bg-black border-red-500/20 text-white"
                  />
                </div>
              </div>

              {isEditing && (
                <Button
                  disabled={loading || uploading}
                  onClick={handleSave}
                  className="w-full bg-red-600 hover:bg-red-700"
                >
                  {loading || uploading ? "Saving..." : "Save Changes"}
                </Button>
              )}
            </CardContent>
          </Card>

          {/* Security Card */}
          <Card className="bg-black border-red-500/20">
            <CardHeader className="border-b border-red-500/20">
              <CardTitle className="flex items-center gap-2 text-white">
                <Shield className="w-5 h-5" />
                Security
              </CardTitle>
              <CardDescription className="text-gray-400">
                Manage your account security
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
              <Button className="w-full justify-start gap-2 bg-red-900/20 text-red-400 hover:bg-red-900/40 border border-red-500/30">
                <Lock className="w-4 h-4" />
                Change Password
              </Button>
              <Button className="w-full justify-start gap-2 bg-red-900/20 text-red-400 hover:bg-red-900/40 border border-red-500/30">
                <Mail className="w-4 h-4" />
                Update Email
              </Button>
            </CardContent>
          </Card>

          {/* Logout Card */}
          <Card className="bg-red-900/20 border-red-500/30">
            <CardHeader className="border-b border-red-500/30">
              <CardTitle className="text-red-400">Danger Zone</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <Button
                onClick={logout}
                className="w-full justify-start gap-2 bg-red-600 hover:bg-red-700 text-white"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
