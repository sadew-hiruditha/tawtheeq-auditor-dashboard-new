// file: app/(dashboard)/reviews/[id]/page.tsx
"use client";

import { ReviewPanel } from "@/components/dashboard/ReviewPanel";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import dynamic from 'next/dynamic';
import { getContractById } from "@/lib/mock-data"; // Import our new data fetching function
import { useEffect, useState } from "react";
import type { Contract } from "@/lib/mock-data";
import { PdfAnnotation } from "@/lib/annotation-manager";
import { use } from "react";
//..

// Dynamically import the AdvancedPdfViewer with SSR turned off
const AdvancedPdfViewer = dynamic(() => 
    import('@/components/dashboard/AdvancedPdfViewer').then(mod => mod.AdvancedPdfViewer), 
    { 
        ssr: false,
        loading: () => <div className="w-full h-full bg-gray-200 rounded-md flex items-center justify-center"><p>Loading PDF Viewer...</p></div>
    }
);

export default function ReviewPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [contract, setContract] = useState<Contract | null>(null);
  const [annotations, setAnnotations] = useState<PdfAnnotation[]>([]);

  useEffect(() => {
    const fetchContract = async () => {
      const data = await getContractById(id);
      if (data) {
        setContract(data);
        // Load saved annotations for this contract
        const savedAnnotations = localStorage.getItem(`contract-${id}-annotations`);
        if (savedAnnotations) {
          try {
            setAnnotations(JSON.parse(savedAnnotations));
          } catch (error) {
            console.error('Failed to load annotations:', error);
          }
        }
      }
    };
    fetchContract();
  }, [id]);

  const handleAnnotationsChange = (newAnnotations: PdfAnnotation[]) => {
    console.log('handleAnnotationsChange called with:', newAnnotations);
    setAnnotations(newAnnotations);
    // Save annotations to localStorage for this specific contract
    localStorage.setItem(`contract-${id}-annotations`, JSON.stringify(newAnnotations));
    console.log('Annotations updated for contract:', id, newAnnotations);
  };

  if (!contract) {
    return <div className="p-6">Loading contract details...</div>;
  }

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col">
      <div className="flex items-center gap-4 mb-4 shrink-0">
        <Link href="/legalReviews"><Button variant="outline" size="icon"><ArrowLeft className="h-4 w-4" /></Button></Link>
        <h1 className="text-xl font-semibold">Reviewing Contract: {id}</h1>
        {annotations.length > 0 && (
          <div className="ml-auto flex items-center gap-2">
            <Badge variant="secondary">
              {annotations.length} annotation{annotations.length !== 1 ? 's' : ''}
            </Badge>
          </div>
        )}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-grow overflow-hidden">
        <div className="lg:col-span-2 h-full overflow-y-auto">
          {/* Pass the correct fileUrl to the viewer */}
          <AdvancedPdfViewer 
            fileUrl={contract.fileUrl} 
            onAnnotationsChange={handleAnnotationsChange}
            initialAnnotations={annotations}
            showAnnotationPanel={false}
          />
        </div>
        <div className="lg:col-span-1 h-full overflow-y-auto">
          {/* Pass the entire contract object and annotations to the panel */}
          <ReviewPanel contract={contract} annotations={annotations} onAnnotationsChange={handleAnnotationsChange} />
        </div>
      </div>
    </div>
  );
}