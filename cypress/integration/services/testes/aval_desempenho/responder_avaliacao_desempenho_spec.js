import '../../../../../cypress.json'
import * as util from '../../../../support/util'
import { LoginPage } from '../../pages/loginPage'
import { ResponderAvaliacaoDesempenhoPage } from '../../pages/responder_avaliacaoPage'

describe('Avaliação de Desempenho', () => {
    const loginPage = new LoginPage()
    const responderavalDesempenhoPage = new ResponderAvaliacaoDesempenhoPage()
   

    beforeEach('', () => {
        responderavalDesempenhoPage.navigate()
        loginPage.loggedIn('homolog', '1234')
    })

    it('Teste', () => {
        cy.log('Teste')
    })
}) 