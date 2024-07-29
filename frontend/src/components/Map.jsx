import PropTypes from "prop-types";

const Map = ({ lat, lng }) => {
  const apiKey = (typeof import.meta !== 'undefined' ? import.meta.env.VITE_GOOGLE_MAPS_API_KEY : global.importMeta.env.VITE_GOOGLE_MAPS_API_KEY);

  if (!apiKey) {
    return <div>Error: Google Maps API key is missing.</div>;
  }

  return (
    <div>
      <iframe
        width="100%"
        height="300"
        style={{ border: 0 }}
        src={`https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${lat},${lng}`}
        allowFullScreen
      ></iframe>
    </div>
  );
};

Map.propTypes = {
  lat: PropTypes.number.isRequired,
  lng: PropTypes.number.isRequired,
};

export default Map;
