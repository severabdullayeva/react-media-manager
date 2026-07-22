import { useState } from "react";
import styles from "./ImageItem.module.css";

export const ImageItem = ({ image, onDelete, onRename, onToggleSelect }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempName, setTempName] = useState(image.name);

  const startEditing = () => {
    setTempName(image.name);
    setIsEditing(true);
  };

  const handleBlur = () => {
    setIsEditing(false);
    onRename(image.id, tempName);
  };

  return (
    <div className={styles.card}>
      <input
        type="checkbox"
        className={styles.customCheckbox}
        checked={image.isSelected}
        onChange={() => onToggleSelect(image.id)}
      />
      <img src={image.preview} alt={image.name} className={styles.image} />

      {isEditing ? (
        <input
          className={styles.fileName}
          value={tempName}
          onChange={(e) => setTempName(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={(e) => e.key === "Enter" && handleBlur()}
          autoFocus
        />
      ) : (
        <p
          className={styles.fileName}
          onClick={startEditing}
          style={{ cursor: "pointer", color: "blue" }}
        >
          {image.name}
        </p>
      )}

      <p className={styles.typeBadge}>{image.type}</p>
      <small className={styles.sizeText}>
        {(image.size / 1024).toFixed(2)} KB
      </small>
      <button
        onClick={() => onDelete(image.id)}
        className={styles.deleteButton}
      >
        Delete
      </button>
    </div>
  );
};
