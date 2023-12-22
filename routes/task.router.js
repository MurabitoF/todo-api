const router = require('express').Router();
const TasksService = require('../services/tasks.service');
const validate = require('../middlewares/validate.middleware');
const taskValidationSchema = require('../validations/task.validation');
const mongoIdValidationSchema = require('../validations/mongoId.validation');

const tasksService = new TasksService();

/**
 * @swagger
 * /api/v1/tasks:
 *  get:
 *    summary: Get All Tasks
 *    description: Use to request all tasks
 *    produces:
 *      - application/json
 *    parameters:
 *      - in: query
 *        name: sort
 *        description: Sorting query
 *      - in: query
 *        name: limit
 *        description: Limit query
 *      - in: query
 *        name: skip
 *        description: Skip query
 *      - in: query
 *        name: completed
 *        description: Filter results by completed property
 *        type: boolean
 *    responses:
 *      '200':
 *        description: A successful response
 *        schema:
 *          type: array
 *
 */
router.get('/', async (req, res) => {
  const { sort, limit, skip, completed } = req.query;

  const tasks = await tasksService.getAll({
    sortQuery: sort,
    limit,
    skip,
    completed,
  });
  res.json(tasks);
});

/**
 * @swagger
 * /api/v1/tasks/{id}:
 *  get:
 *    summary: Get Tasks by ID
 *    description: Use to request a task by ID
 *    produces:
 *      - application/json
 *    parameters:
 *      - in: path
 *        name: id
 *        description: The task ID
 *    responses:
 *      '200':
 *        description: A successful response
 *        schema:
 *          type: json
 *      '400':
 *        description: ID has wrong format
 *        schema:
 *          type: json
 *      '404':
 *        description: Task not found
 *        schema:
 *          type: son
 */
router.get(
  '/:id',
  mongoIdValidationSchema(),
  validate,
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const task = await tasksService.getById(id);
      return res.json(task);
    } catch (err) {
      return next(err);
    }
  }
);
/**
 * @swagger
 * /api/v1/tasks:
 *  post:
 *    summary: Create New Task
 *    description: Use to create a new task
 *    produces:
 *      - application/json
 *    responses:
 *      '201':
 *        description: The Task was created successfully
 *        schema:
 *          type: json
 *      '400':
 *        description: Body has missing required attributes
 *        schema:
 *          type: json
 */
router.post('/', taskValidationSchema(), validate, async (req, res, next) => {
  try {
    const { body } = req;
    const newTask = await tasksService.create(body);
    return res.status(201).json(newTask);
  } catch (err) {
    return next(err);
  }
});

/**
 * @swagger
 * /api/v1/tasks/{id}:
 *  put:
 *    summary: Update Task
 *    description: Use to modify a task
 *    produces:
 *      - application/json
 *    parameters:
 *      - in: path
 *        name: id
 *        description: The task ID
 *    responses:
 *      '200':
 *        description: The task updated correctly
 *        schema:
 *          type: json
 *      '400':
 *        description: ID has wrong format
 *        schema:
 *          type: json
 *      '404':
 *        description: Task not found
 *        schema:
 *          type: son
 */
router.put(
  '/:id',
  mongoIdValidationSchema(),
  taskValidationSchema(),
  validate,
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const { body } = req;
      const task = await tasksService.update(id, body);
      return res.json(task);
    } catch (err) {
      return next(err);
    }
  }
);

/**
 * @swagger
 * /api/v1/tasks/{id}:
 *  delete:
 *    summary: Delete Task
 *    description: Use to delete a task
 *    produces:
 *      - application/json
 *    parameters:
 *      - in: path
 *        name: id
 *        description: The task ID
 *    responses:
 *      '204':
 *        description: The task deleted correctly
 *        schema:
 *          type: json
 *      '404':
 *        description: Task not found
 *        schema:
 *          type: json
 */
router.delete(
  '/:id',
  mongoIdValidationSchema(),
  validate,
  async (req, res, next) => {
    try {
      const { id } = req.params;
      await tasksService.delete(id);
      return res.status(204).json();
    } catch (err) {
      return next(err);
    }
  }
);

module.exports = router;
