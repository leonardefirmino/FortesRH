import 'cypress-capybara/add-commands'

const entendi = '.done'


export function acao_old(acao, text) {
    cy.xpath(`//td[contains(text(), "${text}")]/../td/a/img[@title="${acao}"]`).click()
}

export function acao(acao, text) {
    cy.get(`td:contains("${text}")`).parent().find(`i[title="${acao}"]`).click()
}

export function entendiButton() {
    switch (cy.get(entendi).click({ multiple: true, force: true })) {
        case 0:
            cy.get(entendi).should('be.visible')
            break;
    }
}

export function popUpMessage(text) {
    cy.get('#popup_message').then(($popup) => {
        if ($popup.text().includes(text)) {
            cy.get('#popup_ok').click()
        } else {
            console.log('erro')
        }
    })
    cy.get('#popup_message').should('not.exist')
}

export function dialogMessage(text) {
    cy.get('.ui-dialog-title').should('contain', text)
}

export function dialogContentMessage(text) {
    cy.get('.ui-dialog-content').should('contain', text)
}

export function confirmarDialogMessage(text) {
    if (text == null) {
        cy.get(':nth-child(1) > .ui-button-text').should('contain', 'Confirmar').click()
    } else {
        cy.get(':nth-child(1) > .ui-button-text').should('contain', text).click()
    }
}

export function dialogMessageLGPD(text) {
    cy.get('#ui-dialog-title-termo-privacidade-politica-seguranca').should('contain', text)
}

export function dialogMessageMesmoCPF(text) {
    cy.get('#talentoMesmoCpfDialog').should('contain', text)
    cy.get(':nth-child(1) > .ui-button-text').click()
}

export function continuarButton() {
    cy.get('.ui-button-text').click()
}

export function validaTitulo(text) {
    cy.get('#waDivTitulo').should('include.text', text)
}

export function welcomeMessage(text) {
    cy.get('.saudacao').should('contain', text)
}

export function errorMessageLogin(text) {
    cy.get('.txtErro').should('contain', text)
}

export function successMsg(text) {
    cy.get('#successMsg').should('include.text', text)
}

export function warningMsg(text) {
    cy.get('#warningMsg').should('contain', text)
}

export function infoMsg(text) {
    cy.get('#infoMsg').should('contain', text)
}

export function infomsg(text) {
    cy.get('.info').should('contain.text', text)
}

export function errorMsg(text) {
    cy.get('#errorMsg').should('contain', text)
}

export function warningMsgExterno() {
    cy.get('#warnings').should('be.visible')
}

export function infoMsgExterno() {
    cy.get('#infoMsg').should('be.visible')
}

export function welcomeExterno(text) {
    cy.get('#topDiv').should('be.visible').and('contain.text', text)
}

export function validaCaptchaSistemaVisivel() {
    cy.get('iframe').should('be.visible')
}