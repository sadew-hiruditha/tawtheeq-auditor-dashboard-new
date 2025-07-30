import { HighlightArea } from '@react-pdf-viewer/highlight';

export interface PdfAnnotation {
  id: string;
  highlightAreas: HighlightArea[];
  content: string;
  quote: string;
  timestamp: number;
  color: string;
  type: 'highlight' | 'note';
}

export const ANNOTATION_COLORS = {
  yellow: '#FFFF00',
  green: '#00FF00',
  pink: '#FF69B4',
  orange: '#FFA500',
  blue: '#87CEEB',
  red: '#FF6B6B',
} as const;

export type AnnotationColor = keyof typeof ANNOTATION_COLORS;

export class AnnotationManager {
  private annotations: PdfAnnotation[] = [];
  private onChange: ((annotations: PdfAnnotation[]) => void) | null = null;

  constructor(initialAnnotations: PdfAnnotation[] = [], onChange?: (annotations: PdfAnnotation[]) => void) {
    this.annotations = initialAnnotations;
    this.onChange = onChange || null;
  }

  private notifyChange() {
    if (this.onChange) {
      this.onChange([...this.annotations]);
    }
  }

  addAnnotation(
    highlightAreas: HighlightArea[],
    content: string,
    quote: string,
    color: AnnotationColor = 'yellow',
    type: 'highlight' | 'note' = 'highlight'
  ): PdfAnnotation {
    const newAnnotation: PdfAnnotation = {
      id: `annotation_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      highlightAreas,
      content,
      quote,
      timestamp: Date.now(),
      color: ANNOTATION_COLORS[color],
      type,
    };
    
    this.annotations.push(newAnnotation);
    this.notifyChange();
    return newAnnotation;
  }

  removeAnnotation(id: string): boolean {
    const index = this.annotations.findIndex(annotation => annotation.id === id);
    if (index !== -1) {
      this.annotations.splice(index, 1);
      this.notifyChange();
      return true;
    }
    return false;
  }

  updateAnnotation(id: string, updates: Partial<PdfAnnotation>): boolean {
    const index = this.annotations.findIndex(annotation => annotation.id === id);
    if (index !== -1) {
      this.annotations[index] = { ...this.annotations[index], ...updates };
      this.notifyChange();
      return true;
    }
    return false;
  }

  getAnnotations(): PdfAnnotation[] {
    return [...this.annotations];
  }

  getAnnotationsByPage(pageIndex: number): PdfAnnotation[] {
    return this.annotations.filter(annotation => 
      annotation.highlightAreas.some(area => area.pageIndex === pageIndex)
    );
  }

  exportAnnotations(): string {
    return JSON.stringify(this.annotations, null, 2);
  }

  importAnnotations(jsonString: string): boolean {
    try {
      const imported = JSON.parse(jsonString) as PdfAnnotation[];
      if (Array.isArray(imported)) {
        this.annotations = imported;
        this.notifyChange();
        return true;
      }
    } catch (error) {
      console.error('Failed to import annotations:', error);
    }
    return false;
  }
}
