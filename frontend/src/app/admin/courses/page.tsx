"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowRight, Pencil, Trash2 } from "lucide-react";
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
} from "@/components/ui/alert-dialog"

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
        setCourses(res.data);
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
      `http://localhost:5000/api/course/deleteCourse/${courseId}?email=${`sukh123@gmail.com`}`
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
        <h1 className="text-3xl font-bold">All Courses</h1>
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
          : courses.map((course) => (
              <Card
                key={course._id}
                className="p-4 rounded-xl shadow hover:shadow-md transition"
              >
                {/* Thumbnail */}
                <div className="w-full h-40 rounded-lg overflow-hidden">
                  <Image
                    src={`http://localhost:5000/${course.thumbnail}`}
                    alt={course.title}
                    width={400}
                    height={200}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Course Info */}
                <h2 className="text-lg font-semibold">{course.title}</h2>
                <p className="text-sm text-gray-600 line-clamp-2">
                  {course.description}
                </p>

                <div className="flex flex-col gap-1 text-sm text-gray-700 mt-2">
                  <span>
                    <strong>Price:</strong> ${course.price}
                  </span>
                  <span>
                    <strong>Category:</strong> {course.category}
                  </span>
                  <span>
                    <strong>Instructor:</strong> {course.instructor}
                  </span>

                  <div className="mt-1">
                    <Badge className={course.published ? "bg-green-500 text-white" : "bg-red-500 text-white"}>
                      {course.published ? "Published" : "Unpublished"}
                    </Badge>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEdit(course._id)}
                    >
                      <Pencil className="w-4 h-4 mr-1" />
                      Edit
                    </Button>
                    {/* <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(course._id)}
                    >
                      <Trash2 className="w-4 h-4 mr-1" />
                      Delete
                    </Button>
                    <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button variant="outline">Show Dialog</Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete your
                            account and remove your data from our servers.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction>Continue</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog> */}
                    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button size="sm" variant="destructive">
          <Trash2 className="w-4 h-4 mr-1" />
          Delete
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the course.
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
                </div>
              </Card>
            ))}
      </div>
    </div>
  );
}
