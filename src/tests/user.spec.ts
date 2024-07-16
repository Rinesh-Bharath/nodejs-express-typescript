import request from 'supertest';
import { describe, expect } from '@jest/globals';
import app from '../app';
import { connectDB, disConnectDB } from '../repository/mongodb/init';

let mockUserId: string;

const mockUser = {
  email: 'email@abc.com',
  firstName: 'firstname',
  lastName: 'lastname',
};

beforeAll(async () => {
  await connectDB();
});

afterAll(async () => {
  await disConnectDB();
});

describe('GET /', () => {
  it('Ping the web server', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
  });
});

describe('POST /user', () => {
  it('Create a user should respond with a user', async () => {
    const response = await request(app).post('/user').send(mockUser);
    expect(response.status).toBe(200);
    const { status: statusCode, data: user } = response.body;
    expect(statusCode).toEqual(200);
    const { userId, email } = user;
    mockUserId = userId;
    expect(email).toEqual(mockUser.email);
  });
});

describe('GET /user', () => {
  it('Missing userId should respond with 404', async () => {
    const response = await request(app).get(`/user`);
    expect(response.status).toBe(404);
    const { status: statusCode } = response.body;
    expect(statusCode).toEqual(404);
  });

  it('Invalid userId should respond with 404', async () => {
    const response = await request(app).get(`/user?userId=abc`);
    expect(response.status).toBe(404);
    const { status: statusCode } = response.body;
    expect(statusCode).toEqual(404);
  });

  it('Valid userId should respond with a user', async () => {
    const response = await request(app).get(`/user?userId=${mockUserId}`);
    expect(response.status).toBe(200);
    const { status: statusCode, data } = response.body;
    expect(statusCode).toEqual(200);
    const { userId } = data;
    expect(userId).toEqual(mockUserId);
  });
});
