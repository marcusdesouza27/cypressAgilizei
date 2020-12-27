const el = require('./elements').ELEMENTS;

class Login {

    acessarLogin() {
        cy.visit('http://localhost:3000/');
    }

    preencherLogin() {
        cy.get(el.inputLogin).type(Cypress.env('createdOngId'));
        cy.get(el.btnLogin).click();
    }


}
export default new Login();