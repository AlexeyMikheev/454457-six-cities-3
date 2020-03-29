import * as React from "react";

const PropertyGallery: React.FC<{images: string[]}> = ({images}) => {
  return (
    <div className="property__gallery">
      {images.map((imageSrc, i) => (
        <div key={imageSrc + i} className="property__image-wrapper">
          <img className="property__image" src={`${imageSrc}`} alt="Photo studio" />
        </div>
      ))}
    </div>
  );
};

export default PropertyGallery;
