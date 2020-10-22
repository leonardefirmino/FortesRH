import '../../../../../cypress.json'
import * as util from '../../../../support/util'
import { LoginPage } from '../../pages/loginPage'
import { IndicePage } from '../../pages/indicePage'

describe('Funcionalidade Indices', () => {
    const loginPage = new LoginPage()
    const indicePage = new IndicePage()

    const indice = { Descricao: "Indice Salario Maternidade", Descricao2: "Indice Teste", Descricao3: "Indice com Histórico", Data: "01/10/2020", Valor: "2500,00" }

    beforeEach('', () => {
        cy.reload_db()
        cy.insereIndices(indice.Descricao2)
        cy.insereIndicesComHistorico(indice.Descricao3)
        indicePage.navigate()
        loginPage.loggedIn('homolog', '1234')
    }) 
 
    it('Inserção de Índice', () => {
        indicePage.insereIndice(indice)
        util.successMsg('Índice Gravado com Sucesso!')
    })

    it('Edição de de Índice', () => {
        indicePage.editar(indice)
        util.successMsg('Índice Atualizado com Sucesso!')
    })

    it('Insere Histórico de Índice', () => {
        indicePage.preencheHistoricoIndice(indice)
        util.successMsg('Índice Atualizado com Sucesso!')
    })

    it('Exclusão de Índice', () => {
        indicePage.excluir(indice.Descricao2)
        util.popUpMessage('Confirma exclusão?')
        util.infoMsg('Índice excluído com sucesso.')
    })

    it('Exclusão de Índice - com Histórico', () => {
        indicePage.excluir(indice.Descricao3)
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
