Cypress.Commands.add("exec_sql", (...queries) => {
    return cy.task('query', queries)
})

Cypress.Commands.add("alteraEmpresa", (company) => {
    cy.exec_sql("select * from empresa where nome = '"+ company +"'").then(({ rows }) => rows[0].id).then(empresaId => {
        cy.visit('index.action?empresaId='+ empresaId)
    });
})

Cypress.Commands.add('clearcookies', () => {
    if (Cypress.browser.name === 'firefox') {
        cy.getCookies().then((cookies) => cookies.forEach(cookie => cy.clearCookie(cookie.name)));
    }
})

// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })