import 'mocha';
import * as chai from 'chai';
import request = require('request');

const expect = chai.expect;
const assert = chai.assert;
const path = "http://localhost:3000/api/contacts/";
chai.should();


describe("Contacts", () => {
    const nameTest = 'test1';
    const phoneTest = '23213123';
    const phoneEmail = 'test1@mail.com';
    it('Add contact', (done) => {
        const contactOBj = {
            'name': nameTest,
            'phone': phoneTest,
            'email': phoneEmail
        }
        request.post({
            url: `${path}add`,
            body: contactOBj,
            json: true
        }, function (error, response, body) {
            assert.isNotEmpty(response.body)
            expect(body).to.equal('contact added');
            done();
        })
    })

    it('Get all contacts', (done) => {
        request(`${path}all`, function (error, response, body) {
            console.log(response.body)
            assert.isNotEmpty(response.body)
            done();
        });
    }).timeout(10000);

    it('Get contact by name', (done) => {
        request(`${path}getByName/${nameTest}`, function (error, response, body) {
            assert.isNotEmpty(body);
            const array = JSON.parse(response.body);
            array.forEach(c => {
                assert.equal(c.name, nameTest);
            });
            done();
        });
    });

    it('Get update contact', (done) => {
        const contactOBj = {
            'name': nameTest,
            'phone': '23',
            'email': 'test2@mail.com'
        }
        request.put({
            url: `${path}updateByName`,
            body: contactOBj,
            json: true
        }, function (error, response, body) {
            expect(body).to.equal(`Contact ${nameTest} updated`);
            done();
        });
    }).timeout(10000);

    it('Delete aLL', (done) => {
        request.delete(`${path}deleteAll`, function (error, response, body) {
            assert.isNotEmpty(body)
            expect(body).to.contain('Table Contacts')
            done();
        });
    }).timeout(10000);
});


