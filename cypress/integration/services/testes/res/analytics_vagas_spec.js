import '../../../../../cypress.json'
import * as util from '../../../../support/util'
import { AnalyticsPage } from '../../pages/analyticsPage'

describe('Analitics Recrutamento e Seleção', () => {
    const analyticsPage = new AnalyticsPage()

    const dados = { DataInicial: "01/01/2000", DataFinal: "01/01/2021", CargoNome: "Cargo Teste Faixa_Nome", QtdVagas: "10" }

    beforeEach('', () => {
        cy.inserirSolicitacaoPessoal()
        analyticsPage.navigateAnalyticsReS()
    })
    
    it('Vagas Disponíveis', () => {
        util.entendiButton()
        analyticsPage.validaQuadroVagasDisponiveis(dados)
    })
}) 