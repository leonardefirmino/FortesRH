import '../../../../../cypress.json'
import * as util from '../../../../support/util'
import { ModeloEntrevistaDesligamentoPage } from '../../pages/modeloEntrevistaDesligamentoPage'

describe('Modelo Ent Desligamento', () => {
    const modeloEntrevistaDesligamentoPage = new ModeloEntrevistaDesligamentoPage()

    const entrevista = { Titulo: "Entrevista Desligamento", Pergunta: "Pergunta Teste", Tipo: "Nota" }

    beforeEach('', () => {
        modeloEntrevistaDesligamentoPage.navigate()
    })
    
    it('Teste Modelo', () => {
        modeloEntrevistaDesligamentoPage.inserir(entrevista)
        util.validaTitulo('Modelos de Entrevistas de Desligamento')
    })
}) 