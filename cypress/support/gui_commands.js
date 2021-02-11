Cypress.Commands.add('login', () => {
    cy.visit('/login.action?')
    cy.get('input[placeholder = "Usuário"]').should('be.enabled').clear().type(Cypress.env('user_name'))
    cy.get('input[placeholder = "Senha"]').should('be.enabled').clear().type(Cypress.env('user_password'))
    cy.get('#empresa').should('be.visible').select(Cypress.env('company'))
    cy.get('#entrar').should('be.visible').click()

    cy.url().should('be.equal', `${Cypress.config("baseUrl")}/index.action`)

    cy.get('.nomeUsuario').should('be.visible').and('include.text', Cypress.env('user_name'))
})

Cypress.Commands.add('loginWith', (user, pass) => {
    cy.get('input[placeholder = "Usuário"]').should('be.enabled').clear().type(user)
    cy.get('input[placeholder = "Senha"]').should('be.enabled').clear().type(pass)
    cy.get('#entrar').should('be.visible').click()

    cy.get('.nomeUsuario').should('be.visible').and('include.text', user)
})

Cypress.Commands.add('clicaBotaoEntendi', () => {
    switch (cy.get('.done').click({ multiple: true, force: true })) {
        case 0:
            cy.get('.done').should('be.visible')
            break;
    }
    cy.get('.done').should('not.exist')
})

Cypress.Commands.add('popUpMessage', (text) => {
    cy.get('#popup_message').then(($popup) => {
        if ($popup.text().includes(text)) {
            cy.get('#popup_ok').click()
        } else {
            console.log('erro')
        }
    })
    cy.get('#popup_message').should('not.exist')
})

Cypress.Commands.add('clicaBotaoContinuar', () => {
    cy.get(':nth-child(1) > .ui-button-text').click()
})

Cypress.Commands.add('logout', () => {
    cy.get('.sair').click()
    cy.url()
        .should('be.equal', `${Cypress.config("baseUrl")}/login.action`)
})

Cypress.Commands.add('validaEmpresaLogada', (text) => {
    cy.get('#userDiv').should('include.text', text)
})

Cypress.Commands.add('validaMensagemSucesso', (message) => {
    cy.get('#successMsg').should('include.text', message)
})

Cypress.Commands.add('validaMensagemAlerta', (message) => {
    cy.get('#warningMsg').should('include.text', message)
})

Cypress.Commands.add('validaMensagemInformacao', (message) => {
    cy.get('#infoMsg').should('include.text', message)
})

Cypress.Commands.add('validaMensagemErro', (message) => {
    cy.get('#errorMsg').should('include.text', message)
})

Cypress.Commands.add('alterarSenhaPagina', () => {
    cy.visit('/acesso/usuario/prepareUpdateSenhaUsuario.action')
    cy.clicaBotaoContinuar()
})

Cypress.Commands.add('alterarSenha', (password, newPass, confPass) => {
    cy.alterarSenhaPagina()
    if (password != '' || newPass != '' || confPass != '') {
        cy.get('#senha').clear().type(password)
        cy.get('#novaSenha').clear().type(newPass)
        cy.get('#confSenha').clear().type(confPass)
        cy.get('#btnGravar').click()
    } else {
        cy.get('#btnGravar').click()
    }
})