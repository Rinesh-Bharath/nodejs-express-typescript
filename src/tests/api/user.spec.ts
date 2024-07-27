import request from 'supertest';
import { ulid } from 'ulid';

import { faker } from '@faker-js/faker';
import { describe, expect } from '@jest/globals';

import app from '../../app';
import { connectDB, disConnectDB } from '../../repository/mongodb/init';
import { IUser } from '../../repository/mongodb/user';
import { Status } from '../../shared/error/status.enum';

// Faker JS API reference
// https://fakerjs.dev/api/

const sex = faker.person.sexType();
const firstName = faker.person.firstName(sex);
const lastName = faker.person.lastName(sex);
const email = faker.internet.email({ firstName, lastName });

const mockUser: Partial<IUser> = {
  userId: ulid(),
  email: email,
  firstName: firstName,
  lastName: lastName,
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
    expect(response.status).toBe(Status.OK);
  });
});

describe('POST /user', () => {
  it('Create a user should respond with a user', async () => {
    const response = await request(app).post('/user').send(mockUser);
    expect(response.status).toBe(Status.OK);
    const { status: statusCode, data: user } = response.body;
    expect(statusCode).toEqual(Status.OK);
    const { userId, email } = user;
    mockUser.userId = userId;
    expect(email).toEqual(mockUser.email);
  });
});

describe('GET /user', () => {
  it('Missing userId should respond with BadRequest', async () => {
    const response = await request(app).get(`/user`);
    expect(response.status).toBe(Status.BadRequest);
    const { status: statusCode } = response.body;
    expect(statusCode).toEqual(Status.BadRequest);
  });

  it('Invalid userId should respond with BadRequest', async () => {
    const response = await request(app).get(`/user?userId=abc`);
    expect(response.status).toBe(Status.BadRequest);
    const { status: statusCode } = response.body;
    expect(statusCode).toEqual(Status.BadRequest);
  });

  it('Valid userId should respond with a user', async () => {
    const response = await request(app).get(`/user?userId=${mockUser.userId}`);
    expect(response.status).toBe(Status.OK);
    const { status: statusCode, data } = response.body;
    expect(statusCode).toEqual(Status.OK);
    const { userId } = data;
    expect(userId).toEqual(mockUser.userId);
  });
});
