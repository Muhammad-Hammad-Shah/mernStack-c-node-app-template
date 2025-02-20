// import { config } from 'dotenv';
// config({ path: './.env.dev' });

import request from 'supertest';
import app from '../../app';
import { User } from '../../entity/User';
import { DataSource } from 'typeorm';
import { AppDataSource } from '../../config/data-source';
import { Roles } from '../../constants';
import { isJwt } from '../utils';

// import { truncateTables } from '../utils';

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
            await connection.dropDatabase();
            await connection.synchronize();
            // await truncateTables(connection);
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
            // try {
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
            // expect(users[0].id).toBeDefined();
            // expect(typeof users[0].id).toBe('number');
            // } catch (error) {
            //     console.error('Error during test execution:', error);
            //     throw error;
            // }
        });
        it('should assign a customer role.', async () => {
            // Arrange
            const userData = {
                firstName: 'Muhammad Hamamd',
                lastName: 'Shah',
                email: 'hammad2233shah3322@gmail.com',
                password: 'secret',
            };
            // Act

            await request(app).post('/auth/register').send(userData);
            // Assert

            const userRepository = connection.getRepository(User);
            const users = await userRepository.find();

            // expectations

            expect(users[0]).toHaveProperty('role');
            expect(users[0].role).toBe(Roles.CUSTOMER);
        });
        it('should store the hashed password in the database.', async () => {
            // Arrange
            const userData = {
                firstName: 'Muhammad Hamamd',
                lastName: 'Shah',
                email: 'hammad2233shah3322@gmail.com',
                password: 'secret',
            };
            // Act

            await request(app).post('/auth/register').send(userData);
            // Assert

            const userRepository = connection.getRepository(User);
            const users = await userRepository.find();

            // Expectations
            console.log(users[0].password);
            expect(users[0].password).not.toBe(userData.password);
            expect(users[0].password).toHaveLength(60);
            expect(users[0].password).toMatch(/^\$2b\$\d+\$/);
        });
        it('should return 400 status if email  already exists ', async () => {
            // Arrange
            const userData = {
                firstName: 'Muhammad Hamamd',
                lastName: 'Shah',
                email: 'hammad2233shah3322@gmail.com',
                password: 'secret',
            };
            // Act

            const response = request(app).post('/auth/register').send(userData);
            // Assert

            const userRepository = connection.getRepository(User);

            await userRepository.save({ ...userData, role: Roles.CUSTOMER });
            const users = await userRepository.find();
            expect((await response).statusCode).toBe(400);
            expect(users).toHaveLength(1);
        });
        it('should return acces token and refresh token inside a cookie', async () => {
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

                // interfaces for header

                interface Headers {
                    ['set-cookie']?: string[];
                }

                // Assert

                let accessToken: string | null = null;
                let refreshToken: string | null = null;
                const cookies =
                    (response.headers as Headers)['set-cookie'] || [];

                cookies.forEach((cookie) => {
                    if (cookie.startsWith('accessToken=')) {
                        accessToken = cookie.split(';')[0].split('=')[1];
                    }
                    if (cookie.startsWith('refreshToken=')) {
                        refreshToken = cookie.split(';')[0].split('=')[1];
                    }
                });

                // expections
                // console.log('this is console.log from test', cookies);
                console.log('Full Response:', response);
                console.log('Response Headers:', response.headers);
                console.log(
                    'Cookies:',
                    (response.headers as Headers)['set-cookie'] || [],
                );
                console.log('Setting Cookies:', {
                    accessToken,
                    refreshToken,
                });

                expect(accessToken).not.toBeNull();
                expect(refreshToken).not.toBeNull();

                // to check format of tokens (means k token valid h ya nhi h)

                expect(isJwt(accessToken)).toBeTruthy();
                expect(isJwt(refreshToken)).toBeTruthy();
            } catch (error) {
                console.error('Error during test execution:', error);
                throw error;
            }
        });
        it('should return the id of user created', async () => {
            // Arrange
            const userData = {
                firstName: 'Muhammad Hamamd',
                lastName: 'Shah',
                email: 'hammad2233shah3322@gmail.com',
                password: 'secret',
            };
            // Act
            // try {
            const response = await request(app)
                .post('/auth/register')
                .send(userData);
            // Assert
            expect(response.status).toBe(201);

            const userRepository = connection.getRepository(User);
            const users = await userRepository.find();

            //
            expect(users).toHaveLength(1);
            // expect(users[0].firstName).toBe(userData.firstName);
            // expect(users[0].lastName).toBe(userData.lastName);
            // expect(users[0].email).toBe(userData.email);
            expect(users[0].id).toBeDefined();
            expect(typeof users[0].id).toBe('number');
        });
    });

    describe('Fields are missing', () => {
        it('should return 400 status code if email field is missing', async () => {
            // Arrange
            const userData = {
                firstName: 'Muhammad Hamamd',
                lastName: 'Shah',
                email: '',
                password: 'secret',
            };
            // Act

            const response = await request(app)
                .post('/auth/register')
                .send(userData);
            // Assert
            // console.log(response.body);
            const userRepository = connection.getRepository(User);
            const users = await userRepository.find();
            expect(response.statusCode).toBe(400);
            expect(users).toHaveLength(0);
        });

        it.todo('should return 400 status code if firstName is missing');
        it.todo('should return 400 status code if lastName is missing');
        it.todo('should return 400 status code if password is missing');
    });

    describe('Fields are not in Proper Format', () => {
        it('should trim the email field', async () => {
            // Arrange
            const userData = {
                firstName: 'Muhammad Hamamd',
                lastName: 'Shah',
                email: ' hammad2233shah3322@gmail.com ',
                password: 'secret',
            };
            // Act

            await request(app).post('/auth/register').send(userData);
            // Assert

            const userRepository = connection.getRepository(User);
            const users = await userRepository.find();
            const user = users[0];
            // expectations
            expect(user.email).toBe('hammad2233shah3322@gmail.com');
        });
        it.todo('should return 400 status code if email is not a valid email');
        it.todo(
            'should return 400 status code if password length is less than 8 chars',
        );
        it.todo('should return array of messages if email is missing');
    });
});
