import '../../../../../cypress.json'
import * as util from '../../../../support/util'
import { LoginPage } from '../../pages/loginPage'
import { CursoPage } from '../../pages/desenv_talentos/cursosPage'


describe('Funcionalidade Cursos/Treinamentos', () => {
    const loginPage = new LoginPage()
    const cursoPage = new CursoPage()

    const curso = {Nome: "Curso Cypress"}

    beforeEach('', () => {
        cy.insereColaborador('Helena de Troia')
        cy.inserirCurso(curso.Nome)
        cursoPage.navigate()
        loginPage.loggedIn('homolog', '1234')
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