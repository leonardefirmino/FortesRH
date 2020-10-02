import '../../../../../cypress.json'
import { LoginPage } from '../../pages/loginPage'
import { MessagePage } from '../../pages/messagePage'
import { EtapaSeletivaPage } from '../../pages/etapaSeletivaPage'


describe('Funcionalidade Etapas Seletivas', () => {
    const loginPage = new LoginPage()
    const messagePage = new MessagePage()
    const etapaPage = new EtapaSeletivaPage()

    beforeEach('', () => {
        cy.reload_db()
        cy.insereEtapaSeletiva()
        etapaPage.navigate()
        loginPage.loggedIn('homolog', '1234')
    })

    it('Inserção de Etapa Seletiva', () => {
        etapaPage.insereEtapaSeletiva()
        messagePage.validaTitulo('Etapas Seletivas')
    })

    it('Edição de Etapa Seletiva', () => {
        etapaPage.editarEtapaSeletiva('Editar', 'Entrevista Com Gestor')
        messagePage.validaTitulo('Etapas Seletivas')
    })

    it('Exclusão de Etapa Seletiva', () => {
        cy.inserirSolicitacaoPessoal()
        etapaPage.excluirEtapaSeletiva('Excluir', 'Entrevista Com Gestor')
        messagePage.popUpMessage('Confirma exclusão?')
        messagePage.successMsg('Etapa Seletiva excluída com sucesso.')
    })

})
