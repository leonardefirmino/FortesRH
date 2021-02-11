import '../../../../../cypress.json'
import * as util from '../../../../support/util'
import { NivelCompetenciaPage } from '../../pages/nilvelCompetenciaPage'

describe('Funcionalidade Nivel de Competencia', () => {
    const nilvelCompetenciaPage = new NivelCompetenciaPage()

    const nivel = { Descricao: 'Regular' }

    beforeEach('', () => {
        nilvelCompetenciaPage.navigate()
    }) 
 
    it('Inserção Nível de Competencia', () => {
        nilvelCompetenciaPage.inserir(nivel)
        cy.validaMensagemSucesso('Nivel de Competencia Gravado com Sucesso!')
    })
 
    it('Exclusão Nível de Competencia', () => {
        nilvelCompetenciaPage.inserir(nivel)
        nilvelCompetenciaPage.excluir(nivel)
        util.popUpMessage('Confirma exclusão?')
        cy.validaMensagemSucesso('Nível de competência excluído com sucesso.')
    })

})
