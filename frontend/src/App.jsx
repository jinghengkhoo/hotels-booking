import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Home from "./components/Home";
import Register from "./components/Register";
import Login from "./components/Login";
import HotelSearch from "./components/HotelSearch";
import HotelDetails from "./components/HotelDetails";
import BookingFormWrapper from "./components/BookingForm";

const App = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/hotels" element={<HotelSearch />} />
        <Route path="/hotels/:id" element={<HotelDetails />} />
        <Route path="/book/:id" element={<BookingFormWrapper />} />
      </Routes>
    </AuthProvider>
  );
};

export default App;
