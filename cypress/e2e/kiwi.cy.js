// <reference types="Cypress" />

describe("Kiwi - search", () => {
    beforeEach(() => {
        window.localStorage.setItem("bookingcom_extension_default", "false")
        cy.setCookie("__kwc_agreed", "true")
        cy.visit("https://www.kiwi.com/en/")
    })

  it("Searching a flight to Barcelona", () => {
    cy.get("[data-test='SearchPlaceField-destination']").type("Barcelona", { delay: 300})
    cy.get("[data-test='PlacePickerRow-wrapper']")
        .first()
        .should("contain.text", "Barcelona")
        .click()
    cy.get("[data-test='PlacePickerInputPlace']").last().should("contain.text", "Barcelona")
    cy.get("[data-test='LandingSearchButton']")
        .should("be.visible")
        .and("have.text", "Search")
        .and("have.css", "background-color", "rgb(0, 169, 145)")
        .click()
    cy.get("[data-test='ResultCardWrapper']").should("be.visible")
    cy.get("[data-test='ResultCardPrice']").first().should("be.visible")
  })  

  it("Backend - checking results", () => {
    cy.get("[data-test='SearchPlaceField-destination']").type("London", { delay: 300})
    cy.get("[data-test='PlacePickerRow-wrapper']")
        .first()
        .should("contain.text", "London")
        .click()

    cy.intercept("**?featureName=SearchReturnItinerariesQuery").as("return")

    cy.get("[data-test='LandingSearchButton']").should("be.visible").and("have.text", "Search").click()
    cy.wait("@return")
  })

  it("Backend - status code 500", () => {
    cy.get("[data-test='SearchPlaceField-destination']").type("London", { delay: 300})
    cy.get("[data-test='PlacePickerRow-wrapper']")
        .first()
        .should("contain.text", "London")
        .click()

    cy.intercept("**?featureName=SearchReturnItinerariesQuery", { statusCode: 500 }).as("return")

    cy.get("[data-test='LandingSearchButton']").should("be.visible").and("have.text", "Search").click()
    cy.wait("@return")
    cy.contains("Sorry, we're having some issues. Try reloading the page.").should("be.visible")
  })

  it("Backend - no results", () => {
    cy.get("[data-test='SearchPlaceField-destination']").type("London", { delay: 300})
    cy.get("[data-test='PlacePickerRow-wrapper']")
        .first()
        .should("contain.text", "London")
        .click()

    cy.intercept("**?featureName=SearchReturnItinerariesQuery", []).as("return")

    cy.get("[data-test='LandingSearchButton']").should("be.visible").and("have.text", "Search").click()
    cy.wait("@results")
    cy.get("[data-test='ResultList-results']").should("contain.text", "We couldn't find your trip.")
    
  })
})