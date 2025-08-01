'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Mail,
  UserRound,
  CalendarDays,
  LogIn,
  BookOpenCheck,
  PencilLine,
} from "lucide-react";

export default function ProfilePage() {
  const user = {
    name: "Sunil Soni",
    email: "sunil@example.com",
    avatarUrl:
      "https://api.dicebear.com/7.x/initials/svg?seed=Sunil+Soni",
    role: "Admin",
    joinedAt: "2024-12-10",
    coursesCreated: 8,
    lastLogin: "2025-07-28T10:30:00Z",
  };

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      {/* 🔹 Landscape Style Profile Card */}
      <Card className="shadow-lg border rounded-2xl p-4 md:p-6 transition hover:shadow-2xl">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          {/* Left: Avatar */}
          <div className="flex-shrink-0">
            <Avatar className="w-28 h-28 border shadow">
              <AvatarImage src={user.avatarUrl} alt={user.name} />
              <AvatarFallback>{user.name[0]}</AvatarFallback>
            </Avatar>
          </div>

          {/* Right: Info */}
          <div className="flex-1 w-full space-y-2">
            <div className="flex justify-between items-start flex-wrap gap-4">
              <div>
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  <UserRound className="w-5 h-5 text-gray-500" />
                  {user.name}
                </h2>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="secondary">{user.role}</Badge>
                  <CalendarDays className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-muted-foreground">
                    Joined: {new Date(user.joinedAt).toLocaleDateString()}
                  </span>
                </div>
              </div>

              <Button size="sm" className="flex items-center gap-2 group">
                <PencilLine className="w-4 h-4 group-hover:rotate-6 transition duration-300" />
                Edit
              </Button>
            </div>

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <LogIn className="w-4 h-4" />
              <span>
                Last login: {new Date(user.lastLogin).toLocaleString()}
              </span>
            </div>

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <BookOpenCheck className="w-4 h-4" />
              <span>Courses Created: {user.coursesCreated}</span>
            </div>
          </div>
        </div>
      </Card>

      {/* 🔹 Personal Info Section */}
      <Card className="shadow-md border rounded-2xl transition hover:shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl font-semibold flex items-center gap-2">
            <UserRound className="w-5 h-5 text-gray-500" />
            Personal Information
          </CardTitle>
        </CardHeader>
        <Separator />
        <CardContent className="pt-4 grid gap-4 text-sm">
          <div className="flex items-center gap-3">
            <UserRound className="w-4 h-4 text-muted-foreground" />
            <div>
              <p className="font-medium text-gray-600">Full Name</p>
              <p>{user.name}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Mail className="w-4 h-4 text-muted-foreground" />
            <div>
              <p className="font-medium text-gray-600">Email</p>
              <p>{user.email}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
