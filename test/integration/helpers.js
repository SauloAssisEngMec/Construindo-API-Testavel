// const supertest = require("supertest");
// const chai = require("chai");
// const app = require("../../src/app");

// // const setupApp = setupApp;

// const request = supertest(app);
// const expect = chai.expect;

// module.exports = { expect, request };

const supertest = require("supertest");
const setupApp = require("../../src/app.js");
const chai = require("chai");

const expect = chai.expect;

module.exports = { supertest, setupApp, expect };
