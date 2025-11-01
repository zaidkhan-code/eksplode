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
import { Mail, Lock, User, Shield, LogOut } from "lucide-react";

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john@example.com",
    phone: "+1 (555) 123-4567",
    joinDate: "January 15, 2024",
  });

  const [formData, setFormData] = useState(profile);

  const handleSave = () => {
    setProfile(formData);
    setIsEditing(false);
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
                onClick={() =>
                  isEditing ? setIsEditing(false) : setIsEditing(true)
                }
                className={
                  isEditing
                    ? "bg-red-600 hover:bg-red-700"
                    : "bg-red-600 hover:bg-red-700"
                }
              >
                {isEditing ? "Cancel" : "Edit"}
              </Button>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              {/* Profile Avatar */}
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-red-600/20 flex items-center justify-center">
                  <User className="w-8 h-8 text-red-500" />
                </div>
                <div>
                  <p className="font-semibold text-white">{profile.name}</p>
                  <p className="text-sm text-gray-400">
                    Member since {profile.joinDate}
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
                <div>
                  <label className="text-sm font-medium text-white">
                    Phone
                  </label>
                  <Input
                    disabled={!isEditing}
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="mt-2 bg-black border-red-500/20 text-white"
                  />
                </div>
              </div>

              {isEditing && (
                <Button
                  onClick={handleSave}
                  className="w-full bg-red-600 hover:bg-red-700"
                >
                  Save Changes
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
              <Button className="w-full justify-start gap-2 bg-red-600 hover:bg-red-700 text-white">
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
