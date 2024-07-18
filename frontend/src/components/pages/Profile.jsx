import { useContext, useState, useEffect } from "react";
import axios from "axios";
import { MdOutlineDelete } from "react-icons/md";
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
      } catch (error) {
        console.error("Error fetching user details", error);
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    if (
      !validatePhoneNumber(userData.phoneNumber) &&
      userData.phoneNumber != null &&
      userData.phoneNumber != ""
    ) {
      setErrorMsg("Please Enter a Valid Singapore Number");
      return 0;
    } else if (!validateEmail(userData.email)) {
      setErrorMsg("Please Enter a Valid Email Address");
      return 0;
    } else if (
      !userData.billingAddressOne &&
      userData.billingAddressOne != ""
    ) {
      setErrorMsg("Please Enter Billing Address");
      return 0;
    } else if (
      !validatePostalCode(userData.billingAddressPostalCode) &&
      userData.billingAddressPostalCode != 0
    ) {
      setErrorMsg("Please Enter a Valid Postal Code");
      return 0;
    }
    return 1;
  };

  const handleSave = async () => {
    if (!validateForm()) {
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
      console.error("Error updating user details", error);
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
        <MdOutlineDelete
          className="text-4xl text-red-600 cursor-pointer absolute bottom-6 right-10"
          onClick={() => handleDeleteClick(userData)}
        />
      </div>
      {isDeleteModalOpen && selectedUser && (
        <DeleteConfirmationModal
          isOpen={isDeleteModalOpen}
          onClose={handleDeleteModalClose}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default Profile;
