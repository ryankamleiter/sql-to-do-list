const express = require('express');
const router = express.Router();
const { Sequelize, DataTypes } = require('sequelize');

// Initialize Sequelize
const sequelize = new Sequelize('postgres://ryankamleiter@localhost:5432/weekend-to-do-app');

const Todo = sequelize.define('Todo', {
  text: {
    type: DataTypes.STRING,
    allowNull: false
  },
  isComplete: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
});


(async () => {
  await Todo.sync();
})();

// GET route to fetch all todos
router.get('/', async (req, res) => {
  try {
    const todos = await Todo.findAll();
    res.json(todos);
  } catch (error) {
    console.error('Error getting todos:', error);
    res.sendStatus(500);
  }
});

// POST route to create a new todo
router.post('/', async (req, res) => {
  try {
    const newTodo = await Todo.create({ text: req.body.text });
    res.sendStatus(201);
  } catch (error) {
    console.error('Error creating todo:', error);
    res.sendStatus(500);
  }
});

// DELETE route to delete a todo
router.delete('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    await Todo.destroy({
      where: {
        id: id
      }
    });
    res.sendStatus(204);
  } catch (error) {
    console.error('Error deleting todo:', error);
    res.sendStatus(500);
  }
});

// PUT route to toggle todo completion status
router.put('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const todo = await Todo.findByPk(id);
    todo.isComplete = !todo.isComplete;
    await todo.save();
    res.sendStatus(201);
  } catch (error) {
    console.error('Error updating todo:', error);
    res.sendStatus(500);
  }
});

module.exports = router;