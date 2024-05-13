## how to apply TDD using nodeJs and express

### In this project I will create a small system for a virtual store that will cover topics such as:

1. How to build modularized and decoupled applications
2. How to integrate with NoSQL database using MongoDB
3. How to test Javascript applications with Test-driven-development
4. Why testing facilitates development
5. How to design APIs following the REST standard
6. How to provide API authentication and security

## in thi scase I will approach outside-in test

I will test from the outside in, that is, we will start with integration tests and move on to unit tests

## I will use Mocha: módulo que ira executar as suites de teste.

Mocha: the model that will runner test suites.
Chai and sinon: the models that will be used to make assertions.
Supertest: the model that will be used to emulate and abstract http request.

### starting with Integration test

We will create routes an http req and res guided by integration tests, so it will be possible to validate the behavior.

In this case we will need supertest do make fake http request defined in mocha.config in integratio directory

### unit test

- We will create controllers guided by unit tests, so it will be possible to validate the behavior separately from our system itself.

- we will use sinonjs to create spies, stubs e mocks, which will allow you to isolate the unit test
