/// <reference types="cypress" />


import Login from '../support/pages/login';
import Registro from '../support/pages/cadastro';
import Profile from '../support/pages/profile';
import Newincident from '../support/pages/incidents';


describe('Be the Hero', () => {

    it('Cadastrar Usuario', () => {
        Registro.acessarCadastro();
        Registro.preencherCadastro();
        Registro.validarCadastro();
    });

    it('Efetuar um login no sistema', () => {
        Login.acessarLogin();
        Login.preencherLogin();
    })

    it('Devem poder fazer logout', () => {
        cy.Login();
        Profile.fazerLogoff();
    });

    it('Devem poder cadastrar novos casos', () => {
        cy.Login();
        Profile.acessarFormulario();
        Newincident.preencherFormulario();
        Newincident.validarCaso();
    });

    it('Devem poder excluir um caso', () => {
        cy.createNewIncident()
        cy.Login();

        Profile.excluirCaso();
    })
});