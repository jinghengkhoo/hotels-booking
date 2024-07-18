import { useState, useEffect } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { MdOutlineDelete } from "react-icons/md";
import PropTypes from "prop-types";
import axios from "axios";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import LoadingIcon from "./LoadingIcon";
import EditUserModal from "./EditUserModal";

const UsersTable = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5555/api/user/all")
      .then((response) => {
        console.log(response.data.data);
        setUsers(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleEditClick = (user) => {
    setSelectedUser(user);
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = (user) => {
    setSelectedUser(user);
    setIsDeleteModalOpen(true);
  };

  const handleEditModalClose = () => {
    setIsEditModalOpen(false);
    setSelectedUser(null);
  };

  const handleDeleteModalClose = () => {
    setIsDeleteModalOpen(false);
    setSelectedUser(null);
  };

  const handleSave = async (updatedUser) => {
    try {
      await axios.put(
        `http://localhost:5555/api/user/${updatedUser._id}`,
        updatedUser
      );
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === updatedUser._id ? updatedUser : user
        )
      );
      handleEditModalClose();
    } catch (error) {
      console.error("Error updating booking", error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5555/api/user/${selectedUser._id}`);
      setUsers((prevUsers) =>
        prevUsers.filter((user) => user._id !== selectedUser._id)
      );
      handleDeleteModalClose();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div>
      {loading ? (
        <LoadingIcon />
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-separate border-spacing-2">
            <thead>
              <tr>
                <th className="border border-slate-600 rounded-md">No</th>
                <th className="border border-slate-600 rounded-md">Email</th>
                <th className="border border-slate-600 rounded-md">
                  Salutation
                </th>
                <th className="border border-slate-600 rounded-md">
                  First Name
                </th>
                <th className="border border-slate-600 rounded-md">
                  Last Name
                </th>
                <th className="border border-slate-600 rounded-md">
                  Phone Number
                </th>
                <th className="border border-slate-600 rounded-md">
                  Billing Address One
                </th>
                <th className="border border-slate-600 rounded-md">
                  Billing Address Two
                </th>
                <th className="border border-slate-600 rounded-md">
                  Billing Address Postal Code
                </th>
                <th className="border border-slate-600 rounded-md">
                  Booking IDs
                </th>
                <th className="border border-slate-600 rounded-md">
                  Operations
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id} className="h-8">
                  <td className="border border-slate-700 rounded-md text-center">
                    {user._id}
                  </td>
                  <td className="border border-slate-700 rounded-md text-center">
                    {user.email}
                  </td>
                  <td className="border border-slate-700 rounded-md text-center">
                    {user.salutation}
                  </td>
                  <td className="border border-slate-700 rounded-md text-center">
                    {user.firstName}
                  </td>
                  <td className="border border-slate-700 rounded-md text-center">
                    {user.lastName}
                  </td>
                  <td className="border border-slate-700 rounded-md text-center">
                    {user.phoneNumber}
                  </td>
                  <td className="border border-slate-700 rounded-md text-center">
                    {user.billingAddressOne}
                  </td>
                  <td className="border border-slate-700 rounded-md text-center">
                    {user.billingAddressTwo}
                  </td>
                  <td className="border border-slate-700 rounded-md text-center">
                    {user.billingAddressPostalCode}
                  </td>
                  <td className="border border-slate-700 rounded-md text-center">
                    {user.bookingIDs.join(", ")}
                  </td>
                  <td className="border border-slate-700 rounded-md text-center">
                    <div className="flex justify-center gap-x-4">
                      <AiOutlineEdit
                        className="text-2xl text-yellow-600 cursor-pointer"
                        onClick={() => handleEditClick(user)}
                      />
                      <MdOutlineDelete
                        className="text-2xl text-red-600 cursor-pointer"
                        onClick={() => handleDeleteClick(user)}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {isEditModalOpen && selectedUser && (
            <EditUserModal
              user={selectedUser}
              isOpen={isEditModalOpen}
              onClose={handleEditModalClose}
              onSave={handleSave}
            />
          )}
          {isDeleteModalOpen && selectedUser && (
            <DeleteConfirmationModal
              isOpen={isDeleteModalOpen}
              onClose={handleDeleteModalClose}
              onDelete={handleDelete}
            />
          )}
        </div>
      )}
    </div>
  );
};

UsersTable.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      bookingIDs: PropTypes.arrayOf(PropTypes.string).isRequired,
      salutation: PropTypes.string,
      firstName: PropTypes.string,
      lastName: PropTypes.string,
      phoneNumber: PropTypes.number,
      billingAddressOne: PropTypes.string,
      billingAddressTwo: PropTypes.string,
      billingAddressPostalCode: PropTypes.number,
    })
  ),
};

export default UsersTable;
