import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import "../styles/infoportfolio.css";
import { motion } from "framer-motion";

// Enable pdfjs worker
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const InfoPortfolio = ({ info }) => {
  const [pageNumber, setPageNumber] = useState(1);
  const [numPages, setNumPages] = useState(null);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const goToPreviousPage = () => {
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1);
    }
  };

  const goToNextPage = () => {
    if (pageNumber < numPages) {
      setPageNumber(pageNumber + 1);
    }
  };

  const downloadPdf = () => {
    const pdfUrl = `${process.env.PUBLIC_URL}/files/${info.file}`;
    const link = document.createElement("a");
    link.href = pdfUrl;
    link.download = "document.pdf"; // You can set the desired file name here
    link.click();
  };

  const renderFileContent = () => {
    if (info.file.endsWith(".pdf")) {
      let pdfWidth = 700; // Default width for most PDFs

      if (info.id === 4) {
        // Adjust the width for the PDF with id 4
        pdfWidth = 500; // Set a smaller width for this specific PDF
      }

      return (
        <div className="pdf-container">
          <Document
            file={`${process.env.PUBLIC_URL}/files/${info.file}`}
            options={{ workerSrc: `${process.env.PUBLIC_URL}/pdf.worker.js` }}
            onLoadSuccess={onDocumentLoadSuccess}
          >
            <Page pageNumber={pageNumber} width={pdfWidth} />
          </Document>
          <div className="page-navigation">
            <motion.button
              onClick={goToPreviousPage}
              disabled={pageNumber === 1}
              whileHover={{ scale: 1.2 }}   whileTap={{ scale: 0.5 }}
            >
              &#x1F890;
            </motion.button>
            <span>
              Pagina {pageNumber} of {numPages}
            </span>
            <motion.button
              onClick={goToNextPage}
              disabled={pageNumber === numPages}
              whileHover={{ scale: 1.2 }}   whileTap={{ scale: 0.5 }}
            >
              &#x1F892;
            </motion.button>
          </div>
          <motion.button
            className="download"
            onClick={downloadPdf}
            whileHover={{ scale: 1.2 }}   whileTap={{ scale: 0.5 }}
          >
            Download PDF
          </motion.button>
        </div>
      );
    } else if (info.file.endsWith(".mp4")) {
      // Render a video player for MP4 files with a smaller width
      return (
        <div className="video-container">
          <video controls width="650">
            <source
              src={`${process.env.PUBLIC_URL}/files/${info.file}`}
              type="video/mp4"
            />
            Your browser does not support the video element.
          </video>
        </div>
      );
    } else if (info.file.startsWith("http")) {
      // Render a website iframe with a wider width and larger height
      return (
        <div className="website-container">
          <motion.a href={info.file} target="_blank" rel="noopener noreferrer" className="visitButton"  whileHover={{ scale: 1.2 }}   whileTap={{ scale: 0.5 }}>
            Visit Website
          </motion.a>
          <iframe
            src={info.file}
            title="Website Display"
            width="100%" // Adjust the width as needed
            height="600px" // Adjust the height as needed
          ></iframe>
        </div>
      );
    } else {
      // Handle other file types here
      return <p>Unsupported file type</p>;
    }
  };

  return (
    <div className="container-info">
      <h1>{info.title}</h1>
      {/* <p>{info.description}</p> */}
      {info.file && renderFileContent()}
    </div>
  );
};

export default InfoPortfolio;
