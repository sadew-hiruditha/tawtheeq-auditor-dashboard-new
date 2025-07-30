"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Viewer, Worker } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import { highlightPlugin, RenderHighlightTargetProps, RenderHighlightsProps } from '@react-pdf-viewer/highlight';
import { selectionModePlugin, SelectionMode } from '@react-pdf-viewer/selection-mode';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { AnnotationManager, PdfAnnotation, AnnotationColor, ANNOTATION_COLORS } from '@/lib/annotation-manager';

import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import '@react-pdf-viewer/highlight/lib/styles/index.css';
import '@react-pdf-viewer/selection-mode/lib/styles/index.css';

interface AdvancedPdfViewerProps {
  fileUrl: string;
  onAnnotationsChange?: (annotations: PdfAnnotation[]) => void;
  initialAnnotations?: PdfAnnotation[];
  showAnnotationPanel?: boolean;
}

export const AdvancedPdfViewer = ({ 
  fileUrl, 
  onAnnotationsChange,
  initialAnnotations = [],
  showAnnotationPanel = true
}: AdvancedPdfViewerProps) => {
  const [annotations, setAnnotations] = useState<PdfAnnotation[]>(initialAnnotations);
  const [selectedText, setSelectedText] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<AnnotationColor>('yellow');
  const [editingAnnotation, setEditingAnnotation] = useState<string | null>(null);
  const [editContent, setEditContent] = useState('');
  const [selectionMode, setSelectionMode] = useState<SelectionMode>(SelectionMode.Text);
  
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Create annotation manager with proper callback
  const [annotationManager] = useState(() => {
    const manager = new AnnotationManager(initialAnnotations);
    // Set up the onChange callback to update both local state and parent
    manager['onChange'] = (newAnnotations: PdfAnnotation[]) => {
      console.log('AnnotationManager onChange:', newAnnotations);
      setAnnotations(newAnnotations);
      onAnnotationsChange?.(newAnnotations);
    };
    return manager;
  });

  // Sync with initial annotations when they change
  useEffect(() => {
    if (initialAnnotations.length !== annotations.length || 
        JSON.stringify(initialAnnotations) !== JSON.stringify(annotations)) {
      setAnnotations(initialAnnotations);
      // Update the annotation manager's internal state
      annotationManager['annotations'] = [...initialAnnotations];
    }
  }, [initialAnnotations, annotations, annotationManager]);

  // Render highlight target (the popup that appears when text is selected)
  const renderHighlightTarget = (props: RenderHighlightTargetProps) => (
    <div
      style={{
        background: '#fff',
        border: '1px solid #ccc',
        borderRadius: '8px',
        padding: '12px',
        position: 'absolute',
        left: `${props.selectionRegion.left}%`,
        top: `${props.selectionRegion.top + props.selectionRegion.height}%`,
        zIndex: 1000,
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        minWidth: '250px',
      }}
    >
      {/* Color picker */}
      <div style={{ marginBottom: '8px' }}>
        <div style={{ fontSize: '12px', marginBottom: '4px', fontWeight: 'bold' }}>
          Highlight Color:
        </div>
        <div style={{ display: 'flex', gap: '4px' }}>
          {Object.entries(ANNOTATION_COLORS).map(([colorName, colorValue]) => (
            <button
              key={colorName}
              style={{
                width: '20px',
                height: '20px',
                backgroundColor: colorValue,
                border: selectedColor === colorName ? '2px solid #000' : '1px solid #ccc',
                borderRadius: '3px',
                cursor: 'pointer',
              }}
              onClick={() => setSelectedColor(colorName as AnnotationColor)}
              title={colorName}
            />
          ))}
        </div>
      </div>

      {/* Note input */}
      <div style={{ marginBottom: '8px' }}>
        <textarea
          ref={textareaRef}
          rows={3}
          style={{
            border: '1px solid #ccc',
            borderRadius: '4px',
            padding: '6px',
            width: '100%',
            resize: 'vertical',
            fontSize: '12px',
          }}
          placeholder="Add a note (optional)..."
          value={selectedText}
          onChange={(e) => setSelectedText(e.target.value)}
        />
      </div>

      {/* Action buttons */}
      <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
        <button
          style={{
            backgroundColor: '#6c757d',
            color: 'white',
            border: 'none',
            padding: '6px 12px',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '12px',
          }}
          onClick={() => {
            props.cancel();
            setSelectedText('');
          }}
        >
          Cancel
        </button>
        <button
          style={{
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            padding: '6px 12px',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '12px',
          }}
          onClick={() => {
            annotationManager.addAnnotation(
              props.highlightAreas,
              selectedText,
              props.selectedText,
              selectedColor
            );
            props.cancel();
            setSelectedText('');
          }}
        >
          Add Highlight
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
                    background: annotation.color,
                    opacity: 0.4,
                    mixBlendMode: 'multiply',
                    cursor: 'pointer',
                  },
                  props.getCssProperties(area, props.rotation)
                )}
                onClick={() => {
                  if (editingAnnotation === annotation.id) {
                    setEditingAnnotation(null);
                  } else {
                    setEditingAnnotation(annotation.id);
                    setEditContent(annotation.content);
                  }
                }}
                title={`${annotation.content ? annotation.content + ' - ' : ''}"${annotation.quote}"`}
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
    selectionMode: selectionMode,
  });

  const exportAnnotations = () => {
    const data = annotationManager.exportAnnotations();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'pdf-annotations.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const importAnnotations = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        if (annotationManager.importAnnotations(content)) {
          alert('Annotations imported successfully!');
        } else {
          alert('Failed to import annotations. Please check the file format.');
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="flex h-full">
      {/* PDF Viewer */}
      <div className="flex-1 flex flex-col">
        {/* Header with controls */}
        <div className="border-b p-3 bg-gray-50 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h3 className="text-sm font-medium">PDF with Annotations</h3>
            <Badge variant="secondary">
              {annotations.length} annotation{annotations.length !== 1 ? 's' : ''}
            </Badge>
            
            {/* Mode Toggle */}
            <div className="flex items-center gap-2 ml-4">
              <Button
                variant={selectionMode === SelectionMode.Hand ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectionMode(SelectionMode.Hand)}
                title="Hand tool - navigate and pan"
              >
                ✋ Hand
              </Button>
              <Button
                variant={selectionMode === SelectionMode.Text ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectionMode(SelectionMode.Text)}
                title="Text tool - select text for annotations"
              >
                📝 Select
              </Button>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={exportAnnotations}
              disabled={annotations.length === 0}
            >
              Export
            </Button>
            <input
              type="file"
              accept=".json"
              style={{ display: 'none' }}
              onChange={importAnnotations}
              id="import-annotations"
            />
            <Button
              variant="outline" 
              size="sm"
              onClick={() => document.getElementById('import-annotations')?.click()}
            >
              Import
            </Button>
          </div>
        </div>

        {/* PDF Viewer Container */}
        <div className="flex-1 border rounded-md">
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
      </div>

      {/* Annotations Panel */}
      {showAnnotationPanel && (
        <div className="w-80 border-l bg-gray-50 flex flex-col">
          <div className="p-3 border-b bg-white">
            <h4 className="font-medium">Annotations</h4>
            <p className="text-xs text-gray-600 mt-1">
              Click on highlights to edit or delete
            </p>
          </div>
          
          <div className="flex-1 overflow-y-auto p-3 space-y-3">
            {annotations.length === 0 ? (
              <div className="text-center text-gray-500 text-sm py-8">
                No annotations yet.<br />
                Select text in the PDF to get started.
              </div>
            ) : (
              annotations.map((annotation) => (
                <div key={annotation.id} className="border bg-white p-3 rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <div
                      className="w-4 h-4 rounded"
                      style={{ backgroundColor: annotation.color }}
                      title={`Color: ${Object.keys(ANNOTATION_COLORS).find(key => 
                        ANNOTATION_COLORS[key as AnnotationColor] === annotation.color
                      )}`}
                    />
                    <button
                      className="text-red-500 hover:text-red-700 text-xs"
                      onClick={() => annotationManager.removeAnnotation(annotation.id)}
                    >
                      Delete
                    </button>
                  </div>
                  
                  <div className="text-sm text-gray-800 mb-2 p-2 bg-gray-100 rounded">
                    &ldquo;{annotation.quote}&rdquo;
                  </div>
                  
                  {editingAnnotation === annotation.id ? (
                    <div className="space-y-2">
                      <Textarea
                        value={editContent}
                        onChange={(e) => setEditContent(e.target.value)}
                        placeholder="Add your note..."
                        rows={3}
                        className="text-sm"
                      />
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          onClick={() => {
                            annotationManager.updateAnnotation(annotation.id, { content: editContent });
                            setEditingAnnotation(null);
                          }}
                        >
                          Save
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setEditingAnnotation(null)}
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div 
                      className="text-sm text-gray-600 cursor-pointer hover:bg-gray-50 p-1 rounded"
                      onClick={() => {
                        setEditingAnnotation(annotation.id);
                        setEditContent(annotation.content);
                      }}
                    >
                      {annotation.content || <em>Click to add a note...</em>}
                    </div>
                  )}
                  
                  <div className="text-xs text-gray-400 mt-2">
                    {new Date(annotation.timestamp).toLocaleString()}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};
