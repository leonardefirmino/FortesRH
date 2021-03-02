const faker = require('faker')

Cypress.Commands.add('loginByApi', () => {
    return cy.request({
        url: 'http://localhost:8080/fortesrh/login',
        method: 'post',
        headers: {
            "content-type": "application/x-www-form-urlencoded",
        },
        referrer: "http://localhost:8080/fortesrh/login.action",
        referrerPolicy: "no-referrer-when-downgrade",
        body: `username=${Cypress.env('user_name')}&password=${Cypress.env('user_password')}&j_empresa=${Cypress.env('company_id')}`,
        method: "POST",
        mode: "cors",
        credentials: "include",
    }).then(() => {
        cy.visit('http://localhost:8080/fortesrh/index.action')
        cy.clicaBotaoContinuar()
        cy.clicaBotaoEntendi()
    })
})

Cypress.Commands.add('validaURL', (url) => {
    cy.url().should('be.equal', `${Cypress.config("baseUrl")}` + url)
})

Cypress.Commands.add('login', () => {
    cy.visit('/login.action?')
    cy.get('input[placeholder = "Usuário"]').should('be.enabled').clear().type(Cypress.env('user_name'))
    cy.get('input[placeholder = "Senha"]').should('be.enabled').clear().type(Cypress.env('user_password'))
    cy.get('#empresa').should('be.visible').select(Cypress.env('company'))
    cy.get('#entrar').should('be.visible').click()
    cy.validaURL('/index.action')
    cy.get('.nomeUsuario').should('be.visible').and('include.text', Cypress.env('user_name'))
})

Cypress.Commands.add('loginWith', (user, pass) => {
    cy.get('input[placeholder = "Usuário"]').should('be.enabled').clear().type(user).should('not.be')
    cy.get('input[placeholder = "Senha"]').should('be.enabled').clear().type(pass)
    cy.get('#empresa').should('be.visible').select(Cypress.env('company'))
    cy.get('#entrar').should('be.visible').click()
    cy.validaURL('/index.action')
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
    cy.get('#btn' + id).should('be.visible').click()
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

    cy.get('#nome').clear().should('be.enabled').clear().type(candidato.nome)
    cy.get('#nascimento').should('be.enabled').clear().type('14/06/2012')
    cy.get('#naturalidade').should('be.enabled').clear().type(candidato.naturalidade)
    cy.get('#sexo').select(candidato.sexo)
    cy.get('#cpf').should('be.enabled').clear().type('34425164555')
    cy.get('#escolaridade').select('Ensino Médio completo')
    cy.get('#cep').should('be.enabled').clear().type('60822285')
    cy.get('#num').should('be.enabled').clear().type('249')
    cy.get('#uf').select('CE')
    cy.get('#cidade').select('Fortaleza')
    cy.get('#ddd').should('be.enabled').clear().type('85')
    cy.get('#fone').should('be.enabled').clear().type(candidato.fone)
    cy.get('#senha').should('be.enabled').clear().type(candidato.senha)
    cy.get('#comfirmaSenha').should('be.enabled').clear().type(candidato.senha)
})

Cypress.Commands.add('validaParentesco', () => {
    cy.clicaBotao('Inserir')
    cy.get('#nomePai').clear().type('João Paulo')
    cy.get('#profPai').focus()
})

Cypress.Commands.add('inserirCandidato', (candidato) => {
    cy.visit('/captacao/candidato/list.action')
    cy.clicaBotaoContinuar()
    cy.clicaBotao('Inserir')
    cy.preencheDadosCandidato(candidato)
    cy.insereFormacao()
    cy.insereIdiomas()
    cy.insereDocumentos()
    cy.clicaBotao('Gravar')

})

Cypress.Commands.add('insereFormacao', () => {
    cy.get('.abaFormacaoEscolar').click()
    cy.get('#inserirFormacao').click()
    cy.get('#formacaoArea').select('Administrativa')
    cy.get('#formacaoCurso').should('be.enabled').clear().type('ADS')
    cy.get('#formacaoLocal').should('be.enabled').clear().type('Unifor')
    cy.get('#formacaoTipo').select('Graduação')
    cy.get('#formacaoSituacao').select('Concluído')
    cy.get('#formacaoConclusao').should('be.enabled').clear().type('2020')
    cy.get('ul > #frmFormacao').click()
})

Cypress.Commands.add('insereIdiomas', () => {
    cy.get('#inserirIdioma').click()
    cy.get('#idiomaSelec').select('Inglês')
    cy.get('#nivelSelec').select('Avançado')
    cy.get('#gravarIdioma').click()

    cy.get('#desCursos').should('be.enabled').clear().type(faker.lorem.sentence())
})

Cypress.Commands.add('insereDocumentos', () => {
    cy.get('#aba5 > a').click()
    cy.get('#pis').should('be.enabled').clear().type('12345678919')
})

Cypress.Commands.add('relacionarCandidato', () => {
    cy.get('#relacionaAcao0').click()
})

Cypress.Commands.add('dialogMessageMesmoCPF', (text) => {
    cy.get('#talentoMesmoCpfDialog').should('include.text', text)
    cy.get(':nth-child(1) > .ui-button-text').click()
})

Cypress.Commands.add('dialogMessage', (text) => {
    cy.get('#ui-dialog-title-parentesDialog').should('contain', text)
    cy.contains('Fechar').click()
})