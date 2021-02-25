import 'cypress-capybara/add-commands'
import '../../../../../cypress.json'

describe('Funcionalidade Troca de Empresa', () => {

    const empresas = { RazaoSocial_1: 'Fortes Tecnolog'}

    beforeEach('', () => {
        cy.insereEmpresa(empresas.RazaoSocial_1)
        cy.loginByApi()
    })

    it('Alterar Empresa Fortes Tecno', () => {
        cy.alteraEmpresa(empresas.RazaoSocial_1)
        cy.validaEmpresaLogada(empresas.RazaoSocial_1)
    })
})