"use client";

import { Viewer, Worker } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import { highlightPlugin } from '@react-pdf-viewer/highlight';
import { selectionModePlugin, SelectionMode } from '@react-pdf-viewer/selection-mode';

import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import '@react-pdf-viewer/highlight/lib/styles/index.css';
import '@react-pdf-viewer/selection-mode/lib/styles/index.css';

interface PdfViewerProps {
  fileUrl: string;
}

export const PdfViewer = ({ fileUrl }: PdfViewerProps) => {
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  const highlightPluginInstance = highlightPlugin();
  const selectionModePluginInstance = selectionModePlugin({
    selectionMode: SelectionMode.Text,
  });

  return (
    <div className='h-full w-full border rounded-md'>
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
  );
};