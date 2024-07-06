"use client";

import { useState } from 'react';
import dynamic from 'next/dynamic';

// Dynamic import of react-pdf to prevent SSR issues
const Document = dynamic(() => import('react-pdf').then(mod => mod.Document), { ssr: false });
const Page = dynamic(() => import('react-pdf').then(mod => mod.Page), { ssr: false });

interface PDFViewerProps {
  pdfUrl: string | null | undefined;
}

export default function PDFViewer({ pdfUrl }: PDFViewerProps) {
  const [numPages, setNumPages] = useState<number | undefined>(undefined);
  const [pageNumber, setPageNumber] = useState<number>(1);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
  }

  return (
    <div>
      {pdfUrl ? (
        <>
          <Document file={pdfUrl} onLoadSuccess={onDocumentLoadSuccess}>
            <Page pageNumber={pageNumber} />
          </Document>
          <p>
            Page {pageNumber} of {numPages}
          </p>
        </>
      ) : (
        <p>No PDF file specified</p>
      )}
    </div>
  );
}
