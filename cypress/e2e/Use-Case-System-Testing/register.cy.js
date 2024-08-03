context("Register Use Case System Testing", () => {
  const testUser = {
    name: "testuser",
    email: "testuser@example.com",
    password: "password123!",
    confirmPassword: "password123!",
  };

  beforeEach(() => {
    cy.visit("http://localhost:5173/");
  });

  it("Register System Test Case", () => {
    //User navigate to home page
    cy.get(".container").should("contain.text", "Travelust");

    //User click on login/register button
    cy.get("#login").should("exist");
    cy.get("#login").click();

    cy.get("#loginPage").should("contain.text", "Login with your email");

    //User click on sign up button
    cy.get("#signUpButton").should("exist");
    cy.get("#signUpButton").click();

    //User Enters registration details
    cy.get("#name-field-input")
      .type(testUser.name)
      .should("have.value", testUser.name);
    cy.get("#email-field-input")
      .type(testUser.email)
      .should("have.value", testUser.email);
    cy.get("#password-field-input")
      .type(testUser.password)
      .should("have.value", testUser.password);
    cy.get("#password-field-confirm-input")
      .type(testUser.confirmPassword)
      .should("have.value", testUser.confirmPassword);

    //User click register button
    cy.get("#registerButton").should("exist");
    cy.get("#registerButton").click();
    cy.on("window:alert", (alertText) => {
      expect(alertText).to.equal("Registration successful!");
      return true; // Simulate clicking "OK"
    });

    //Output - Home Page with email header
    cy.get("#userEmail").should("have.text", testUser.email);

    cy.log("Registration Use Case Test Completed");
  });

  it("Registration System Test Case (Alternative Flow)", () => {
    //Create Existing User
    cy.request("POST", "http://localhost:5555/api/user/register", {
      email: testUser.email,
      password: testUser.password,
    }).then((response) => {
      expect(response.status).to.eq(200); // Ensure the user is created successfully
    });

    //User navigate to home page
    cy.get(".container").should("contain.text", "Travelust");

    //User click on login/register button
    cy.get("#login").should("exist");
    cy.get("#login").click();

    cy.get("#loginPage").should("contain.text", "Login with your email");

    //User click on sign up button
    cy.get("#signUpButton").should("exist");
    cy.get("#signUpButton").click();

    //User Enters existing registration details
    cy.get("#name-field-input")
      .type(testUser.name)
      .should("have.value", testUser.name);
    cy.get("#email-field-input")
      .type(testUser.email)
      .should("have.value", testUser.email);
    cy.get("#password-field-input")
      .type(testUser.password)
      .should("have.value", testUser.password);
    cy.get("#password-field-confirm-input")
      .type(testUser.confirmPassword)
      .should("have.value", testUser.confirmPassword);

    //User enters registration button
    cy.get("#registerButton").should("exist");
    cy.get("#registerButton").click();
    cy.get("#errorMessage").should(
      "have.text",
      "An error occurred during registration"
    );

    //User enters invalid email
    cy.get("#name-field-input").clear().type("hello");
    cy.get("#email-field-input").clear().type("hello@gmail");
    cy.get("#registerButton").click();
    cy.get("#errorMessage").should("have.text", "Invalid email format");

    //User enters invalid password
    cy.get("#email-field-input").clear().type("hello@gmail.com");
    cy.get("#password-field-input").clear().type("123456");
    cy.get("#registerButton").click();
    cy.get("#errorMessage").should(
      "have.text",
      "Password must be at least 8 characters long and include a number and a special character"
    );

    //User enters wrong confirmation password
    cy.get("#password-field-input").clear().type("12345678!");
    cy.get("#password-field-confirm-input").clear().type("12345");
    cy.get("#registerButton").click();
    cy.get("#errorMessage").should("have.text", "Passwords do not match");
  });

  afterEach(() => {
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
