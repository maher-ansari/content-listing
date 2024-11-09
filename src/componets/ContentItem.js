// src/components/ContentItem.js
import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

// ContentItem displays individual content data
const ContentItem = ({ title, image }) => {
  return (
    <div className="content-item">
      <LazyLoadImage
        src={`https://test.create.diagnal.com/images/${image}`}
        alt={title}
        effect="blur"
        className="content-item-image"
      />
      <div className="content-item-title">{title}</div>
    </div>
  );
};

export default ContentItem;
