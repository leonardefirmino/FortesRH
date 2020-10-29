import '../../../../../cypress.json'
import * as util from '../../../../support/util'
import { LoginPage } from '../../pages/loginPage'
import { MessagePage } from '../../pages/mensagemPage'

describe('Funcionalidade de Envio de Mensagens para Usuários', () => {
    const loginPage = new LoginPage()
    const mensagemPage = new MessagePage()

    const mensagem = 'Mensagem Teste'
    const mensagemVazia = ' '


    beforeEach('', () => {
        cy.reload_db()
        loginPage.navigate()
        loginPage.loggedIn('homolog', '1234')
        mensagemPage.navigate()
    })

    it('Envio de Mensagem', () => {
        mensagemPage.enviaMensagem(mensagem)
        util.successMsg('Mensagem enviada com sucesso')
        //Verifica Mensagem na tela Inicial
        cy.get('#logoDiv').click()
        cy.contains(mensagem)
    })

    it('Tentativa de Envio de Mensagem Vazia', () => {
        mensagemPage.enviaMensagem(mensagemVazia)
        util.popUpMessage('Preencha os campos indicados.')
    })
})