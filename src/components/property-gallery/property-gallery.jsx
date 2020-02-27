import React from "react";
import PropTypes from "prop-types";

const PropertyGallery = ({images}) => {
  return (
    <div className="property__gallery">
      {images.map((imageSrc, i) => (
        <div key={imageSrc + i} className="property__image-wrapper">
          <img className="property__image" src={imageSrc} alt="Photo studio" />
        </div>
      ))}
    </div>
  );
};

PropertyGallery.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired
};


export default PropertyGallery;
