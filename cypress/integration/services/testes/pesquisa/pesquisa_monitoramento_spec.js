import '../../../../../cypress.json'
import * as util from '../../../../support/util'
import { PesquisaPage } from '../../pages/pesquisaPage'

describe('Funcionalidade Pesquisa', () => {
    const pesquisaPage = new PesquisaPage()

    const monitoramento = { Nome: 'Pesquisa de Monitoramento', DataIni: '01/10/2020', DataFim: '31/10/2020', Monitoramento: 'Sim' }
    const pesquisa = { Nome: 'Pesquisa Clima', DataIni: '01/01/2021', DataFim: '31/12/2021', Monitoramento: 'Não' }

    beforeEach('', () => {
        cy.insereReajustePorColaborador('Reajuste Desenvolvimento', true)
        cy.insereReajustePorColaborador('Reajuste Suporte', false)
        cy.insereColaboradorComCompetencias('Helena de Troia')
        cy.loginByApi()
        pesquisaPage.navigate()
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

    it('Responder Pesquisa Parcialmente', () => {
        cy.ativaPaginacaoPesquisa()
        cy.PesquisaLiberadaCom50Perguntas()
        cy.reload()
        util.validaTitulo('Pesquisas')
        pesquisaPage.incluirColaboradorPesquisaResponderParcial(pesquisa)
        util.infoMsg('Respostas gravadas com sucesso.')
    })

    it('Exclusão de respostas em lote', () => {
        cy.ativaPaginacaoPesquisa()
        cy.PesquisaLiberadaCom50Perguntas()
        cy.reload()
        pesquisaPage.incluirColaboradorPesquisaResponder(pesquisa)
        pesquisaPage.excluirTodasRespostas()
        util.popUpMessage('Confirma remoção das respostas selecionadas?')
        util.infoMsg('Respostas dos talentos selecionados removidas com sucesso.')
    })
})
