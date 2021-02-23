import * as util from '../../../../support/util'

const url = '/desenvolvimento/curso/list.action'
const inserir = '#btnInserir'
const nomecurso = '#nome'
const cargahoraria = '#form_curso_cargaHorariaMinutos'
const gravar = '#btnGravar'
const turmadesc = '#desc'
const custo = '#custo'
const instrutor = '#inst'
const dataIni = '#prevIni'
const dataFim = '#prevFim'
const pesquisar = '#btnPesquisar'
const inserirSelecionados = '#btnInserirSelecionados'

export class CursoPage {
    navigate() {
        cy.visit(url)
        util.continuarButton()
    }

    inserir(curso) {
        cy.get(inserir).click()
        cy.get(nomecurso).clear().type(curso.Nome)
        cy.get(gravar).click()
    }

    editar(curso) {
        util.acao('Editar', curso.Nome)
        cy.get(nomecurso).clear().type(curso.Nome + " 2")
        cy.get(gravar).click()
    }

    excluir(curso) {
        util.acao('Excluir', curso.Nome)
    }

    inserirTurmaEAluno(turma, curso){
        util.acao('Turmas', curso.Nome)
        cy.get(inserir).click();
        cy.get(turmadesc).clear().type(turma.Nome)
        cy.get(custo).clear().type(turma.Custo);
        cy.get(instrutor).clear().type(turma.Instrutor)
        cy.get(dataIni).clear().type(turma.DataIni)
        cy.get(dataFim).clear().type(turma.DataFim)
        cy.get(gravar).click()
        cy.get(pesquisar).click();
        cy.get(inserirSelecionados).click();
    }


}