import PropTypes from "prop-types";

function ProfileFormUI({
  userData,
  errorMsg,
  editMode,
  handleChange,
  handleSave,
  editModeTrue,
}) {
  const {
    _id = userData._id || "",
    email = userData.email || "",
    password = userData.password || "",
    bookingIDs = userData.bookingIDs || [],
    salutation = userData.salutation || "",
    firstName = userData.firstName || "",
    lastName = userData.lastName || "",
    phoneNumber = userData.phoneNumber || "",
    billingAddressOne = userData.billingAddressOne || "",
    billingAddressTwo = userData.billingAddressTwo || "",
    billingAddressPostalCode = userData.billingAddressPostalCode || "",
  } = userData;

  return (
    <div>
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
              value={email}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            />
          ) : (
            <span
              data-testid="emailField"
              className="mt-1 block text-sm text-gray-900"
            >
              {email}
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
              value={salutation}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          ) : (
            <span
              data-testid="salutationField"
              className="mt-1 block text-sm text-gray-900"
            >
              {salutation}
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
              value={firstName}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          ) : (
            <span
              data-testid="firstNameField"
              className="mt-1 block text-sm text-gray-900"
            >
              {firstName}
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
              value={lastName}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          ) : (
            <span
              data-testid="lastNameField"
              className="mt-1 block text-sm text-gray-900"
            >
              {lastName}
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
              value={phoneNumber}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          ) : (
            <span
              data-testid="phoneNumberField"
              className="mt-1 block text-sm text-gray-900"
            >
              {phoneNumber}
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
              value={billingAddressOne}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          ) : (
            <span
              data-testid="billingOneField"
              className="mt-1 block text-sm text-gray-900"
            >
              {billingAddressOne}
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
              value={billingAddressTwo}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          ) : (
            <span
              data-testid="billingTwoField"
              className="mt-1 block text-sm text-gray-900"
            >
              {billingAddressTwo}
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
              value={billingAddressPostalCode}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          ) : (
            <span
              data-testid="postalCodeField"
              className="mt-1 block text-sm text-gray-900"
            >
              {billingAddressPostalCode}
            </span>
          )}
        </div>
        {errorMsg && <div className="mb-4 text-red-600">{errorMsg}</div>}
        {email == "" ? (
          <div data-testid="noEditButton" />
        ) : (
          <div>
            {editMode ? (
              <button
                data-testid="saveEditButton"
                onClick={handleSave}
                className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Save
              </button>
            ) : (
              <button
                data-testid="editButton"
                onClick={editModeTrue}
                className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Edit
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

ProfileFormUI.propTypes = {};

export default ProfileFormUI;
