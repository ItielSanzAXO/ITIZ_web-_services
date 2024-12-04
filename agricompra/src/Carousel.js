import React, { useEffect, useRef } from 'react';
import './Carousel.css';

function Carousel() {
  const carouselRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (carouselRef.current) {
        const firstChild = carouselRef.current.firstChild;
        carouselRef.current.appendChild(firstChild);
      }
    }, 3000); // Cambia cada 3 segundos

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="carousel" ref={carouselRef}>
      <div className="carousel-item">
        <img src="/img/banner1.jpeg" alt="Banner 1" />
      </div>
      <div className="carousel-item">
        <img src="/img/banner2.jpeg" alt="Banner 2" />
      </div>
    </div>
  );
}

export default Carousel;