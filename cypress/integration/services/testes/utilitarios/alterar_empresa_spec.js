import 'cypress-capybara/add-commands'
import '../../../../../cypress.json'
import * as util from '../../../../support/util'
import { LoginPage } from '../../pages/loginPage'

describe('Funcionalidade Troca de Empresa', () => {
    const loginPage = new LoginPage()

    const empresas = { RazaoSocial_1: 'Ente Tecnologia', RazaoSocial_2: 'Fortes Tecno'}

    beforeEach('', () => {
        cy.reload_db()
        cy.insereEmpresa(empresas.RazaoSocial_1)
        cy.insereEmpresa(empresas.RazaoSocial_2)
        loginPage.navigate()
        loginPage.loggedIn('homolog', '1234')
    })

    it('Alterar Empresa Fortes Tecno', () => {
        cy.exec_sql("select * from empresa where nome = '"+ empresas.RazaoSocial_2 +"'").then(({ rows }) => rows[0].id).then(empresaId => {
            cy.visit('index.action?empresaId='+ empresaId)
            util.confirmarDialogMessage('Continuar')
            cy.get('#userDiv').should('include.text', empresas.RazaoSocial_2)
        });
    })
})



