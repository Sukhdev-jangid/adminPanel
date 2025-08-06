'use client';

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { PlusCircle } from "lucide-react";

export default function AddEbookPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [author, setAuthor] = useState("");
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!pdfFile || !thumbnail) {
      alert("Please upload both PDF and thumbnail.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("author", author);
    formData.append("pdf", pdfFile);
    formData.append("thumbnail", thumbnail);

    try {
      const res = await fetch("/api/ebooks", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        alert("Ebook added successfully!");
        router.push("/ebooks");
      } else {
        alert("Failed to add ebook");
      }
    } catch (error) {
      console.error("Error uploading ebook:", error);
      alert("Something went wrong");
    }
  };

  return (
    <div className="p-4 md:p-6" >
      <h2 className="text-3xl font-bold mb-6 text-gray-800 flex items-center gap-2"><PlusCircle className="w-7 h-7" /> Add New E-Book</h2>
      <div className="max-w-2xl p-6 mt-8 bg-white shadow-xl rounded-2xl">
        <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Label className="text-lg font-semibold">Title</Label>
          <Input
            type="text"
            placeholder="Enter e-book title"
            className="p-2 "
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <Label className="text-lg font-semibold">Description</Label>
          <Textarea
            placeholder="Enter e-book description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            required
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label className="text-lg font-semibold">Price (₹)</Label>
            <Input
              type="number"
              placeholder="Enter price"
              className="p-2"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>

          <div>
            <Label className="text-lg font-semibold">Author</Label>
            <Input
              type="text"
              placeholder="Enter author's name"
              className="p-2"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              required
            />
          </div>
        </div>

        <div>
          <Label className="text-lg font-semibold">Upload Thumbnail</Label>
          <Input
            type="file"
            accept="image/png, image/jpeg, image/webp"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                setThumbnail(file);
                setThumbnailPreview(URL.createObjectURL(file));
              }
            }}
            required
          />

          {thumbnailPreview && (
            <div className="mt-4">
              <p className="text-sm text-gray-500 mb-1">Thumbnail Preview:</p>
              <Image
                src={thumbnailPreview}
                alt="Thumbnail Preview"
                width={200}
                height={300}
                className="rounded-lg shadow-md border"
              />
            </div>
          )}
        </div>

        <div>
          <Label className="text-lg font-semibold">Upload PDF</Label>
          <Input
            type="file"
            accept="application/pdf"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) setPdfFile(file);
            }}
            required
          />
        </div>

        <Button
          type="submit"
          variant={"blue"}
          size={"full"}
        >
        Add E-Book
        </Button>
      </form>
      </div>
    </div>
  );
}
