const Boom = require('@hapi/boom');
const Task = require('../models/task.model');

class TasksService {
  constructor() {
    if (!TasksService.instance) {
      TasksService.instance = this;
    }
    return TasksService.instance;
  }

  getAll({ sortQuery, limit = 10, skip = 0, completed }) {
    const sort = {};
    if (sortQuery) {
      const parts = sortQuery.split(':');
      sort[parts[0]] = parts[1] === 'desc' ? -1 : 1;
    }

    const match = {};
    if (completed) {
      match.completed = completed === 'true';
    }

    return Task.find(match)
      .sort(sort)
      .skip(parseInt(skip, 10))
      .limit(parseInt(limit, 10));
  }

  async getById(id) {
    const task = await Task.findById(id).exec();
    if (!task) {
      throw Boom.notFound(`Task with the id: "${id}" not found`);
    }
    return task;
  }

  async create(data) {
    return Task.create(data);
  }

  async update(id, data) {
    const task = await this.getById(id);

    if (task.name !== data.name) {
      task.name = data.name;
    }

    if (task.description !== data.description) {
      task.description = data.description;
    }

    if (!!data.completed && task.completed !== data.completed) {
      task.completed = data.completed;
    }

    return task.save();
  }

  async delete(id) {
    const task = await Task.findByIdAndDelete(id);
    if (!task) {
      throw Boom.notFound(`Task with the id: "${id}" not found`);
    }
  }
}

module.exports = TasksService;
