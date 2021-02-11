import '../../../../../cypress.json'
import * as util from '../../../../support/util'

import { TalentoCandidatoPage } from '../../pages/talentoCandidatoPage'
import { ColaboradorCandidatoPage } from '../../pages/ColaboradorCandidatoPage'

describe('Funcionalidade de Cadastro de Colaborador', () => {
    const talentoPage = new TalentoCandidatoPage()
    const colaboradorCandidato = new ColaboradorCandidatoPage()

    const dados = { ColaboradorAtivo: "Sophie Charlotte", ColaboradorAtivo2: "Carolina Dieckman", Colaborador: "Helena de Troia", EntrevistaDesligamento: "Entrevista de Desligamento" }

    beforeEach('', () => {
        cy.insereColaboradorDemitido(dados.Colaborador)
        cy.insereColaborador(dados.ColaboradorAtivo)
        talentoPage.navigate_talentoPage()
    })

    it('Responder Entrevista de Desligamento', () => {
        cy.insereEntrevistaDesligamento(dados.EntrevistaDesligamento)
        talentoPage.pesquisaTalento()
        talentoPage.respondeEntrevistaDesligamento(dados)
        util.infoMsg('Respostas gravadas com sucesso.')
    })

    it('Cadastro Colaborador', () => {
        talentoPage.insereColaborador(dados)        
        talentoPage.dadosFuncionais()
        colaboradorCandidato.insereFormacao()
        colaboradorCandidato.insereIdiomas()
        colaboradorCandidato.insereDocumentos()
        cy.get('#gravar').click()
        cy.contains('Talento Sophie Charlotte cadastrado com sucesso.')
    })

    it('Tentativa de criar acesso ao sistema com empregado demitido', () => {
        talentoPage.pesquisaTalento()
        talentoPage.criaAcessoSistema(dados)
        cy.contains('* O usuário tem referência com o talento Helena de Troia, que está desligado(a).')
    })

    it('Excluir Colaborador', () => {
        cy.reload()
        talentoPage.excluir(dados)
        util.popUpMessage('Confirma exclusão?')
        cy.validaMensagemSucesso('Talento excluído com sucesso.')
    })

    it('Editar Colaborador', () => {
        cy.reload()
        talentoPage.editar(dados)
        cy.validaMensagemSucesso('Talento Sophie Charlotte alterado com sucesso.')
    })

    it('Progressão Colaborador', () => {
        cy.reload()
        talentoPage.visualizarProgressao(dados)
        talentoPage.inserirNovaSituação()
        util.validaTitulo('Editar Situações do Talento')
    })

    it('Inserir Competência do Colaborador - Quando não existem competências configuradas', () => {
        talentoPage.inserirCompetencia(dados)
        util.infomsg('Não existem competências configuradas para Analista Dep Pessoal Senior na data informada.')
    })

    it('Inserir Competência do Colaborador', () => {
        cy.insereColaboradorComCompetencias(dados.ColaboradorAtivo2)
        cy.visit('/captacao/nivelCompetenciaHistorico/list.action')
        cy.get(':nth-child(1) > .ui-button-text').click()
        cy.get('#inserir').click()
        cy.get('#peso_0').clear().type('4')
        cy.get('#percentual_0').clear().type('80')
        cy.get('#btnGravar').click()
        cy.visit('/cargosalario/cargo/list.action')
        cy.get(':nth-child(1) > .ui-button-text').click()
        util.acao('Faixa Salarial', 'Encarregado Departamento Pessoal')
        util.acao('Níveis de Competência', 'Júnior')
        cy.get('#btnInserir').click()
        cy.get('#checkAllCompetenciaConhecimento').click()
        cy.get('.checkNivelConhecimento').check()
        cy.get('#btnGravar').click()
        talentoPage.navigate_talentoPage()
        util.acao('Competências', dados.ColaboradorAtivo2)
        cy.get('#btnInserir').click()
        cy.get('#avaliador').select('Anônimo')
        cy.get('#checkAllCompetencia').check()
        cy.get('.checkNivel').check()
        cy.get('#btnGravar').click()
        cy.validaMensagemSucesso('salvos com sucesso.')
    })
})