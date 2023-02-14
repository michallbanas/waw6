// <reference types="Cypress" />
function addRyan() {
  cy.get("#addRyan").click()
}

describe("Testing Gosslingator page", () => {
  before(() => {
    cy.log("Spustím sa iba pred prvým testom")
    // komentár
  })

  beforeEach(() => {
    cy.log("Spustím sa pred každým testom")
    cy.visit("/gosslingator.php")
  })

it("should click on Ryan twice", () => {  
  cy.log("Klikni dva krát na button Ryana")
  addRyan()
  addRyan()
  cy.log("Dva buttony sú viditeľné")
  cy.get("img").should("be.visible").and("have.length", 2)
})

it("checking text inside of counter", () => {
  cy.get("button#addRyan").click()
  // # id ( mriežka znamená id)
  // . class (bodka znamená class)
  cy.get("div.ryan-counter").find("h2").should("have.text", "1")
  cy.get("div.ryan-counter").find("h3").should("have.text", "ryan")

  // DRY - Dont repeat yourself - neopakuj sa keď nemusíš
  cy.get(".ryan-counter").within(() => {
    cy.get("h2").should("have.text", "1")
    cy.get("h3").should("have.text", "ryan")
  })
})

it("uloha", () => {
  cy.get("#removeRyan").should("be.disabled")
  cy.get("h1").should("be.visible").and("have.text", "Goslingate me")
  addRyan()
  addRyan()
  cy.get("img").should("have.length", 2)
  cy.get("#removeRyan").should("be.enabled")
  })
})

/* 
Uloha:
1. Overiť text v oboch buttonoch
2. Pridať 1 ryana a overiť, že oba buttony sú enabled
Bonusová úloha: Overiť, že title (nie h1), má text: Gosslingate me!
*/
