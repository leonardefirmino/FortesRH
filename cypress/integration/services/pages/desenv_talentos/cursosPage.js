import * as util from '../../../../support/util'

const url = '/desenvolvimento/curso/list.action'
const inserir = '#btnInserir'
const nomecurso = '#nome'
const cargahoraria = '#form_curso_cargaHorariaMinutos'
const gravar = '#btnGravar'

export class CursoPage {
    navigate() {
        cy.visit(url)
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
}