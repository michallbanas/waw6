/// <reference types="Cypress" />
import Jabber from 'jabber'

beforeEach(() => {
    cy.visit('/savingscalculator.php')
})
it('should calculate interest income', () => {
    enterSavingsData('Fellowship investment group', 25000, 45)
    cy.get('[data-test=calculate]').click()
    cy.contains('Calculate').click()
    cy.get('div.result')
        .find('div')
        .find('p')
        .should('not.be.empty')
        .and('contain.text', 'kr')
})
it('should display correct email in request detail', () => {
    const jabber = new Jabber();
    const email = jabber.createEmail("kiwi.com")
    const investmentData = {
        fund: 'Handelsbanken Aktiv 100',
        investment: 15000,
        years: 20,
    }
    enterSavingsData(investmentData.fund, investmentData.investment, investmentData.years)
    cy.get('#emailInput').type(email)
    cy.get('[data-test=apply-for-saving]').click()
    cy.get('ul.saving-list')
        .find('li')
        .eq(0)
        .contains('detail')
        .click()
    cy.get('div.modal-body')
        .should('be.visible')
        .contains('Contact')
        .find('span')
        .should('have.text', email)
})

function enterSavingsData(fund, investment, years) {
    cy.get('#fundSelect').select(fund)
    cy.get('#oneTimeInvestmentInput').type(investment)
    cy.get('#yearsInput').type(years)
}