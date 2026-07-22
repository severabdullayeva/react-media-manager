import { useRef } from "react";
import styles from "./DropZone.module.css";

export const DropZone = ({ onFileSelect }) => {
  const fileInputRef = useRef(null);

  const handleFiles = (files) => {
    const newImage = Array.from(files).map((file) => ({
      id: Date.now() + Math.random(),
      name: file.name,
      size: file.size,
      type: file.type,
      preview: URL.createObjectURL(file),
      isSelected: false,
    }));
    onFileSelect(newImage);
  };

  return (
    <div
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        e.preventDefault();
        handleFiles(e.dataTransfer.files);
      }}
      onClick={() => fileInputRef.current.click()}
      className={styles.container}
    >
      <input
        type="file"
        ref={fileInputRef}
        multiple
        style={{ display: "none" }}
        onChange={(e) => handleFiles(e.target.files)}
      />
      <span>📁</span>
      <p className={styles.text}>Drop images here or click</p>
    </div>
  );
};
