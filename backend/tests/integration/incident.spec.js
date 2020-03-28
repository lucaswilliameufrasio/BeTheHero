const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('INCIDENT', () => {
    beforeEach(async () => {
        await connection.migrate.rollback();
        await connection.migrate.latest();
    });

    afterAll(async (done) => {
        await connection.destroy();
        done();
    })

    it('should be able to create a new Incident', async () => {
        await request(app)
            .post('/ongs')
            .send({
                name: "APAD",
                email: "contat@apad.com",
                whatsapp: "4700000000",
                city: "Rio do Sul",
                uf: "SC"
            })
            .then(response => {
                request(app)
                    .post('/incidents')
                    .set('authorization', response.body.id)
                    .send({
                        title: "Caso 1",
                        description: "Detalhes do Caso",
                        value: 120
                    })

                expect(response.body).toHaveProperty('id');
            });
    });
})