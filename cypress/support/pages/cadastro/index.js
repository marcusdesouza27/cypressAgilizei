const el = require('./elements').ELEMENTS
class Registro {
    acessarCadastro() {
        cy.visit('http://localhost:3000/register')
    }

    preencherCadastro() {
        cy.get(el.inputName).type('MHCS Pets Friend');
        cy.get(el.inputEmail).type('petsfriend@mailinator.com');
        cy.get(el.inputWhatsapp).type('1197600-2863');
        cy.get(el.inputCity).type('São Paulo');
        cy.get(el.inputUf).type('SP');
        cy.server();
        cy.route('POST', '**/ongs').as('postOng');

        cy.get(el.btnConfirm).click();
    }

    validarCadastro() {
        cy.wait('@postOng').then((xhr) => {
            expect(xhr.status).be.eq(200);
            expect(xhr.response.body).has.property('id');
            expect(xhr.response.body.id).is.not.null;
        })
    }
    

}
export default new Registro();
