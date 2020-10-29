import '../../../../../cypress.json'
import * as util from '../../../../support/util'
import { LoginPage } from '../../pages/loginPage'
import { CamposExtrasPage } from '../../pages/camposExtrasPage'

describe('Configuração de Campos Extras', () => {
    const loginPage = new LoginPage()
    const camposExtrasPage = new CamposExtrasPage()
    
    beforeEach('', () => {
        cy.reload_db()
        camposExtrasPage.navigate()
        loginPage.loggedIn('homolog', '1234')
    })

    it('Configura Campo Extra de Talento e Candidato', () => {
        camposExtrasPage.configuraCampsExtras()  
        util.popUpMessage('Essas configurações serão aplicadas para todas as empresas!') 
        util.successMsg('Configurações gravadas com sucesso.')    
        cy.log('Teste')
        camposExtrasPage.validaAbaExtraExibidaCandidato()
        camposExtrasPage.validaAbaExtraExibidaTalento()
    })
})
