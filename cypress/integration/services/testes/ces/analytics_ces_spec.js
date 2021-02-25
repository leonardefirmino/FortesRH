import '../../../../../cypress.json'
import * as util from '../../../../support/util'
import { AnalyticsPage } from '../../pages/analyticsPage'

describe('Analitics Recrutamento e Seleção', () => {
    const analyticsPage = new AnalyticsPage()

    const dados = { DataFolha: "Valor total da folha em 25/10/2020: R$ 2.000,00" }

    beforeEach('', () => {
        cy.insereColaboradorComCompetencias('Helena de Troia')
        cy.loginByApi()
        analyticsPage.navigateAnalyticsCeS()
    })
    
    it('Vagas Disponíveis', () => {
        analyticsPage.validaSalario(dados.DataFolha)
    })
})