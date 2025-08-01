"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "../../utils/axios";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import {
  Pencil,
  Trash2,
  DollarSign,
  Tag,
  User,
  ArrowRight,
  BookOpen
} from "lucide-react";

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
          ? Array.from({ length: 6 }).map((_, i) => (
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
          :  Array.isArray(courses) && courses.map((course, index) => (
              <Card
                key={course._id}
                className="p-4 rounded-xl shadow-md hover:shadow-lg transition duration-200 border border-gray-200 bg-white"
              >
                {/* Thumbnail */}
                <div className="w-full h-44 rounded-lg overflow-hidden">
                  <Image
                    src={`http://localhost:5000/${course.thumbnail}`}
                    alt={course.title}
                    width={400}
                    height={200}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Title & Description */}
                <h2 className="text-xl font-semibold text-gray-800 line-clamp-1">
                  {course.title}
                </h2>
                <p className="text-sm text-gray-600  line-clamp-2">
                  {course.description}
                </p>

                {/* Course Details */}
                <div className="space-y-1 text-sm text-gray-700 ">
                  <div className="flex items-center gap-2">
                    <span className="text-blue-500">
                      ₹
                    </span>
                    <span><strong>Price :</strong> {course.price} /-</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-purple-500">
                      <Tag className="w-4 h-4" />
                    </span>
                    <span><strong>Category : </strong> {course.category}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-teal-500">
                      <User className="w-4 h-4" />
                    </span>
                    <span><strong>Instructor : </strong> {course.instructor}</span>
                  </div>

                  {/* Status Badge */}
                  <div className="mt-2">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Badge
                            className={`cursor-pointer ${
                              course.published ? "bg-green-600" : "bg-red-600"
                            } text-white px-3 py-1 rounded-full text-xs`}
                          >
                            {course.published ? "Published" : "Unpublished"}
                          </Badge>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>
                            {course.published
                              ? "Click to Unpublish"
                              : "Click to Publish"}
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-between">
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex items-center gap-1"
                    onClick={() => handleEdit(course._id)}
                  >
                    <Pencil className="w-4 h-4" />
                    Edit
                  </Button>

                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        size="sm"
                        variant="destructive"
                        className="flex items-center gap-1"
                      >
                        <Trash2 className="w-4 h-4" />
                        Delete
                      </Button>
                    </AlertDialogTrigger>

                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. It will permanently delete the course.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => handleDelete(course._id)}>
                          Confirm
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </Card>
            ))}
      </div>
    </div>
  );
}
