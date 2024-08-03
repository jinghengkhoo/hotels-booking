context("Login Use Case System Testing", () => {
  const testUser = {
    email: "testuser@example.com",
    password: "password123!",
  };

  beforeEach(() => {
    cy.visit("http://localhost:5173/");
    cy.request("POST", "http://localhost:5555/api/user/register", {
      email: testUser.email,
      password: testUser.password,
    }).then((response) => {
      expect(response.status).to.eq(200); // Ensure the user is created successfully
    });
  });

  it("Login System Test Case", () => {
    //User navigate to home page
    cy.get(".container").should("contain.text", "Travelust");

    //User click on login/register button
    cy.get("#login").should("exist");
    cy.get("#login").click();

    cy.get("#loginPage").should("contain.text", "Login with your email");

    //User Enters login details
    cy.get("#email-field")
      .type(testUser.email)
      .should("have.value", testUser.email);
    cy.get("#password-field")
      .type(testUser.password)
      .should("have.value", testUser.password);

    //User Click Login Button
    cy.get("#loginButton").should("exist");
    cy.get("#loginButton").click();
    cy.on("window:alert", (alertText) => {
      expect(alertText).to.equal("Login successful!");
      return true; // Simulate clicking "OK"
    });

    //Output - Home Page with email header
    cy.get("#userEmail").should("have.text", testUser.email);

    cy.log("Login Use Case Test Completed");
  });

  it("Login System Test Case (Alternative Flow)", () => {
    //User navigate to home page
    cy.get(".container").should("contain.text", "Travelust");

    //User click on login/register button
    cy.get("#login").should("exist");
    cy.get("#login").click();

    cy.get("#loginPage").should("contain.text", "Login with your email");

    //User Enters login details
    cy.get("#email-field").type("error@mail.com");
    cy.get("#password-field").type("123");

    //User Click Login Button
    cy.get("#loginButton").click();
    cy.get("#errorMessage").should("have.text", "Invalid Account Details");
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
