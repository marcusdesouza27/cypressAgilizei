/// <reference types="cypress" />

describe('Be the Hero', () => {

    it('Cadastrar Usuario', () => {
        cy.visit('http://localhost:3000/register')
        cy.get('[data-cy="name"]').type('MHCS Pets Friend');
        cy.get('[data-cy="email"]').type('petsfriend@mailinator.com');
        cy.get('[data-cy="whatsapp"]').type('1197600-2863');
        cy.get('[data-cy="city"]').type('São Paulo');
        cy.get('[data-cy="uf"]').type('SP');

        cy.server();
        cy.route('POST', '**/ongs').as('postOng');

        cy.get('[data-cy="submit"]').click();

        cy.wait('@postOng').then((xhr) => {
            expect(xhr.status).be.eq(200);
            expect(xhr.response.body).has.property('id');
            expect(xhr.response.body.id).is.not.null;
        })

    });

    it('Efetuar um login no sistema', () => {
        cy.visit('http://localhost:3000/');
        cy.get('input').type(Cypress.env('createdOngId'));
        cy.get('.button').click();
    })

    it('Devem poder fazer logout', () => {
        cy.Login();
        cy.get('button').click();
    });

    it('Devem poder cadastrar novos casos', () => {
        cy.Login();
        cy.get('.button').click();

        cy.get('input[placeholder="Título do caso"]').type('Automação em Cypress');
        cy.get('textarea').type('Suporte a automatizadores de JavaScript, NodeJs com Cypress');
        cy.get('input[placeholder="Valor em reais"]').type('100');

        cy.route('POST', '**/incidents').as('newIncident')

        cy.get('.button').click();

        cy.wait('@newIncident').then((xhr) => {
            expect(xhr.status).be.eq(200);
            expect(xhr.response.body).has.property('id');
            expect(xhr.response.body.id).is.not.null;
        })
    });

    it('Devem poder excluir um caso', () => {
        cy.createNewIncident()
        cy.Login();
        
        cy.route('DELETE', '**/incidents/*').as('newDeletion')

        cy.get('li > button > svg').click();
        cy.wait('@newDeletion').then((xhr) => {
            expect(xhr.status).be.eq(204);
            expect(xhr.response.body).to.be.empty;
        })
    })
});