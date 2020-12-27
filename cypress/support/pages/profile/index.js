const el = require('./elements').ELEMENTS

class Profile {
    fazerLogoff() {
        cy.get(el.btn_sair).click();
    }

    acessarFormulario() {
        cy.get(el.btn_newIncident).click();
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
export default new Profile();