import '../../../../../cypress.json'

describe('Funcionalidade Cursos/Treinamentos', () => {
    const curso = {Nome: "Curso Cypress", NomeEditado: "Curso Cypress 2"}
    const turma = {Nome: "Turma 1", Custo: "100,00", Instrutor: "Professor", DataIni: "01/01/2021", DataFim: "29/01/2021"}

    beforeEach('', () => {
        cy.insereColaborador('Helena de Troia')
        cy.inserirCurso(curso.Nome)
        cy.loginByApi()
        cy.navigate('/desenvolvimento/curso/list.action')
    })

    it('Inserção Curso', () => {
        cy.inserir(curso)
        cy.validaItemNaGrade(curso.Nome)
    });

    it('Edição Curso', () => {
        cy.editar(curso)
        cy.validaItemNaGrade(curso.NomeEditado)
    });

    it('Exclusão Curso', () => {
        cy.excluir(curso)
        cy.validaMensagemSucesso('Curso excluído com sucesso.')
    });

    it('Inserir Turma e Alunos', () => {
        cy.inserirTurmaEAluno(turma, curso)
        cy.validaMensagemInformacao('Talento(s) incluído(s) com sucesso!')
    });
})