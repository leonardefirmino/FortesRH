import * as util from '../../../support/util'
import '../../../support/commands'

const url_talentos = '/geral/colaborador/list.action'
const exibirFiltro = '#labelLink'
const situacao = '#situacao'
const inserir = '#btnInserir'
const pesquisar = '#btnPesquisar'
const selecionaEntrevista = '#entrevista'
const avancar = '#btnAvancar'
const resposta1 = '.opcaoResposta1'
const gravar = '.btnGravar'
const grava = '#gravar'
const gravar_new = '#btnGravar'
const editarHistorico = '#btnEditarHistoricos'
const dadosFuncionais = '#aba2'

export class TalentoCandidatoPage {

    navigate_talentoPage() {
        cy.visit(url_talentos)
    }

    pesquisaTalento() {
        cy.get(exibirFiltro).click()
        cy.get(situacao).select('Todos')
        cy.get(pesquisar).click()
    }

    respondeEntrevistaDesligamento(dados) {
        util.acao('Entrevista de desligamento', dados.Colaborador)
        cy.get(selecionaEntrevista).select(dados.EntrevistaDesligamento)
        cy.get(avancar).click()
        cy.get(resposta1).clear().type('Resposta 1')
        cy.get(gravar).click()
    }

    criaAcessoSistema(dados) {
        util.acao('Criar Acesso ao Sistema', dados.Colaborador)
    }

    editar(dados) {
        util.acao('Editar', dados.ColaboradorAtivo)
        cy.get(dadosFuncionais).click()
        cy.get(grava).click()
    }

    excluir(dados) {
        util.acao('Excluir', dados.ColaboradorAtivo)
    }

    visualizarProgressao(dados) {
        util.acao('Visualizar Progressão', dados.ColaboradorAtivo)
    }

    inserirCompetencia(dados) {
        util.acao('Competências', dados.ColaboradorAtivo)
        cy.get(inserir).click()
    }

    inserirNovaSituação() {
        cy.get(editarHistorico).click()
        cy.get(inserir).click()
        cy.get(gravar_new).click()
    }


}
