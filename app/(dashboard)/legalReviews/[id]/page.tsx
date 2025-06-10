// file: app/(dashboard)/reviews/[id]/page.tsx
"use client";

import { ReviewPanel } from "@/components/dashboard/ReviewPanel";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import dynamic from 'next/dynamic';
import { getContractById } from "@/lib/mock-data"; // Import our new data fetching function
import { useEffect, useState } from "react";
import type { Contract } from "@/lib/mock-data";

// Dynamically import the PdfViewer with SSR turned off
const PdfViewer = dynamic(() => 
    import('@/components/dashboard/PdfViewer').then(mod => mod.PdfViewer), 
    { 
        ssr: false,
        loading: () => <div className="w-full h-full bg-gray-200 rounded-md flex items-center justify-center"><p>Loading PDF Viewer...</p></div>
    }
);

export default function ReviewPage({ params }: { params: { id: string } }) {
  const [contract, setContract] = useState<Contract | null>(null);

  // Fetch the specific contract data when the component mounts
  useEffect(() => {
    const fetchContract = async () => {
      const data = await getContractById(params.id);
      if (data) {
        setContract(data);
      }
    };
    fetchContract();
  }, [params.id]);

  // Show a loading state while fetching data
  if (!contract) {
    return <div className="p-6">Loading contract details...</div>;
  }

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col">
      <div className="flex items-center gap-4 mb-4 shrink-0">
        <Link href="/legalReviews"><Button variant="outline" size="icon"><ArrowLeft className="h-4 w-4" /></Button></Link>
        <h1 className="text-xl font-semibold">Reviewing Contract: {params.id}</h1>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-grow overflow-hidden">
        <div className="lg:col-span-2 h-full overflow-y-auto">
          {/* Pass the correct fileUrl to the viewer */}
          <PdfViewer fileUrl={contract.fileUrl} />
        </div>
        <div className="lg:col-span-1 h-full overflow-y-auto">
          {/* Pass the entire contract object to the panel */}
          <ReviewPanel contract={contract} />
        </div>
      </div>
    </div>
  );
}