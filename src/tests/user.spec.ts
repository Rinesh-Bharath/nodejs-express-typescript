import request from 'supertest';

import { describe, expect, test } from '@jest/globals';

import app from '../app';

const userId = '01J2KSMRYFVVR4G72WK5ZS9QJA';

describe('Sum module', () => {
  test('adds 1 + 2 to equal 3', () => {
    expect(3).toBe(3);
  });
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
