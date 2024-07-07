import { useState, useEffect } from "react";
import axios from "axios";

const Profile = () => {
  const [editMode, setEditMode] = useState(false);
  const [userData, setUserData] = useState({
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

  const handleSave = async () => {
    try {
      const response = await axios.put(
        "http://localhost:5555/api/user/profile",
        userData,
        {
          withCredentials: true,
        }
      );
      setUserData(response.data);
      setEditMode(false);
    } catch (error) {
      console.error("Error updating user details", error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6">Profile</h1>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email:
          </label>
          {editMode ? (
            <input
              type="email"
              name="email"
              value={userData.email}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          ) : (
            <span className="mt-1 block text-sm text-gray-900">
              {userData.email}
            </span>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Salutation:
          </label>
          {editMode ? (
            <input
              type="text"
              name="salutation"
              value={userData.salutation}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          ) : (
            <span className="mt-1 block text-sm text-gray-900">
              {userData.salutation}
            </span>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            First Name:
          </label>
          {editMode ? (
            <input
              type="text"
              name="firstName"
              value={userData.firstName}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          ) : (
            <span className="mt-1 block text-sm text-gray-900">
              {userData.firstName}
            </span>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Last Name:
          </label>
          {editMode ? (
            <input
              type="text"
              name="lastName"
              value={userData.lastName}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          ) : (
            <span className="mt-1 block text-sm text-gray-900">
              {userData.lastName}
            </span>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Phone Number:
          </label>
          {editMode ? (
            <input
              type="text"
              name="phoneNumber"
              value={userData.phoneNumber}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          ) : (
            <span className="mt-1 block text-sm text-gray-900">
              {userData.phoneNumber}
            </span>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Billing Address One:
          </label>
          {editMode ? (
            <input
              type="text"
              name="billingAddressOne"
              value={userData.billingAddressOne}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          ) : (
            <span className="mt-1 block text-sm text-gray-900">
              {userData.billingAddressOne}
            </span>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Billing Address Two:
          </label>
          {editMode ? (
            <input
              type="text"
              name="billingAddressTwo"
              value={userData.billingAddressTwo}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          ) : (
            <span className="mt-1 block text-sm text-gray-900">
              {userData.billingAddressTwo}
            </span>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Billing Address Postal Code:
          </label>
          {editMode ? (
            <input
              type="number"
              name="billingAddressPostalCode"
              value={userData.billingAddressPostalCode}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          ) : (
            <span className="mt-1 block text-sm text-gray-900">
              {userData.billingAddressPostalCode}
            </span>
          )}
        </div>
        <div>
          {editMode ? (
            <button
              onClick={handleSave}
              className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Save
            </button>
          ) : (
            <button
              onClick={() => setEditMode(true)}
              className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Edit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
