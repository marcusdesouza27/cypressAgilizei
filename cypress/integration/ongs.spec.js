/// <reference types="cypress" />

describe('Be the Hero', () => {

    it('Cadastrar Usuario', () => {
        cy.visit('http://localhost:3000/register')
        cy.get('[data-cy="name"]').type('MHCS Pets Friend');
        cy.get('[data-cy="email"]').type('petsfriend@mailinator.com');
        cy.get('[data-cy="whatsapp"]').type('1197600-2863');
        cy.get('[data-cy="city"]').type('São Paulo');
        cy.get('[data-cy="uf"]').type('SP');

        //routing...
        // start server com cy.server()
        // criar uma rota com cu route()
        // Atribuir rota a um alias
        // esperar com cy.wait

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
});