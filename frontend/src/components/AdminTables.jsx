import { useState } from "react";
import BookingsTable from "./BookingsTable";
import UsersTable from "./UsersTable";

const AdminTables = () => {
  const [selectedTab, setSelectedTab] = useState("bookings");

  return (
    <div className="max-w-6xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <div className="mb-6">
        <div className="flex justify-around">
          <button
            className={`px-4 py-2 font-semibold ${selectedTab === "bookings"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-600"
              }`}
            onClick={() => setSelectedTab("bookings")}
          >
            Bookings
          </button>
          <button
            className={`px-4 py-2 font-semibold ${selectedTab === "users"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-600"
              }`}
            onClick={() => setSelectedTab("users")}
          >
            Users
          </button>
        </div>
      </div>
      <div>
        {selectedTab === "bookings" && <BookingsTable />}
        {selectedTab === "users" && <UsersTable />}
      </div>
    </div>
  );
};

export default AdminTables;
