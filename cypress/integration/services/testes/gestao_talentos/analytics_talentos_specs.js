import '../../../../../cypress.json'
import * as util from '../../../../support/util'
import { AnalyticsGestaoTalentosPage } from '../../pages/analyticsGestaoTalentoPage'

describe('Analitics Gestão de Talentos', () => {
    const analyticsGestaoTalentoPage = new AnalyticsGestaoTalentosPage()

    beforeEach('', () => {
        cy.insereMetaTurnover(5)
        cy.insereMetaAbsenteísmo(6)
        analyticsGestaoTalentoPage.navigate()
        
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
    
    it('Cota de deficientes não atingida', () => {
        util.entendiButton()
        cy.insere_X_Colaborador(105)
        cy.reload() 
        analyticsGestaoTalentoPage.validaCotaDeficienteNaoAtingida()
    })
    
    it('Cota de deficientes atingida', () => {
        util.entendiButton()
        cy.insere_X_Colaborador(40)
        cy.reload() 
        analyticsGestaoTalentoPage.validaCotaDeficiente()
    })
})