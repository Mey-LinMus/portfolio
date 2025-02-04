import React from 'react';
import '../styles/DownloadCVButton.css';

const DownloadCVButton = () => {

  const handleDownloadCV = () => {
    const link = document.createElement('a');
    link.href = '../assets/CV-Mey-Lin_Mus.pdf'; 
    link.download = 'CV-Mey-Lin_Mus.pdf'; 
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <button className="download-button" onClick={handleDownloadCV}>
      Download mijn CV
    </button>
  );
};

export default DownloadCVButton;