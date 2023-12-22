/* eslint-disable node/no-unsupported-features/es-syntax */
/* eslint-disable no-undef */
const request = require('supertest');
const createServer = require('../utils/server');
const TasksService = require('../services/tasks.service');
require('jest');

const app = createServer();

const tasksMock = [
  {
    id: '6584bec0047fd878aa6820a5',
    name: 'Task 1',
    description: 'Task 1 description',
    completed: false,
  },
  {
    id: '6584beefbd763dee839b823b',
    name: 'Task 2',
    description: '',
    completed: true,
  },
  {
    id: '6584bef7c85e0283f3aa2201',
    name: 'Task 3',
    description: 'Task 3 description',
    completed: true,
  },
  {
    id: '6584befc8c15b26052ff6948',
    name: 'Task 4',
    completed: false,
  },
  {
    id: '6584bf0474029eab8f03f116',
    name: 'Task 5',
    completed: true,
  },
  {
    id: '6584bf0df4db7958aea24b9b',
    name: 'Task 6',
    description: 'Task 6 description',
    completed: false,
  },
];
const completedTasksMock = [tasksMock[1], tasksMock[2], tasksMock[4]];
const paginatedTasksMock = [tasksMock[1], tasksMock[2], tasksMock[3]];
const updatedTaskMock = { ...tasksMock[0], completed: true };

describe('GET /api/v1/tasks/', () => {
  it('should return unauthorized if has no authorizartion header', async () =>
    request(app)
      .get('/api/v1/tasks/')
      .expect('Content-Type', /json/)
      .expect(401));

  it('should return all tasks', async () => {
    const taskService = new TasksService();
    const createTaskServiceMock = jest
      .spyOn(taskService, 'getAll')
      .mockReturnValueOnce(tasksMock);

    const token = process.env.TEST_TOKEN;
    await request(app)
      .get('/api/v1/tasks/')
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(200)
      .expect(({ body }) => {
        expect(body).toEqual(tasksMock);
        expect(createTaskServiceMock).toHaveBeenCalled();
      });
  });

  it('should return all tasks marked as completed', async () => {
    const taskService = new TasksService();
    const createTaskServiceMock = jest
      .spyOn(taskService, 'getAll')
      .mockReturnValueOnce(completedTasksMock);

    const token = process.env.TEST_TOKEN;
    await request(app)
      .get('/api/v1/tasks/?completed=true')
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(200)
      .expect(({ body }) => {
        expect(body).toEqual(completedTasksMock);
        expect(createTaskServiceMock).toHaveBeenCalled();
      });
  });

  it('should skip the first task and return the following 3 tasks', async () => {
    const taskService = new TasksService();
    const createTaskServiceMock = jest
      .spyOn(taskService, 'getAll')
      .mockReturnValueOnce(paginatedTasksMock);

    const token = process.env.TEST_TOKEN;
    await request(app)
      .get('/api/v1/tasks/?skip=1&limit=3')
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(200)
      .expect(({ body }) => {
        expect(body).toEqual(paginatedTasksMock);
        expect(createTaskServiceMock).toHaveBeenCalled();
      });
  });
});

describe('GET /api/v1/tasks/:id', () => {
  it('should return unauthorized if has no authorizartion header', async () =>
    request(app)
      .get('/api/v1/tasks/6584bec0047fd878aa6820a5')
      .expect('Content-Type', /json/)
      .expect(401));

  it('should return bad request if id is not valid', async () => {
    const token = process.env.TEST_TOKEN;

    request(app)
      .get('/api/v1/tasks/1')
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(400);
  });

  it('should return a task', async () => {
    const taskService = new TasksService();
    const createTaskServiceMock = jest
      .spyOn(taskService, 'getById')
      .mockReturnValueOnce(tasksMock[0]);

    const token = process.env.TEST_TOKEN;
    await request(app)
      .get('/api/v1/tasks/6584bec0047fd878aa6820a5')
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(200)
      .expect(({ body }) => {
        expect(body).toEqual(tasksMock[0]);
        expect(createTaskServiceMock).toHaveBeenCalled();
      });
  });
});

describe('POST /api/v1/tasks/', () => {
  it('should return unauthorized if has no authorizartion header', async () =>
    request(app)
      .post('/api/v1/tasks/')
      .expect('Content-Type', /json/)
      .expect(401));

  it('should return bad request if name is missing', async () => {
    const token = process.env.TEST_TOKEN;
    await request(app)
      .post('/api/v1/tasks/')
      .set('Authorization', `Bearer ${token}`)
      .send({
        description: 'Task 1 description',
        completed: false,
      })
      .expect('Content-Type', /json/)
      .expect(400);
  });

  it('should create a task', async () => {
    const taskService = new TasksService();
    const createTaskServiceMock = jest
      .spyOn(taskService, 'create')
      .mockReturnValueOnce(tasksMock[0]);

    const token = process.env.TEST_TOKEN;
    await request(app)
      .post('/api/v1/tasks/')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Task 1',
        description: 'Task 1 description',
        completed: false,
      })
      .expect('Content-Type', /json/)
      .expect(201)
      .expect(({ body }) => {
        expect(body).toEqual(tasksMock[0]);
        expect(createTaskServiceMock).toHaveBeenCalled();
      });
  });
});

describe('PUT /api/v1/tasks/:id', () => {
  it('should return unauthorized if has no authorizartion header', async () =>
    request(app)
      .put('/api/v1/tasks/6584bec0047fd878aa6820a5')
      .expect('Content-Type', /json/)
      .expect(401));

  it('should return bad request if id is not valid', async () => {
    const token = process.env.TEST_TOKEN;

    request(app)
      .get('/api/v1/tasks/1')
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(400);
  });

  it('should return bad request if name is missing', async () => {
    const token = process.env.TEST_TOKEN;
    await request(app)
      .put('/api/v1/tasks/6584bec0047fd878aa6820a5')
      .set('Authorization', `Bearer ${token}`)
      .send({
        description: 'Task 1 description',
        completed: false,
      })
      .expect('Content-Type', /json/)
      .expect(400);
  });

  it('should update a task', async () => {
    const taskService = new TasksService();
    const createTaskServiceMock = jest
      .spyOn(taskService, 'update')
      .mockReturnValueOnce(updatedTaskMock);

    const token = process.env.TEST_TOKEN;
    await request(app)
      .put('/api/v1/tasks/6584bec0047fd878aa6820a5')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Task 1',
        description: 'Task 1 description',
        completed: true,
      })
      .expect('Content-Type', /json/)
      .expect(200)
      .expect(({ body }) => {
        expect(body).toEqual(updatedTaskMock);
        expect(createTaskServiceMock).toHaveBeenCalled();
      });
  });
});

describe('DELETE /api/v1/tasks/:id', () => {
  it('should return unauthorized if has no authorizartion header', async () =>
    request(app)
      .delete('/api/v1/tasks/6584bec0047fd878aa6820a5')
      .expect('Content-Type', /json/)
      .expect(401));

  it('should return bad request if id is not valid', async () => {
    const token = process.env.TEST_TOKEN;

    request(app)
      .get('/api/v1/tasks/1')
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(400);
  });

  it('should delete a task', async () => {
    const taskService = new TasksService();
    const createTaskServiceMock = jest
      .spyOn(taskService, 'delete')
      .mockReturnValueOnce(null);

    const token = process.env.TEST_TOKEN;
    await request(app)
      .delete('/api/v1/tasks/6584bec0047fd878aa6820a5')
      .set('Authorization', `Bearer ${token}`)
      .expect(204)
      .expect(() => {
        expect(createTaskServiceMock).toHaveBeenCalled();
      });
  });
});
