'use client';

import { Card, CardContent } from "@/components/ui/card";
import axios from "axios";
import { Users, BookOpen, ShoppingCart, LayoutDashboard, Book } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const [totaluser, setTotalUser] = useState(0);
  const [totalcourses, setTotalCourses] = useState(0);
  const router = useRouter();

  
  const getUsers = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}user/getAllUsers`);
        setTotalUser(res.data.count); 
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    }
  const getCourses = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}course/allCourses`);
        setTotalCourses(res.data.count); 
      } catch (error) {
        console.error("Failed to fetch courses:", error);
      }
    };
  useEffect(() => {
    getUsers();
    getCourses();
  }, []);

  return (
    <div className="flex flex-col p-6">
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-2"><LayoutDashboard className="w-7 h-7" /> Admin Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Total Orders */}
        <Card onClick={()=>router.push('/admin/orders')} className="shadow-lg border border-gray-200 hover:shadow-xl transition cursor-pointer">
          <CardContent className="p-5 flex items-center gap-4">
            <div className="p-3 rounded-full bg-purple-100 text-purple-600">
              <ShoppingCart className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Orders</p>
              <p className="text-2xl font-bold text-gray-800">32</p>
            </div>
          </CardContent>
        </Card>

        {/* Total Users */}
        <Card onClick={()=>router.push('/admin/users')} className="shadow-lg border border-gray-200 hover:shadow-xl transition cursor-pointer">
          <CardContent className="p-5 flex items-center gap-4">
            <div className="p-3 rounded-full bg-green-100 text-green-600">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Users</p>
              <p className="text-2xl font-bold text-gray-800">{totaluser}</p>
            </div>
          </CardContent>
        </Card>

        {/* Total Courses */}
        <Card onClick={()=>router.push('/admin/courses')} className="shadow-lg border border-gray-200 hover:shadow-xl transition cursor-pointer">
          <CardContent className="p-5 flex items-center gap-4">
            <div className="p-3 rounded-full bg-blue-100 text-blue-600">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Courses</p>
              <p className="text-2xl font-bold text-gray-800">{totalcourses}</p>
            </div>
          </CardContent>
        </Card>

        {/* Total eBooks */}
        <Card onClick={()=>router.push('/admin/ebooks')} className="shadow-lg border border-gray-200 hover:shadow-xl transition cursor-pointer">
          <CardContent className="p-5 flex items-center gap-4">
            <div className="p-3 rounded-full bg-blue-100 text-blue-600">
              <Book className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total eBooks</p>
              <p className="text-2xl font-bold text-gray-800">6</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
