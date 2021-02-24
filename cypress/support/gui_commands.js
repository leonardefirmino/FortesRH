// Cypress.Commands.add("loginByApi", (username = Cypress.env('user_name'), password = Cypress.env('user_password')) => {
//     return cy.request("POST", `${Cypress.env("baseUrl")}/login.action?`, {
//       username,
//       password,
//     });
//   });

Cypress.Commands.add('loginByApi', () => {
    const formData = new FormData();
    formData.append("username", 'SOS');
    formData.append("password", '1234');
    formData.append("j_empresa", "1");
    cy.request({
        url: 'http://localhost:8080/fortesrh/login.action?',
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        form: true,
        failOnStatusCode: false,
        body: formData
    })
})

Cypress.Commands.add('login', () => {
    cy.visit('/login.action?')
    cy.get('input[placeholder = "Usuário"]').should('be.enabled').clear().type(Cypress.env('user_name'))
    cy.get('input[placeholder = "Senha"]').should('be.enabled').clear().type(Cypress.env('user_password'))
    cy.get('#empresa').should('be.visible').select(Cypress.env('company'))
    cy.get('#entrar').should('be.visible').click()

    cy.url().should('be.equal', `${Cypress.config("baseUrl")}/index.action`)

    cy.get('.nomeUsuario').should('be.visible').and('include.text', Cypress.env('user_name'))
})

Cypress.Commands.add('loginWith', (user, pass) => {
    cy.get('input[placeholder = "Usuário"]').should('be.enabled').clear().type(user)
    cy.get('input[placeholder = "Senha"]').should('be.enabled').clear().type(pass)
    cy.get('#entrar').should('be.visible').click()
})

Cypress.Commands.add('clicaBotaoEntendi', () => {
    switch (cy.get('.done').click({ multiple: true, force: true })) {
        case 0:
            cy.get('.done').should('be.visible')
            break;
    }
    cy.get('.done').should('not.exist')
})

Cypress.Commands.add("clicaBotao", (id) => {
    cy.get('#btn' + id).click()
})

Cypress.Commands.add('popUpMessage', (text) => {
    cy.get('#popup_message').then(($popup) => {
        if ($popup.text().includes(text)) {
            cy.get('#popup_ok').click()
        } else {
            console.log('erro')
        }
    })
    cy.get('#popup_message').should('not.exist')
})

Cypress.Commands.add('validaDialog', (text) => {
    cy.get('.ui-dialog-content').should('contain', text)
    cy.get('.ui-dialog-buttonpane').within(($form) => {
        cy.contains('Confirmar').click()
    }) 

})

Cypress.Commands.add('clicaBotaoContinuar', () => {
    cy.get(':nth-child(1) > .ui-button-text').click()
})

Cypress.Commands.add('logout', () => {
    cy.visit('/logout.action')
    cy.url()
        .should('be.equal', `${Cypress.config("baseUrl")}/login.action`)
})

Cypress.Commands.add('validaEmpresaLogada', (text) => {
    cy.get('#userDiv').should('include.text', text)
})

Cypress.Commands.add('validaMensagemSucesso', (message) => {
    cy.get('#successMsg').should('include.text', message)
})

Cypress.Commands.add('validaMensagemAlerta', (message) => {
    cy.get('#warningMsg').should('include.text', message)
})

Cypress.Commands.add('validaMensagemInformacao', (message) => {
    cy.get('#infoMsg').should('include.text', message)
})

Cypress.Commands.add('validaMensagemErro', (message) => {
    cy.get('#errorMsg').should('include.text', message)
})

Cypress.Commands.add('validaMensagemBoasVindas', (message) => {
    cy.get('.saudacao').should('contain', message)
})

Cypress.Commands.add('validaMensagemErroLogin', (message) => {
    cy.get('.txtErro').should('contain', message)
})

Cypress.Commands.add('alterarSenhaPagina', () => {
    cy.visit('/acesso/usuario/prepareUpdateSenhaUsuario.action')
    cy.clicaBotaoContinuar()
})

Cypress.Commands.add('alterarSenha', (password, newPass, confPass) => {
    cy.alterarSenhaPagina()
    if (password != '' || newPass != '' || confPass != '') {
        cy.get('#senha').clear().type(password)
        cy.get('#novaSenha').clear().type(newPass)
        cy.get('#confSenha').clear().type(confPass)
        cy.get('#btnGravar').click()
    } else {
        cy.get('#btnGravar').click()
    }
})

Cypress.Commands.add('alterarSenhaPrimeiroAcesso', (password) => {
    cy.get('#senha').clear().type(password)
    cy.get('#confNovaSenha').clear().type(password)
    cy.get('#alterarSenha').click()
})

Cypress.Commands.add('preencheDadosCandidato', candidato => {

    cy.get('#nome').clear().should('be.enabled').type(candidato.nome)
    cy.get('#nascimento').clear().type('14/06/2012')
    cy.get('#naturalidade').clear().type(candidato.naturalidade)
    cy.get('#sexo').select(candidato.sexo)
    cy.get('#cpf').clear().type('34425164555')
    cy.get('#escolaridade').select('Ensino Médio completo')
    cy.get('#cep').clear().type('60822285')
    cy.get('#num').clear().type('249')
    cy.get('#uf').select('CE')
    cy.get('#cidade').select('Fortaleza')
    cy.get('#ddd').clear().type('85')
    cy.get('#fone').clear().type('40051111')
    cy.get('#senha').clear().type('1234')
    cy.get('#comfirmaSenha').clear().type('1234')
})

Cypress.Commands.add('inserirCandidato', (candidato) => {
    cy.visit('/captacao/candidato/list.action')
    cy.clicaBotaoContinuar()
    cy.clicaBotao('Inserir')
    cy.preencheDadosCandidato(candidato)

})

Cypress.Commands.add('relacionarCandidato', () => {
    cy.get('#relacionaAcao0').click()
})