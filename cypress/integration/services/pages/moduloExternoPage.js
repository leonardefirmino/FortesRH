export class ModuloExternoPage {

    navigate() {
        cy.visit('/externo/prepareLogin.action?empresaId=1')
    }

    queroMeCadastrar() {
        cy.get('[href="prepareInsert.action?moduloExterno=true&empresaId=1&solicitacao.id="]').click()
    }

    forgotPassword() {
        cy.get('.linkbranco').click()
    }

    loggedIn(user, password) {
        cy.get('#cpfRH').clear().type(user)
        cy.get('#senhaRH').clear().type(password)
        cy.get('#empresa').should('not.be.null')
        cy.get('.btnEntrar').click()
    }

    checkLGPD(){
        cy.get('#termo-privacidade-politica-seguranca-input').check().and('be.checked')
    }
}

