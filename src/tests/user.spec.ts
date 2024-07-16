import request from 'supertest';
import { describe, expect } from '@jest/globals';
import app from '../app';
import { connectDB, disConnectDB } from '../repository/mongodb/init';

const userId = '01J2KSMRYFVVR4G72WK5ZS9QJA';

beforeAll(async () => {
  await connectDB();
});

afterAll(async () => {
  await disConnectDB();
});

describe('User related endpoints ', () => {
  it('Ping the web server', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
  });

  it('GET /user should respond with a user object', async () => {
    const response = await request(app).get(`/user?userId=${userId}`);
    expect(response.status).toBe(200);
    const { status: statusCode, data } = response.body;
    const { userId: id } = data;
    expect(statusCode).toEqual(200);
    expect(id).toEqual(userId);
  });
});
