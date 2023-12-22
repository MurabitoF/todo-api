/* eslint-disable no-undef */
const request = require('supertest');
const createServer = require('../utils/server');
const User = require('../models/user.model');
require('jest');

const app = createServer();

const mockUser = {
  id: '65849723571271c632ec694a',
  username: 'test',
  password: '$2a$12$Kh4ZCGNPboNdPtgJZzF0j.tPGCByqboP/Exxs7OnXFf/iXuMNrmWW',
};

describe('POST /api/auth/login', () => {
  it('should return a 400 response if missing password', async () => {
    const response = await request(app).post('/api/v1/auth/login').send({
      username: 'test@example.com',
    });

    expect(response.statusCode).toBe(400);
  });

  it('should return a 404 response if user not found', async () => {
    const userMock = jest.spyOn(User, 'findOne').mockReturnValueOnce(null);
    const response = await request(app).post('/api/v1/auth/login').send({
      username: 'test',
      password: 'XXXXXXXX',
    });

    expect(response.statusCode).toBe(404);
    expect(userMock).toHaveBeenCalled();
  });

  it('should return a 400 if password dont match', async () => {
    jest.spyOn(User, 'findOne').mockReturnValueOnce(mockUser);
    const response = await request(app).post('/api/v1/auth/login').send({
      email: 'test@example.com',
      password: 'XXXXXXXX',
    });

    expect(response.statusCode).toBe(400);
  });

  it('should return a 200 and a token', async () => {
    const userMock = jest.spyOn(User, 'findOne').mockReturnValueOnce(mockUser);
    const response = await request(app).post('/api/v1/auth/login').send({
      username: 'test',
      password: 'Test1234!',
    });

    expect(response.statusCode).toBe(200);
    expect(response.body.token).toBeDefined();
    expect(userMock).toHaveBeenCalled();
  });
});
