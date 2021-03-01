import '../../../../../cypress.json'
describe('Categorias do Curso', () => {
    const categoria = {Nome: "Categoria", NomeEditado: 'Categoria 2', DataIni: '01/2021', NovaData: '02/2021', Meta: '100'}

    beforeEach('', () => {
        cy.insereColaborador('Helena de Troia')
        cy.inserirCategoriaCurso(categoria.Nome)
        cy.loginByApi()
        cy.visit('/desenvolvimento/categoriaCurso/list.action')
        cy.continuarButton()
    })

    it('Inserir Categoria do Curso', () => {
        cy.inserirCategoria(categoria)
        cy.validaItemNaGrade(categoria.Nome)
    });

    it('Editar Categoria do Curso', () => {
        cy.editar(categoria)
        cy.validaItemNaGrade(categoria.NomeEditado)
    });

    it('Inserir Histórico na Categoria', () => {
        cy.inserirHistoricoCategoria(categoria)
        cy.validaItemNaGrade(categoria.Nome)
    });

    it('Inserir Histórico já Existente', () => {
        cy.inserirHistoricoCategoria(categoria, categoria.DataIni)
        cy.popUpMessage('Não é permitido inserir datas repetidas.')
    });

    it('Excluir Categoria', () => {
        cy.excluir(categoria)
        cy.validaMensagemInformacao('Categoria do curso excluída com sucesso.')
    });

    it('Excluir Categoria Associada a Curso', () => {
        cy.excluirCategoriaAssociadaCurso(categoria)
        cy.validaMensagemInformacao('Categoria do curso excluída com sucesso.')
    });

    it('Excluir Meta', () => {
        cy.excluirMetaCategoria(categoria)
        cy.get('#btnGravar').click()
        cy.get('#popup_message').should('contain', 'Insira pelo menos uma meta para esta categoria.')
    });

})