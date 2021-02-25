import '../../../../../cypress.json'
import * as util from '../../../../support/util'
import { CamposExtrasPage } from '../../pages/camposExtrasPage'

describe('Configuração de Campos Extras', () => {
    const camposExtrasPage = new CamposExtrasPage()
    
    beforeEach('', () => {
        cy.loginByApi()
        camposExtrasPage.navigate()
    })

    it('Configura Campo Extra de Talento e Candidato', () => {
        camposExtrasPage.configuraCampsExtras()  
        util.popUpMessage('Essas configurações serão aplicadas para todas as empresas!') 
        cy.validaMensagemSucesso('Configurações gravadas com sucesso.')   
        camposExtrasPage.validaAbaExtraExibidaCandidato()
        camposExtrasPage.validaAbaExtraExibidaTalento()
    })
})
