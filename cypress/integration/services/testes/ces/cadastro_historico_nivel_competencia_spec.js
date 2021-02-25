import '../../../../../cypress.json'
import * as util from '../../../../support/util'
import { HistoricoNivelCompetenciaPage } from '../../pages/historicoNivelCompetenciaPage'

describe('Funcionalidade Histórico Nivel de Competencia', () => {
    const historicoNivelCompetenciaPage = new HistoricoNivelCompetenciaPage()

    const nivel = { Descricao: 'Regular' }

    beforeEach('', () => {
        cy.insereNivelCompetencia('Excelente')
        cy.loginByApi()
        historicoNivelCompetenciaPage.navigate()
    }) 
 
    it('Inserção Histórico Nível de Competencia', () => {
        cy.exec_sql("delete from nivelcompetencia")
        historicoNivelCompetenciaPage.clicaInserir()
        util.infoMsg('Não existe cadastro de competência a ser configurada.')
    })
 
    it('Inserção Histórico Nível de Competencia', () => {
        historicoNivelCompetenciaPage.inserir()
        cy.validaMensagemSucesso('Histórico de níveis de competência salvo com sucesso.')
    })
 
    it('Inserção Histórico Nível de Competencia na mesma data', () => {
        historicoNivelCompetenciaPage.inserir()
        historicoNivelCompetenciaPage.inserir()
        util.warningMsg('Já existe um histórico de níveis de competência cadastrado nesta data')
    })

})
