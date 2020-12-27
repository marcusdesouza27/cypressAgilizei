const el = require('./elements').ELEMENTS

class Newincident {
    preencherFormulario() {
        cy.get(el.titulo).type('Automação em Cypress');
        cy.get(el.description).type('Suporte a automatizadores de JavaScript, NodeJs com Cypress');
        cy.get(el.valor).type('100');

        cy.route('POST', '**/incidents').as('newIncident')

        cy.get(el.submit).click();
    }

    validarCaso() {
        cy.wait('@newIncident').then((xhr) => {
            expect(xhr.status).be.eq(200);
            expect(xhr.response.body).has.property('id');
            expect(xhr.response.body.id).is.not.null;
        });
    }

    excluirCaso() {
        cy.route('DELETE', '**/incidents/*').as('newDeletion')

        cy.get(el.btn_delete).click();
        cy.wait('@newDeletion').then((xhr) => {
            expect(xhr.status).be.eq(204);
            expect(xhr.response.body).to.be.empty;
        })
    }

}
export default new Newincident();