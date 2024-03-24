import React, { useState } from 'react';
import backIcon from '../../assets/icons/back.png';
import forwardIcon from '../../assets/icons/forward.png';
import './ImageGallery.css';

interface ImageGalleryProps {
  images: { url: string }[];
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <div data-testid="imageGallery" className="image" style={{
      backgroundImage: `url(${images[currentImageIndex]?.url})`, backgroundPosition: 'center',
      backgroundSize: 'cover',
    }}>
      <img src={backIcon} onClick={prevImage} alt="backIcon" className="icon" />
      <img src={forwardIcon} onClick={nextImage} alt="forwardIcon" className="icon" />
    </div>
  );
};

export default ImageGallery;