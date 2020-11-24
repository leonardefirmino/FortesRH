import * as util from '../../../support/util'

const url = '/avaliacao/desempenho/list.action'
const inserir = '#btnInserir'
const titulo = '#titulo'
const liberarLote = '#btnLiberarAv'
const liberar = 'ul > #btnLiberar'
const pesquisarAval = '#btnPesquisarAv'
const periodoInicial = '#inicio'
const periodoFinal = '#fim'
const avaliarsomentecompetencias = '#avaliarSomenteCompetencias'
const modelo = '#modelo'
const autoAvaliacao = '#permiteAutoAvaliacao'
const anonima = '#anonima'
const avancar = '#btnAvancar'
const gravar_old = '.btnGravar'
const gravar = '#btnGravar'
const voltar = '#btnVoltar'
const btn_cancelar = '#btnCancelar'
const insere_avaliado = '#inserir_Avaliado'
const insere_avaliador = '#inserir_Avaliador'
const pesquisar = '#btnPesquisar'
const selecionarTodos_avaliados = '#selecionarTodosAvaliado'
const relacionar = '#relacionar_selecionados'
const relacionarTodos = '.for-all'
const marcarTodos = '#mt'
const marcarTodoAval = '#wwctrl_avaliacoesCheck > .listCheckBoxContainer > .listCheckBoxBarra > #mt'
const colaborador = '#checkGroupcolaboradorsCheck1'

export class AvaliacaoDesempenhoPage {

    navigate() {
        cy.visit(url)
    }

    cadastraAvaloiacaoDesempenho(avaliacao) {
        cy.get(inserir).click()
        cy.get(titulo).clear().type(avaliacao.Titulo)
        cy.get(periodoInicial).clear().type(avaliacao.PeriodoInicial)
        cy.get(periodoFinal).clear().type(avaliacao.PeriodoFinal)

        if (avaliacao.ModeloAvaliacao === 'Não') {
            cy.get(avaliarsomentecompetencias).check()
        } else {
            cy.get(modelo).select(avaliacao.ModeloAvaliacao)
        }

        cy.get(autoAvaliacao).select(avaliacao.PermiteAutoavaliacao)
        cy.get(anonima).select(avaliacao.Anonima)
        cy.get(avancar).click()

        //Inserir Avaliado
        cy.get(insere_avaliado).click()
        cy.get(pesquisar).click()
        cy.get(colaborador).check()

        cy.get('.buttonGroup').within(($form) => {
            cy.get(gravar).click()
            //cy.get(btn_cancelar).click()            
            cy.get('#boxtitle').should('not.exist')
        })

        //Inserir Avaliador
        cy.get(insere_avaliador).click()
        cy.get(pesquisar).click()
        cy.get(colaborador).check()

        cy.get('.buttonGroup').within(($form) => {
            cy.get(gravar).click()      
            cy.get('#boxtitle').should('not.exist')
        })   

        cy.get(selecionarTodos_avaliados).click()
        cy.get(relacionar).click()
        cy.get(relacionarTodos).click()
        cy.get('[style="width: 760px; margin: 0 auto;"]').within(($form) => {
            cy.get(gravar).click()      
        })
    }

    insereParticipantes(avaliacao) {
        util.acao_old('Participantes', avaliacao.Titulo)
        //Inserir Avaliado
        cy.get(insere_avaliado).click()
        cy.get(pesquisar).click()
        cy.get('#wwgrp_colaboradorsCheck').within(($form) => {
            cy.wait(1500)
            cy.get(marcarTodos).click()
        })
        

        cy.get('.buttonGroup').within(($form) => {
            cy.get(gravar).click()
            //cy.get(btn_cancelar).click()            
            cy.get('#boxtitle').should('not.exist')
        })

        //Inserir Avaliador
        cy.get(insere_avaliador).click()
        cy.get(pesquisar).click()
        cy.get('#wwgrp_colaboradorsCheck').within(($form) => {
            cy.wait(1500)
            cy.get(marcarTodos).click()
        })

        cy.get('.buttonGroup').within(($form) => {
            cy.get(gravar).click()      
            cy.get('#boxtitle').should('not.exist')
        })   

        cy.get(selecionarTodos_avaliados).click()
        cy.get(relacionar).click()
        cy.get(relacionarTodos).click()
    }

    excluir(avaliacao) {
        util.acao_old('Excluir', avaliacao.Titulo)
        
    }

    liberarEmLote() {
        cy.get(liberarLote).click()
        cy.get(pesquisarAval).click() 
        cy.get(marcarTodoAval).should('be.visible').click() 
        cy.get(liberar).click() 
    }
}
