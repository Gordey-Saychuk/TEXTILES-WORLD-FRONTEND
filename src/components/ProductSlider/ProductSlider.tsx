"use client";

import React from 'react';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import styles from './ProductSlider.module.css';

const ProductSlider = ({ images, productName }) => {
  const galleryImages = images.map((image) => ({
    original: image,
    thumbnail: image,
    originalAlt: productName, // Используем название товара в качестве alt
    thumbnailAlt: productName, // Используем название товара для миниатюры
  }));

  return (
    <div className={styles.sliderContainer}>
      <ImageGallery
        items={galleryImages}
        showThumbnails={true}
        showFullscreenButton={false}
        showPlayButton={false}
        slideDuration={450}
        slideInterval={3000}
        showBullets={true}
        useBrowserFullscreen={false}
        renderLeftNav={(onClick, disabled) => (
          <button
            type="button"
            className={styles.navButton}
            onClick={onClick}
            disabled={disabled}
          >
            &#9664;
          </button>
        )}
        renderRightNav={(onClick, disabled) => (
          <button
            type="button"
            className={styles.navButton}
            onClick={onClick}
            disabled={disabled}
          >
            &#9654;
          </button>
        )}
      />
    </div> 
  );
};

export default ProductSlider;
 