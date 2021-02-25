import '../../../../../cypress.json'
import * as util from '../../../../support/util'
import { MotivoSolicitacaoEPIPage } from '../../pages/sst/motivoSolicitacaoEPIPage'


describe('Funcionalidade Motivo Solicitação EPI', () => {
    const motivoSolicitacaoEPIPage = new MotivoSolicitacaoEPIPage()

    const motivoSolicitacaoEPI = {Nome: "Motivo Aquisição de Material"}

    beforeEach('', () => {
        cy.insereColaborador('Helena de Troia')
        cy.inserirMotivoSolicitacaoEPI(motivoSolicitacaoEPI.Nome)
        cy.loginByApi()
        motivoSolicitacaoEPIPage.navigate()
    })

    it('Inserção Motivo de Solicitação de EPI', () => {
        motivoSolicitacaoEPIPage.inserir(motivoSolicitacaoEPI)
        cy.validaMensagemSucesso('Motivo da solicitação do EPI cadastrado com sucesso.')
    });

    it('Edição Motivo de Solicitação de EPI', () => {
        motivoSolicitacaoEPIPage.editar(motivoSolicitacaoEPI)
        cy.validaMensagemSucesso('Motivo da solicitação do EPI atualizado com sucesso.')        
    });

    it('Exclusão Motivo de Solicitação de EPI', () => {
        motivoSolicitacaoEPIPage.excluir(motivoSolicitacaoEPI)
        util.popUpMessage('Confirma exclusão?')
        cy.validaMensagemSucesso('Motivo da solicitação do EPI excluído com sucesso.')
    });
})