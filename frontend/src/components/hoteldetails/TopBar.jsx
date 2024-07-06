import SearchBar from '../SearchBar'; // Import your SearchBar component
import NavBar from "../NavBar";

const TopBar = () => {
    return (
      <div className="relative">
        <div className="bg-base-300 text-blue py-4">
          <NavBar />
        </div>
        <div className="absolute inset-x-0 top-1/2 transform -translate-y-1/2">
          <SearchBar />
        </div>
      </div>
    );
  };

export default TopBar;