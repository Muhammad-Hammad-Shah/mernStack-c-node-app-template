import request from 'supertest';
import app from '../../app';

describe('POST auth/register', () => {
    describe('Given all fields', () => {
        it('should return the status code 201', async () => {
            // AAA
            // Arrange
            const userData = {
                firstName: 'Muhammad Hamamd',
                lastName: 'Shah',
                email: 'hammad2233shah3322@gmail.com',
                password: 'secret',
            };
            // Act
            const response = await request(app)
                .post('/auth/register')
                .send(userData);
            // Assert
            expect(
                (response.headers as Record<string, string>)['content-type'],
            ).toEqual(expect.stringContaining('json'));
        });
    });

    describe('Fields are missing', () => {});
});
