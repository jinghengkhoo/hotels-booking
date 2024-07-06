import PropTypes from 'prop-types';

const PropertyDescription = ({ hotelDetails }) => {
  return (
    <div className="container mx-auto p-4 mt-3">
      <div className="text-base" dangerouslySetInnerHTML={{ __html: hotelDetails.description }} />
    </div>
  );
};

PropertyDescription.propTypes = {
  description: PropTypes.string.isRequired,
};

export default PropertyDescription;
