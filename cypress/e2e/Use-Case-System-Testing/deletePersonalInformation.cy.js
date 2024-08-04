context("Delete Personal Information Use Case System Testing", () => {
  const testUser = {
    email: "testuser@example.com",
    password: "password123!",
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

    //login to testuser account
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
  });

  it("Delete Personal Information System Test Case", () => {
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

    //User click on delete account
    cy.contains("button", "Delete Account").should("exist");
    cy.contains("button", "Delete Account").click();

    //User click on confirm delete
    cy.contains("button", "Cancel").should("exist");
    cy.contains("button", /^Delete$/).should("exist");
    cy.contains("button", /^Delete$/).click();

    cy.get(".container").should("contain.text", "Travelust");

    cy.log("Delete Personal Information Use Case Test Completed");
  });
});
