'use client'
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
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { IndianRupee, Pencil, Tag, Trash2, User } from "lucide-react";
import Image from 'next/image';
import React from 'react'

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

interface CourseCardPops{
    course:Course;
    onEdit:(id: string) => void;
    onDelete:(id: string) => void;
}


export function CourseCard({course,onEdit,onDelete}:CourseCardPops) {
  return (
    <div
    key={course._id}
    className="p-4 rounded-xl shadow-md hover:shadow-lg transition duration-200 border border-gray-200 bg-white"
              >
                {/* Thumbnail */}
                <div className="w-full aspect-square overflow-hidden rounded-md ">
                  <Image
                    src={`http://localhost:5000/${course.thumbnail}`}
                    alt={course.title}
                    width={400}
                    height={200}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Title & Description */}
                <h2 className="text-2xl font-semibold text-gray-800 line-clamp-1 my-2">
                  {course.title}
                </h2>
                <p className="texts-sm text-gray-600  line-clamp-2">
                  {course.description}
                </p>

                {/* Course Details */}
                <div className="space-y-2 text-sm text-gray-700 my-2 ">
                  <div className="flex items-center gap-2">
                    <span className="text-blue-500">
                      <IndianRupee  className="w-4 h-4"/>
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
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex items-center gap-1"
                    onClick={() => onEdit(course._id)}
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
                        <AlertDialogAction onClick={() => onDelete(course._id)}>
                          Confirm
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
    </div>
  )
}

