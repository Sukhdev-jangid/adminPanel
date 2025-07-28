"use client";

import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Trash2 } from "lucide-react";

// types/User.ts
export interface IUser {
  _id: string;
  name: string;
  email: string;
  role: "user" | "admin";
  createdAt: string;
}

const tempUsers: IUser[] = [
  {
    _id: "1",
    name: "Sunil Soni",
    email: "sunil@example.com",
    role: "admin",
    createdAt: "2024-01-10T08:30:00Z",
  },
  {
    _id: "2",
    name: "Sukhdev Jangid",
    email: "sukhdev@example.com",
    role: "user",
    createdAt: "2024-02-12T10:45:00Z",
  },
  {
    _id: "3",
    name: "Anjali Meena",
    email: "anjali@example.com",
    role: "user",
    createdAt: "2024-03-20T12:00:00Z",
  },
  {
    _id: "4",
    name: "Rahul Sharma",
    email: "rahul@example.com",
    role: "admin",
    createdAt: "2024-04-05T14:20:00Z",
  },
];

export default function UsersPage() {
  const [users, setUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setUsers(tempUsers);
      setLoading(false);
    }, 1200);
  }, []);

  const handleDelete = (id: string) => {
    const confirmDelete = confirm("Are you sure you want to delete this user?");
    if (confirmDelete) {
      setUsers((prev) => prev.filter((user) => user._id !== id));
    }
  };

  return (
    <div className="p-4 md:p-6">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">All Users</h2>

      <div className="overflow-x-auto rounded-lg border bg-white shadow-sm">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-50 text-left text-gray-700 font-semibold">
            <tr>
              <th className="px-4 py-3">#</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Role</th>
              <th className="px-4 py-3">Joined</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {loading ? (
              Array.from({ length: 6 }).map((_, index) => (
                <tr key={index} className="animate-pulse">
                  <td className="px-4 py-3">
                    <div className="h-4 w-6 bg-gray-200 rounded" />
                  </td>
                  <td className="px-4 py-3">
                    <div className="h-4 w-32 bg-gray-200 rounded" />
                  </td>
                  <td className="px-4 py-3">
                    <div className="h-4 w-40 bg-gray-200 rounded" />
                  </td>
                  <td className="px-4 py-3">
                    <div className="h-4 w-16 bg-gray-200 rounded" />
                  </td>
                  <td className="px-4 py-3">
                    <div className="h-4 w-24 bg-gray-200 rounded" />
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="h-8 w-24 bg-gray-200 rounded" />
                  </td>
                </tr>
              ))
            ) : (
              users.map((user, index) => (
                <tr key={user._id} className="hover:bg-gray-50 transition">
                  <td className="px-4 py-3 font-medium text-gray-700">{index + 1}</td>
                  <td className="px-4 py-3">{user.name}</td>
                  <td className="px-4 py-3">{user.email}</td>
                  <td className="px-4 py-3">
                    <Badge variant={user.role === "admin" ? "destructive" : "secondary"}>
                      {user.role}
                    </Badge>
                  </td>
                  <td className="px-4 py-3">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3 text-right space-x-2">
                    <Button variant="outline" size="sm" className="rounded-md">
                      <Eye className="w-4 h-4 mr-1" />
                      View
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      className="rounded-md"
                      onClick={() => handleDelete(user._id)}
                    >
                      <Trash2 className="w-4 h-4 mr-1" />
                      Delete
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
