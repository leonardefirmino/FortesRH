import 'cypress-capybara/add-commands'

Cypress.Commands.add('login', () => {      
    cy.login_Sem_Entendi()

    switch (cy.get('.done').click({ multiple: true, force: true })) {
        case 0:
            cy.get('.done').should('be.visible')
            break;
    }
})

Cypress.Commands.add('login_Sem_Entendi', () => {      
    cy.visit('/login.action?')
    cy.get('input[placeholder = "Usuário"]').clear().type(Cypress.env('user_name'))   
    cy.get('input[placeholder = "Senha"]').clear().type(Cypress.env('user_password')) 
    cy.get('#entrar').should('be.visible').click()

    cy.url()
      .should('be.equal', `${Cypress.config("baseUrl")}/index.action`)
})

Cypress.Commands.add('loggedIn', (user, pass) => {      
    
    cy.visit('/login.action?')
    cy.get('input[placeholder = "Usuário"]').clear().type(user)   
    cy.get('input[placeholder = "Senha"]').clear().type(pass) 
    cy.get('#entrar').should('be.visible').click()

    cy.url()
      .should('be.equal', `${Cypress.config("baseUrl")}/index.action`)
})

Cypress.Commands.add('logout', () => {      
    cy.visit('/logout.action?')
})

Cypress.Commands.add("exec_sql", (...queries) => {
    return cy.task('query', queries)
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