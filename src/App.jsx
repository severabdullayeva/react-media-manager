import { useState } from "react";
import styles from "./App.module.css";
import { DropZone } from "./DropZone";
import { ImageItem } from "./ImageItem";

function App() {
  const [image, setImage] = useState([]);

  const addImages = (newFiles) => {
    setImage([...image, ...newFiles]);
  };

  const deleteImage = (id) => {
    setImage(image.filter((img) => img.id !== id));
  };

  const renameImage = (id, newName) => {
    setImage(
      image.map((img) => (img.id === id ? { ...img, name: newName } : img)),
    );
  };

  const toggleSelect = (id) => {
    setImage(
      image.map((img) =>
        img.id === id ? { ...img, isSelected: !img.isSelected } : img,
      ),
    );
  };

  const deleteSelected = () => {
    setImage(image.filter((img) => !img.isSelected));
  };

  return (
    <div className={styles.appContainer}>
      <aside className={styles.sidebar}>
        <h3 style={{ textAlign: "center", margin: "10px 0" }}>Media Upload</h3>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "5px",
            marginBottom: "10px",
          }}
        >
          <button
            onClick={() => setImage([])}
            className={`${styles.btn} ${styles.btnDeleteAll}`}
          >
            Delete All
          </button>
          <button
            onClick={deleteSelected}
            className={`${styles.btn} ${styles.btnDeleteSelected}`}
          >
            Delete Selected
          </button>
        </div>
        <DropZone onFileSelect={addImages} />
      </aside>

      <main className={styles.gallery}>
        {image.map((img) => (
          <ImageItem
            key={img.id}
            image={img}
            onDelete={deleteImage}
            onRename={renameImage}
            onToggleSelect={toggleSelect}
          />
        ))}
      </main>
    </div>
  );
}

export default App;
