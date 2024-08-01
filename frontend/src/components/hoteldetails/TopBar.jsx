import SearchBar from '../SearchBar'; // Import your SearchBar component
import NavBar from "../NavBar";

const TopBar = () => {
  return (
    <div className="relative">
      <div className="bg-base-100 py-4">
        <NavBar />
      </div>
      <SearchBar/>
      {/* <div className="absolute inset-x-0 top-1/2 transform -translate-y-1/4">
        <SearchBar />
      </div> */}
    </div>
  );
};

export default TopBar;