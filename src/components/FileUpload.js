// src/components/FileUpload.js
import React, { useState } from 'react';

const FileUpload = ({ onFileUpload }) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    setFile(uploadedFile);
    if (onFileUpload) {
      onFileUpload(uploadedFile);
    }
  };

  const handleUploadClick = () => {
    document.getElementById('fileInput').click(); // Programmatically trigger file input click
  };

  return (
    <div className="file-upload">
      <input
        type="file"
        id="fileInput"
        style={{ display: 'none' }} // Hide the default file input
        onChange={handleFileChange}
      />
      <button className="upload-button" onClick={handleUploadClick}>
        <i className="fa-solid fa-file-arrow-up" aria-hidden="true"></i>
      </button>
    </div>
  );
};

export default FileUpload;
