describe('Funcionalidade Troca de Empresa', () => {

    const empresas = {
        razaoSocial_1: chance.name({ words: 1 })
    }

    beforeEach('', () => {
        cy
            .insereEmpresa(empresas.razaoSocial_1)
    })

    it('Alterar Empresa Fortes Tecno', () => {
        cy
            .alteraEmpresa(empresas.razaoSocial_1)
        cy.contains(empresas.razaoSocial_1).should('be.visible')
    })
})