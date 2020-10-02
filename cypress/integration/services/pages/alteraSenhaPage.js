export class AlteraSenhaPage {

    with(password, newPass, confPass) {
        cy.get('#senha').clear().type(password)
        cy.get('#novaSenha').clear().type(newPass)
        cy.get('#confSenha').clear().type(confPass)
        cy.get('.btnGravar').click()
    }

    forgotPassword(cpf) {
        cy.get('#esqueciSenha').click()
        cy.get('#cpf').clear().type(cpf)
        cy.get('.btnEnviar').click()
    }

    forgotPasswordExterno(cpf) {
        cy.get('.linkbranco').click()
        cy.get('#cpf').clear().type(cpf)
        cy.get('.btnEnviar').click()
    }

}