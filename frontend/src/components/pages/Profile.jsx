import { useContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  validateEmail,
  validatePhoneNumber,
  validatePostalCode,
} from "../../utils/validationMethods.js";
import { AuthContext } from "../../context/AuthContext";
import DeleteConfirmationModal from "../DeleteConfirmationModal";
import { Link } from "react-router-dom";
import ProfileFormUI from "../profilepage/ProfileFormUI.jsx";
import ProfileBookingsTable from "../profilepage/ProfileBookingsTable.jsx";
import LoadingIcon from "../LoadingIcon";

const Profile = () => {
  const { logout } = useContext(AuthContext);
  const [userData, setUserData] = useState({
    _id: "",
    email: "",
    password: "",
    bookingIDs: [],
    salutation: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    billingAddressOne: "",
    billingAddressTwo: "",
    billingAddressPostalCode: 0,
  });
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5555/api/user/profile",
          {
            withCredentials: true,
          }
        );
        setUserData(response.data);
        setLoading(false);
      } catch (error) {
        //console.error("Error fetching user details", error);
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const validateForm = (userData) => {
    if (
      !validatePhoneNumber(userData.phoneNumber) &&
      userData.phoneNumber != null &&
      userData.phoneNumber != ""
    ) {
      setErrorMsg("Please Enter a Valid Singapore Number");
      return false;
    } else if (!validateEmail(userData.email)) {
      setErrorMsg("Please Enter a Valid Email Address");
      return false;
    } else if (
      !userData.billingAddressOne &&
      userData.billingAddressOne != ""
    ) {
      setErrorMsg("Please Enter Billing Address");
      return false;
    } else if (
      !validatePostalCode(userData.billingAddressPostalCode) &&
      userData.billingAddressPostalCode != 0
    ) {
      setErrorMsg("Please Enter a Valid Postal Code");
      return false;
    }
    return true;
  };

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    if (!validateForm(userData)) {
      return;
    }
    try {
      const response = await axios.put(
        `http://localhost:5555/api/user/${userData._id}`,
        userData
      );
      setUserData(response.data);
      setEditMode(false);
      setErrorMsg("");
    } catch (error) {
      //console.error("Error updating user details", error);
    }
  };

  const [selectedUser, setSelectedUser] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const handleDeleteClick = (user) => {
    setSelectedUser(user);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteModalClose = () => {
    setIsDeleteModalOpen(false);
    setSelectedUser(null);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5555/api/user/${selectedUser._id}`);
      handleDeleteModalClose();
      logout();
      navigate("/");
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div>
      <Link to="/">
        <button className="btn btn-ghost text-center font-bold text-xl">
          Travelust
        </button>
      </Link>
      <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md relative">
        <ProfileFormUI
          userData={userData}
          errorMsg={errorMsg}
          editMode={editMode}
          handleChange={handleChange}
          handleSave={handleSave}
          editModeTrue={() => setEditMode(true)}
        />

        {userData.email == "" ? (
          <div data-testid="noDeleteButton" />
        ) : (
          <button
            data-testid="deleteButton"
            className="px-4 py-2 text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 absolute bottom-6 right-10"
            onClick={() => handleDeleteClick(userData)}
          >
            Delete Account
          </button>
        )}
      </div>
      {isDeleteModalOpen && selectedUser && (
        <DeleteConfirmationModal
          isOpen={isDeleteModalOpen}
          onClose={handleDeleteModalClose}
          onDelete={handleDelete}
        />
      )}
      {loading ? <LoadingIcon /> : <ProfileBookingsTable userData={userData} />}
    </div>
  );
};

export default Profile;
