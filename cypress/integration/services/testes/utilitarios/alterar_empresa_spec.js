import 'cypress-capybara/add-commands'
import '../../../../../cypress.json'
import * as util from '../../../../support/util'

describe('Funcionalidade Troca de Empresa', () => {

    const empresas = { RazaoSocial_1: 'Fortes Tecno'}

    beforeEach('', () => {
        cy.insereEmpresa(empresas.RazaoSocial_1)
    })

    it('Alterar Empresa Fortes Tecno', () => {
        cy.exec_sql("select * from empresa where nome = '"+ empresas.RazaoSocial_1 +"'").then(({ rows }) => rows[0].id).then(empresaId => {
            cy.visit('index.action?empresaId='+ empresaId)
            cy.get('#userDiv').should('include.text', empresas.RazaoSocial_1)
        });
    })
})