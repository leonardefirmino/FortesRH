import '../../../../../cypress.json'
import * as util from '../../../../support/util'
import { LoginPage } from '../../pages/loginPage'
import { ModeloEntrevistaDesligamentoPage } from '../../pages/modeloEntrevistaDesligamentoPage'

describe('Modelo Ent Desligamento', () => {
    const loginPage = new LoginPage()
    const modeloEntrevistaDesligamentoPage = new ModeloEntrevistaDesligamentoPage()

    const entrevista = { Titulo: "Entrevista Desligamento", Pergunta: "Pergunta Teste", Tipo: "Nota" }

    beforeEach('', () => {
        modeloEntrevistaDesligamentoPage.navigate()
        loginPage.with('homolog', '1234')
    })
    
    it('Teste Modelo', () => {
        modeloEntrevistaDesligamentoPage.inserir(entrevista)
        util.validaTitulo('Modelos de Entrevistas de Desligamento')
    })
}) 