import '../../../../../cypress.json'
import * as util from '../../../../support/util'
import { CursoPage } from '../../pages/desenv_talentos/cursosPage'


describe('Funcionalidade Cursos/Treinamentos', () => {
    const cursoPage = new CursoPage()

    const curso = {Nome: "Curso Cypress"}

    beforeEach('', () => {
        cy.insereColaborador('Helena de Troia')
        cy.inserirCurso(curso.Nome)
        cursoPage.navigate()
    })

    it('Inserção Curso', () => {
        cursoPage.inserir(curso)
        util.validaTitulo('Cursos')
    });

    it('Edição Curso', () => {
        cursoPage.editar(curso)
        util.validaTitulo('Cursos')        
    });

    it('Exclusão Curso', () => {
        cursoPage.excluir(curso)
        util.popUpMessage('Confirma exclusão?')
        util.successMsg('Curso excluído com sucesso.')
    });
})