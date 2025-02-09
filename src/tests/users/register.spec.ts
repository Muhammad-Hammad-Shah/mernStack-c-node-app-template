// import { config } from 'dotenv';
// config({ path: './.env.dev' });

import request from 'supertest';
import app from '../../app';
import { User } from '../../entity/User';
import { DataSource } from 'typeorm';
import { AppDataSource } from '../../config/data-source';
import { truncateTables } from '../utils';

describe('POST /auth/register', () => {
    let connection: DataSource;

    beforeAll(async () => {
        try {
            connection = await AppDataSource.initialize();
        } catch (error) {
            console.error('Error during Data Source initialization:', error);
        }
    });

    beforeEach(async () => {
        try {
            // DB truncate
            await truncateTables(connection);
        } catch (error) {
            console.error('Error during table truncation:', error);
        }
    });

    afterAll(async () => {
        if (connection) {
            try {
                await connection.destroy();
            } catch (error) {
                console.error('Error during Data Source destruction:', error);
            }
        }
    });

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
            try {
                const response = await request(app)
                    .post('/auth/register')
                    .send(userData);
                // Assert
                expect(response.status).toBe(201);

                const userRepository = connection.getRepository(User);
                const users = await userRepository.find();

                //
                expect(users).toHaveLength(1);
                expect(users[0].firstName).toBe(userData.firstName);
                expect(users[0].lastName).toBe(userData.lastName);
                expect(users[0].email).toBe(userData.email);
            } catch (error) {
                console.error('Error during test execution:', error);
                throw error;
            }
            it.todo('should return the id of the created user');
        });
    });

    describe('Fields are missing', () => {});
});
