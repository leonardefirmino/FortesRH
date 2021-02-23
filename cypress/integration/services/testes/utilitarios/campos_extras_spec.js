import '../../../../../cypress.json'
import * as util from '../../../../support/util'
import { CamposExtrasPage } from '../../pages/camposExtrasPage'

describe('Configuração de Campos Extras', () => {
    const camposExtrasPage = new CamposExtrasPage()
    
    beforeEach('', () => {
        camposExtrasPage.navigate()
    })

    it('Configura Campo Extra de Talento e Candidato', () => {
        camposExtrasPage.configuraCampsExtras()  
        util.popUpMessage('Essas configurações serão aplicadas para todas as empresas!') 
        util.successMsg('Configurações gravadas com sucesso.')   
        camposExtrasPage.validaAbaExtraExibidaCandidato()
        camposExtrasPage.validaAbaExtraExibidaTalento()
    })
})
