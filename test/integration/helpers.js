const supertest = require("supertest");
const chai = require("chai");
const app = require("../../src/app");

const request = supertest(app);
const expect = chai.expect;

module.exports = { request, expect };
