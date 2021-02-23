import * as util from '../../../support/util'

//MAPEAMENTO DOS ELEMENTOS DA TELA
const url = '/cargosalario/indice/list.action'
const inserir = '#btnInserir'
const gravar = '#btnGravar'
const descricao = '#nome'
const dataHistorico = '#dataHist'
const valorIndice = '#valor'

export class IndicePage {

    navigate() {
        cy.visit(url)
        util.continuarButton()
    }
    
    insereIndice(indice) {
        cy.get(inserir).click()
        cy.get(descricao).clear().type(indice.Descricao)
        cy.get(dataHistorico).clear().type(indice.Data)
        cy.get(valorIndice).clear().type(indice.Valor)
        cy.get(gravar).click()
    }

    preencheHistoricoIndice(indice) {
        util.acao('Editar', 'Indice Teste')
        cy.get(inserir).click()
        cy.get(dataHistorico).clear().type(indice.Data)
        cy.get(valorIndice).clear().type(indice.Valor)
        cy.get(gravar).click()
        cy.get(gravar).click()
    }

    editar(indice) {
        util.acao('Editar', 'Indice Teste')
        cy.get(descricao).clear().type(indice.Descricao)
        cy.get(gravar).click()
    }
    
    excluir(indice) {
        util.acao('Excluir', indice)
    }
} 