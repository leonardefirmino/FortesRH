import * as util from '../../../support/util'

const url = '/pesquisa/pesquisa/list.action'
const inserir = '#btnInserir'
const gravar = '#btnGravar'
const nome_pesquisa = '#titulo'
const label_monitoramento = '.text'
const dataIni = '#dataInicio'
const dataFim = '#dataFim'
const avancar = '#btnAvancar'
const inserirPergunta = '.waDivFormulario > :nth-child(5) > a'
const inserirNovaPergunta = '.novaPergunta > a'
const pergunta = ':nth-child(8) > .loaded > .note-editor > .note-editing-area > .note-editable'
const tipoResposta = '#tipo'
const anonima = '#anonima'
const exibirFiltro = '#labelLink'
const pesquisar = '#btnPesquisar'
const inserirselecionado = '#btnInserirSelecionados'
const aspecto = '#aspecto'
const aplicaOrdemAtual = '#btnAplicarNaOrdemAtual'
const concluir = '#btnConcluir'
const notaMinima = '#notaMinima'
const notaMaxima = '#notaMaxima'
const proxima_pagina = '#paginate-next'
const pagina_anterior = '#paginate-previous'
const colaborador = '#colaborador'
const resposta1 = '.opcaoResposta1'
const resposta2 = '.opcaoResposta2'
const imprimir = '#btnRelatorio'

export class PesquisaPage {

    incluirColaboradorPesquisaResponder(pesquisa) {
        util.acao_old('Talentos', pesquisa.Nome)
        cy.get(inserir).click()
        cy.get(exibirFiltro).click()
        cy.get(pesquisar).click()
        cy.get(inserirselecionado).click()
        cy.get(avancar).click()
        cy.get(avancar).click()
        cy.get('.title').should('have.text', 'Parte 0 de 9')
        cy.get(gravar).click()
    }

    navigate() {
        cy.visit(url)
    }

    inserirPesquisa(pesquisa) {
        cy.get(inserir).click()
        cy.get(nome_pesquisa).clear().type(pesquisa.Nome)

        if (pesquisa.Monitoramento === 'Sim') {
            cy.get(label_monitoramento).click()
            cy.get('.fa-heartbeat').should('be.visible')
        } else {
            cy.get(anonima).select('Não')
        }

        cy.get(dataIni).clear().type(pesquisa.DataIni)
        cy.get(dataFim).clear().type(pesquisa.DataFim)
        cy.get(avancar).click()
    }

    inserirPerguntaObrigatória() {
        cy.get(inserirPergunta).click()
        cy.get(pergunta).focus().type('Pergunta Obrigatória')
        cy.get(tipoResposta).focus().type('Subjetiva')
        cy.get(gravar).click()
    }

    inserirPerguntaNaoObrigatória() {
        cy.get(inserirNovaPergunta).click()
        cy.get(pergunta).focus().type('Pergunta Não Obrigatória')
        cy.get('#labelObrigatoria').click()
        cy.get('#labelObrigatoria').should('have.value', '')
        cy.get(tipoResposta).focus().type('Subjetiva')
        cy.get(gravar).click()
    }

    finalizaCadastro() {
        cy.get('#btnAplicarNaOrdemAtual').click()
        cy.get('#btnConcluir').click()
    }
}