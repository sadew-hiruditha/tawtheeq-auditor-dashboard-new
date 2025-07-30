"use client";

import React, { useState, useCallback } from 'react';
import { Viewer, Worker } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import { highlightPlugin, HighlightArea, RenderHighlightTargetProps, RenderHighlightsProps } from '@react-pdf-viewer/highlight';
import { selectionModePlugin, SelectionMode } from '@react-pdf-viewer/selection-mode';

import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import '@react-pdf-viewer/highlight/lib/styles/index.css';
import '@react-pdf-viewer/selection-mode/lib/styles/index.css';

interface PdfAnnotation {
  id: string;
  highlightAreas: HighlightArea[];
  content: string;
  quote: string;
}

interface AnnotatedPdfViewerProps {
  fileUrl: string;
  onAnnotationsChange?: (annotations: PdfAnnotation[]) => void;
  initialAnnotations?: PdfAnnotation[];
}

export const AnnotatedPdfViewer = ({ 
  fileUrl, 
  onAnnotationsChange,
  initialAnnotations = []
}: AnnotatedPdfViewerProps) => {
  const [annotations, setAnnotations] = useState<PdfAnnotation[]>(initialAnnotations);
  const [selectedText, setSelectedText] = useState<string>('');
  const [selectionMode, setSelectionMode] = useState<SelectionMode>(SelectionMode.Text);

  // Function to add a new annotation
  const addAnnotation = useCallback((highlightAreas: HighlightArea[], content: string, quote: string) => {
    const newAnnotation: PdfAnnotation = {
      id: Date.now().toString(),
      highlightAreas,
      content,
      quote
    };
    
    const updatedAnnotations = [...annotations, newAnnotation];
    setAnnotations(updatedAnnotations);
    onAnnotationsChange?.(updatedAnnotations);
  }, [annotations, onAnnotationsChange]);

  // Function to remove an annotation
  const removeAnnotation = useCallback((id: string) => {
    const updatedAnnotations = annotations.filter(annotation => annotation.id !== id);
    setAnnotations(updatedAnnotations);
    onAnnotationsChange?.(updatedAnnotations);
  }, [annotations, onAnnotationsChange]);

  // Render highlight target (the popup that appears when text is selected)
  const renderHighlightTarget = (props: RenderHighlightTargetProps) => (
    <div
      style={{
        background: '#eee',
        border: '1px solid #000',
        borderRadius: '2px',
        padding: '8px',
        position: 'absolute',
        left: `${props.selectionRegion.left}%`,
        top: `${props.selectionRegion.top + props.selectionRegion.height}%`,
        zIndex: 1000,
      }}
    >
      <div style={{ marginBottom: '8px' }}>
        <textarea
          rows={3}
          style={{
            border: '1px solid #000',
            width: '200px',
            resize: 'none'
          }}
          placeholder="Add a note..."
          onChange={(e) => setSelectedText(e.target.value)}
        />
      </div>
      <div>
        <button
          style={{
            marginRight: '8px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            padding: '4px 8px',
            borderRadius: '2px',
            cursor: 'pointer'
          }}
          onClick={() => {
            addAnnotation(
              props.highlightAreas,
              selectedText,
              props.selectedText
            );
            props.cancel();
            setSelectedText('');
          }}
        >
          Add Highlight
        </button>
        <button
          style={{
            backgroundColor: '#6c757d',
            color: 'white',
            border: 'none',
            padding: '4px 8px',
            borderRadius: '2px',
            cursor: 'pointer'
          }}
          onClick={props.cancel}
        >
          Cancel
        </button>
      </div>
    </div>
  );

  // Render existing highlights
  const renderHighlights = (props: RenderHighlightsProps) => (
    <div>
      {annotations.map((annotation) => (
        <React.Fragment key={annotation.id}>
          {annotation.highlightAreas
            .filter((area) => area.pageIndex === props.pageIndex)
            .map((area, idx) => (
              <div
                key={idx}
                style={Object.assign(
                  {},
                  {
                    background: 'rgba(255, 255, 0, 0.4)',
                    mixBlendMode: 'multiply',
                  },
                  props.getCssProperties(area, props.rotation)
                )}
                onClick={() => {
                  // Show annotation details when clicked
                  alert(`Note: ${annotation.content}\nQuoted text: "${annotation.quote}"`);
                }}
                title={`${annotation.content} - "${annotation.quote}"`}
              />
            ))}
        </React.Fragment>
      ))}
    </div>
  );

  // Initialize plugins
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  
  const highlightPluginInstance = highlightPlugin({
    renderHighlightTarget,
    renderHighlights,
  });

  const selectionModePluginInstance = selectionModePlugin({
    selectionMode: selectionMode, // Use dynamic selection mode
  });

  return (
    <div className="h-full w-full">
      {/* Annotation controls */}
      <div className="border-b p-2 bg-gray-50 flex items-center gap-4">
        <h3 className="text-sm font-medium">PDF Annotations</h3>
        
        {/* Mode Toggle */}
        <div className="flex items-center gap-2">
          <button
            className={`px-2 py-1 text-xs rounded ${
              selectionMode === SelectionMode.Hand 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-200 text-gray-700'
            }`}
            onClick={() => setSelectionMode(SelectionMode.Hand)}
            title="Hand tool - navigate and pan"
          >
            ✋ Hand
          </button>
          <button
            className={`px-2 py-1 text-xs rounded ${
              selectionMode === SelectionMode.Text 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-200 text-gray-700'
            }`}
            onClick={() => setSelectionMode(SelectionMode.Text)}
            title="Text tool - select text for annotations"
          >
            📝 Select
          </button>
        </div>
        
        <div className="text-xs text-gray-600">
          {selectionMode === SelectionMode.Text ? 
            'Select text to highlight and add notes' : 
            'Use hand tool to navigate the PDF'
          }
        </div>
        <div className="ml-auto text-xs text-gray-500">
          {annotations.length} annotation{annotations.length !== 1 ? 's' : ''}
        </div>
      </div>

      {/* PDF Viewer */}
      <div className="h-full border rounded-md">
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
          <Viewer
            fileUrl={fileUrl}
            plugins={[
              defaultLayoutPluginInstance,
              highlightPluginInstance,
              selectionModePluginInstance,
            ]}
          />
        </Worker>
      </div>

      {/* Annotations list sidebar */}
      {annotations.length > 0 && (
        <div className="mt-4 border-t pt-4">
          <h4 className="text-sm font-medium mb-2">Your Annotations:</h4>
          <div className="space-y-2 max-h-32 overflow-y-auto">
            {annotations.map((annotation) => (
              <div key={annotation.id} className="border p-2 rounded text-xs">
                <div className="font-medium">&ldquo;{annotation.quote}&rdquo;</div>
                {annotation.content && (
                  <div className="text-gray-600 mt-1">{annotation.content}</div>
                )}
                <button
                  className="text-red-500 hover:text-red-700 mt-1 text-xs"
                  onClick={() => removeAnnotation(annotation.id)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
