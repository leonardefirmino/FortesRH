import 'cypress-capybara/add-commands'
import * as util from '../support/util'

// -------------------------- Login --------------------------

Cypress.Commands.add('login', () => {      
    cy.login_Sem_Entendi()

    switch (cy.get('.done').click({ multiple: true, force: true })) {
        case 0:
            cy.get('.done').should('be.visible')
            break;
    }
})

Cypress.Commands.add('login_Sem_Entendi', () => {      
    cy.visit('/login.action?')
    cy.get('input[placeholder = "Usuário"]').clear().type(Cypress.env('user_name'))   
    cy.get('input[placeholder = "Senha"]').clear().type(Cypress.env('user_password')) 
    cy.get('#entrar').should('be.visible').click()

    cy.url()
      .should('be.equal', `${Cypress.config("baseUrl")}/index.action`)
})

Cypress.Commands.add('loggedIn', (user, pass) => {      
    
    cy.visit('/login.action?')
    cy.get('input[placeholder = "Usuário"]').clear().type(user)   
    cy.get('input[placeholder = "Senha"]').clear().type(pass) 
    cy.get('#entrar').should('be.visible').click()

    cy.url()
      .should('be.equal', `${Cypress.config("baseUrl")}/index.action`)
})

Cypress.Commands.add('logout', () => {      
    cy.visit('/logout.action?')
})

// -------------------------- Cursos --------------------------

Cypress.Commands.add('inserir', curso => {
    cy.get('#btnInserir').click()
    cy.get('#nome').clear().type(curso.Nome)
    cy.get('#btnGravar').click()
})

Cypress.Commands.add('inserirCategoria', categoria => {
    cy.get('#btnInserir').click()
    cy.get('#nome').clear().type(categoria.Nome)
    cy.get('.mascaraMesAno').clear().type(categoria.DataIni)
    cy.get('.metas').clear().type(categoria.Meta)
    cy.get('#btnGravar').click()
})

Cypress.Commands.add('inserirHistoricoCategoria', (categoria, data) => {
    cy.acao('Editar', categoria.Nome)
    if (data) {
        cy.get('[style="width: 435px;text-align: center;padding: 1px 15px;"] > #wwgrp_data > #wwlbl_data > div > .mascaraMesAno')
            .clear().type(data)
    } else {
        cy.get('[style="width: 435px;text-align: center;padding: 1px 15px;"] > #wwgrp_data > #wwlbl_data > div > .mascaraMesAno')
            .clear().type(categoria.NovaData)
    }    
    cy.get('[style="width: 435px;text-align: center;padding: 1px 15px;"] > #wwgrp_meta > #wwlbl_meta > #wwctrl_meta > .metas')
        .clear().type(categoria.Meta)
    cy.get('#btnGravar').click()
}) 

Cypress.Commands.add('editar', curso => {
    cy.acao('Editar', curso.Nome)
    cy.get('#nome').clear().type(curso.Nome + " 2")
    cy.get('#btnGravar').click()
})

Cypress.Commands.add('excluir', item => {
    cy.acao('Excluir', item.Nome)
    cy.popUpMessage('Confirma exclusão?')
})

Cypress.Commands.add('inserirTurmaEAluno', (turma, curso) => {
    cy.acao('Turmas', curso.Nome)
    cy.get('#btnInserir').click();
    cy.get('#desc').clear().type(turma.Nome)
    cy.get('#custo').clear().type(turma.Custo);
    cy.get('#inst').clear().type(turma.Instrutor)
    cy.get('#prevIni').clear().type(turma.DataIni)
    cy.get('#prevFim').clear().type(turma.DataFim)
    cy.get('#btnGravar').click()
    cy.get('#btnPesquisar').click();
    cy.get('#btnInserirSelecionados').click();
})

Cypress.Commands.add('excluirCategoriaAssociadaCurso', categoria => {
    cy.inserirCategoriaCursoComDependencia(categoria.Nome)
    cy.acao('Excluir', categoria.Nome)
    cy.get(':nth-child(1) > .ui-button-text').should('contain', 'Remover categoria curso e vínculo com cursos').click()
})

Cypress.Commands.add('excluirMetaCategoria', categoria => {
    cy.acao('Editar', categoria.Nome)
    cy.get('[style="width: 435px;text-align: center;padding: 1px 15px;background-color: #F9F9F9"] > #wwgrp_data > #wwlbl_data > [onclick="javascript:removerMeta($(this))"] > .fa')
        .click()
    cy.popUpMessage('Confirma exclusão?')
})

// -------------------------- Geral --------------------------

Cypress.Commands.add('acao', (acao, text) => {
    cy.get(`td:contains("${text}")`).parent().find(`i[title="${acao}"]`).click()
})

Cypress.Commands.add("exec_sql", (...queries) => {
    return cy.task('query', queries)
})

Cypress.Commands.add("alteraEmpresa", (company) => {
    cy.exec_sql("select * from empresa where nome = '"+ company +"'").then(({ rows }) => rows[0].id).then(empresaId => {
        cy.visit('index.action?empresaId='+ empresaId)
    });
})

Cypress.Commands.add('clearcookies', () => {
    if (Cypress.browser.name === 'firefox') {
        cy.getCookies().then((cookies) => cookies.forEach(cookie => cy.clearCookie(cookie.name)));
    }
})

// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })