import '../../../../../cypress.json'
import * as util from '../../../../support/util'
import { LoginPage } from '../../pages/loginPage'
import { ImportaCadastroPage } from '../../pages/importarCadastrosPage'

describe('Funcionalidade Importação de Cadastros', () => {
    const loginPage = new LoginPage()
    const importarCadastrosPage = new ImportaCadastroPage()

    const empresa ={ Origem: 'Empresa Padrão', Destino: 'Fortes Tecno' }
    

    beforeEach('', () => {
        cy.reload_db()
        cy.insereEmpresa(empresa.Destino)
        importarCadastrosPage.navigate()
        loginPage.loggedIn('homolog', '1234')
    })

    it('Importa Cadastros Empresas', () => {        
        importarCadastrosPage.importarCadastro(empresa)
        util.dialogContentMessage('Cuidado ao importar o cadastro entre empresas, pois o mesmo poderá ficar duplicado caso aconteça mais de uma importação.')
        util.confirmarDialogMessage('Sim')
        util.successMsg('Cadastros importados com sucesso.')
    })

    it('Importa Cadastros Mesma Empresa', () => {        
        importarCadastrosPage.importarCadastroMesmaEmpresa(empresa)
        util.popUpMessage('Selecione empresas Origem e Destino diferentes.')
    })

    it('Importa Cadastros - Dados Vazios', () => {        
        importarCadastrosPage.importar()
        util.popUpMessage('Preencha os campos indicados.')
    })
})
