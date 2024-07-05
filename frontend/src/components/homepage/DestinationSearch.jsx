import "react-datepicker/dist/react-datepicker.css";
import singaporeImage from "../../assets/singapore.jpg"; // Correct import for the image
import SearchBar from "../SearchBar"; // Ensure the path is correct

const DestinationSearch = () => {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center h-3/4"
      style={{ backgroundImage: `url(${singaporeImage})` }}
    >
      <div className="absolute inset-0 bg-black opacity-20 mt-20"></div>
      <div className="mt-64">
        <div className="relative z-10 text-white text-center p-8">
          <h1 className="text-4xl font-bold">
            Visit the best places in the world with us.
          </h1>
          <p className="text-xl mt-2">Book your hotel with us now.</p>
        </div>
        <div className="relative z-10">
          <SearchBar />
        </div>
      </div>
    </div>
  );
};

export default DestinationSearch;
