import request from 'supertest';
import calculatedDiscount from './src/utils';
import app from './src/app';

describe('App', () => {
    it('should  return correct discount amount', () => {
        const discount = calculatedDiscount(100, 10);
        expect(discount).toBe(10);
    });

    it('should return the status codee 200 ', async () => {
        const response = await request(app).get('/').send();
        expect(response.status).toBe(200);
    });
});
