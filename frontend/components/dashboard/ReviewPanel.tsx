// file: components/dashboard/ReviewPanel.tsx
"use client";

import type { Contract } from "@/lib/mock-data"; // Import the type definition
import type { PdfAnnotation } from "@/lib/annotation-manager"; // Import annotation types
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

// Define the props the component will receive
interface ReviewPanelProps {
  contract: Contract;
  annotations?: PdfAnnotation[];
  onAnnotationsChange?: (annotations: PdfAnnotation[]) => void;
}

export const ReviewPanel = ({ contract, annotations = [], onAnnotationsChange }: ReviewPanelProps) => {
  // Debug: Log annotations
  console.log('ReviewPanel received annotations:', annotations);
  
  // Remove comment and submission functionality since we're focusing on annotations only

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="flex-shrink-0">
        <CardTitle>Contract Details & Annotations</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col gap-4 overflow-hidden">
        {/* Contract Details Section - Now using props */}
        <div className="space-y-3 flex-shrink-0">
          <h3 className="font-semibold">Contract Details</h3>
          <div className="text-sm space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">ID:</span>
              <span className="font-medium">{contract.id}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Status:</span>
              <Badge variant="secondary">{contract.status}</Badge>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Originator:</span>
              <span>{contract.originator}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Responder:</span>
              <span>{contract.responder}</span>
            </div>
          </div>
        </div>

        {/* Annotations Section */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="flex items-center justify-between mb-3 flex-shrink-0">
            <h3 className="font-semibold">PDF Annotations</h3>
            <Badge variant="outline">{annotations.length} annotation{annotations.length !== 1 ? 's' : ''}</Badge>
          </div>
          
          {annotations.length === 0 ? (
            <div className="text-center text-gray-500 text-sm py-8 border-2 border-dashed border-gray-200 rounded-lg">
              <div className="mb-2">📝</div>
              <div>No annotations yet</div>
              <div className="text-xs mt-1">Select text in the PDF to add highlights and notes</div>
            </div>
          ) : (
            <div className="flex-1 flex flex-col overflow-hidden">
              {/* Scrollable annotations list */}
              <div className="flex-1 overflow-y-auto space-y-3 pr-2">
                {annotations.map((annotation, index) => (
                  <div key={annotation.id} className="border rounded-lg p-3 bg-gray-50 hover:bg-gray-100 transition-colors">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div
                          className="w-4 h-4 rounded flex-shrink-0"
                          style={{ backgroundColor: annotation.color }}
                          title="Highlight color"
                        />
                        <span className="text-xs font-medium text-gray-700">
                          Annotation #{index + 1}
                        </span>
                      </div>
                      <button
                        className="text-red-500 hover:text-red-700 text-xs px-2 py-1 rounded hover:bg-red-50 flex-shrink-0"
                        onClick={() => {
                          const updatedAnnotations = annotations.filter(a => a.id !== annotation.id);
                          onAnnotationsChange?.(updatedAnnotations);
                        }}
                      >
                        Remove
                      </button>
                    </div>
                    
                    <div className="text-sm text-gray-800 mb-2 p-2 bg-white rounded border">
                      <strong>Selected Text:</strong> &ldquo;{annotation.quote}&rdquo;
                    </div>
                    
                    {annotation.content && (
                      <div className="text-sm text-gray-600 p-2 bg-blue-50 rounded border-l-4 border-blue-300">
                        <strong>Note:</strong> {annotation.content}
                      </div>
                    )}
                    
                    <div className="text-xs text-gray-400 mt-2 flex justify-between items-center">
                      <span>{new Date(annotation.timestamp).toLocaleString()}</span>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Export button - fixed at bottom */}
              <div className="mt-3 pt-3 border-t flex-shrink-0">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full"
                  onClick={() => {
                    const data = JSON.stringify(annotations, null, 2);
                    const blob = new Blob([data], { type: 'application/json' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = `contract-${contract.id}-annotations.json`;
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                    URL.revokeObjectURL(url);
                  }}
                  disabled={annotations.length === 0}
                >
                  📄 Export Annotations ({annotations.length})
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Instructions - Fixed at bottom */}
        <div className="pt-3 border-t flex-shrink-0">
          <div className="text-xs text-gray-500 space-y-1">
            <div className="font-medium mb-2">How to annotate:</div>
            <div>• Click &ldquo;📝 Select&rdquo; mode in PDF viewer</div>
            <div>• Select text to highlight</div>
            <div>• Choose color and add notes</div>
            <div>• Annotations appear here automatically</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};