import '../../../../../cypress.json'
import * as util from '../../../../support/util'
import { RelacionarCandidatoTalentoPage } from '../../pages/relacionarCandidatoTalentoPage'

describe('Relacionador de Candidado e Talento', () => {
    const relacionarCandidatoTalentoPage = new RelacionarCandidatoTalentoPage()

    beforeEach('', () => {
        relacionarCandidatoTalentoPage.navigate()
    })

    it('Relacionar Candidato e Colaborador', () => {
        cy.insereUsuarioComEmpregado('Helena')
        cy.inserecandidato('Helena de Troia')
        cy.reload()
        relacionarCandidatoTalentoPage.relacionar()
        util.dialogContentMessage('Caso a solicitação de pessoal não seja selecionada, não será possível informar que este candidato/talento foi contratado por esta solicitação.')
        util.confirmarDialogMessage('Confirmar')
    })

    it('Relacionar Candidato e Colaborador - Colaborador e Candidato inexistente', () => {
        util.infoMsg('Não existem talentos para relacionar com candidatos de mesmo CPF.')
    })
}) 