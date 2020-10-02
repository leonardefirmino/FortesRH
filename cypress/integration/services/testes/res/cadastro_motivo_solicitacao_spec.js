import '../../../../../cypress.json'
import { LoginPage } from '../../pages/loginPage'
import { MessagePage } from '../../pages/messagePage'
import { MotivoSolicitacaoPage } from '../../pages/motivoSolicitacaoPage'

describe('Funcionalidade Motivo de Solicitação Pessoal', () => {
    const loginPage = new LoginPage()
    const messagePage = new MessagePage()
    const motivoSolicitacaoPage = new MotivoSolicitacaoPage()

    beforeEach('', () => {
        cy.reload_db()
        cy.insereMotivoSolicitacao()
        motivoSolicitacaoPage.navigate()
        loginPage.loggedIn('homolog', '1234')
    })

    it('Inserção de Motivo de Solicitação Pessoal', () => {
        motivoSolicitacaoPage.insereMotivoSolicitacao()
        messagePage.validaTitulo('Motivos de Solicitação')
    })

    it('Edição de Motivo de Solicitação Pessoal', () => {
        motivoSolicitacaoPage.editarMotivo('Editar', 'Solicitação de Pessoal')
        messagePage.validaTitulo('Motivos de Solicitação')
    })

    it('Exclusão de Motivo de Solicitação Pessoal', () => {
        motivoSolicitacaoPage.excluirMotivo('Excluir', 'Solicitação de Pessoal')
        messagePage.popUpMessage('Confirma exclusão?')
        messagePage.successMsg('Motivo de solicitação excluído com sucesso.')
    })

    it('Exclusão de Motivo de Solicitação Pessoal - Associado a uma Solicitação de Pessoal', () => {
        cy.inserirSolicitacaoPessoal()
        cy.reload()
        motivoSolicitacaoPage.excluirMotivo('Excluir', 'Motivo Solicitação')
        messagePage.popUpMessage('Confirma exclusão?')
        messagePage.warningMsg('Não foi possível excluir o motivo de solicitação.')
    })
})