"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import Image from "next/image";
import axios from "axios";
import { toast } from "sonner";

export default function AddCoursePage() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    instructor: "",
    category: "",
    published: false,
  });

  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setThumbnail(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSwitchChange = (value: boolean) => {
    setFormData({ ...formData, published: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) =>
      data.append(key, value.toString())
    );
    if (thumbnail) {
      data.append("thumbnail", thumbnail);
    }

    try {
      await axios.post("http://localhost:8000/api/course/create", data);
      toast.success("Course created successfully!");
    } catch (error) {
      toast.error("Something went wrong.");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen py-10 px-4">
      <h1>Add New Course</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white w-full max-w-3xl rounded-xl shadow-md p-8 space-y-6"
      >
        {/* Upload Thumbnail */}
        <div className="space-y-2">
          <Label className="block text-sm font-medium">Upload thumbnail</Label>
          <div className="border border-dashed rounded-md p-4 w-20 h-20 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50">
            <Input type="file" onChange={handleThumbnailChange} className="hidden" id="thumbnail" />
            <label htmlFor="thumbnail" className="flex flex-col items-center justify-center w-full h-full text-gray-500">
              {preview ? (
                <Image
                  src={preview}
                  alt="Preview"
                  width={150}
                  height={150}
                  className="rounded-md object-cover"
                />
              ) : (
                <>
                  <svg className="w-6 h-6 mb-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1M12 12v9m0-9l-3 3m3-3l3 3M12 3v9"></path>
                  </svg>
                  <span className="text-sm">Upload</span>
                </>
              )}
            </label>
          </div>
        </div>

        {/* Title */}
        <div>
          <Label htmlFor="title">Course Title</Label>
          <Input
            id="title"
            name="title"
            placeholder="Type here"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        {/* Instructor */}
        <div>
          <Label htmlFor="instructor">Instructor Name</Label>
          <Input
            id="instructor"
            name="instructor"
            placeholder="Type here"
            value={formData.instructor}
            onChange={handleChange}
            required
          />
        </div>

        {/* Price */}
        <div>
          <Label htmlFor="price">Price</Label>
          <Input
            id="price"
            name="price"
            placeholder="Type here"
            value={formData.price}
            onChange={handleChange}
            type="number"
            required
          />
        </div>

        {/* Category */}
        <div>
          <Label htmlFor="category">Category</Label>
          <Input
            id="category"
            name="category"
            placeholder="Type here"
            value={formData.category}
            onChange={handleChange}
            required
          />
        </div>

        {/* Description */}
        <div>
          <Label htmlFor="description">Course Description</Label>
          <Textarea
            id="description"
            name="description"
            rows={6}
            placeholder="Type here"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>

        {/* Published Toggle */}
        <div className="flex items-center gap-3">
          <Label>Publish</Label>
          <Switch checked={formData.published} onCheckedChange={handleSwitchChange} />
        </div>

        {/* Submit */}
        <Button type="submit" variant={"blue"} size={"full"}>
          Create Course
        </Button>
      </form>
    </div>
  );
}
