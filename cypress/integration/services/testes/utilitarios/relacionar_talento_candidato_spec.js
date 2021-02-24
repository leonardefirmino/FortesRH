import '../../../../../cypress.json'

describe('Relacionador de Candidado e Talento', () => {

    beforeEach('', () => {
        cy.visit('/geral/colaborador/prepareRelacionaColaboradorCandidato.action')
        cy.clicaBotaoContinuar()
    });

    it('Relacionar Candidato e Colaborador', () => {
        cy.insereUsuarioComEmpregado('Helena')
        cy.inserecandidato('Helena de Troia')
        cy.reload()
        cy.relacionarCandidato()
        cy.validaDialog('Caso a solicitação de pessoal não seja selecionada, não será possível informar que este candidato/talento foi contratado por esta solicitação.')
    })

    it('Relacionar Candidato e Colaborador - Colaborador e Candidato inexistente', () => {cy.visit('/geral/colaborador/prepareRelacionaColaboradorCandidato.action')
        cy.validaMensagemInformacao('Não existem talentos para relacionar com candidatos de mesmo CPF.')
        
    })
}) 