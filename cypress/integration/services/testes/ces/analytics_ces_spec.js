import '../../../../../cypress.json'
import * as util from '../../../../support/util'
import { LoginPage } from '../../pages/loginPage'
import { AnalyticsPage } from '../../pages/analyticsPage'

describe('Analitics Recrutamento e Seleção', () => {
    const loginPage = new LoginPage()
    const analyticsPage = new AnalyticsPage()

    const dados = { DataFolha: "Valor total da folha em 25/10/2020: R$ 2.000,00" }

    beforeEach('', () => {
        cy.insereColaboradorComCompetencias('Helena de Troia')
        analyticsPage.navigateAnalyticsCeS()
        loginPage.with('homolog', '1234')
    })
    
    it('Vagas Disponíveis', () => {
        util.entendiButton()
        analyticsPage.validaSalario(dados.DataFolha)
    })
})