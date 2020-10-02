export class MessagePage {

    welcomeMessage(text) {
        cy.get('.saudacao').should('contain', text)
    }

    errorMessageLogin(text) {
        cy.get('.txtErro').should('contain', text)
    }

    entendiButton() {
        cy.get('.done').click()
    }

    successMsg(text) {
        cy.get('#successMsg').should('contain', text)
    }

    warningMsg(text) {
        cy.get('#warningMsg').should('contain', text)
    }

    infoMsg(text) {
        cy.get('#infoMsg').should('contain', text)
    }

    errorMsg(text) {
        cy.get('#errorMsg').should('contain', text)
    }

    warningMsgExterno() {
        cy.get('#warnings').should('be.visible')
    }
    
    infoMsgExterno() {
        cy.get('#infoMsg').should('be.visible')
    }

    welcomeExterno() {
        cy.get('#topDiv').should('be.visible')
    }


    popUpMessage(text) {
        cy.get('#popup_message').then(($popup) => {
            if ($popup.text().includes(text)) {
                cy.get('#popup_ok').click()
            } else {
                console.log('erro')
            }
        })
    }

    dialogMessage(text) {
        cy.get('.ui-dialog-title').should('contain', text)
    }  

    confirmarDialogMessage() {
        cy.get(':nth-child(1) > .ui-button-text').should('contain', 'Confirmar').click()
    }

    dialogMessageLGPD(text) {
        cy.get('#ui-dialog-title-termo-privacidade-politica-seguranca').should('contain', text)
    }    

    continuarButton() {
        cy.get('.ui-button-text').click()
    } 

    validaTitulo(text) {
        cy.get('#waDivTitulo').should('contain', text)
    }

}

