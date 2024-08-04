context("Register Use Case System Testing", () => {
  const existingUser = {
    name: "existinguser",
    email: "existinguser@example.com",
    password: "password123!",
    confirmPassword: "password123!",
  };

  const testUser = {
    name: "testuser",
    email: "testuser@example.com",
    password: "password123!",
    confirmPassword: "password123!",
  };

  const incompleteUser = {
    name: "incompleteuser",
    email: "incompleteuser@example",
    password: "password123",
    confirmPassword: "password",
  };

  before(() => {
    cy.visit("http://localhost:5173/");

    cy.request("POST", "http://localhost:5555/api/user/register", {
      email: existingUser.email,
      password: existingUser.password,
    }).then((response) => {
      expect(response.status).to.eq(200); // Ensure the user is created successfully
    });
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

    cy.log("Alternative Flow - Existing User");
    //User Enters incomplete details for registration
    cy.get("#name-field-input")
      .clear()
      .type(incompleteUser.name)
      .should("have.value", incompleteUser.name);
    cy.get("#email-field-input")
      .clear()
      .type(incompleteUser.email)
      .should("have.value", incompleteUser.email);
    cy.get("#password-field-input")
      .clear()
      .type(incompleteUser.password)
      .should("have.value", incompleteUser.password);
    cy.get("#password-field-confirm-input")
      .clear()
      .type(incompleteUser.confirmPassword)
      .should("have.value", incompleteUser.confirmPassword);

    //User enters invalid email
    cy.get("#registerButton").click();
    cy.get("#errorMessage").should("have.text", "Invalid email format");

    //User enters valid email
    cy.get("#name-field-input")
      .clear()
      .type(existingUser.name)
      .should("have.value", existingUser.name);

    cy.get("#email-field-input")
      .clear()
      .type(existingUser.email)
      .should("have.value", existingUser.email);

    //User enters invalid password
    cy.get("#registerButton").click();
    cy.get("#errorMessage").should(
      "have.text",
      "Password must be at least 8 characters long and include a number and a special character"
    );

    //User enters valid password
    cy.get("#password-field-input")
      .clear()
      .type(existingUser.password)
      .should("have.value", existingUser.password);

    //User enters invalid confirm password
    cy.get("#registerButton").click();
    cy.get("#errorMessage").should("have.text", "Passwords do not match");

    //User enters valid confirm password
    cy.get("#password-field-confirm-input")
      .clear()
      .type(existingUser.confirmPassword)
      .should("have.value", existingUser.confirmPassword);

    //User enters existing user details
    cy.get("#registerButton").click();
    cy.get("#errorMessage").should(
      "have.text",
      "An error occurred during registration"
    );

    cy.log("Correct Registration Details");
    //User Enters registration details
    cy.get("#name-field-input")
      .clear()
      .type(testUser.name)
      .should("have.value", testUser.name);
    cy.get("#email-field-input")
      .clear()
      .type(testUser.email)
      .should("have.value", testUser.email);
    cy.get("#password-field-input")
      .clear()
      .type(testUser.password)
      .should("have.value", testUser.password);
    cy.get("#password-field-confirm-input")
      .clear()
      .type(testUser.confirmPassword)
      .should("have.value", testUser.confirmPassword);

    //User enters registration button
    cy.get("#registerButton").should("exist");
    cy.get("#registerButton").click();
    cy.get("#errorMessage").should(
      "have.text",
      "An error occurred during registration"
    );

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

    const user = {
      email: existingUser.email,
      password: existingUser.password,
    };
    cy.request({
      method: "POST",
      url: "http://localhost:5555/api/user/login", // The endpoint you want to hit
      body: user, // The user object containing email and password
      withCredentials: true, // Ensure credentials are sent with the request
    })
      .then((response) => {
        // You can add assertions here to check the response
        expect(response.status).to.eq(200); // Ensure the login was successful
      })
      .then((response) => {
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
});
