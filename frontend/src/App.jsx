import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Home from "./components/pages/Home";
import Register from "./components/pages/Register";
import Login from "./components/pages/Login";
import Profile from "./components/pages/Profile";
import HotelSearch from "./components/pages/HotelSearch";
import HotelDetails from "./components/pages/HotelDetails";
import BookingFormWrapper from "./components/pages/BookingForm";
import AdminLogin from "./components/pages/AdminLogin";

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
