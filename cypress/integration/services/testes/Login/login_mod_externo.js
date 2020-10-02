import '../../../../../cypress.json'
import { ModuloExternoPage } from '../../pages/moduloExternoPage'
import { MessagePage } from '../../pages/messagePage'

describe('Tentativas de Login no Módulo Externo', () => {
    const externoPage = new ModuloExternoPage()
    const messagePage = new MessagePage()

    beforeEach('', () => {
        cy.reload_db()
        externoPage.navigate()
    })

    it('Captcha Ativo', () => {
        cy.exec_sql('update parametrosdosistema set utilizarcaptchanomoduloexterno = true')
        cy.inserecandidato('Candidato 01')
        externoPage.loggedIn('39210359372', '1234')
        messagePage.warningMsgExterno()
    })

    it('Acessar modulo externo com login e senha com 2 candidatos com mesmo CPF', () => {
        cy.inserecandidato('Candidato 01')
        cy.inserecandidato('Candidato 02')
        externoPage.loggedIn('39210359372', '1234')
        messagePage.welcomeExterno()
    })

    it('Acessar modulo externo - Senha Inválida', () => {
        cy.inserecandidato('Candidato 01')
        externoPage.loggedIn('39210359372', '123456')
        messagePage.popUpMessage('Senha não confere.')
    })

    it('Acessar modulo externo - Exige Aceite LGPD', () => {
        cy.inserecandidato('Candidato 01')
        cy.exec_sql("update parametrosdosistema set exigiraceitepsi = true")
        cy.exec_sql("update parametrosdosistema set politicaseguranca = 'Teste'")
        externoPage.loggedIn('39210359372', '1234')
        messagePage.dialogMessageLGPD('Termo de Privacidade e Política de Segurança')
        messagePage.continuarButton()
        messagePage.popUpMessage('Você precisa aceitar o Termo de Privacidade e Política de Segurança.')
        externoPage.checkLGPD()
        messagePage.continuarButton()
    })

})