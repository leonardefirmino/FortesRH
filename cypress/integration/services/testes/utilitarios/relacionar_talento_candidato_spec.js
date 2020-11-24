import '../../../../../cypress.json'
import * as util from '../../../../support/util'
import { LoginPage } from '../../pages/loginPage'
import { RelacionarCandidatoTalentoPage } from '../../pages/relacionarCandidatoTalentoPage'

describe('Relacionador de Candidado e Talento', () => {
    const loginPage = new LoginPage()
    const relacionarCandidatoTalentoPage = new RelacionarCandidatoTalentoPage()

    beforeEach('', () => {
        relacionarCandidatoTalentoPage.navigate()
        loginPage.loggedIn('homolog', '1234')
    })

    it('Relacionar Candidato e Colaborador', () => {
        cy.insereColaborador('Helena de Troia')
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