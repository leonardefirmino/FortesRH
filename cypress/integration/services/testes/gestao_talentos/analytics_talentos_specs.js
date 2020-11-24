import '../../../../../cypress.json'
import * as util from '../../../../support/util'
import { LoginPage } from '../../pages/loginPage'
import { AnalyticsGestaoTalentosPage } from '../../pages/analyticsGestaoTalentoPage'

describe('Analitics Gestão de Talentos', () => {
    const loginPage = new LoginPage()
    const analyticsGestaoTalentoPage = new AnalyticsGestaoTalentosPage()

    const dados = { DataFolha: "Valor total da folha em 25/10/2020: R$ 2.000,00" }

    beforeEach('', () => {
        analyticsGestaoTalentoPage.navigate()
        loginPage.with('homolog', '1234')
    })
    
    it('Valida Dispensa contratação Aprendiz', () => {        
        cy.dispensaContratacaoAprendiz()
        util.entendiButton()
        cy.reload()
        analyticsGestaoTalentoPage.validaDispensaCotasAprendiz()
        cy.contains('Cota de Aprendizagem Dispensada para as empresas selecionadas (Decreto Nº 9.579, de 22 de Novembro DE 2018)')
    })
    
    it('Cota Aprendiz', () => {        
        util.entendiButton()
        analyticsGestaoTalentoPage.validaCotasAprendiz()
        cy.contains('Cota de Aprendizagem (Lei nº 10.097, de 19 de Dezembro de 2000)')
    })
})