import '../../../../../cypress.json'
import * as util from '../../../../support/util'
import { LoginPage } from '../../pages/loginPage'

describe('Tentativas de Login', () => {
    const loginPage = new LoginPage()

    beforeEach('', () => {
        loginPage.navigate()
    })

    context('Login com Sucesso', () => {

        it('Válido', () => {
            loginPage.with('SOS', '1234')
            util.welcomeMessage('Bem-vindo(a)')
        })

        it('Valida Remprot', () => {
            cy.exec_sql("update parametrosdosistema set proximaversao = '2021-01-01'")
            loginPage.with('homolog', 's3creT-p@ssw0rd')
            util.welcomeMessage('Bem-vindo(a)')
        })
    })

    context('Login Sem Sucesso', () => {

        it('Senha inválida', () => {
            loginPage.with('SOS', '12534')
            util.errorMessageLogin('Usuário sem permissão de acesso')
        })

        it('Usuário inválido', () => {
            loginPage.with('---', '12534')
            util.errorMessageLogin('Usuário sem permissão de acesso')
        })

        it('Captcha Ativo', () => {
            cy.exec_sql('update parametrosdosistema set utilizarcaptchanologin = true;')
            loginPage.with('usuarioteste', '1234')
            util.errorMessageLogin('Usuário sem permissão de acesso')
        })

    })

    context('Outras Validações de Login', () => {
        it('Usuario Expirado', () => {
            cy.exec_sql("update usuario set expiracao = '01/01/2000' where login = 'homolog'")
            loginPage.with('homolog', 's3creT-p@ssw0rd')
            util.errorMessageLogin('Usuário sem permissão de acesso')
        })

        it('Sessão Expirada', () => {
            cy.exec_sql("update parametrosdosistema set sessiontimeout = 1")
            loginPage.with('homolog', 's3creT-p@ssw0rd')
            util.popUpMessage('Sua sessão expirou.')
        })

        it('Primeiro Acesso', () => {
            cy.insereUsuario('usu_teste')
            cy.exec_sql("update parametrosdosistema set exibiralteracaoprimeiroacesso = true")
            loginPage.with('usu_teste', '1234')
            loginPage.changePassword('123456')
            util.successMsg('A senha foi alterada com sucesso!')
        })
    })
})