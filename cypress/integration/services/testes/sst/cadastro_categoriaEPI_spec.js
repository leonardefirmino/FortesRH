import '../../../../../cypress.json'
import * as util from '../../../../support/util'
import { LoginPage } from '../../pages/loginPage'
import { CategoriaEPIPage } from '../../pages/sst/categoriaEPIPage'


describe('Funcionalidade Categoria de EPI', () => {
    const loginPage = new LoginPage()
    const categoriaEPIPage = new CategoriaEPIPage()

    const categoriaEPI = {Nome: "Categoria III"}

    beforeEach('', () => {
        cy.insereColaborador('Helena de Troia')
        cy.inserirCategoriaEPI(categoriaEPI.Nome)
        categoriaEPIPage.navigate()
        loginPage.loggedIn('homolog', '1234')
    })

    it('Inserção Categoria de EPI', () => {
        categoriaEPIPage.inserir(categoriaEPI)
        util.validaTitulo('Categorias de EPI/Fardamento')
    });

    it('Edição Categoria de EPI', () => {
        categoriaEPIPage.editar(categoriaEPI)
        util.successMsg('Categoria atualizada com sucesso!')        
    });

    it('Exclusão Categoria de EPI', () => {
        categoriaEPIPage.excluir(categoriaEPI)
        util.popUpMessage('Confirma exclusão?')
        util.infoMsg('Tipo de EPI excluído com sucesso.')
    });
})