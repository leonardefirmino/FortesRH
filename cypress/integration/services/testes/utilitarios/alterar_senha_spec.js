import '../../../../../cypress.json'

describe('Alteração de Senha de Usuário', () => {
    
    beforeEach('', () => {
        cy.insereUsuarioComEmpregado('helena')
        cy.logout()
    })

    it('Alterar Senha de Usuario não associado a empregado', () => {  
        cy.loginWith('SOS', '1234')
        cy.alterarSenhaPagina()
        cy.validaMensagemAlerta('Sua conta de usuário não está vinculada à um talento.')
    })


    it('Alterar Senha com sucesso', () => {
        cy.loginWith('helena', '1234')
        cy.alterarSenha('1234', '123456', '123456')
        cy.popUpMessage('Sua senha foi alterada com sucesso.')
    })

    it('Alterar Senha sem sucesso - Senha Atual incorreta', () => {
        cy.loginWith('helena', '1234')
        cy.alterarSenha('1235', '123456', '123456')
        cy.popUpMessage('A senha informada não confere com a senha do seu login.')
    })

    it('Alterar Senha sem sucesso - Confirmação de Senha incorreta', () => {
        cy.loginWith('helena', '1234')
        cy.alterarSenha('1234', '12346', '123456')
        cy.popUpMessage('A senha não foi confirmada corretamente.')
    })

    it('Alterar Senha de Usuário - Valida Campos Vazios', () => {
        cy.loginWith('helena', '1234')
        cy.alterarSenha('', '', '')
        cy.popUpMessage('Preencha os campos indicados.')
    })
})
