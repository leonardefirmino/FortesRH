import 'cypress-capybara/add-commands'


function acao_old(acao, text) {
    cy.xpath(`//td[contains(text(), "${text}")]/../td/a/img[@title="${acao}"]`).click()
}

function acao(acao, text) {
    cy.get(`td:contains("${text}")`).parent().find(`i[title="${acao}"]`).click()
}

function entendiButton() {
    switch (cy.get('.done').click({ multiple: true, force: true })) {
        case 0:
            cy.get('.done').should('be.visible')
            break;
    }

}

function popUpMessage(text) {
    cy.get('#popup_message').then(($popup) => {
        if ($popup.text().includes(text)) {
            cy.get('#popup_ok').click()
        } else {
            console.log('erro')
        }
    })
}

function dialogMessage(text) {
    cy.get('.ui-dialog-title').should('contain', text)
}  

function confirmarDialogMessage(text) {    
    if (text == null) {
        cy.get(':nth-child(1) > .ui-button-text').should('contain', 'Confirmar').click()
    } else {
        cy.get(':nth-child(1) > .ui-button-text').should('contain', text).click()
    }
}

function dialogMessageLGPD(text) {
    cy.get('#ui-dialog-title-termo-privacidade-politica-seguranca').should('contain', text)
}    

function continuarButton() {
    cy.get('.ui-button-text').click()
} 

function validaTitulo(text) {
    cy.get('#waDivTitulo').should('contain', text)
}

function welcomeMessage(text) {
    cy.get('.saudacao').should('contain', text)
}

function errorMessageLogin(text) {
    cy.get('.txtErro').should('contain', text)
}

function successMsg(text) {
    cy.get('#successMsg').should('contain', text)
}

function warningMsg(text) {
    cy.get('#warningMsg').should('contain', text)
}

function infoMsg(text) {
    cy.get('#infoMsg').should('contain', text)
}

function errorMsg(text) {
    cy.get('#errorMsg').should('contain', text)
}

function warningMsgExterno() {
    cy.get('#warnings').should('be.visible')
}

function infoMsgExterno() {
    cy.get('#infoMsg').should('be.visible')
}

function welcomeExterno() {
    cy.get('#topDiv').should('be.visible')
}

export { acao_old, acao, entendiButton, popUpMessage, dialogMessage, confirmarDialogMessage, dialogMessageLGPD, continuarButton, validaTitulo, welcomeMessage, 
    errorMessageLogin, successMsg, warningMsg, infoMsg, errorMsg, warningMsgExterno, infoMsgExterno, welcomeExterno }

