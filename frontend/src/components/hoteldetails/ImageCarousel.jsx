import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import PropTypes from 'prop-types';

const ImageCarousel = ({ hotelDetails }) => {
  console.log(hotelDetails)
  const { image_details: { prefix, suffix }, hires_image_index } = hotelDetails;
  const imageIndexes = hires_image_index.split(',').map(index => parseInt(index, 10));

  return (
    <div className="carousel-container">
      <Carousel showThumbs={false} infiniteLoop useKeyboardArrows autoPlay>
        {imageIndexes.map((image, index) => (
          <div key={index}>
            <img src={`${prefix}${image}${suffix}`} alt={`Image ${index}`} />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

ImageCarousel.propTypes = {
  hotelDetails: PropTypes.object.isRequired,
};

export default ImageCarousel;
