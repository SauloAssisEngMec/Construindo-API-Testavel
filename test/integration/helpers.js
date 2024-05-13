//responsável por inicializar as configurações de testes que serão usadas em todos os testes de integração

const supertest = require("supertest");
const setupApp = require("../../src/app.js");
const chai = require("chai");

const expect = chai.expect;

module.exports = { supertest, setupApp, expect };
