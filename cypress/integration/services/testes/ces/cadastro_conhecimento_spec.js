import '../../../../../cypress.json'
import * as util from '../../../../support/util'
import { LoginPage } from '../../pages/loginPage'
import { ConhecimentoPage } from '../../pages/conhecimentoPage'

describe('Funcionalidade Conhecimentos', () => {
    const loginPage = new LoginPage()
    const conhecimentoPage = new ConhecimentoPage()

    const conhecimento = { Nome: "Cypress" }

    beforeEach('', () => {
        cy.insereConhecimento('Ruby')
        cy.insereColaboradorComCompetencias('Helena de Troia')
        conhecimentoPage.navigate()
        loginPage.loggedIn('homolog', '1234')
    })

    it('Inserção de Conhecimento', () => {
        conhecimentoPage.inserir(conhecimento.Nome)
        util.successMsg('Conhecimento cadastrado com sucesso.')
    })

    it('Inserção de Conhecimento - Já cadastrado', () => {
        conhecimentoPage.inserir('Java')
        util.infoMsg('Já existe um Conhecimento, Habilidade ou Atitude com o nome "Java".')
    })

    it('Edição', () => {
        conhecimentoPage.editar('Java')
        util.successMsg('Conhecimento atualizado com sucesso.')
    })

    it('Exclusão - Associado a movimentações', () => {
        conhecimentoPage.excluir('Java')
        util.popUpMessage('Confirma exclusão?')
        util.warningMsg('Não foi possível excluir o conhecimento.')
    })

    it('Exclusão', () => {
        conhecimentoPage.excluir('Ruby')
        util.popUpMessage('Confirma exclusão?')
        util.successMsg('Conhecimento excluído com sucesso.')
    })

})
