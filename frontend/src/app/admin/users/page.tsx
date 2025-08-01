"use client";

import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, Users } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useRouter } from "next/navigation";
import axios from "axios";

// types/User.ts
export interface IUser {
  _id: string;
  name: string;
  email: string;
  role: "user" | "admin";
  createdAt: string;
  phone?: string;
}

// Temporary data with mobile numbers
// const tempUsers: IUser[] = [
//   {
//     _id: "1",
//     name: "Sunil Soni",
//     email: "sunil@example.com",
//     role: "admin",
//     createdAt: "2024-01-10T08:30:00Z",
//     phone: "9876543210",
//   },
//   {
//     _id: "2",
//     name: "Sukhdev Jangid",
//     email: "sukhdev@example.com",
//     role: "user",
//     createdAt: "2024-02-12T10:45:00Z",
//     phone: "9123456789",
//   },
//   {
//     _id: "3",
//     name: "Anjali Meena",
//     email: "anjali@example.com",
//     role: "user",
//     createdAt: "2024-03-20T12:00:00Z",
//     phone: "9012345678",
//   },
//   {
//     _id: "4",
//     name: "Rahul Sharma",
//     email: "rahul@example.com",
//     role: "admin",
//     createdAt: "2024-04-05T14:20:00Z",
//     phone: "9000000000",
//   },
// ];

export default function UsersPage() {
  const [users, setUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const getUsers = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}user/getAllUsers`);
        setUsers(res.data.users); // Adjusted to match the response structure // response structure se match karaye
      } catch (error) {
        console.error("Failed to fetch users:", error);
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    getUsers();
  }, []);

  const handleDelete = (id: string) => {
    const confirmDelete = confirm("Are you sure you want to delete this user?");
    if (confirmDelete) {
      setUsers((prev) => prev.filter((user) => user._id !== id));
    }
  };

  return (
    <div className="p-4 md:p-6">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 flex items-center gap-2"><Users className="w-7 h-7" /> All Users</h2>

      <div className="rounded-md border bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>#</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Mobile</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Joined</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              Array.from({ length: 6 }).map((_, index) => (
                <TableRow key={index} className="animate-pulse">
                  {Array.from({ length: 7 }).map((_, i) => (
                    <TableCell key={i}>
                      <div className="h-4 bg-gray-200 rounded w-full" />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              Array.isArray(users) && users.map((user, index) => (
                <TableRow key={user._id}>
                  <TableCell className="font-medium">{index + 1}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.phone || "N/A"}</TableCell>
                  <TableCell>
                    <Badge variant={user.role === "admin" ? "destructive" : "secondary"}>
                      {user.role}
                    </Badge>
                  </TableCell>
                  <TableCell>{new Date(user.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button variant="outline" size="sm" onClick={() =>router.push(`/admin/users/${user._id}`)}>
                      <Pencil className="w-4 h-4 mr-1" />
                      Edit
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(user._id)}
                    >
                      <Trash2 className="w-4 h-4 mr-1" />
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
