import '../../../support/util'
import * as util from '../../../support/util'

export class ColaboradorCandidatoPage {

    navigate_menu_candidatos() {
        cy.visit('/captacao/candidato/list.action')
    }

    clicaInserir() {
        cy.get('#btnInserir').click()
    }

    clicaCancelar() {
        cy.get('#btnInserir').click()
    }

    clicaGravar() {
        cy.get('#gravar').click()
    }

    preencheNome() {
        cy.get('#nome').clear().type('Amy Winehouse')
    }

    preencheNascimento() {
        cy.get('#nascimento').clear().type('07/01/1988')
    }

    preencheNaturalidade() {
        cy.get('#naturalidade').clear().type('Londres')
    }

    preencheCPF() {
        cy.get('#cpf').clear().type('92621219110')
    }

    escolheSexo(sexo) {
        if (sexo == null) {
            cy.get('#sexo').select('Feminino')
        } else {
            cy.get('#sexo').select(sexo)
        }
    }

    preencheEndereco() {
        cy.get('#cep').clear().type('60822285')
        cy.get('#num').clear().type('249')
        cy.get('#uf').select('CE')
        cy.get('#cidade').select('Fortaleza')
    }

    escolheEscolaridade() {
        cy.get('#escolaridade').select('Ensino Médio completo')
    }

    preencheTelefone() {
        cy.get('#ddd').clear().type('85')
        cy.get('#fone').clear().type('40051111')

    }

    PreencheSenhaContraSenha() {
        cy.get('#senha').clear().type('1234')
        cy.get('#comfirmaSenha').clear().type('1234')
    }

    preencheNomePai() {
        cy.get('#nomePai').clear().type('João Paulo')
        cy.get('#profPai').focus()
    }

    insereFormacao() {
        cy.get('.abaFormacaoEscolar').click()
        cy.get('#inserirFormacao').click()
        cy.get('#formacaoArea').select('Administrativa')
        cy.get('#formacaoCurso').clear().type('ADS')
        cy.get('#formacaoLocal').clear().type('Unifor')
        cy.get('#formacaoTipo').select('Graduação')
        cy.get('#formacaoSituacao').select('Concluído')
        cy.get('#formacaoConclusao').clear().type('2020')
        cy.get('ul > #frmFormacao').click()
    }

    insereIdiomas() {
        cy.get('#inserirIdioma').click()
        cy.get('#idiomaSelec').select('Inglês')
        cy.get('#nivelSelec').select('Avançado')
        cy.get('#gravarIdioma').click()
    }

    insereDocumentos() {
        cy.get('#aba5 > a').click()
        cy.get('#pis').clear().type('12345678919')
    }

    clicaAbaCurriculoGrava() {
        cy.get('.abaCurriculo').click()
        cy.get('.btnGravar').click()
    }

    clicaAbaCurriculoGrava() {
        cy.get('.abaCurriculo').click()
        cy.get('.btnGravar').click()
    }

    anexaDocs(colaborador) {
        
        util.acao_old('Documentos do Candidato', colaborador)
        cy.get('#btnInserir').click()
        cy.get('#descricao').type('Documento Anexado')
        cy.get('#data').clear().type('29/09/2020')
        cy.get('#documento').attachFile('Anexo.jpeg')
        cy.get('#btnGravar').click()
    }

    aceitaLGPD() {
        cy.get('#termo-privacidade-politica-seguranca-input').check()
    }

    inserirCandidatoColaborador(sexo) {
        this.clicaInserir()
        this.preencheNome()
        this.preencheNascimento()
        this.preencheNaturalidade()
        this.preencheCPF()
        this.escolheSexo(sexo)
        this.preencheEndereco()
        this.escolheEscolaridade()
        this.preencheTelefone()
        this.insereFormacao()
        this.insereIdiomas()
        this.insereDocumentos()
        this.clicaGravar()
    }

    inserirCandidatoColaboradorModuloExterno() {
        this.preencheNome()
        this.preencheNascimento()
        this.preencheNaturalidade()
        this.preencheCPF()
        this.escolheSexo()
        this.preencheEndereco()
        this.escolheEscolaridade()
        this.preencheTelefone()
        this.PreencheSenhaContraSenha()
        this.insereFormacao()
        this.insereDocumentos()
        this.clicaAbaCurriculoGrava()
    }

    insereColaboradorCpfExistente(cpf) {
        this.clicaInserir()
        this.preencheCPF()
        cy.get('#profPai').focus()
    }

    editarCandidatoColaborador(colaborador) {
        util.acao_old('Editar', colaborador)
        this.preencheTelefone()
        this.insereDocumentos()
        this.clicaGravar()
    }

    excluirCandidatoColaborador(colaborador) {        
        util.acao_old('Excluir', colaborador)
    }

    excluirCandidatoColaboradorLote() {
        cy.get('#md').check()
        cy.get('#btnExcluirSelecionados').click()

    }

    preencheCandidatoHomonimo(text) {
        this.preencheNome(text)
        cy.get('#nome').focus()
        cy.get('#profPai').focus()
        cy.get('#homonimos').should('contain', text)
    }

    contrataCandidato(candidato) {     
        util.acao_old('Contratar Candidato', candidato)
    }

    insereCurriculoEscaneado(candidato) {
        if (candidato != null) {
            util.acao_old('Currículo Escaneado', candidato)
            cy.get('.btnInserirEditar').click()
        } else {
            cy.get('#btnInserirCurriculoEscaneado').click()
            cy.get('#nome').clear().type('Candidato')
        }
        cy.get('#mt').click()
        cy.get('#ocrTexto').attachFile('Arquivo.txt')
        cy.get('.btnSalvarArquivos').click()
        cy.get('.btnConcluir').click()
    }    

    inserirEmSolicitacao(candidato) {
        util.acao_old('Incluir em Solicitação', candidato)
        cy.get('#mt').click()
        cy.get('#btnInserir').click()
    }

    triagemCandidato(){
        cy.get('#btnTriagem').click()
        cy.get('#flat').click()
    }

    inserirCurriculoDigitado(){
        cy.get('#btnInserirCurriculoDigitado').click()
        cy.get('#nome').clear().type('Curriculo Digitado')
        cy.get('#mt').click()
        cy.get('#ocrTexto').type('Curriculo digitado')
        cy.get('.btnGravar').click()
    }













}