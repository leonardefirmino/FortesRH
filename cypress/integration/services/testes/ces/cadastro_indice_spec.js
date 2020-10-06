import '../../../../../cypress.json'
import * as util from '../../../../support/util'
import { LoginPage } from '../../pages/loginPage'
import { IndicePage } from '../../pages/indicePage'

describe('Funcionalidade Indices', () => {
    const loginPage = new LoginPage()
    const indicePage = new IndicePage()

    beforeEach('', () => {
        cy.reload_db()
        cy.insereIndices()
        cy.insereIndicesComHistorico()
        indicePage.navigate()
        loginPage.loggedIn('homolog', '1234')
    })
    
    it('Inserção de Índice', () => {
        indicePage.preencheIndice()
        util.successMsg('Índice Gravado com Sucesso!')
    })

    it('Edição de de Índice', () => {
        indicePage.editarIndice('Editar', 'Indice Teste')
        util.successMsg('Índice Atualizado com Sucesso!')
    })

    it('Insere Histórico de Índice', () => {
        indicePage.preencheHistoricoIndice()
        util.successMsg('Índice Atualizado com Sucesso!')
    })

    it('Exclusão de Area Organizacional', () => {
        indicePage.excluirIndice('Excluir', 'Indice Teste')
        util.popUpMessage('Confirma exclusão?')
        util.infoMsg('Índice excluído com sucesso.')
    })

    it('Inserir Indice Integrado como Pessoal', () => {
        cy.integraFortesPessoal()
        loginPage.logout()
        indicePage.navigate()
        loginPage.with('homolog', '1234')
        util.infoMsg('A manutenção do Cadastro de Índices deve ser realizada no Fortes Pessoal.')
    })

})
