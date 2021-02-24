import '../../../../../cypress.json'
import { CursoPage } from '../../pages/desenv_talentos/cursosPage'


describe('Funcionalidade Cursos/Treinamentos', () => {
    const cursoPage = new CursoPage()

    const curso = {Nome: "Curso Cypress"}
    const turma = {Nome: "Turma 1", Custo: "100,00", Instrutor: "Professor", DataIni: "01/01/2021", DataFim: "29/01/2021"}

    beforeEach('', () => {
        cy.insereColaborador('Helena de Troia')
        cy.inserirCurso(curso.Nome)
        cursoPage.navigate()
    })

    it('Inserção Curso', () => {
        // cursoPage.inserir(curso)
        cy.inserir(curso)
        cy.validaTitulo('Cursos')
    });

    it('Edição Curso', () => {
        cy.editar(curso)
        cy.validaTitulo('Cursos')        
    });

    it('Exclusão Curso', () => {
        cy.excluir(curso)
        cy.successMsg('Curso excluído com sucesso.')
    });

    it('Inserir Turma e Alunos', () => {
        cy.inserirTurmaEAluno(turma, curso)
        cy.infoMsg('Talento(s) incluído(s) com sucesso!')
    });
})

describe.only('Categorias do Curso', () => {
    const categoria = {Nome: "Categoria", DataIni: '01/2021', Meta: '100'}
    const turma = {Nome: "Turma 1", Custo: "100,00", Instrutor: "Professor", DataIni: "01/01/2021", DataFim: "29/01/2021"}

    beforeEach('', () => {
        cy.insereColaborador('Helena de Troia')
        cy.inserirCategoriaCurso(categoria.Nome)
        cy.visit('/desenvolvimento/categoriaCurso/list.action')
        cy.continuarButton()
    })

    it('Inserir Categoria do Curso', () => {
        cy.inserirCategoria(categoria)
        cy.get('.odd > :nth-child(2)').should('contain', categoria.Nome)
    });

    it('Edita Categoria do Curso', () => {
        cy.editar(categoria)
        cy.get('.odd > :nth-child(2)').should('contain', 'Categoria 2')
    });

})