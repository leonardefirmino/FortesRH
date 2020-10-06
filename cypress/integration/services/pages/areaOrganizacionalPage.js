import * as util from '../../../support/util'

export class AreaOrganizacionalPage {

    navigate() {
        cy.visit('/geral/areaOrganizacional/list.action')
    }

    clicaInserir() {
        cy.get('#btnInserir').click()
    }

    clicaGravar() {
        cy.get('#btnGravar').click()
    }

    nomeArea() {
        cy.get('#nome').clear().type('Area Organizacional Teste')
    }

    nomeAreaMae(text) {
        cy.get('#areaMaeId').select(text)
    }

    validaAreaMaeComVinculo() {
        cy.get('#areaSemColaboradores').should('contain', 'A área organizacional mãe selecionada, possui talentos vinculados.') 
    }

    preencheAreaOrganizacional(text) {
        this.clicaInserir()

        if (text == null) {
            this.nomeArea()
        } else {
            this.nomeArea()
            this.nomeAreaMae(text)
        }
        this.clicaGravar()
    }

    editarAreaOrganizacional(acao, area_nome) {
        util.acao(acao, area_nome)
        this.nomeArea()
        this.clicaGravar()
    }

    excluirAreaOrganizacional(acao, area_nome) {
        util.acao(acao, area_nome)
    }



}