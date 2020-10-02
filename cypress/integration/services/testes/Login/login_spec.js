import '../../../../../cypress.json'
import { LoginPage } from '../../pages/loginPage'
import { MessagePage } from '../../pages/messagePage'

describe('Tentativas de Login', () => {
    const loginPage = new LoginPage()
    const messagePage = new MessagePage()

    beforeEach('', () => {
        cy.reload_db()
        loginPage.navigate()
    })

    context('Login com Sucesso', () => {

        it('Válido', () => {
            loginPage.with('SOS', '1234')
            messagePage.welcomeMessage('Bem-vindo(a)')
        })

        it('Valida Remprot', () => {
            cy.exec_sql("update parametrosdosistema set proximaversao = '2014-01-01'")
            loginPage.with('SOS', '1234')
            messagePage.welcomeMessage('Bem-vindo(a)')
        })

        it('Captcha Ativo', () => {
            cy.exec_sql('update parametrosdosistema set utilizarcaptchanologin = true')
            cy.reload()
            cy.get('iframe').should('be.visible')
            loginPage.with('SOS', '1234')
            messagePage.welcomeMessage('Bem-vindo(a)')
        })
    })

    context('Login Sem Sucesso', () => {

        it('Senha inválida', () => {
            loginPage.with('SOS', '12534')
            messagePage.errorMessageLogin('Máquina sem autorização de acesso')
        })

        it('Usuário inválido', () => {
            loginPage.with('---', '12534')
            messagePage.errorMessageLogin('Usuário sem permissão de acesso')
        })

        it('Captcha Ativo', () => {
            cy.exec_sql('update parametrosdosistema set utilizarcaptchanologin = true;')
            loginPage.with('usuarioteste', '1234')
            messagePage.errorMessageLogin('Usuário sem permissão de acesso')
        })

    })

    context('Outras Validações de Login', () => {
        it('Usuario Expirado', () => {
            cy.exec_sql("update usuario set expiracao = '01/01/2000' where login = 'homolog'")
            loginPage.with('homolog', '1234')
            messagePage.errorMessageLogin('Usuário sem permissão de acesso')
        })

        it('Sessão Expirada', () => {
            cy.exec_sql("update parametrosdosistema set sessiontimeout = 1")
            loginPage.with('homolog', '1234')
            messagePage.popUpMessage('Sua sessão expirou.')
        })

        it('Primeiro Acesso', () => {
            cy.exec_sql("update parametrosdosistema set exibiralteracaoprimeiroacesso = true")
            loginPage.with('homolog', '1234')
            loginPage.changePassword('123456')
            messagePage.successMsg('A senha foi alterada com sucesso!')
        })
    })
})