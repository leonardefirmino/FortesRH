import '../../../../../cypress.json'
import * as util from '../../../../support/util'
import { LoginPage } from '../../pages/loginPage'
import { AnalyticsPage } from '../../pages/analyticsPage'

describe('Funcionalidade Solicitação de Pessoal', () => {
    const loginPage = new LoginPage()
    const analyticsPage = new AnalyticsPage()

    beforeEach('', () => {
        cy.reload_db()
        cy.inserirSolicitacaoPessoal()
        analyticsPage.navigateAnalyticsReS()
        loginPage.with('homolog', '1234')
    })
    
    it('Inserção de Solicitação de Pessoal', () => {
        util.entendiButton()
        analyticsPage.validaVagas()
    })
})
