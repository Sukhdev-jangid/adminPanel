'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { ArrowRight, BookOpen, BookUser} from 'lucide-react';
import { EbookCard } from '@/app/admincomponents/EbookCard';

const dummyEbooks = [
  {
    _id: '1',
    title: 'Mastering JavaScript',
    description: 'Learn advanced JavaScript concepts with real-world examples.',
    price: 299,
    author: 'John Doe',
    thumbnail: '/images/profileImage.jpg',
    pdfUrl: 'https://example.com/js-book.pdf',
  },
  {
    _id: '2',
    title: 'TypeScript Deep Dive',
    description: 'Comprehensive guide to mastering TypeScript or frontend development.',
    price: 399,
    author: 'Jane Smith',
    thumbnail: '/images/profileImage.jpg',
    pdfUrl: 'https://example.com/ts-book.pdf',
  },
  {
    _id: '3',
    title: 'React for Beginners',
    description: 'Step-by-step guide to learn React.js for frontend development.',
    price: 249,
    author: 'Alex Johnson',
    thumbnail: '/images/profileImage.jpg',
    pdfUrl: 'https://example.com/react-book.pdf',
  },
];

export default function EbookListPage() {
  const [ebooks, setEbooks] = useState(dummyEbooks);
  const router = useRouter();

  const handleDelete = (id: string) => {  
  };

  const editEbook = (id:string) =>{
        router.push(`/admin/ebooks/${id}`);
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h1 className="text-3xl font-bold flex items-center gap-2"><BookUser className="w-7 h-7" />
         All eBooks</h1>
        <Button onClick={() => router.push("/admin/add-ebook")} variant={"blue"}>
          Add New eBook <ArrowRight className="ml-2 w-4 h-4" />
        </Button>
      </div>

    {/* ebooks  */}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {ebooks.map((ebook) => (
            <EbookCard
            ebook={ebook}
            onEdit={editEbook}
            onDelete={handleDelete}/>
        ))}
      </div>
    </div>
  );
}
