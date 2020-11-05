import '../../../../../cypress.json'
import * as util from '../../../../support/util'
import { LoginPage } from '../../pages/loginPage'
import { HistoricoNivelCompetenciaPage } from '../../pages/historicoNivelCompetenciaPage'

describe('Funcionalidade Histórico Nivel de Competencia', () => {
    const loginPage = new LoginPage()
    const historicoNivelCompetenciaPage = new HistoricoNivelCompetenciaPage()

    const nivel = { Descricao: 'Regular' }

    beforeEach('', () => {
        cy.reload_db()
        cy.insereNivelCompetencia('Excelente')
        historicoNivelCompetenciaPage.navigate()
        loginPage.loggedIn('homolog', '1234')
    }) 
 
    it('Inserção Histórico Nível de Competencia', () => {
        cy.exec_sql("delete from nivelcompetencia")
        historicoNivelCompetenciaPage.clicaInserir()
        util.infoMsg('Não existe cadastro de competência a ser configurada.')
    })
 
    it('Inserção Histórico Nível de Competencia', () => {
        historicoNivelCompetenciaPage.inserir()
        util.successMsg('Histórico de níveis de competência salvo com sucesso.')
    })
 
    it.only('Inserção Histórico Nível de Competencia na mesma data', () => {
        historicoNivelCompetenciaPage.inserir()
        historicoNivelCompetenciaPage.inserir()
        util.warningMsg('Já existe um histórico de níveis de competência cadastrado nesta data')
    })

})
