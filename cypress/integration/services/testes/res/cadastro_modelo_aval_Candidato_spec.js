import '../../../../../cypress.json'
import { LoginPage } from '../../pages/loginPage'
import { MessagePage } from '../../pages/messagePage'
import { ModeloAvaliacaoCandidatoPage } from '../../pages/modeloAvaliacaoCandidatoPage'

describe('Funcionalidade Modelo Avaliação Candidatos', () => {
    const loginPage = new LoginPage()
    const messagePage = new MessagePage()
    const modeloAvaliacaoCandidatoPage = new ModeloAvaliacaoCandidatoPage()

    beforeEach('', () => {
        cy.reload_db()
        cy.inseremodeloAvaliacaoCandidato('Avaliação Teste')
        modeloAvaliacaoCandidatoPage.navigate()
        loginPage.loggedIn('homolog', '1234')
    })
    
    it('Inserção de Modelo Avaliação Candidatos', () => {
        modeloAvaliacaoCandidatoPage.insereModeloAvaliacao()
        messagePage.successMsg('Pergunta gravada com sucesso')
    })

    it('Edição de Modelo Avaliação Candidatos', () => {
        modeloAvaliacaoCandidatoPage.editarMotivo('Editar', 'Avaliação Teste')
        messagePage.validaTitulo('Modelos de Avaliação do Candidato')
    })

    it('Exclusão de Modelo Avaliação Candidatos', () => {
        modeloAvaliacaoCandidatoPage.excluirMotivo('Excluir', 'Avaliação Teste')
        messagePage.popUpMessage('Confirma exclusão?')
        messagePage.successMsg('Modelo de avaliação excluído com sucesso.')
    })

    it('Visualizar Perguntas de Modelo Avaliação Candidatos', () => {
        modeloAvaliacaoCandidatoPage.acao('Visualizar', 'Avaliação Teste')
        cy.contains('Título: Avaliação Teste')
    })

    it('Visualizar a GRID de Perguntas de Modelo Avaliação Candidatos', () => {
        modeloAvaliacaoCandidatoPage.acao('Perguntas', 'Avaliação Teste')
        cy.contains('Pergunta 01')
    })

    it('Visualizar a GRID de Perguntas de Modelo Avaliação Candidatos', () => {
        modeloAvaliacaoCandidatoPage.acao('Aspectos', 'Avaliação Teste')
        messagePage.validaTitulo('Aspectos da Avaliação')
    })

    it('Clonar Modelo Avaliação Candidatos', () => {
        modeloAvaliacaoCandidatoPage.acao('Clonar', 'Avaliação Teste')
        modeloAvaliacaoCandidatoPage.clicaClonar()        
        cy.contains('Avaliação Teste (Clone)')
    })
})

