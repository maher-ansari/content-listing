// src/components/ContentItem.js
import React,{useState} from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

// ContentItem displays individual content data
const ContentItem = ({ title, image }) => {
  const [imgSrc, setImgSrc] = useState(image);
  
  // Fallback default image URL
  const defaultImage = "placeholder_for_missing_posters.png"; // Change to your default image URL

  // Handle image error to load default image if the actual image fails
  const handleError = () => {
    setImgSrc(defaultImage);
  };
  return (
    <div className="content-item">
      <LazyLoadImage
        src={`https://test.create.diagnal.com/images/${imgSrc}`}
        alt={title}
        effect="blur"
        className="content-item-image"
        onError={handleError} 
      />
      <div className="content-item-title">{title}</div>
    </div>
  );
};

export default ContentItem;
