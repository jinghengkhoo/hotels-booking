import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Home from "./components/Home";
import Register from "./components/Register";
import Login from "./components/Login";
import Profile from "./components/Profile";
import HotelSearch from "./components/HotelSearch";
import HotelDetails from "./components/HotelDetails";
import BookingFormWrapper from "./components/BookingForm";
import AdminLogin from "./components/AdminLogin";

const App = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/hotels" element={<HotelSearch />} />
        <Route path="/hotels/:id" element={<HotelDetails />} />
        <Route path="/book/:id" element={<BookingFormWrapper />} />
        <Route path="/admin" element={<AdminLogin />} />
      </Routes>
    </AuthProvider>
  );
};

export default App;
