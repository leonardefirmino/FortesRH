import '../../../../../cypress.json'
import * as util from '../../../../support/util'
import { LoginPage } from '../../pages/loginPage'
import { EtapaSeletivaPage } from '../../pages/etapaSeletivaPage'


describe('Funcionalidade Etapas Seletivas', () => {
    const loginPage = new LoginPage()
    const etapaPage = new EtapaSeletivaPage()

    beforeEach('', () => {
        cy.reload_db()
        cy.insereEtapaSeletiva()
        etapaPage.navigate()
        loginPage.loggedIn('homolog', '1234')
    })

    it('Inserção de Etapa Seletiva', () => {
        etapaPage.insereEtapaSeletiva()
        util.validaTitulo('Etapas Seletivas')
    })

    it('Edição de Etapa Seletiva', () => {
        etapaPage.editarEtapaSeletiva('Editar', 'Entrevista Com Gestor')
        util.validaTitulo('Etapas Seletivas')
    })

    it('Exclusão de Etapa Seletiva', () => {
        cy.inserirSolicitacaoPessoal()
        etapaPage.excluirEtapaSeletiva('Excluir', 'Entrevista Com Gestor')
        util.popUpMessage('Confirma exclusão?')
        util.successMsg('Etapa Seletiva excluída com sucesso.')
    })

})
