# PDF Annotation Guide

## Overview

This project now includes a comprehensive PDF annotation system using React PDF Viewer with highlighting and text annotation capabilities. Users can:

- **Highlight text** with different colors
- **Add text notes** to highlighted sections
- **Edit and delete annotations**
- **Export/import annotation data**
- **View annotation history**

## Components

### 1. AdvancedPdfViewer

The main component with full annotation features:

```tsx
import { AdvancedPdfViewer } from '@/components/dashboard/AdvancedPdfViewer';

<AdvancedPdfViewer 
  fileUrl="/path/to/document.pdf"
  onAnnotationsChange={handleAnnotationsChange}
  initialAnnotations={savedAnnotations}
  showAnnotationPanel={true}
/>
```

**Props:**
- `fileUrl`: URL/path to the PDF file
- `onAnnotationsChange`: Callback when annotations are modified
- `initialAnnotations`: Pre-existing annotations to load
- `showAnnotationPanel`: Show/hide the annotations sidebar

### 2. AnnotatedPdfViewer

A simpler version with basic annotation support:

```tsx
import { AnnotatedPdfViewer } from '@/components/dashboard/AnnotatedPdfViewer';

<AnnotatedPdfViewer 
  fileUrl="/document.pdf"
  onAnnotationsChange={handleAnnotationsChange}
/>
```

### 3. PdfViewer

Updated basic viewer with highlight support (no annotation panel):

```tsx
import { PdfViewer } from '@/components/dashboard/PdfViewer';

<PdfViewer fileUrl="/document.pdf" />
```

## How to Use Annotations

### 1. Selecting Mode

**Important:** You need to be in "Text Selection" mode to create annotations.

- **📝 Select Mode**: Click the "Select" button to enable text selection for annotations
- **✋ Hand Mode**: Click the "Hand" button to navigate and pan the PDF

### 2. Creating Highlights

1. **Switch to Select Mode**: Click the "📝 Select" button in the toolbar
2. **Select Text**: Use your mouse to select text in the PDF
3. **Choose Color**: Pick a highlight color (yellow, green, pink, orange, blue, red)
4. **Add Note**: Optionally add a text note
5. **Save**: Click "Add Highlight" to create the annotation

### 3. Managing Annotations

- **View**: Click on any highlight to see its details
- **Edit**: Click on annotations in the sidebar to edit notes
- **Delete**: Use the delete button in the annotation panel
- **Export**: Save all annotations to a JSON file
- **Import**: Load annotations from a previously exported file

### 3. Color Coding

- 🟡 **Yellow**: General highlights
- 🟢 **Green**: Approved sections
- 🩷 **Pink**: Questions/concerns
- 🟠 **Orange**: Important sections
- 🔵 **Blue**: Reference material
- 🔴 **Red**: Issues/problems

## Annotation Data Structure

```typescript
interface PdfAnnotation {
  id: string;
  highlightAreas: HighlightArea[];
  content: string;        // User's note
  quote: string;          // Selected text
  timestamp: number;      // Creation time
  color: string;          // Highlight color
  type: 'highlight' | 'note';
}
```

## API Integration

### Saving Annotations

```typescript
const handleAnnotationsChange = async (annotations: PdfAnnotation[]) => {
  try {
    await fetch('/api/annotations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        documentId: 'doc123',
        annotations
      })
    });
  } catch (error) {
    console.error('Failed to save annotations:', error);
  }
};
```

### Loading Annotations

```typescript
const loadAnnotations = async (documentId: string) => {
  try {
    const response = await fetch(`/api/annotations/${documentId}`);
    const data = await response.json();
    return data.annotations;
  } catch (error) {
    console.error('Failed to load annotations:', error);
    return [];
  }
};
```

## Pages Using PDF Annotation

### Legal Review Pages (`/legalReviews/[id]`)

**Primary annotation workspace** for contract reviews:

- Uses `AdvancedPdfViewer` with integrated annotation tools
- **Annotations panel** integrated into the review sidebar
- **Persistent storage** - annotations saved per contract ID
- **Export functionality** - download annotations as JSON
- **Review integration** - annotations complement review comments

**Features:**
- ✅ **Mode switching** between text selection and navigation
- ✅ **Color-coded highlights** for different types of feedback
- ✅ **Annotation management** directly in the review panel
- ✅ **Auto-save** to local storage per contract
- ✅ **Export** annotations for reporting or sharing

**Workflow:**
1. Navigate to any legal review (`/legalReviews/[contractId]`)
2. Use the **📝 Select** mode to highlight important text
3. Add notes and choose appropriate highlight colors
4. Annotations appear in the **review panel** on the right
5. Export annotations or complete your review
6. All annotations are automatically saved for that contract

## Browser Compatibility

- **Chrome/Edge**: Full support
- **Firefox**: Full support
- **Safari**: Full support (iOS 12+)

## Performance Notes

- PDF.js worker loads asynchronously
- Large PDFs may take time to render
- Annotations are stored in memory and persist via callbacks
- Consider pagination for documents with many annotations

## Troubleshooting

### PDF Not Loading
- Ensure the PDF URL is accessible
- Check CORS settings for external URLs
- Verify PDF is not corrupted

### Annotations Not Saving
- Check the `onAnnotationsChange` callback
- Verify network requests (if using API)
- Check browser console for errors

### Performance Issues
- Use `showAnnotationPanel={false}` for large documents
- Implement annotation pagination for many highlights
- Consider lazy loading for annotation lists

## Keyboard Shortcuts

- **Ctrl+A**: Select all text (standard PDF.js)
- **Ctrl+F**: Find in document (standard PDF.js)
- **Ctrl+Plus/Minus**: Zoom in/out (standard PDF.js)

## Future Enhancements

- Shape annotations (rectangles, arrows)
- Collaborative real-time editing
- Voice notes
- OCR text search
- Mobile touch optimization
