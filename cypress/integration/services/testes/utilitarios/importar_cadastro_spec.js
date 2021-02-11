import '../../../../../cypress.json'
import * as util from '../../../../support/util'
import { ImportaCadastroPage } from '../../pages/importarCadastrosPage'

describe('Funcionalidade Importação de Cadastros', () => {
    const importarCadastrosPage = new ImportaCadastroPage()

    const empresa ={ Origem: 'Empresa Padrão', Destino: 'Fortes Tecno' }
    

    beforeEach('', () => {
        cy.insereEmpresa(empresa.Destino)
        importarCadastrosPage.navigate()
    })

    it.only('Importa Cadastros Empresas', () => {        
        importarCadastrosPage.importarCadastro(empresa)
        util.dialogContentMessage('Cuidado ao importar o cadastro entre empresas, pois o mesmo poderá ficar duplicado caso aconteça mais de uma importação.')
        cy.contains('Sim').click()
        cy.validaMensagemSucesso('Cadastros importados com sucesso.')
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
