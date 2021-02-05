import '../../../../../cypress.json'
import * as util from '../../../../support/util'
import { LoginPage } from '../../pages/loginPage'
import { AvaliacaoDesempenhoPage } from '../../pages/aval_desempenhoPage'
import { ResponderAvaliacaoDesempenhoPage } from '../../pages/responder_avaliacaoPage'

describe('Avaliação de Desempenho', () => {
    const loginPage = new LoginPage()    
    const avalDesempenhoPage = new AvaliacaoDesempenhoPage()
    const responderavalDesempenhoPage = new ResponderAvaliacaoDesempenhoPage()
   


    beforeEach('', () => {
        avalDesempenhoPage.navigate()
        loginPage.loggedIn('homolog', '1234')
    })

    it('Responder Avaliação de Desempenho', () => {
        const avaliacao = {
            Titulo: 'Avaliação de Desempenho', PeriodoInicial: '01/08/2020', PeriodoFinal: '31/08/2020', ModeloAvaliacao: 'Não',
            PermiteAutoavaliacao: 'Sim', Anonima: 'Não', Colaborador: 'Helena de Troia'
        }

        cy.insereColaborador('Helena de Troia')
        cy.inseremodeloAvaliacaoDesempenho('Avaliação Teste')
        cy.insereAvaliacaoDesempenho()
        cy.reload()
        avalDesempenhoPage.insereParticipantes(avaliacao)
        cy.get('[style="width: 760px; margin: 0 auto;"] > #btnGravar').click()
        cy.exec_sql("update avaliacaodesempenho set liberada = true")
        responderavalDesempenhoPage.navigate()
        responderavalDesempenhoPage.responder()
        util.successMsg('Respostas gravadas com sucesso.')
        responderavalDesempenhoPage.excluirResposta()
        util.popUpMessage('Confirma exclusão das respostas?')
        util.successMsg('Respostas da avaliação de desempenho excluídas com sucesso.')
    })
}) 