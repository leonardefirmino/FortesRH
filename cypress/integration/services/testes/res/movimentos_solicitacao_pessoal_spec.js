import '../../../../../cypress.json'
import * as util from '../../../../support/util'
import { LoginPage } from '../../pages/loginPage'
import { SolicitacaoPessoalPage } from '../../pages/solicitacaoPessoalPage'

describe('Funcionalidade Solicitação de Pessoal', () => {
    const loginPage = new LoginPage()
    const solicitacaopessoalPage = new SolicitacaoPessoalPage()

    beforeEach('', () => {
        cy.inserirSolicitacaoPessoal()
        cy.inserecandidato("Candidato 01")
        solicitacaopessoalPage.navigate()
        loginPage.with('homolog', '1234')
    })
    
    it('Inserção de Solicitação de Pessoal', () => {
        solicitacaopessoalPage.preencheSolicitacaoPessoal()
        util.validaTitulo('Solicitação de Pessoal')
    })
    
    it('Edição de Solicitação de Pessoal', () => {
        cy.insereSolicitacaoEmAnalise()
        cy.reload()
        solicitacaopessoalPage.editaSolicitação('Vaga para DEV')
        util.validaTitulo('Solicitação de Pessoal')
    })
    
    it('Exclusão de Solicitação de Pessoal', () => {
        solicitacaopessoalPage.excluiSolicitação('Solicitação')
        util.popUpMessage('Confirma exclusão?')
        util.successMsg('Solicitação excluída com sucesso.')
    })
    
    it('Anexar Documentos à Solicitação de Pessoal', () => {
        solicitacaopessoalPage.anexaDocumentos('Solicitação')
        util.validaTitulo('Documentos da Solicitação de Pessoal: 1 - Solicitação')
    })
    
    it('Anunciar Solicitação de Pessoal', () => {
        solicitacaopessoalPage.anunciarSolicitacao('Solicitação')
        util.validaTitulo('Solicitação de Pessoal')
    })
    
    it('Anunciar Solicitação de Pessoal por email', () => {
        solicitacaopessoalPage.anunciarSolicitacaoPorEmail('Solicitação')
        util.infoMsg('Anúncio enviado com sucesso.')
    })
    
    it('Alterar Status Solicitação de Pessoal', () => {
        solicitacaopessoalPage.alterarStatusSolicitacaoAprovada('Solicitação')
        util.validaTitulo('Solicitação de Pessoal')
    })
    
    it('Suspender Solicitação de Pessoal', () => {
        solicitacaopessoalPage.suspenderSolicitacao('Solicitação')
        util.dialogMessage('Suspender Solicitação')
        solicitacaopessoalPage.suspenderSolicitacaoButton()
        util.infoMsg('Não existem solicitações a serem visualizadas!')
    })
    
    it('Encerrar Solicitação de Pessoal', () => {
        solicitacaopessoalPage.encerrarSolicitacao('Solicitação')
        util.infoMsg('Não existem solicitações a serem visualizadas!')
    })
    
    it('Clonar Solicitação de Pessoal', () => {
        solicitacaopessoalPage.clonarSolicitacao('Solicitação')
        util.validaTitulo('Solicitação de Pessoal')
    })
    
    it('Inserir Candidatos na Solicitação de Pessoal', () => {
        solicitacaopessoalPage.inserirCandidatosSolicitacao('Solicitação')
        cy.contains('Candidato 01')
    })
    
    it('Inserir Candidatos Modulo Externo na Solicitação de Pessoal', () => {        
        cy.insereCandidatoExterno("Candidato Mod Externo")
        solicitacaopessoalPage.inserirCandidatosExternoSolicitacao('Solicitação')
        util.successMsg('Candidato(s) inserido(s) no processo selectivo com sucesso.')
    })    
    
    it('Contratar Candidatos na Solicitação de Pessoal', () => {
        cy.insereCandidatoExterno("Candidato Mod Externo")
        solicitacaopessoalPage.contrataCandidatoDaSolicitacao('Solicitação')
        util.validaTitulo('Inserir Talento')
        
    })  
    
    it('Inserir HIstórico de Candidato - Valisda Solides', () => {
        cy.insereEtapaSeletiva('Teste')
        cy.insereTokenSolides()
        cy.insereCandidatoExterno("Candidato Mod Externo")
        solicitacaopessoalPage.historicoCandidato('Solicitação')
        cy.contains('O cadastro do candidato não foi localizado na Sólides')        
    })
})
