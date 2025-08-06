"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "../../utils/axios";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import {
  ArrowRight,
  BookOpen
} from "lucide-react";
import { CourseCard } from "@/app/admincomponents/CourseCard";

interface Course {
  _id: string;
  title: string;
  description: string;
  price: number;
  instructor: string;
  category: string;
  thumbnail: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function AdminCoursesPage() {
  const router = useRouter();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchCourses = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}course/allCourses`
        );
        setCourses(res.data.courses); // Adjusted to match the response structure
        console.log("Fetched courses:", res.data);
      } catch (err) {
        console.error("Error fetching courses:", err);
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {  
    fetchCourses();
  }, []);

  const handleEdit = (id: string) => {
    router.push(`/admin/courses/${id}`);
  };

 const handleDelete = async (courseId: string) => {
  try {
    const res = await axios.delete(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}course/deleteCourse/${courseId}`
    );

    if (res.status === 200) {
      toast.success("Course deleted successfully!");
      // Optionally: refresh course list
      await fetchCourses();
    } else {
      toast.error("Failed to delete course.");
    }
  } catch (error) {
    console.error("Delete Error:", error);
    toast.error("Something went wrong!");
  }
};

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h1 className="text-3xl font-bold flex items-center gap-2"><BookOpen className="w-7 h-7" />
 All Courses</h1>
        <Button onClick={() => router.push("/admin/add-course")} variant={"blue"}>
          Add New Course <ArrowRight className="ml-2 w-4 h-4" />
        </Button>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading
          ? Array.from({ length: 3 }).map((_, i) => (
              <Card
                key={i}
                className="animate-pulse p-4 rounded-xl shadow border border-gray-200"
              >
                <div className="h-40 bg-gray-200 rounded-lg mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2 mb-4"></div>
                <div className="flex gap-2">
                  <div className="h-8 w-20 bg-gray-200 rounded"></div>
                  <div className="h-8 w-20 bg-gray-200 rounded"></div>
                </div>
              </Card>
            ))
          :  Array.isArray(courses) && courses.map((course) => (
              <CourseCard
              course={course}
              onEdit={handleEdit}
              onDelete={handleDelete}
              />
            ))}
      </div>
    </div>
  );
}
