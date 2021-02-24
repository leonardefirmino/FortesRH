import '../../../../../cypress.json'

describe('Tentativas de Login', () => {

    beforeEach('', () => {
        cy.logout()
    })

    context('Login com Sucesso', () => {

        it('Válido', () => {
            cy.loginWith('SOS', '1234')
            cy.validaMensagemBoasVindas('Bem-vindo(a)')
        })

        it('Valida Remprot', () => {
            cy.exec_sql("update parametrosdosistema set proximaversao = '2021-01-01'")
            cy.loginWith(Cypress.env('user_name'), Cypress.env('user_password'))
            cy.validaMensagemBoasVindas('Bem-vindo(a)')
        })
    })

    context('Login Sem Sucesso', () => {

        it('Senha inválida', () => {
            cy.loginWith('SOS', '12534')
            cy.validaMensagemErroLogin('Usuário sem permissão de acesso')
        })

        it('Usuário inválido', () => {
            cy.loginWith('---', '12534')
            cy.validaMensagemErroLogin('Usuário sem permissão de acesso')
        })

        it('Captcha Ativo', () => {
            cy.exec_sql('update parametrosdosistema set utilizarcaptchanologin = true;')
            cy.loginWith('usuarioteste', '1234')
            cy.validaMensagemErroLogin('Usuário sem permissão de acesso')
        })

    })

    context('Outras Validações de Login', () => {
        it('Usuario Expirado', () => {
            cy.exec_sql("update usuario set expiracao = '01/01/2000' where login = 'homolog'")
            cy.loginWith(Cypress.env('user_name'), Cypress.env('user_password'))
            cy.validaMensagemErroLogin('Usuário sem permissão de acesso')
        })

        it('Sessão Expirada', () => {
            cy.exec_sql("update parametrosdosistema set sessiontimeout = 1")
            cy.loginWith(Cypress.env('user_name'), Cypress.env('user_password'))
            cy.popUpMessage('Sua sessão expirou.')
        })

        it('Primeiro Acesso', () => {
            cy.insereUsuario('usu_teste')
            cy.exec_sql("update parametrosdosistema set exibiralteracaoprimeiroacesso = true")
            cy.loginWith('usu_teste', '1234')
            cy.alterarSenhaPrimeiroAcesso('123456')
            cy.validaMensagemSucesso('A senha foi alterada com sucesso!')
        })
    })
})