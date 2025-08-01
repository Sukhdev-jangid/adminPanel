"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import axios from "../../utils/axios";
import { Card, CardContent } from "@/components/ui/card";
import { UploadCloud, Rocket, Video } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function CreateCoursePage() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    instructor: "",
    category: "",
    published: false,
  });

  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [video, setVideo] = useState<File | null>(null);
  const [previewURL, setPreviewURL] = useState<string | null>(null);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const target = e.target as HTMLInputElement;
    const { name, value, type } = target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? target.checked : value,
    });
  };

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setThumbnail(file);
      setPreviewURL(URL.createObjectURL(file));
    }
  };

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setVideo(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("price", formData.price);
    data.append("instructor", formData.instructor);
    data.append("category", formData.category);
    data.append("published", String(formData.published));
    if (thumbnail) data.append("thumbnail", thumbnail);
    if (video) data.append("video", video);

    try {
      const res = await axios.post(`/course/create`, data);
      console.log(res.data);
      toast.success('Course created successfully! Redirecting...');

      setTimeout(() => {
        router.push("/admin/courses");
      }, 2500);
    } catch (err) {
      console.error("Error:", err);
      toast.error('Something went wrong! Please try again later.');
    }
  };

  return (
    <div className="flex justify-center items-center">
      <Card className="w-full max-w-2xl shadow-xl border rounded-2xl bg-white">
        <CardContent className="p-6 space-y-6">
          <h2 className="text-3xl font-bold text-center flex items-center justify-center gap-2">
            <span role="img" aria-label="book">📘</span> Create New Course
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Text Fields */}
            <div>
              <Label className="font-semibold">Title</Label>
              <Input name="title" value={formData.title} onChange={handleChange} placeholder="Enter course title" />
            </div>

            <div>
              <Label className="font-semibold">Description</Label>
              <Textarea name="description" value={formData.description} onChange={handleChange} placeholder="Course description..." />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <Label className="font-semibold">Price</Label>
                <Input name="price" type="number" value={formData.price} onChange={handleChange} placeholder="₹999" />
              </div>
              <div>
                <Label className="font-semibold">Instructor</Label>
                <Input name="instructor" value={formData.instructor} onChange={handleChange} placeholder="Instructor name" />
              </div>
              <div>
                <Label className="font-semibold">Category</Label>
                <Input name="category" value={formData.category} onChange={handleChange} placeholder="e.g. Marketing" />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <input type="checkbox" name="published" checked={formData.published} onChange={handleChange} />
              <Label className="font-medium">Publish this course</Label>
            </div>

            {/* Thumbnail Upload */}
            <div>
              <Label className="font-semibold mb-2 block">Thumbnail</Label>
              <div className="border-2 border-dashed rounded-lg p-6 text-center hover:bg-gray-50 transition">
                {!previewURL ? (
                  <div className="flex flex-col items-center justify-center gap-2 text-gray-500">
                    <UploadCloud size={32} />
                    <p>Click to upload thumbnail</p>
                  </div>
                ) : (
                  <img
                    src={previewURL}
                    alt="Thumbnail Preview"
                    className="w-full h-48 object-cover rounded-lg"
                  />
                )}
                <Input type="file" accept="image/*" onChange={handleThumbnailChange} className="mt-2" />
              </div>
            </div>

            {/* ✅ Video Upload Section */}
            <div>
              <Label className="font-semibold mb-2 block">Course Video</Label>
              <div className="border-2 border-dashed rounded-lg p-6 text-center hover:bg-gray-50 transition">
                <div className="flex flex-col items-center justify-center gap-2 text-gray-500">
                  <Video size={32} />
                  <p>Upload video file (MP4)</p>
                </div>
                <Input type="file" accept="video/mp4" onChange={handleVideoChange} className="mt-2" />
                {video && (
                  <p className="text-sm text-gray-600 mt-2">Selected Video: {video.name}</p>
                )}
              </div>
            </div>

            <Button
              type="submit"
              variant={"blue"}
              size={"full"}
            >
              <Rocket size={18} /> Create Course
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
