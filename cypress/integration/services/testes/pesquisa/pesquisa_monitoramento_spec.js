import '../../../../../cypress.json'
import * as util from '../../../../support/util'
import { LoginPage } from '../../pages/loginPage'
import { PesquisaPage } from '../../pages/pesquisaPage'

describe('Funcionalidade Cargos e Faixas', () => {
    const loginPage = new LoginPage()
    const pesquisaPage = new PesquisaPage()

    const monitoramento = { Nome: 'Pesquisa de Monitoramento', DataIni: '01/10/2020', DataFim: '31/10/2020', Monitoramento: 'Sim' }
    const pesquisa = { Nome: 'Pesquisa Clima', DataIni: '01/10/2020', DataFim: '31/10/2020', Monitoramento: 'Não' }

    beforeEach('', () => {
        cy.reload_db()
        cy.insereReajustePorColaborador('Reajuste Desenvolvimento', true)
        cy.insereReajustePorColaborador('Reajuste Suporte', false)
        cy.insereColaboradorComCompetencias('Helena de Troia')
        pesquisaPage.navigate()
        loginPage.loggedIn('homolog', '1234')
    })

    it('Monitoramento de Saúde', () => {
        pesquisaPage.inserirPesquisa(monitoramento)
        pesquisaPage.inserirPerguntaObrigatória()
        pesquisaPage.finalizaCadastro()
        cy.contains('Monitoramento de Saúde')
    })

    it('Pesquisa', () => {
        pesquisaPage.inserirPesquisa(pesquisa)
        pesquisaPage.inserirPerguntaObrigatória()
        pesquisaPage.inserirPerguntaNaoObrigatória()
        pesquisaPage.finalizaCadastro()
        util.validaTitulo('Pesquisas')
    })

    it('Responder Pesquisa', () => {
        cy.ativaPaginacaoPesquisa()
        cy.PesquisaLiberadaCom50Perguntas()
        cy.reload()
        util.validaTitulo('Pesquisas')
        pesquisaPage.incluirColaboradorPesquisaResponder(pesquisa)
        util.infoMsg('Respostas gravadas com sucesso.')
    })
})
