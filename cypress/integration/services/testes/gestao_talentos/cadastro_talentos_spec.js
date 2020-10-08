import '../../../../../cypress.json'
import * as util from '../../../../support/util'

import { LoginPage } from '../../pages/loginPage'
import { TalentoCandidatoPage } from '../../pages/talentoCandidatoPage'

describe('Funcionalidade de Cadastro de Colaborador', () => {
    const loginPage = new LoginPage()
    const talentoPage = new TalentoCandidatoPage()

    const dados = { ColaboradorAtivo: "Sophie Charlotte", Colaborador: "Helena de Troia", EntrevistaDesligamento: "Entrevista de Desligamento" }

    beforeEach('', () => {
        cy.reload_db()
        cy.insereColaboradorDemitido(dados.Colaborador)
        talentoPage.navigate_talentoPage()
        loginPage.loggedIn('homolog', '1234')
    })
    it.only('Responder Entrevista de Desligamento', () => {
        cy.insereEntrevistaDesligamento(dados.EntrevistaDesligamento)
        talentoPage.pesquisaTalento()
        talentoPage.respondeEntrevistaDesligamento(dados)
        util.infoMsg('Respostas gravadas com sucesso.')
    })

    it.only('Tentativa de criar acesso ao sistema com empregado demitido', () => {
        talentoPage.pesquisaTalento()
        talentoPage.criaAcessoSistema(dados)
        cy.contains('* O usuário tem referência com o talento Helena de Troia, que está desligado(a).')
    })

    it.only('Excluir Colaborador', () => {
        cy.insereColaborador(dados.ColaboradorAtivo)
        cy.reload()
        talentoPage.excluir(dados)
        util.popUpMessage('Confirma exclusão?')
        util.successMsg('Talento excluído com sucesso.')
    })

    it.only('Editar Colaborador', () => {
        cy.insereColaborador(dados.ColaboradorAtivo)
        cy.reload()
        talentoPage.editar(dados)
        util.successMsg('Talento Sophie Charlotte alterado com sucesso.')
    })

    // it.only('Desligar Colaborador', () => {
    //     cy.insereColaborador(dados.ColaboradorAtivo)
    //     cy.reload()
    //     talentoPage.desligarColaborador(dados)
    // })

    it.only('Progressão Colaborador', () => {
        cy.insereColaborador(dados.ColaboradorAtivo)
        cy.reload()
        talentoPage.visualizarProgressao(dados)
        talentoPage.inserirNovaSituação()
        util.validaTitulo('Editar Situações do Talento')
    })
})