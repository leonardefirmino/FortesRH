import '../../../../../cypress.json'
import * as util from '../../../../support/util'
import { IntegraElorePage } from '../../pages/elorePage'
import { ExportaElorePage } from '../../pages/elorePage'

describe('Funcionalidade Integração Elore', () => {
    const elorePage = new IntegraElorePage()
    const elorePagaExporta = new ExportaElorePage
    
    const token = 'eloreToken87f929d691c24a24a445a2688f3cf4ef'
    const tokeninvalido = 'eloreToken87f929d691c24a24a445a2688f3cf4ec'
    

    beforeEach('', () => {
        elorePage.navigate()
    })

    it('Integra com token válido', () => {        
        elorePage.integraElore(token)
        util.popUpMessage('A conexão com Elore foi realizada com sucesso.')
    })

    it('Integra com token inválido', () => {        
        elorePage.integraElore(tokeninvalido)
        util.popUpMessage('Token Inválido.')
    })

    it('Integra com token vazio', () => {        
        elorePage.integraElore()
        util.popUpMessage('Preencha o campo "Token".')
    })

    it('Exportar Colaboradores sem Selecionar Área', () => { 
        const elore = { AreaMarcada: 'Não'}

        elorePagaExporta.navigate_exporta()       
        elorePagaExporta.exporta(elore)
        util.popUpMessage('Preencha os campos indicados.')
    })

    it('Exportar Colaboradores sem Selecionar Colaborador', () => { 
        cy.insereColaborador('Helena de Troia')
        const elore = { AreaMarcada: 'Sim', status: 'Todos', SelecionaColaborador: 'Não' }

        elorePagaExporta.navigate_exporta()       
        elorePagaExporta.exporta(elore)
        util.popUpMessage('Não existem talentos selecionados')
        util.infoMsg('Não existe dados para o filtro informado.')
    })

    it('Exportar Colaboradores com Colaborador Selecionado - Cadastro Incompleto', () => { 
        cy.ativaIntegracaoElore()
        cy.insereColaboradorComCompetencias('Helena de Troia')
        const elore = { AreaMarcada: 'Sim', status: 'Todos', SelecionaColaborador: 'Sim' }

        elorePagaExporta.navigate_exporta()       
        elorePagaExporta.exporta(elore)
        util.successMsg('Cadastros exportados com sucesso.')
    })
})
