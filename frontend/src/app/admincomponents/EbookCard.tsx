
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Edit, Trash2, ExternalLink, User, BookOpen } from 'lucide-react';
import Image from 'next/image';

interface Ebook {
  _id: string;
  title: string;
  description: string;
  price: number;
  author: string;
  thumbnail: string;
  pdfUrl: string;
}

interface EbookCardProps {
  ebook: Ebook;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export function EbookCard({ ebook, onEdit, onDelete }: EbookCardProps) {
  return (
    <div className=" rounded-xl  bg-white overflow-hidden shadow-md p-4" key={ebook._id}>
             {/* Thumbnail */}
          <div className="w-full aspect-square overflow-hidden rounded-md ">
              {ebook.thumbnail ? (
                 <Image
                   src={ebook.thumbnail}
                   alt={ebook.title}
                   width={192}
                   height={192}
                   className="object-cover h-full w-full"
                 />
               ) : (
                 <div className="text-gray-400">
                   <BookOpen size={48} />
                 </div>
               )}
             </div>

             {/* Content */}
             <div className=" space-y-2">
               <h3 className="text-lg font-semibold">{ebook.title}</h3>

               <div className="flex items-center text-sm text-muted-foreground">
                 <User className="w-4 h-4" />
                 {ebook.author}
               </div>

               <p className="text-sm text-gray-500">
                 {ebook.description}
               </p>

               {/* Price Badge */}
             <Badge variant={"complete"}>
               ₹ {ebook.price}
             </Badge>

               {/* View PDF */}
               {ebook.pdfUrl && (
                 <a
                   href={ebook.pdfUrl}
                   target="_blank"
                   rel="noopener noreferrer"
                   className="inline-flex items-center justify-center w-full border border-purple-700 text-purple-700 font-medium text-sm px-4 py-2 rounded-md hover:bg-purple-700 hover:text-white transition"
                 >
                   <ExternalLink className="w-4 h-4" />
                   View PDF
                 </a>
               )}

               {/* Edit + Delete Buttons */}
               <div className="grid grid-cols-2 gap-2 mt-3">
                 <Button
                   onClick={()=>onEdit(ebook._id)}
                   variant="outline">
                   <Edit className="w-4 h-4" />
                   Edit
                 </Button>
                 <Button
                   variant="destructive"
                 >
                   <Trash2 className="w-4 h-4" />
                   Delete
                 </Button>
               </div>
             </div>
           </div>
  );
}