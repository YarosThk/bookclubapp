import { useState } from 'react';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import comingSoon from './ComingSoonData';

function ReleasesCarousel() {
  const [itemPosition, setItemPosition] = useState(0);

  const advanceItemPosition = () => {
    if (itemPosition === 3) {
      setItemPosition(0);
    } else {
      setItemPosition(itemPosition + 1);
    }
  };

  const retreatItemPosition = () => {
    if (itemPosition === 0) {
      setItemPosition(3);
    } else {
      setItemPosition(itemPosition - 1);
    }
  };

  return (
    <div className="carousel">
      <div className="image-container">
        <div className="controls-group">
          <button className="carousel-control" onClick={retreatItemPosition}>
            <FaAngleLeft />
          </button>
          <button className="carousel-control" onClick={advanceItemPosition}>
            <FaAngleRight />
          </button>
        </div>
        <img
          src={comingSoon[itemPosition] && comingSoon[itemPosition].imgSrc}
          className="carousel-img"
          alt=""
        />
      </div>
      <div className="item-description">
        <h2>Coming next</h2>
        <p>{comingSoon[itemPosition] && comingSoon[itemPosition].itemDescription}</p>
      </div>
    </div>
  );
}

export default ReleasesCarousel;
