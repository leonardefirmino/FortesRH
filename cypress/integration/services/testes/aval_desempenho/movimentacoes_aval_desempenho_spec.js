import '../../../../../cypress.json'
import * as util from '../../../../support/util'
import { LoginPage } from '../../pages/loginPage'
import { AvaliacaoDesempenhoPage } from '../../pages/aval_desempenhoPage'

describe('Avaliação de Desempenho', () => {
    const loginPage = new LoginPage()
    const avalDesempenhoPage = new AvaliacaoDesempenhoPage()

    const avaliacao = {
        Titulo: 'Avaliação de Desempenho Grupo Fortes', PeriodoInicial: '01/08/2020', PeriodoFinal: '31/08/2020', ModeloAvaliacao: 'Não',
        PermiteAutoavaliacao: 'Sim', Anonima: 'Não', Colaborador: 'Helena de Troia'
    }

    beforeEach('', () => {
        cy.reload_db()
        avalDesempenhoPage.navigate()
        loginPage.loggedIn('homolog', '1234')
    })

    it('Inserir Avaliação de Desempenho', () => {
        cy.insereColaborador('Helena de Troia')
        avalDesempenhoPage.cadastraAvaloiacaoDesempenho(avaliacao)
        util.successMsg('Gravado com sucesso.')
    })

    it('Inserir Talentos na Avaliação de Desempenho - Acima do limite', () => {
        const avaliacao = { Titulo: 'Avaliação de Desempenho' }
        cy.insere_X_Colaborador(51)
        cy.inseremodeloAvaliacaoDesempenho('Avaliação Teste')
        cy.insereAvaliacaoDesempenho()
        cy.reload()
        avalDesempenhoPage.insereParticipantes(avaliacao)
        cy.contains('Não é possível realizar esse procedimento, pois serão vinculados 51 avaliados com 51 avaliadores, gerando 2601 registros a serem gravados. Isso poderia causar uma inconsistência.')
    })

    it('Inserir Talentos na Avaliação de Desempenho - Não Aceita Auto Avaliação', () => {
        const avaliacao = {
            Titulo: 'Avaliação de Desempenho', PeriodoInicial: '01/08/2020', PeriodoFinal: '31/08/2020', ModeloAvaliacao: 'Não',
            PermiteAutoavaliacao: 'Não', Anonima: 'Não', Colaborador: 'Helena de Troia'
        }

        cy.insereColaborador('Helena de Troia')
        cy.inseremodeloAvaliacaoDesempenho('Avaliação Teste')
        cy.insereAvaliacaoDesempenho_NaoPermiteAutoAvaliacao()
        cy.reload()
        avalDesempenhoPage.insereParticipantes(avaliacao)
        cy.contains('A avaliação não permite autoavaliação')
    })

    it('Excluir Avaliação de Desempenho', () => {
        const avaliacao = { Titulo: 'Avaliação de Desempenho' }

        cy.inseremodeloAvaliacaoDesempenho('Avaliação Teste')
        cy.insereAvaliacaoDesempenho_NaoPermiteAutoAvaliacao()
        cy.reload()
        avalDesempenhoPage.excluir(avaliacao)
        util.popUpMessage('Confirma exclusão?')
        util.successMsg('Avaliação de desempenho excluída com sucesso.')
    })
}) 