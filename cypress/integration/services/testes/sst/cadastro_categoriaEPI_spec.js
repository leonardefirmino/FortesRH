import '../../../../../cypress.json'
import * as util from '../../../../support/util'
import { CategoriaEPIPage } from '../../pages/sst/categoriaEPIPage'


describe('Funcionalidade Categoria de EPI', () => {
    const categoriaEPIPage = new CategoriaEPIPage()

    const categoriaEPI = {Nome: "Categoria III"}

    beforeEach('', () => {
        cy.insereColaborador('Helena de Troia')
        cy.inserirCategoriaEPI(categoriaEPI.Nome)
        cy.loginByApi()
        categoriaEPIPage.navigate()
    })

    it('Inserção Categoria de EPI', () => {
        categoriaEPIPage.inserir(categoriaEPI)
        util.validaTitulo('Categorias de EPI/Fardamento')
    });

    it('Edição Categoria de EPI', () => {
        categoriaEPIPage.editar(categoriaEPI)
        cy.validaMensagemSucesso('Categoria atualizada com sucesso!')        
    });

    it('Exclusão Categoria de EPI', () => {
        categoriaEPIPage.excluir(categoriaEPI)
        util.popUpMessage('Confirma exclusão?')
        util.infoMsg('Tipo de EPI excluído com sucesso.')
    });
})