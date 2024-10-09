// components/FilePreview.tsx
import React from "react";

interface FilePreviewProps {
  fileUrl: string;
}

const FilePreview: React.FC<FilePreviewProps> = ({ fileUrl }) => {
  const fileExtension = fileUrl.split(".").pop()?.toLowerCase();

  if (!fileExtension) return null;

  switch (fileExtension) {
    case "jpg":
    case "jpeg":
    case "png":
    case "gif":
      return (
        <img src={fileUrl} alt="File Preview" className="w-64 h-full mb-2" />
      );
    case "pdf":
      return (
        <iframe
          src={fileUrl}
          title="PDF Preview"
          className="w-60 h-full mb-2"
          frameBorder="0"
        />
      );
    case "mp4":
    case "mov":
      return (
        <video controls className="w-auto h-auto mb-2">
          <source src={fileUrl} type={`video/${fileExtension}`} />
          Your browser does not support the video tag.
        </video>
      );
    default:
      return <p>Unsupported file type: {fileExtension}</p>;
  }
};

export default FilePreview;
