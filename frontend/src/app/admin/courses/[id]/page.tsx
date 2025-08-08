"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import axios from "../../../utils/axios";
import { UploadCloud, Rocket, Video, PlusSquare, Edit } from "lucide-react";
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
    <div className="p-4 md:p-6">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 flex items-center gap-2"><Edit className="w-7 h-7" /> Edit Course</h2>
      <div className="w-full max-w-2xl shadow-xl border rounded-2xl bg-white">
        <div className="p-6 space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
           
            <div>
              <p className="font-semibold mb-2 ">Thumbnail</p>
              <label 
                htmlFor="thumbnail-upload" 
                className="w-[30%] border-2 border-dashed rounded-lg p-1 md:p-4 text-center hover:bg-gray-50 transition cursor-pointer block"
              >
                {!previewURL ? (
                  <div className="flex flex-col items-center justify-center gap-2 text-gray-500">
                    <UploadCloud size={32} />
                    <p>Click to upload thumbnail</p>
                  </div>
                ) : (
                  <img
                    src={previewURL}
                    alt="Thumbnail Preview"
                    className="w-full aspect-square overflow-hidden rounded-md "
                  />
                )}
              </label>
              <Input
                id="thumbnail-upload"
                type="file"
                accept="image/*"
                onChange={handleThumbnailChange}
                className="hidden"
              />
            </div>


            {/* Text Fields */}
            <div>
              <Label className="font-semibold">Title</Label>
              <Input name="title" value={formData.title} onChange={handleChange} placeholder="Enter course title" className="p-2 my-2 w-full" />
            </div>

            <div>
              <Label className="font-semibold mb-3">Description</Label>
              <Textarea name="description" value={formData.description} onChange={handleChange} placeholder="Course description..." />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <Label className="font-semibold">Price</Label>
                <Input name="price" type="number" value={formData.price} onChange={handleChange} placeholder="₹999" className="p-2 my-2" />
              </div>
              <div>
                <Label className="font-semibold">Instructor</Label>
                <Input name="instructor" value={formData.instructor} onChange={handleChange} placeholder="Instructor name" className="p-2 my-2"  />
              </div>
              <div>
                <Label className="font-semibold">Category</Label>
                <Input name="category" value={formData.category} onChange={handleChange} placeholder="e.g. Marketing" className="p-2 my-2"  />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <input type="checkbox" name="published" checked={formData.published} onChange={handleChange} />
              <Label className="font-medium">Publish this course</Label>
            </div>

            {/* Thumbnail Upload */}
           
            

            <Button
              type="submit"
              variant={"blue"}
              size={"full"}
            >
              <Rocket size={18} /> Create Course
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
