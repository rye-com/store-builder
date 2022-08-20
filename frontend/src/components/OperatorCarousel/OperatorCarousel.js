import { useState, useCallback } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import './style.scss';

const styles = {
  productImage: {
    height: '235px',
    width: '235px',
    maxWidth: '235px',
    margin: 'auto',
    objectFit: 'contain',
  },
};
const OperatorCarousel = ({ images, loading, onLoad }) => {
  const [index, setIndex] = useState(0);

  const handleSelect = useCallback((selectedIndex) => {
    setIndex(selectedIndex);
  }, []);

  return (
    <Carousel activeIndex={index} onSelect={handleSelect} interval={null} indicators={false}>
      {images.map((image, idx) => (
        <Carousel.Item key={idx}>
          <div style={{ display: loading ? 'none' : 'block' }}>
            <img className="d-block" src={image} style={styles.productImage} onLoad={onLoad} />
          </div>
          {loading && (
            <div>
              <Skeleton height={235} highlightColor="#aaaaaa" borderRadius="1.25rem" />
            </div>
          )}
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default OperatorCarousel;
