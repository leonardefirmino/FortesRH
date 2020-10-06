import '../../../../../cypress.json'
import * as util from '../../../../support/util'
import { LoginPage } from '../../pages/loginPage'
import { AnalyticsPage } from '../../pages/analyticsPageRS'

describe('Analitics Recrutamento e Seleção', () => {
    const loginPage = new LoginPage()
    const analyticsPage = new AnalyticsPage()

    beforeEach('', () => {
        cy.reload_db()
        cy.inserirSolicitacaoPessoal()
        analyticsPage.navigateAnalyticsReS()
        loginPage.with('homolog', '1234')
    })
    
    it('Vagas Disponíveis', () => {
        util.entendiButton()
        analyticsPage.validaVagas()
    })
})
