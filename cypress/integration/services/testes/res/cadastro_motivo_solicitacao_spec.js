import '../../../../../cypress.json'
import * as util from '../../../../support/util'
import { LoginPage } from '../../pages/loginPage'
import { MotivoSolicitacaoPage } from '../../pages/motivoSolicitacaoPage'

describe('Funcionalidade Motivo de Solicitação Pessoal', () => {
    const loginPage = new LoginPage()
    const motivoSolicitacaoPage = new MotivoSolicitacaoPage()

    beforeEach('', () => {
        cy.insereMotivoSolicitacao()
        motivoSolicitacaoPage.navigate()
        loginPage.loggedIn('homolog', '1234')
    })

    it('Inserção de Motivo de Solicitação Pessoal', () => {
        motivoSolicitacaoPage.insereMotivoSolicitacao()
        util.validaTitulo('Motivos de Solicitação')
    })

    it('Edição de Motivo de Solicitação Pessoal', () => {
        motivoSolicitacaoPage.editarMotivo('Editar', 'Solicitação de Pessoal')
        util.validaTitulo('Motivos de Solicitação')
    })

    it('Exclusão de Motivo de Solicitação Pessoal', () => {
        motivoSolicitacaoPage.excluirMotivo('Excluir', 'Solicitação de Pessoal')
        util.popUpMessage('Confirma exclusão?')
        util.successMsg('Motivo de solicitação excluído com sucesso.')
    })

    it('Exclusão de Motivo de Solicitação Pessoal - Associado a uma Solicitação de Pessoal', () => {
        cy.inserirSolicitacaoPessoal()
        cy.reload()
        motivoSolicitacaoPage.excluirMotivo('Excluir', 'Aumento de Quadro')
        util.popUpMessage('Confirma exclusão?')
        util.warningMsg('Não foi possível excluir o motivo de solicitação.')
    })
})