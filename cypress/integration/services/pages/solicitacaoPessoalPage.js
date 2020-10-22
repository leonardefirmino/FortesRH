import * as util from '../../../support/util'

export class SolicitacaoPessoalPage {

    navigate() {
        cy.visit('/captacao/solicitacao/list.action')
    }

    clicaInserir() {
        cy.get('#btnInserir').click()
        cy.get('.done').click()
    }

    dataSolicitacao() {
        cy.get('#dataSol').clear().type('10/10/2020')
    }

    descricao() {
        cy.get('#descricao').clear().type('Solicitação de Pessoal')
    }

    horario() {
        cy.get('#horarioComercial').clear().type('Horário Comercial')
    }

    estabelecimento() {
        cy.get('#estabelecimento').select('Estabelecimento Padrão')
    }

    areaOrganizacional() {
        cy.get('#area').select('Área Teste')
    }

    cargo() {
        cy.get('#faixa').select('Cargo Teste Faixa_Nome')

        if (cy.get('#popup_title').should('be.visible')) {
            cy.get('#popup_ok').click()
        } else {
            cy.log('Nothing to do')
        }

    }

    motivoSolicitacao() {
        cy.get('#motivoSolicitacaoId').select('Aumento de Quadro')
    }

    suspenderSolicitacaoButton() {
        cy.get('#suspendeDiv').within(($form) => {
            cy.get('.flat').first().should('contain', 'Suspender Solicitação').click()
        })
    }

    encerraSolicitacaoButton() {
        cy.get('#formDialog').within(($form) => {
            cy.get('.flat').first().should('contain', 'Encerrar Solicitação').click()
        })

    }

    statusAprovado() {
        cy.get('#statusSolicitcao').select('Aprovada')
    }

    clicaGravar() {
        cy.get('#btnGravar').click()
    }

    preencheSolicitacaoPessoal() {
        this.clicaInserir()
        this.dataSolicitacao()
        this.descricao()
        this.horario()
        this.estabelecimento()
        this.areaOrganizacional()
        this.cargo()
        this.motivoSolicitacao()
        this.statusAprovado()
        this.clicaGravar()
    }

    preencheAnuncio() {
        cy.get('#titulo').clear().type('Anuncio de Solicitação')
        cy.get('#cabecalho').clear().type('Anuncio de Solicitação')
        cy.get('#exibirModuloExterno').select('Sim')
        cy.get('#dataPrevisaoEncerramento').clear().type('10/10/2020')
    }

    anunciaPorEmail() {
        cy.get('#btnEnviarPorEmail').click()
        cy.get('#enviaEmail_anuncio_titulo').clear().type('Anuncio de Solicitação')
        cy.get('#email').clear().type('teste@teste.com.br')
        cy.get('.btnEnviar').click()
    }

    editaSolicitação(nome_Solicitação) {

        cy.get('#solicitacao').find(`td:contains("${nome_Solicitação}")`).parent().parent().find('.icon-awesome[title="Editar"]').click({ force: true })
        cy.get('.done').click({ force: true })
        this.motivoSolicitacao()
        this.statusAprovado()
        this.clicaGravar()
    }

    excluiSolicitação(nome_Solicitação) {
        cy.get('#solicitacao').find(`td:contains("${nome_Solicitação}")`).parent().parent().parent().parent().find('.icon-awesome.remove').click({ force: true })
    }

    anexaDocumentos(nome_Solicitação) {
        cy.get('#solicitacao').find(`td:contains("${nome_Solicitação}")`).parent().parent().parent().parent().find('.icon-awesome[title="Documentos da Solicitação de Pessoal"]').click({ force: true })
        cy.get('.done').click({ force: true })
        cy.get('#btnInserir').click()
        this.descricao()
        cy.get('#data').clear().type('05/10/2020')
        cy.get('#documento').attachFile('Anexo.jpeg')
        this.clicaGravar()
    }

    anunciarSolicitacao(nome_Solicitação) {
        cy.get('#solicitacao').find(`td:contains("${nome_Solicitação}")`).parent().parent().parent().parent().find('.icon-awesome[title="Anunciar"]').click({ force: true })
        cy.get('.done').click({ force: true })
        this.preencheAnuncio()
        this.clicaGravar()
    }

    anunciarSolicitacaoPorEmail(nome_Solicitação) {
        cy.get('#solicitacao').find(`td:contains("${nome_Solicitação}")`).parent().parent().parent().parent().find('.icon-awesome[title="Anunciar"]').click({ force: true })
        cy.get('.done').click({ force: true })
        this.preencheAnuncio()
        this.anunciaPorEmail()
    }

    alterarStatusSolicitacaoAprovada(nome_Solicitação) {
        cy.get('#solicitacao').find(`td:contains("${nome_Solicitação}")`).parent().parent().parent().parent().find('.icon-awesome[title="Alterar status (Aprovada)"]').click({ force: true })
        cy.get('#statusSolicitcao').select('Reprovada')
        cy.get('#dataStatus').clear().type('05/10/2020')
        cy.get('#observacaoLiberador').clear().type('Solicitação de Pessoal Reprovada pelo Gestor')
        cy.get('#gravarStatus').click()
    }

    suspenderSolicitacao(nome_Solicitação) {
        cy.get('#solicitacao').find(`td:contains("${nome_Solicitação}")`).parent().parent().parent().parent().find('.icon-awesome[title="Suspender solicitação"]').click({ force: true })
        cy.get('#obsSuspensao').clear().type('Suspenso pelo Gestor')

    }

    encerrarSolicitacao(nome_Solicitação) {
        cy.get('#solicitacao').find(`td:contains("${nome_Solicitação}")`).parent().parent().parent().parent().find('.icon-awesome[title="Encerrar Solicitação"]').click({ force: true })
        util.dialogMessage('Encerrar Solicitação')
        cy.get('#dataEncerramento').clear().type('05/10/2020')
        cy.get('#obsAprova').clear().type('Encerrada')
        this.encerraSolicitacaoButton()
        
    }

    inserirCandidatosSolicitacao(nome_Solicitação) {
        cy.get('#solicitacao').find(`td:contains("${nome_Solicitação}")`).parent().parent().parent().parent().find('.icon-awesome[title="Candidatos da Seleção"]').click({ force: true })
        cy.get('.done').click({ force: true })  
        cy.get('#btnTriagem').click() 
        cy.get('#flat').click() 
        cy.get('#md').click()
        cy.get('#btnInserirSelecionados').click()
    }
    
    inserirCandidatosExternoSolicitacao(nome_Solicitação) {
        cy.get('#solicitacao').find(`td:contains("${nome_Solicitação}")`).parent().parent().parent().parent().find('.icon-awesome[title="Candidatos da Seleção"]').click({ force: true })
        cy.get('.done').click({ force: true })  
        cy.get('#btnTriagemModuloExterno').click() 
        cy.get('#md').click()
        cy.get('.btnInserirSelecionados').click()
    }

    contrataCandidatoDaSolicitacao(nome_Solicitação) {
        this.inserirCandidatosExternoSolicitacao(nome_Solicitação)
        cy.get('.btnVoltar').click()
        util.acao_old('Contratar', 'Candidato Mod Externo')
        util.dialogMessage('Contratar')
        util.confirmarDialogMessage('Contratar')
    }
    

    historicoCandidato(nome_Solicitação) {
        this.inserirCandidatosExternoSolicitacao(nome_Solicitação)
        cy.get('.btnVoltar').click()
        util.acao_old('Histórico', 'Candidato Mod Externo')
        cy.get('#btnInserir').click()
        
    }

    clonarSolicitacao(nome_Solicitação) {
        cy.get('#solicitacao').find(`td:contains("${nome_Solicitação}")`).parent().parent().parent().parent().find('.icon-awesome[title="Clonar"]').click({ force: true })
        cy.get('.done').click({ force: true })        
        this.dataSolicitacao()
        this.descricao()
        this.horario()
        this.estabelecimento()
        this.areaOrganizacional()
        this.cargo()
        this.motivoSolicitacao()
        this.statusAprovado()
        this.clicaGravar()
    }


}
