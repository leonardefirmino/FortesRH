const senha = '#senha'
const novaSenha = '#novaSenha'
const confSenha = '#confSenha'
const gravar = '.btnGravar'
const enviar = '.btnEnviar'
const link = '.linkbranco'
const cpfColaborador = '#cpf'
const esquecisenha = '#cpf'
const url = '/acesso/usuario/prepareUpdateSenhaUsuario.action'

export class AlteraSenhaPage {
    navigate() {
        cy.visit(url)
    }

    with(password, newPass, confPass) {
        cy.get(senha).clear().type(password)
        cy.get(novaSenha).clear().type(newPass)
        cy.get(confSenha).clear().type(confPass)
        cy.get(gravar).click()
    }

    forgotPassword(cpf) {
        cy.get(link).click()
        cy.get(cpfColaborador).clear().type(cpf)
        cy.get(enviar).click()
    }

    forgotPasswordExterno(cpf) {
        cy.get(link).click()
        cy.get(cpfColaborador).clear().type(cpf)
        cy.get(enviar).click()
    }

}