import '../../../../../cypress.json'
import * as util from '../../../../support/util'
import { ConhecimentoPage } from '../../pages/conhecimentoPage'

describe('Funcionalidade Conhecimentos', () => {
    const conhecimentoPage = new ConhecimentoPage()

    const conhecimento = { Nome: "Cypress" }

    beforeEach('', () => {
        cy.insereConhecimento('Ruby')
        cy.insereColaboradorComCompetencias('Helena de Troia')
        cy.loginByApi()
        conhecimentoPage.navigate()
    })

    it('Inserção de Conhecimento', () => {
        conhecimentoPage.inserir(conhecimento.Nome)
        cy.validaMensagemSucesso('Conhecimento cadastrado com sucesso.')
    })

    it('Inserção de Conhecimento - Já cadastrado', () => {
        conhecimentoPage.inserir('Java')
        util.infoMsg('Já existe um Conhecimento, Habilidade ou Atitude com o nome "Java".')
    })

    it('Edição', () => {
        conhecimentoPage.editar('Java')
        cy.validaMensagemSucesso('Conhecimento atualizado com sucesso.')
    })

    it('Exclusão - Associado a movimentações', () => {
        conhecimentoPage.excluir('Java')
        util.popUpMessage('Confirma exclusão?')
        util.warningMsg('Não foi possível excluir o conhecimento.')
    })

    it('Exclusão', () => {
        conhecimentoPage.excluir('Ruby')
        util.popUpMessage('Confirma exclusão?')
        cy.validaMensagemSucesso('Conhecimento excluído com sucesso.')
    })

})
