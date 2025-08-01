'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

export default function ProfilePage() {
  const user = {
    name: "Sunil Soni",
    email: "sunil@example.com",
    avatarUrl: "https://api.dicebear.com/7.x/initials/svg?seed=Sunil+Soni",
    role: "Admin",
    joinedAt: "2024-12-10",
    coursesCreated: 8,
    lastLogin: "2025-07-28T10:30:00Z",
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <Card className="flex flex-col md:flex-row items-center gap-6 p-6 shadow-md">
        <Avatar className="w-24 h-24">
          <AvatarImage src={user.avatarUrl} alt={user.name} />
          <AvatarFallback>{user.name[0]}</AvatarFallback>
        </Avatar>
        <div className="flex-1 space-y-1">
          <CardTitle className="text-2xl">{user.name}</CardTitle>
          <p className="text-muted-foreground">{user.role}</p>
          <p className="text-sm text-gray-500">Joined on: {new Date(user.joinedAt).toLocaleDateString()}</p>
        </div>
        <div>
          <Button>Edit Profile</Button>
        </div>
      </Card>

      {/* Personal Info */}
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
        </CardHeader>
        <Separator />
        <CardContent className="space-y-3 pt-4">
          <div className="text-sm">
            <p className="font-semibold">Full Name</p>
            <p>{user.name}</p>
          </div>
          <div className="text-sm">
            <p className="font-semibold">Email</p>
            <p>{user.email}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
