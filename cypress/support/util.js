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

export { acao_old, acao, entendiButton }

