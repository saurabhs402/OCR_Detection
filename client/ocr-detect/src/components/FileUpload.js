import React, { useState } from "react";

const FileUpload = ({ handleFileUpload }) => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [imagePreview, setImagePreview] = useState(null);

  const handleOnChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.size <= 2097152) {
      setFile(selectedFile);
      setError("");
      // Generate image preview URL
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      setFile(null);
      setImagePreview(null);
      setError("File size should be less than 2MB");
    }
  };

  const handleUpload = () => {
    if (file) {
      handleFileUpload(file);
    } else {
      setError("Please select a file");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="max-w-md mx-auto p-6 bg-gray-900 text-white rounded-lg shadow-lg">
        <input
          type="file"
          accept="image/png, image/jpeg"
          onChange={handleOnChange}
          className="mb-4 bg-gray-800 text-white p-2 rounded"
        />
        {imagePreview && (
          <div className="mb-4">
            <img src={imagePreview} alt="Uploaded Preview" className="max-w-full h-auto" />
          </div>
        )}
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <button
          onClick={handleUpload}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Evaluate
        </button>
      </div>
    </div>
  );
};

export default FileUpload;