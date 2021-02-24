// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'
import './gui_commands'
import './data-base_commands'
import 'cypress-file-upload'
require('cypress-plugin-tab')
require('cypress-xpath')

// Alternatively you can use CommonJS syntax:
// require('./commands')

Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
})

beforeEach('', () => {
    cy.reload_db()
    cy.login()
    cy.clicaBotaoEntendi()
})

afterEach('', () => {    
    cy.clearcookies()
})