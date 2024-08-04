context("Create Booking Use Case System Testing", () => {
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
    creditCardInfo: 424242,
    billingAddressOne: "123 Main St",
    billingAddressTwo: "Apt 4B",
    billingAddressPostalCode: 552233,
  };

  const incompleteUser = {
    email: "incompleteuser@example",
    phoneNumber: 1234,
    billingAddressPostalCode: 123,
  };

  before(() => {
    cy.visit("http://localhost:5173/");

    //User navigate to home page
    cy.get(".container").should("contain.text", "Travelust");
    cy.get(".react-datepicker__input-container > button").first().click();
    cy.get(".react-datepicker__input-container > button").last().click();

    //User select destination from dropdown
    cy.get('[data-testid="destination"]')
      .should("have.value", "Singapore")
      .click();
    cy.contains("li", "Singapore, Singapore").click();

    cy.get(".react-datepicker__input-container > input")
      .first()
      .type("2025-08-10");
    cy.get(".react-datepicker__input-container > input")
      .last()
      .type("2025-08-20");

    //User click on search button
    cy.get('[data-testid="submit-button"]').click();
    cy.url().should("include", "/hotels");

    //User clicks on Hotel check availability
    cy.contains("button", "Check availability", { timeout: 20000 })
      .first()
      .click();
  });

  it("Create Booking System Test Case", () => {
    //User clicks on reserve button to navigate to booking page
    cy.contains("button", "Reserve").should("exist");
    cy.contains("button", "Reserve", { timeout: 20000 }).first().click();

    cy.contains("div", "Your Booking Details").should("exist");
    cy.contains("div", "Your Price Summary").should("exist");

    //User enters guest information
    cy.get('input[name="salutation"]').should("exist");
    cy.get('input[name="salutation"]').clear().type(mockBookingData.salutation);

    cy.get('input[name="emailAddress"]').should("exist");
    cy.get('input[name="emailAddress"]').clear().type(incompleteUser.email);

    cy.get('input[name="firstName"]').should("exist");
    cy.get('input[name="firstName"]').clear().type(mockBookingData.firstName);

    cy.get('input[name="lastName"]').should("exist");
    cy.get('input[name="lastName"]').clear().type(mockBookingData.lastName);

    cy.get('input[name="phoneNumber"]').should("exist");
    cy.get('input[name="phoneNumber"]')
      .clear()
      .type(incompleteUser.phoneNumber);

    cy.get('input[name="adults"]').should("exist");
    cy.get('input[name="adults"]').clear().type(mockBookingData.adults);

    cy.get('input[name="children"]').should("exist");
    cy.get('input[name="children"]').clear().type(mockBookingData.children);

    cy.get('textarea[name="messageToHotel"]').should("exist");
    cy.get('textarea[name="messageToHotel"]')
      .clear()
      .type(mockBookingData.messageToHotel);

    cy.getWithinIframe('[name="cardnumber"]').type("4242424242424242");
    cy.getWithinIframe('[name="exp-date"]').type("1232");
    cy.getWithinIframe('[name="cvc"]').type("987");
    cy.getWithinIframe('[name="postal"]').type("12345");

    cy.get('input[name="billingAddressOne"]').should("exist");
    cy.get('input[name="billingAddressOne"]')
      .clear()
      .type(mockBookingData.billingAddressOne);

    cy.get('input[name="billingAddressTwo"]').should("exist");
    cy.get('input[name="billingAddressTwo"]')
      .clear()
      .type(mockBookingData.billingAddressTwo);

    cy.get('input[name="billingAddressPostalCode"]').should("exist");
    cy.get('input[name="billingAddressPostalCode"]')
      .clear()
      .type(incompleteUser.billingAddressPostalCode);

    cy.get('input[type="checkbox"]').should("exist");
    cy.get('input[type="checkbox"]').check();

    //User enter incorrect email
    cy.get("button").should("have.text", "Make Booking").click();
    cy.get("#errorMessage").should(
      "have.text",
      "Please Enter a Valid Email Address"
    );
    cy.get('input[name="emailAddress"]').clear().type(mockBookingData.email);

    //User enter incorrect phone number
    cy.get("button").should("have.text", "Make Booking").click();
    cy.get("#errorMessage").should(
      "have.text",
      "Please Enter a Valid Singapore Number"
    );
    cy.get('input[name="phoneNumber"]')
      .clear()
      .type(mockBookingData.phoneNumber);

    //User enter incorrect Postal Code
    cy.get("button").should("have.text", "Make Booking").click();
    cy.get("#errorMessage").should(
      "have.text",
      "Please Enter a Valid Postal Code"
    );
    cy.get('input[name="billingAddressPostalCode"]').should("exist");
    cy.get('input[name="billingAddressPostalCode"]')
      .clear()
      .type(mockBookingData.billingAddressPostalCode);

    //User clicks on make booking button
    cy.get("button").should("have.text", "Make Booking").click();
    cy.on("window:alert", (alertText) => {
      expect(alertText).to.equal("Booking successful!");
      return true; // Simulate clicking "OK"
    });

    //Wait for booking to update
    cy.wait(10000);
    cy.url().should("eq", "http://localhost:5173/");
  });
});
