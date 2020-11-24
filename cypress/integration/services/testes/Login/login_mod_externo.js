import '../../../../../cypress.json'
import * as util from '../../../../support/util'
import { ModuloExternoPage } from '../../pages/moduloExternoPage'

describe('Tentativas de Login no Módulo Externo', () => {
    const externoPage = new ModuloExternoPage()

    beforeEach('', () => {
        externoPage.navigate()
    })

    it('Captcha Ativo', () => {
        cy.exec_sql('update parametrosdosistema set utilizarcaptchanomoduloexterno = true')
        cy.inserecandidato('Candidato 01')
        externoPage.loggedIn('34425164555', '1234')
        util.warningMsgExterno()
    })

    it('Acessar modulo externo com login e senha com 2 candidatos com mesmo CPF', () => {
        cy.inserecandidato('Candidato 01')
        cy.inserecandidato('Candidato 02')
        externoPage.loggedIn('34425164555', '1234')
        util.welcomeExterno('Bem vindo(a)')
    })

    it('Acessar modulo externo - Senha Inválida', () => {
        cy.inserecandidato('Candidato 01')
        externoPage.loggedIn('34425164555', '123456')
        util.popUpMessage('Senha não confere.')
    })

    it('Acessar modulo externo - Exige Aceite LGPD', () => {
        cy.inserecandidato('Candidato 01')
        cy.exec_sql("update parametrosdosistema set exigiraceitepsi = true")
        cy.exec_sql("update parametrosdosistema set politicaseguranca = 'Teste'")
        externoPage.loggedIn('34425164555', '1234')
        util.dialogMessageLGPD('Termo de Privacidade e Política de Segurança')
        util.continuarButton()
        util.popUpMessage('Você precisa aceitar o Termo de Privacidade e Política de Segurança.')
        externoPage.checkLGPD()
        util.continuarButton()
    })
})