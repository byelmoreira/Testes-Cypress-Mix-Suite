describe('Login da plataforma e teste de criação de tarefa', () => {

  beforeEach(() => {
    cy.env(['email', 'senha']).then(({ email, senha }) => {

      cy.session(['login', email], () => {
      
     cy.visit('https://suite.mixfiscal.com.br/')

      cy.get('input[type="email"]').type(email)

      cy.get('input[type="password"]').type(senha, { log: false })

      cy.get('button[type="submit"]').click()

      cy.get('#mfaCode', { timeout: 120000 })
        .should(($input) => {
          const codigo = $input.val().replace(/\D/g, '')
          expect(codigo).to.have.length(6)
        })

      cy.get('.auth-submit').click()

      cy.contains('h1', 'Dash', { timeout: 10000 })
          .should('be.visible')

      })

    })

    cy.visit('https://suite.mixfiscal.com.br/')

    })

    it('Deve criar uma nova tarefa', () => {

    cy.get('[data-view="projects-dashboard"]').click()

    cy.get('[data-view="management"]').click()

    cy.get('[data-mix-tooltip="Nova tarefa"]').click()

    cy.get('[name="title"]').type('Nova Tarefa de Teste')

    cy.get('[name="description"]').type('Descrição da nova tarefa de teste')

    cy.contains('button.task-create-select', 'Projeto padrão').click()

    cy.get('[data-id="1605"]').click()

    cy.get('button[aria-label="Etapa"]').click()

    cy.get('[data-index="2"]').click()

    cy.get('[data-mix-tooltip="Criar tarefa"]').click()

    cy.get('[data-mix-tooltip="Voltar para Tarefas"]').click()

    cy.contains('.task-pipeline-title', 'Nova Tarefa de Teste')
  .should('be.visible')
  })

})