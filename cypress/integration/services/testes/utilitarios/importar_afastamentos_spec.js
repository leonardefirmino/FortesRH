import '../../../../../cypress.json'
import * as util from '../../../../support/util'
import { LoginPage } from '../../pages/loginPage'
import { ImportaAfastamentoPage } from '../../pages/importaAfastamentosPage'

describe('Improtação de Afastamentos do Ponto/TRU', () => {
    const loginPage = new LoginPage()
    const importaAfastamentosPage = new ImportaAfastamentoPage()

    beforeEach('', () => {
        cy.insereMotivoAfastamento()
        importaAfastamentosPage.navigate()
        loginPage.loggedIn('homolog', '1234')
    })

    it('Importa Afastamento Arquivo Inválido', () => {
        const arquivoAfastamento = { Arquivo: 'ArquivoAfastamentoInvalido.csv' }
        importaAfastamentosPage.importar(arquivoAfastamento)
        util.warningMsg('Não foram encontrados afastamentos a serem importados para os talentos desta empresa neste arquivo.')
    })

    it('Importa Afastamento Arquivo Válido', () => {        
        cy.insereColaborador('Helena de Troia')
        const arquivoAfastamento = { Arquivo: 'ArquivoAfastamentoValido.csv' }
        importaAfastamentosPage.importar(arquivoAfastamento)
        util.successMsg('Importação concluída.')
    })
}) 