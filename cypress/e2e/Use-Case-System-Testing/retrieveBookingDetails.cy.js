context("Retrieve Booking Details Use Case System Testing", () => {
  const testUser = {
    email: "testuser@example.com",
    password: "password123!",
  };

  const mockBookingData = {
    email: "testuser@example.com",
    roomID: "room123", // Example room ID
    destinationID: "dest456", // Example destination ID
    hotelID: "hotel789", // Example hotel ID
    numberOfNights: 3,
    startDate: "2024-08-01", // Example start date
    endDate: "2024-08-04", // Example end date
    adults: 2,
    children: 1,
    messageToHotel: "Please prepare a vegan breakfast.",
    roomType: "Deluxe Suite", // Example room type
    price: 199.99, // Example price
    salutation: "Mr.",
    firstName: "John",
    lastName: "Doe",
    phoneNumber: 88664422,
    stripePaymentID: "pi_1GqIC8FuPz5I8RaZ1cQr8A2x", // Example Stripe Payment ID
    billingAddressOne: "123 Main St",
    billingAddressTwo: "Apt 4B",
    billingAddressPostalCode: 552233,
  };

  beforeEach(() => {
    cy.visit("http://localhost:5173/");

    //Register testuser account
    cy.request("POST", "http://localhost:5555/api/user/register", {
      email: testUser.email,
      password: testUser.password,
    }).then((response) => {
      expect(response.status).to.eq(200); // Ensure the user is created successfully
    });

    //Mock Booking data input
    cy.request(
      "POST",
      "http://localhost:5555/api/bookings",
      mockBookingData
    ).then((response) => {
      // Assert that the booking was successful
      expect(response.status).to.eq(200); // Assuming 201 is the success status code
      cy.log("Booking created successfully:", response.body.bookingID);
    });

    //login to testuser account
    cy.get(".container").should("contain.text", "Travelust");

    //User click on login/register button
    cy.get("#login").click();

    //User Enters login details
    cy.get("#email-field").type(testUser.email);
    cy.get("#password-field").type(testUser.password);

    //User Click Login Button
    cy.get("#loginButton").should("exist");
    cy.get("#loginButton").click();
  });

  it("Retrieve Booking Details System Test Case", () => {
    //User navigate to home page
    cy.get(".container").should("contain.text", "Travelust");

    //User click on Menu Button
    cy.contains("button", "MENU").should("exist");
    cy.contains("button", "MENU").click();

    cy.get("#profileButton").should("exist");

    //User click on profile button
    cy.get("#profileButton").click();

    cy.contains("label", "Email:").should("exist");
    cy.contains("span", testUser.email).should("exist");
    cy.contains("label", "Salutation:").should("exist");
    cy.contains("label", "First Name:").should("exist");
    cy.contains("label", "Last Name:").should("exist");
    cy.contains("label", "Phone Number:").should("exist");

    //Make sure each row of booking ids are present
    cy.contains("td", mockBookingData.email).should("exist");
    cy.contains("td", mockBookingData.roomID).should("exist");
    cy.contains("td", mockBookingData.destinationID).should("exist");
    cy.contains("td", mockBookingData.hotelID).should("exist");
    cy.contains("td", mockBookingData.messageToHotel).should("exist");

    cy.log("Retrieve Booking Details Use Case Test Completed");
  });

  after(() => {
    let testID = null;
    cy.request({
      method: "GET",
      url: "http://localhost:5555/api/user/profile",
      // Ensure cookies are sent with the request
      withCredentials: true,
    })
      .then((response) => {
        // Check the status of the response
        testID = response.body._id;
        expect(response.status).to.eq(200);
      })
      .then((response) => {
        cy.request({
          method: "DELETE",
          url: `http://localhost:5555/api/user/${testID}`,
        }).then((response) => {
          // Assert that the deletion was successful
          expect(response.status).to.be.oneOf([200, 204]);
          cy.log("User deleted successfully.");
        });
      });
  });
});
