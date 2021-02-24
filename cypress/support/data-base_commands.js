Cypress.Commands.add("reload_db", (callback) => {
    return cy.task('reloadDB');
})

Cypress.Commands.add("insereUsuario", (param) => {
    cy.exec_sql(
        "insert into usuario values (nextval('usuario_sequence'),'" + param + "', '" + param + "', 'MTIzNA==', true, null, false, (select caixasmensagens from usuario where nome = 'SOS'), null)",
        "insert into usuarioempresa values (nextval('usuarioempresa_sequence'), (select id from usuario where nome = '" + param + "'), 1, 1)"
    )
})

Cypress.Commands.add("insereMetaTurnover", (param) => {
    cy.exec_sql("insert into metaturnover values (nextval('metaturnover_sequence'),'01/01/2021', '" + param + "', (select id from empresa where nome = 'Empresa Padrão'))")

})

Cypress.Commands.add("insereMetaAbsenteísmo", (param) => {
    cy.exec_sql("insert into metaabsenteismo values (nextval('metaabsenteismo_sequence'),'01/01/2021', '" + param + "', (select id from empresa where nome = 'Empresa Padrão'))")

})

Cypress.Commands.add("insereUsuarioComEmpregado", (usuario) => {
    cy.exec_sql("insert into cargo values (nextval('cargo_sequence'), 'Auxiliar Departamento Pessoal', 'Cargo Teste', null, null, null, null, null, null, null, null, null, (select id from empresa where nome = 'Empresa Padrão'), true, true, null, null)")
    cy.exec_sql("insert into faixasalarial values (nextval('faixasalarial_sequence'), 'Júnior', null, (select id from cargo where nome = 'Auxiliar Departamento Pessoal'), null, '252510')")
    cy.exec_sql("insert into areaorganizacional values (nextval('areaorganizacional_sequence'), 'Gestao de Pessoas', null, null, (select id from empresa where nome = 'Empresa Padrão'), true, null, true)")
    cy.exec_sql("insert into cargo_areaorganizacional values ((select id from cargo where nome = 'Auxiliar Departamento Pessoal'), (select id from areaorganizacional where nome = 'Gestao de Pessoas'))")
    cy.exec_sql("insert into usuario values (nextval('usuario_sequence'),'" + usuario + "', '" + usuario + "', 'MTIzNA==', true, null, false, (select caixasmensagens from usuario where nome = 'SOS'), null)")
    cy.exec_sql("insert into usuarioempresa values (nextval('usuarioempresa_sequence'), (select id from usuario where nome = '" + usuario + "'), 1, 1)")
    cy.exec_sql("insert into colaborador values (nextval('colaborador_sequence'), null, 'colaborador teste', 'colaborador teste', false, null, null, '01/01/2020', 'Rua A', '111', null, 'Cambeba', '60822285', '06060722334', '12345678919', null, null, null, null, null, null, null, null, false, null, 0, 'M', '01/01/1980', '03', '03', '85', '40051111', null, 'teste@teste.com.br', 'E', null, null, null, false, 1, 1, 946, (select id from usuario where nome = '" + usuario + "'), null, null, '0', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, false, null,null, null, null, null, null, null, '25/09/2020', null, null, null, null, null, null, null, null, null, null, null, null, false)")
    cy.exec_sql("insert into historicocolaborador values (nextval('historicocolaborador_sequence'), 2000, '01/05/2020', 'C', null, (select id from colaborador where nome = 'colaborador teste'), (select id from areaorganizacional where nome = 'Gestao de Pessoas'), null, null, null, (select id from estabelecimento where nome = 'Estabelecimento Padrão'), 3, null, 0, (select id from faixasalarial where id = 1), null, 1, null, null)")
})

Cypress.Commands.add("insereUsuarioSemSenhaComEmpregado", (usuario) => {
    cy.exec_sql("insert into usuario values (nextval('usuario_sequence'),'" + usuario + "', '" + usuario + "', null, true, null, false, (select caixasmensagens from usuario where nome = 'SOS'), null)")
    cy.exec_sql("insert into usuarioempresa values (nextval('usuarioempresa_sequence'), (select id from usuario where nome = '" + usuario + "'), 1, 1)")
    cy.exec_sql("insert into colaborador values (nextval('colaborador_sequence'), null, 'colaborador teste', 'colaborador teste', false, null, null, '01/01/2020', 'Rua A', '111', null, 'Cambeba', '60822285', '34425164555', '12345678919', null, null, null, null, null, null, null, null, false, null, 0, 'M', '01/01/1980', '03', '03', '85', '40051111', null, 'teste@teste.com.br', 'E', null, null, null, false, 1, 1, 946, (select id from usuario where nome = '" + usuario + "'), null, null, '0', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, false, null,null, null, null, null, null, null, '25/09/2020', null, null, null, null, null, null, null, null, null, null, null, null, false)")
})

Cypress.Commands.add("insereColaborador", (colaborador_nome) => {
    cy.exec_sql("insert into cargo values (nextval('cargo_sequence'), 'Auxiliar Departamento Pessoal', 'Cargo Teste', null, null, null, null, null, null, null, null, null, (select id from empresa where nome = 'Empresa Padrão'), true, true, null, null)")
    cy.exec_sql("insert into faixasalarial values (nextval('faixasalarial_sequence'), 'Júnior', null, (select id from cargo where nome = 'Auxiliar Departamento Pessoal'), null, '252510')")
    cy.exec_sql("insert into areaorganizacional values (nextval('areaorganizacional_sequence'), 'Gestao de Pessoas', null, null, (select id from empresa where nome = 'Empresa Padrão'), true, null, true)")
    cy.exec_sql("insert into cargo_areaorganizacional values ((select id from cargo where nome = 'Auxiliar Departamento Pessoal'), (select id from areaorganizacional where nome = 'Gestao de Pessoas'))")
    cy.exec_sql("insert into colaborador values (nextval('colaborador_sequence'), null, '" + colaborador_nome + "', '" + colaborador_nome + "', false, null, null, '01/01/2020', 'Rua A', '111', null, 'Cambeba', '60822285', '34425164555', '12345678919', null, null, 'João Paulo', null, null, null, null, null, false, null, 0, 'M', '01/01/1980', '03', '03', '85', '40051111', null, 'teste@teste.com.br', 'E', null, null, null, false, 1, 1, 946, null, null, null, '0', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, false, null,null, null, null, null, null, null, '25/09/2020', null, null, null, null, null, null, null, null, null, null, null, null, false)")
    cy.exec_sql("insert into historicocolaborador values (nextval('historicocolaborador_sequence'), 2000, '01/05/2020', 'C', null, (select id from colaborador where nome = '" + colaborador_nome + "'), (select id from areaorganizacional where nome = 'Gestao de Pessoas'), null, null, null, (select id from estabelecimento where nome = 'Estabelecimento Padrão'), 3, null, 0, (select id from faixasalarial where id = 1), null, 1, null, null)")
})

Cypress.Commands.add("insereColaboradorDemitido", (colaborador_nome) => {
    cy.exec_sql("insert into cargo values (nextval('cargo_sequence'), 'Analista Dep Pessoal', 'Cargo Teste', null, null, null, null, null, null, null, null, null, (select id from empresa where nome = 'Empresa Padrão'), true, true, null, null)")
    cy.exec_sql("insert into faixasalarial values (nextval('faixasalarial_sequence'), 'Senior', null, (select id from cargo where nome = 'Analista Dep Pessoal'), null, '252510')")
    cy.exec_sql("insert into areaorganizacional values (nextval('areaorganizacional_sequence'), 'Gestão de Pessoas', null, null, (select id from empresa where nome = 'Empresa Padrão'), true, null, true)")
    cy.exec_sql("insert into cargo_areaorganizacional values ((select id from cargo where nome = 'Analista Dep Pessoal'), (select id from areaorganizacional where nome = 'Gestão de Pessoas'))")
    cy.exec_sql("insert into motivodemissao values (nextval('motivodemissao_sequence'), 'Justa Causa', (select id from empresa where nome = 'Empresa Padrão'), false, false, true)")
    cy.exec_sql("insert into colaborador values (nextval('colaborador_sequence'), null, '" + colaborador_nome + "', '" + colaborador_nome + "', true, '01/10/2020', null, '01/01/2020', 'Rua A', '111', null, 'Cambeba', '60822285', '34425164555', '12345678919', null, null, 'João Paulo', null, null, null, null, null, false, null, 0, 'M', '01/01/1980', '03', '03', '85', '40051111', null, 'teste@teste.com.br', 'E', null, null, null, false, 1, 1, 946, null, null, (select id from motivodemissao where motivo = 'Justa Causa'), '0', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, false, null,null, null, null, null, null, null, '25/09/2020', null, null, null, null, null, null, null, null, null, null, null, null, false)")
    cy.exec_sql("insert into historicocolaborador values (nextval('historicocolaborador_sequence'), 2000, '01/05/2020', 'C', null, (select id from colaborador where nome = '" + colaborador_nome + "'), (select id from areaorganizacional where nome = 'Gestão de Pessoas'), null, null, null, (select id from estabelecimento where nome = 'Estabelecimento Padrão'), 3, null, 0, (select id from faixasalarial where id = 1), null, 1, null, null)")
})

Cypress.Commands.add("insereEtapaSeletiva", (etapaSeletiva_nome) => {
    cy.exec_sql("insert into etapaseletiva values (nextval('etapaseletiva_sequence'), '" + etapaSeletiva_nome + "', 1, (select id from empresa where nome = 'Empresa Padrão'), true)")
})

Cypress.Commands.add("insereNivelCompetencia", (nivel_nome) => {
    cy.exec_sql("insert into nivelcompetencia values (nextval('nivelcompetencia_sequence'), '" + nivel_nome + "', (select id from empresa where nome = 'Empresa Padrão'))")
})

Cypress.Commands.add("insereMotivoSolicitacao", () => {
    cy.exec_sql("insert into motivosolicitacao values (nextval('motivosolicitacao_sequence'), 'Solicitação de Pessoal', false, false)")
})

Cypress.Commands.add("insereEstabelecimento", (estabelecimento_nome) => {
    cy.exec_sql("insert into estabelecimento (id, nome, complementocnpj, empresa_id) values (nextval('estabelecimento_sequence'), '" + estabelecimento_nome + "', '0006', (select id from empresa where nome = 'Empresa Padrão'))")
})

Cypress.Commands.add("insereEntrevistaDesligamento", (entrevista_nome) => {
    cy.exec_sql("insert into questionario values (nextval('questionario_sequence'), '" + entrevista_nome + "', null, null, null, true, false, false, 1, (select id from empresa where nome = 'Empresa Padrão'), false, false)")
    cy.exec_sql("insert into pergunta values (nextval('pergunta_sequence'), 1, 'Pergunta 01', false, null, 3, null, (select id from questionario where titulo = '" + entrevista_nome + "'), 1, 10, null, null, false)")
    cy.exec_sql("insert into entrevista values (nextval('entrevista_sequence'), true, (select id from questionario where titulo = '" + entrevista_nome + "'))")
})

Cypress.Commands.add("inserirSolicitacaoPessoal", () => {
    cy.exec_sql("insert into cargo values (nextval('cargo_sequence'), 'Cargo Teste', 'Cargo Teste', null, null, null, null, null, null, null, null, null, (select id from empresa where nome = 'Empresa Padrão'), true, true, null, null)")
    cy.exec_sql("insert into faixasalarial values (nextval('faixasalarial_sequence'), 'Faixa_Nome', null, (select id from cargo where nome = 'Cargo Teste'), null, '252510')")
    cy.exec_sql("insert into areaorganizacional values (nextval('areaorganizacional_sequence'), 'Área Teste', null, null, (select id from empresa where nome = 'Empresa Padrão'), true, null, true)")
    cy.exec_sql("insert into cargo_areaorganizacional values ((select id from cargo where nome = 'Cargo Teste'), (select id from areaorganizacional where nome = 'Área Teste'))")
    cy.exec_sql("insert into motivosolicitacao values (nextval('motivosolicitacao_sequence'), 'Aumento de Quadro', false, false)")
    cy.exec_sql("insert into solicitacao values (nextval('solicitacao_sequence'), '01/01/2020', null, 10, 'E', '02', 1000, null, null, 'I', null, false, false, null, (select id from motivosolicitacao where descricao = 'Aumento de Quadro'), (select id from areaorganizacional where nome = 'Área Teste'), 1, 1, null, (select id from empresa where nome = 'Empresa Padrão'), 1, 'Solicitação', 1, 'Horário', 'A', null, null, null, null, '01/01/2020', false, null, null)")
})

Cypress.Commands.add("inserirAreaOrganizacional", (areaOrganizacional_nome) => {
    cy.exec_sql("insert into areaorganizacional values (nextval('areaorganizacional_sequence'), '" + areaOrganizacional_nome + "', null, null, (select id from empresa where nome = 'Empresa Padrão'), true, null, true)")
})

Cypress.Commands.add("insereSolicitacaoEmAnalise", () => {
    cy.exec_sql("delete from solicitacao")
    cy.exec_sql("insert into solicitacao values (nextval('solicitacao_sequence'), '01/02/2020', null, 1, 'E', '02', 1000, null, null, 'I', null, false, false, null, (select id from motivosolicitacao where descricao = 'Aumento de Quadro'), (select id from areaorganizacional where nome = 'Área Teste'), 1, 1, null, (select id from empresa where nome = 'Empresa Padrão'), 1, 'Vaga para DEV', 1, 'Horário', 'I', null, null, null, null, '01/01/2020', false, null, null)")
})

Cypress.Commands.add("insereAreaInteresse", (areaInteresse_nome) => {
    cy.exec_sql("insert into areainteresse values (nextval('areainteresse_sequence'), '" + areaInteresse_nome + "', null, (select id from empresa where nome = 'Empresa Padrão'))")
})

Cypress.Commands.add("insereAreaFormacao", (areaFormação_nome) => {
    cy.exec_sql("insert into areaformacao values (nextval('areaformacao_sequence'), '" + areaFormação_nome + "')")
})

Cypress.Commands.add("insereCargo", () => {
    cy.exec_sql("insert into cargo values (nextval('cargo_sequence'), 'Cargo Teste', 'Cargo Teste', null, null, null, null, null, null, null, null, null, (select id from empresa where nome = 'Empresa Padrão'), true, true, null, null)")
    cy.exec_sql("insert into faixasalarial values (nextval('faixasalarial_sequence'), 'Faixa_Nome', null, (select id from cargo where nome = 'Cargo Teste'), null, '252510')")
})

Cypress.Commands.add("inserecandidato", (candidato_nome) => {
    cy.exec_sql("insert into candidato values (nextval('candidato_sequence'), '" + candidato_nome + "', 'MTIzNA==', null, null, null, null, 'Rua Ciro Monteiro', '222', null, 'Cambeba', '60822285', null, null, null, null, '06060722334', null, null, 'Fortaleza', null, null, null, null, null, null, false, null, 0, 'M', '01/01/1980', '01', '03', false, 0, 0, false, null, null, null, null, null, 'E', 1000, true, false, false, null, null, null, '01/09/2020', 'C', null, 1, 946, null, '0', null, null, null, null,null, null, null, null, null, null, null, null, null, null, 1, null, null, '01/09/2020', null, null, null, null, null, null, null, 'NAO VERIFICADO', null)")
})

Cypress.Commands.add("insereCandidato", (candidato_nome) => {
    cy.exec_sql("insert into candidato values (nextval('candidato_sequence'), '" + candidato_nome + "', 'MTIzNA==', null, null, null, null, 'Rua Ciro Monteiro', '222', null, 'Cambeba', '60822285', null, null, null, null, '92621219110', null, null, 'Fortaleza', null, null, null, null, null, null, false, null, 0, 'M', '01/01/1980', '01', '03', false, 0, 0, false, null, null, null, null, null, 'E', 1000, true, false, false, null, null, null, '01/09/2020', 'C', null, 1, 946, null, '0', null, null, null, null,null, null, null, null, null, null, null, null, null, null, 1, null, null, '01/09/2020', null, null, null, null, null, null, null, 'NAO VERIFICADO', null)")
})

Cypress.Commands.add("insereCandidatoExterno", (candidato_nome) => {
    cy.exec_sql("insert into candidato values (nextval('candidato_sequence'), '" + candidato_nome + "', 'MTIzNA==', null, null, null, null, 'Rua Ciro Monteiro', '222', null, 'Cambeba', '60822285', null, null, null, null, '92621219110', null, null, 'Fortaleza', null, null, null, null, null, null, false, null, 0, 'M', '01/01/1980', '01', '03', false, 0, 0, false, null, null, null, null, null, 'E', 1000, true, false, false, null, null, null, '01/09/2020', 'E', null, 1, 946, null, '0', null, null, null, null,null, null, null, null, null, null, null, null, null, null, 1, null, null, '01/09/2020', null, null, null, null, null, null, null, 'NAO VERIFICADO', null)")
    cy.exec_sql("insert into candidatosolicitacao values (nextval('candidatosolicitacao_sequence'), true, (select id from candidato where nome = '" + candidato_nome + "'), 1, 'I', null, null, null, null)")
})

Cypress.Commands.add("inseremodeloAvaliacaoCandidato", (avaliacao_nome) => {
    cy.exec_sql("insert into avaliacao values (nextval('avaliacao_sequence'), '" + avaliacao_nome + "', '', true, (select id from empresa where nome = 'Empresa Padrão'), 'S', null, false, false, null, false)")
    cy.exec_sql("insert into pergunta values (nextval('pergunta_sequence'), 1, 'Pergunta 01', false, 'null', 4, null, null, 1, 10, 1, (select id from avaliacao where titulo = '" + avaliacao_nome + "'), false)")
})

Cypress.Commands.add("inseremodeloAvaliacaoDesempenho", (avaliacao_nome) => {
    cy.exec_sql(
        "insert into avaliacao values (nextval('avaliacao_sequence'), '" + avaliacao_nome + "', '', true, (select id from empresa where nome = 'Empresa Padrão'), 'D', null, false, false, null, false)",
        "insert into pergunta values (nextval('pergunta_sequence'), 1, 'Pergunta 01', false, 'null', 4, null, null, 1, 10, 1, (select id from avaliacao where titulo = '" + avaliacao_nome + "'), false)",
    )
})

Cypress.Commands.add("integraFortesPessoal", () => {
    cy.exec_sql("update empresa set acintegra = true")
})

Cypress.Commands.add("insereIndices", (indice_nome) => {
    cy.exec_sql("insert into indice values (nextval('indice_sequence'), '" + indice_nome + "', null, null)")
})

Cypress.Commands.add("insereIndicesComHistorico", (indice_nome) => {
    cy.exec_sql("insert into indice values (nextval('indice_sequence'), '" + indice_nome + "', null, null)")
    cy.exec_sql("insert into indicehistorico values (nextval('indicehistorico_sequence'), '05/10/2020', 2000, (select id from indice where nome = '" + indice_nome + "'), null)")
})

Cypress.Commands.add("insereGrupoAC", (grupoAc_nome) => {
    cy.exec_sql("insert into grupoac values (nextval('grupoac_sequence'), '999', '" + grupoAc_nome + "', null, null, null, null)")
})

Cypress.Commands.add('insereReajustePorColaborador', (nome_reajuste, status) => {
    cy.exec_sql("insert into tabelareajustecolaborador values (nextval('tabelareajustecolaborador_sequence'), '" + nome_reajuste + "', '27/10/2020', null, " + status + ", (select id from empresa where nome = 'Empresa Padrão'), true, 'C')")
})

Cypress.Commands.add('ativaPaginacaoPesquisa', () => {
    cy.exec_sql("update parametrosdosistema set paginacaopesquisa = true;")
    cy.exec_sql("update parametrosdosistema set qtdperguntaporpaginapesquisa = 6;")
})

Cypress.Commands.add("PesquisaLiberadaCom50Perguntas", () => {
    cy.exec_sql("insert into questionario values (nextval('questionario_sequence'), 'Pesquisa Clima', null, '01/01/2021', '31/12/2021', true, false, false, 2, (select id from empresa where nome = 'Empresa Padrão'), false, false)")
    cy.exec_sql("insert into pesquisa values (nextval('pesquisa_sequence'), (select id from questionario where titulo = 'Pesquisa Clima'), false, false, false, false)")
    var i = 1
    var num = 50
    do {
        cy.exec_sql("insert into pergunta values (nextval('pergunta_sequence'), " + i + ", 'Pergunta " + i + "', false, null, 3, null, (select id from questionario where titulo = 'Pesquisa Clima'), 1, 10, 1, null, false)")
        i++
    } while (i < num);
})

Cypress.Commands.add("insere_X_Colaborador", (qtd_colaborador) => {
    cy.exec_sql(
        "insert into cargo values (nextval('cargo_sequence'), 'Auxiliar Departamento Pessoal', 'Cargo Teste', null, null, null, null, null, null, null, null, null, (select id from empresa where nome = 'Empresa Padrão'), true, true, null, null)",
        "insert into faixasalarial values (nextval('faixasalarial_sequence'), 'Júnior', null, (select id from cargo where nome = 'Auxiliar Departamento Pessoal'), null, '252510')",
        "insert into areaorganizacional values (nextval('areaorganizacional_sequence'), 'Gestao de Pessoas', null, null, (select id from empresa where nome = 'Empresa Padrão'), true, null, true)",
        "insert into cargo_areaorganizacional values ((select id from cargo where nome = 'Auxiliar Departamento Pessoal'), (select id from areaorganizacional where nome = 'Gestao de Pessoas'))",
    )

    var i = 0
    var num = parseInt(qtd_colaborador)
    do {
        cy.exec_sql(
            "insert into colaborador values (nextval('colaborador_sequence'), null, 'Colaborador Teste " + i + "', 'colaborador teste', false, null, null, '01/01/2020', 'Rua A', '111', null, 'Cambeba', '60822285', '34425164555', '12345678919', null, null, 'João Paulo', null, null, null, null, null, false, null, 0, 'M', '01/01/1980', '03', '03', '85', '40051111', null, 'teste@teste.com.br', 'E', null, null, null, false, 1, 1, 946, null, null, null, '0', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, false, null,null, null, null, null, null, null, '25/09/2020', null, null, null, null, null, null, null, null, null, null, null, null, false)",
            "insert into historicocolaborador values (nextval('historicocolaborador_sequence'), 2000, '01/05/2020', 'C', null, (select id from colaborador where nome = 'Colaborador Teste " + i + "'), (select id from areaorganizacional where nome = 'Gestao de Pessoas'), null, null, null, (select id from estabelecimento where nome = 'Estabelecimento Padrão'), 3, null, 0, (select id from faixasalarial where id = 1), null, 1, null, null)",
        )
        i++
    } while (i < num);
})

Cypress.Commands.add("dispensaContratacaoAprendiz", () => {
    cy.exec_sql("update empresa set dispensarcontratacaoaprendiz = true")
})

Cypress.Commands.add("insereColaboradorComCompetencias", (colaborador_nome) => {
    cy.exec_sql("insert into areaorganizacional values (nextval('areaorganizacional_sequence'), 'Suporte', null, null, (select id from empresa where nome = 'Empresa Padrão'), true, null, true)")
    cy.exec_sql("insert into conhecimento (id, nome, empresa_id) values (nextval('conhecimento_sequence'), 'Java', (select id from empresa where nome = 'Empresa Padrão'))")
    cy.exec_sql("insert into conhecimento_areaorganizacional  values ((select id from conhecimento where nome = 'Java'), (select id from areaorganizacional where nome = 'Suporte'))")
    cy.exec_sql("insert into habilidade (id, nome, empresa_id) values (nextval('habilidade_sequence'), 'Windows', (select id from empresa where nome = 'Empresa Padrão'))")
    cy.exec_sql("insert into habilidade_areaorganizacional  values ((select id from habilidade where nome = 'Windows'), (select id from areaorganizacional where nome = 'Suporte'))")
    cy.exec_sql("insert into atitude (id, nome, empresa_id) values (nextval('atitude_sequence'), 'Organizado', (select id from empresa where nome = 'Empresa Padrão'))")
    cy.exec_sql("insert into atitude_areaorganizacional  values ((select id from atitude where nome = 'Organizado'), (select id from areaorganizacional where nome = 'Suporte'))")
    cy.exec_sql("insert into cargo values (nextval('cargo_sequence'), 'Encarregado Departamento Pessoal', 'Cargo Teste', null, null, null, null, null, null, null, null, null, (select id from empresa where nome = 'Empresa Padrão'), true, true, null, null)")
    cy.exec_sql("insert into faixasalarial values (nextval('faixasalarial_sequence'), 'Júnior', null, (select id from cargo where nome = 'Encarregado Departamento Pessoal'), null, '252510')")
    cy.exec_sql("insert into cargo_areaorganizacional values ((select id from cargo where nome = 'Encarregado Departamento Pessoal'), (select id from areaorganizacional where nome = 'Suporte'))")
    cy.exec_sql("insert into cargo_conhecimento  values ((select id from cargo where nome = 'Encarregado Departamento Pessoal'), (select id from conhecimento where nome = 'Java'))")
    cy.exec_sql("insert into cargo_habilidade  values ((select id from cargo where nome = 'Encarregado Departamento Pessoal'), (select id from habilidade where nome = 'Windows'))")
    cy.exec_sql("insert into cargo_atitude  values ((select id from cargo where nome = 'Encarregado Departamento Pessoal'), (select id from atitude where nome = 'Organizado'))")
    cy.exec_sql("insert into nivelcompetencia values (nextval('nivelcompetencia_sequence'), 'Básico', (select id from empresa where nome = 'Empresa Padrão'))")
    cy.exec_sql("insert into colaborador values (nextval('colaborador_sequence'), null, '" + colaborador_nome + "', '" + colaborador_nome + "', false, null, null, '01/01/2020', 'Rua A', '111', null, 'Cambeba', '60822285', '34425164555', '12345678919', null, null, 'João Paulo', null, null, null, null, null, false, null, 0, 'M', '01/01/1980', '03', '03', '85', '40051111', null, 'samuelpinheiroce@gmail.com', 'E', null, null, null, false, 1, 1, 946, 3, null, null, '0', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, false, null,null, null, null, null, null, null, '25/09/2020', null, null, null, null, null, null, null, null, null, null, null, null, false)")
    cy.exec_sql("insert into historicocolaborador values (nextval('historicocolaborador_sequence'), 2000, '01/05/2020', 'C', null, (select id from colaborador where nome = '" + colaborador_nome + "'), (select id from areaorganizacional where nome = 'Suporte'), null, null, null, (select id from estabelecimento where nome = 'Estabelecimento Padrão'), 3, null, 0, (select id from faixasalarial where cargo_id = (select id from cargo where nome = 'Encarregado Departamento Pessoal')), null, 1, null, null)")
})

Cypress.Commands.add("insereCargo", (cargo_nome) => {
    cy.exec_sql("insert into cargo values (nextval('cargo_sequence'), '" + cargo_nome + "', 'Cargo Teste', null, null, null, null, null, null, null, null, null, (select id from empresa where nome = 'Empresa Padrão'), true, true, null, null)")
    cy.exec_sql("insert into faixasalarial values (nextval('faixasalarial_sequence'), 'Júnior', null, (select id from cargo where nome = '" + cargo_nome + "'), null, '252510')")
})

Cypress.Commands.add("insereCargoIntegrado", (cargo_nome) => {
    cy.exec_sql("insert into cargo values (nextval('cargo_sequence'), '" + cargo_nome + "', 'Cargo Teste', null, null, null, null, null, null, null, null, null, (select id from empresa where nome = 'Empresa Padrão'), true, true, null, null)")
    cy.exec_sql("insert into faixasalarial values (nextval('faixasalarial_sequence'), 'Júnior', '073', (select id from cargo where nome = '" + cargo_nome + "'), null, '252510')")
})

Cypress.Commands.add("insereConhecimento", (conhecimento_nome) => {
    cy.exec_sql("insert into conhecimento (id, nome, empresa_id) values (nextval('conhecimento_sequence'), '" + conhecimento_nome + "', (select id from empresa where nome = 'Empresa Padrão'))")
})

Cypress.Commands.add("insereHabilidade", (nome) => {
    cy.exec_sql("insert into habilidade (id, nome, empresa_id) values (nextval('habilidade_sequence'), '" + nome + "', (select id from empresa where nome = 'Empresa Padrão'))")
})

Cypress.Commands.add("insereAtitude", (nome) => {
    cy.exec_sql("insert into atitude (id, nome, empresa_id) values (nextval('atitude_sequence'), '" + nome + "', (select id from empresa where nome = 'Empresa Padrão'))")
})

Cypress.Commands.add("insereTokenSolides", () => {
    cy.exec_sql("update parametrosdosistema set tokensolides = 'c710e935ce7fbd3fdba6d92a4cd4ee5abf14c1a94859fd3d7f9a'")
})

Cypress.Commands.add("ativaIntegracaoElore", () => {
    cy.exec_sql("update parametrosdosistema set tokenelore = 'eloreToken87f929d691c24a24a445a2688f3cf4ef'")
})

Cypress.Commands.add("insereConfiguracaoNivelCompetecia", (cargo_nome) => {
    cy.exec_sql("insert into cargo values (nextval('cargo_sequence'), '" + cargo_nome + "', 'Cargo Teste', null, null, null, null, null, null, null, null, null, (select id from empresa where nome = 'Empresa Padrão'), true, true, null, null)")
})

Cypress.Commands.add("insereEmpresa", (empresa_nome) => {
    cy.exec_sql("insert into empresa (id, nome, acintegra, maxcandidatacargo, exibirsalario, solPessoalExibirSalario, solPessoalObrigarDadosComplementares) values (nextval('empresa_sequence'), '" + empresa_nome + "', false, 10, true, true, true)")
    cy.exec_sql("insert into estabelecimento values (nextval('estabelecimento_sequence'), 'Padrão', null, null, null, null, null, '0001', null, null, null, (select id from empresa where nome = '" + empresa_nome + "'))")
    cy.exec_sql("insert into usuarioempresa values (nextval('usuarioempresa_sequence'), (select id from usuario where nome = 'homolog'), 1, (select id from empresa where nome = '" + empresa_nome + "'))")
})

Cypress.Commands.add("insereEmpresaSemEstabelecimento", (empresa_nome) => {
    cy.exec_sql("insert into empresa (id, nome, acintegra, maxcandidatacargo, exibirsalario, solPessoalExibirSalario, solPessoalObrigarDadosComplementares) values (nextval('empresa_sequence'), '" + empresa_nome + "', false, 10, true, true, true)")
})

Cypress.Commands.add("insereAvaliacaoDesempenho", () => {
    cy.exec_sql("insert into avaliacaodesempenho (id, titulo, inicio, fim, anonima, permiteautoavaliacao, exibirnivelcompetenciaexigido, liberada, avaliacao_id, empresa_id) values (nextval('avaliacaodesempenho_sequence'), 'Avaliação de Desempenho', '01/10/2020', '31/10/2020', true, true, false, false, (select id from avaliacao where titulo = 'Avaliação Teste'), (select id from empresa where nome = 'Empresa Padrão'))")
})

Cypress.Commands.add("insereAvaliacaoDesempenho_NaoPermiteAutoAvaliacao", () => {
    cy.exec_sql("insert into avaliacaodesempenho (id, titulo, inicio, fim, anonima, permiteautoavaliacao, exibirnivelcompetenciaexigido, liberada, avaliacao_id, empresa_id) values (nextval('avaliacaodesempenho_sequence'), 'Avaliação de Desempenho', '01/10/2020', '31/10/2020', true, false, false, false, (select id from avaliacao where titulo = 'Avaliação Teste'), (select id from empresa where nome = 'Empresa Padrão'))")
})

Cypress.Commands.add("insereCartao", () => {
    cy.exec_sql("insert into cartao values (nextval('cartao_sequence'), null, 'Mensagem Cartão', 'ANIVERSARIO', (select id from empresa where nome = 'Empresa Padrão'), null, false, null, true)")
})

Cypress.Commands.add("insereMotivoAfastamento", () => {
    cy.exec_sql("insert into afastamento values (nextval('afastamento_sequence'), false, 'Licença por motivo de doença', false, true)")
})

Cypress.Commands.add("inserirTamanhoEPI", (tamanhoEPI_nome) => {
    cy.exec_sql("insert into tamanhoepi values (nextval('tamanhoepi_sequence'), '" + tamanhoEPI_nome + "')")
})

Cypress.Commands.add("inserirCategoriaEPI", (categoriaEPI_nome) => {
    cy.exec_sql("insert into tipoepi values (nextval('tipoepi_sequence'), '" + categoriaEPI_nome + "', '1')")
})

Cypress.Commands.add("inserirMotivoSolicitacaoEPI", (motivoSolicitacaoEpi_nome) => {
    cy.exec_sql("insert into motivosolicitacaoepi values (nextval('motivoSolicitacaoEpi_sequence'), '" + motivoSolicitacaoEpi_nome + "')")
})

Cypress.Commands.add("inserirCurso", (curso_nome) => {
    cy.exec_sql("insert into curso values (nextval('curso_sequence'), '"+ curso_nome +"', '', '1')")
})

Cypress.Commands.add("inserirCategoriaCurso", (categoriaCurso_nome) => {
    cy.exec_sql(
        "insert into categoriacurso values (nextval('categoriaCurso_sequence'), '"+ categoriaCurso_nome +"')",
        "insert into metascategoriacurso values (nextval('metascategoriacurso_sequence'), '2021-01-01', '100', '1')"
    )
})