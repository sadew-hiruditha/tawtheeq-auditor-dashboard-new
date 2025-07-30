"use client";

import dynamic from 'next/dynamic';
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PdfAnnotation } from "@/lib/annotation-manager";
import Link from "next/link";

// Dynamically import the AdvancedPdfViewer with SSR turned off
const AdvancedPdfViewer = dynamic(() => 
    import('@/components/dashboard/AdvancedPdfViewer').then(mod => mod.AdvancedPdfViewer), 
    { 
        ssr: false,
        loading: () => <div className="w-full h-full bg-gray-200 rounded-md flex items-center justify-center"><p>Loading PDF Viewer with Annotations...</p></div>
    }
);

export default function PdfViewerPage() {
  const handleAnnotationsChange = (annotations: PdfAnnotation[]) => {
    console.log('Annotations updated:', annotations);
    // Here you could save to localStorage or send to your backend
    localStorage.setItem('pdf-annotations', JSON.stringify(annotations));
  };

  // Load saved annotations from localStorage
  const getSavedAnnotations = () => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('pdf-annotations');
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  };

  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-4 p-4 border-b bg-white shrink-0">
        <Link href="/dashboard">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-xl font-semibold">PDF Annotation Viewer</h1>
        <div className="text-sm text-gray-600">
          Select text to highlight • Add notes • Export/Import annotations
        </div>
      </div>

      {/* PDF Viewer with full annotation capabilities */}
      <div className="flex-1 overflow-hidden">
        <AdvancedPdfViewer 
          fileUrl="/sample-contract.pdf"
          onAnnotationsChange={handleAnnotationsChange}
          initialAnnotations={getSavedAnnotations()}
          showAnnotationPanel={true}
        />
      </div>
    </div>
  );
}
