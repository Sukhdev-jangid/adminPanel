"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function EditUserForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [role, setRole] = useState<"user" | "admin">("user");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedUser = { name, email, mobile, role };
    console.log("Updated User Info:", updatedUser);
  };

  return (
    <div className="max-w-xl mx-auto px-6 py-8 bg-white border border-gray-200 rounded-2xl shadow-sm">
      <h2 className="text-3xl font-semibold text-gray-800 mb-8">Edit User</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Full Name */}
        <div className="grid gap-2">
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            placeholder="Enter full name"
            className="w-full p-2 border border-gray-300 rounded-lg"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {/* Email */}
        <div className="grid gap-2">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            type="email"
            placeholder="Enter email"
            className="w-full p-2 border border-gray-300 rounded-lg"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Mobile */}
        <div className="grid gap-2">
          <Label htmlFor="mobile">Mobile Number</Label>
          <Input
            id="mobile"
            placeholder="Enter mobile number"
            className="w-full border border-gray-300 rounded-lg p-2"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
          />
        </div>

        {/* Role */}
        <div className="grid gap-2">
          <Label htmlFor="role">User Role</Label>
          <Select value={role} onValueChange={(value) => setRole(value as "user" | "admin")}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="user">User</SelectItem>
              <SelectItem value="admin">Admin</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Submit */}
        <div className="pt-2">
          <Button type="submit" variant={"blue"} size={"full"}>
            Update User
          </Button>
        </div>
      </form>
    </div>
  );
}
