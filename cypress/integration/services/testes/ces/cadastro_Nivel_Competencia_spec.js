import '../../../../../cypress.json'
import * as util from '../../../../support/util'
import { LoginPage } from '../../pages/loginPage'
import { NivelCompetenciaPage } from '../../pages/nilvelCompetenciaPage'

describe('Funcionalidade Nivel de Competencia', () => {
    const loginPage = new LoginPage()
    const nilvelCompetenciaPage = new NivelCompetenciaPage()

    const nivel = { Descricao: 'Regular' }

    beforeEach('', () => {
        nilvelCompetenciaPage.navigate()
        loginPage.loggedIn('homolog', '1234')
    }) 
 
    it('Inserção Nível de Competencia', () => {
        nilvelCompetenciaPage.inserir(nivel)
        util.successMsg('Nivel de Competencia Gravado com Sucesso!')
    })
 
    it('Exclusão Nível de Competencia', () => {
        nilvelCompetenciaPage.inserir(nivel)
        nilvelCompetenciaPage.excluir(nivel)
        util.popUpMessage('Confirma exclusão?')
        util.successMsg('Nível de competência excluído com sucesso.')
    })

})
