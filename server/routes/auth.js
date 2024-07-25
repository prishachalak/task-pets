import express from "express";
import mongoose from 'mongoose';
import User from "../models/user";

const router = express.Router();

const {
  signup,
  signin,
} = require("../controllers/auth");

router.get("/", (req, res) => {
  return res.json({
    data: "",
  });
});
router.post("/signup", signup);
router.post("/signin", signin);

router.get("/module-list", async (req, res) => {
  const apiUrl = "https://api.nusmods.com/v2/2018-2019/moduleInfo.json"; 

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error fetching module list:", error);
    res.status(500).json({ error: "Error fetching module list" });
  }
});

router.put('/user/:userId/add-module', async (req, res) => {
  const { userId } = req.params;
  const { module } = req.body;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: "Invalid user ID" });
  }

  if (!module || !module.moduleCode) {
      return res.status(400).json({ error: "Invalid module data" });
  }

  try {
      const user = await User.findById(userId);
      if (!user) {
          return res.status(404).json({ error: "User not found" });
      }

      const moduleExists = user.modules.some(mod => mod.moduleCode === module.moduleCode);
      if (moduleExists) {
          return res.status(400).json({ error: "Module already added" });
      }

      user.modules.push(module);
      await user.save();

      res.json(user);
  } catch (error) {
      console.error("Error adding module: ", error);
      res.status(500).json({ error: "Internal server error" });
  }
});

router.put('/user/:userId/remove-module', async (req, res) => {
  const { userId } = req.params;
  const { moduleCode } = req.body;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: "Invalid user ID" });
  }

  if (!moduleCode) {
      return res.status(400).json({ error: "Module code is required" });
  }

  try {
      const user = await User.findById(userId);
      if (!user) {
          return res.status(404).json({ error: "User not found" });
      }

      user.modules = user.modules.filter(mod => mod.moduleCode !== moduleCode);
      await user.save();

      res.json(user);
  } catch (error) {
      console.error("Error removing module: ", error.message);
      res.status(500).json({ error: "Internal server error" });
  }
});

// Add a new todo
router.post('/users/:userId/todos', async (req, res) => {
  const { text, description, deadline } = req.body;
  console.log('Received request to add todo');
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      console.log('User not found');
      return res.status(404).send('User not found');
    }
    const todo = { text, description, deadline };
    user.todos.push(todo);
    await user.save();
    console.log('Todo added:', todo);
    res.status(201).send(todo);
  } catch (error) {
    console.error('Error adding todo:', error);
    res.status(500).send(error);
  }
});

//update todo
router.put('/users/:userId/todos/:todoId', async (req, res) => {
  const { text, description, deadline } = req.body;
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).send('User not found');
    }
    const todo = user.todos.id(req.params.todoId);
    if (!todo) {
      return res.status(404).send('Todo not found');
    }
    if (text) todo.text = text;
    if (description) todo.description = description;
    if (deadline) todo.deadline = deadline;
    
    await user.save();
    res.send(todo);
  } catch (error) {
    console.error('Error updating todo:', error);
    res.status(500).send(error);
  }
});

// Get all the todos
router.get('/users/:userId/todos', async (req, res) => {
  console.log(`Fetching todos for user ID: ${req.params.userId}`);
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      console.log('User not found for ID:', req.params.userId);
      return res.status(404).send('User not found');
    }
    console.log('Todos found for user:', user.todos);
    res.send(user.todos);
  } catch (error) {
    console.error('Error fetching todos for user ID:', req.params.userId, error);
    res.status(500).send(error);
  }
});

// mark todo as completed
router.put('/users/:userId/todos/:todoId/complete', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).send('User not found');
    }
    const todo = user.todos.id(req.params.todoId);
    if (!todo) {
      return res.status(404).send('Todo not found');
    }
    user.todos = user.todos.filter(t => t._id.toString() !== req.params.todoId);
    const completedTodo = {
      text: todo.text,
      description: todo.description,
      deadline: todo.deadline,
    };
    user.completedTodos.push(completedTodo);

    await user.save();
    res.status(201).send(completedTodo);
  } catch (error) {
    console.error('Error completing todo:', error);
    res.status(500).send(error);
  }
});

//get completed todos
router.get('/users/:userId/completed-todos', async (req, res) => {
  console.log(`Fetching completed todos for user ID: ${req.params.userId}`);
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      console.log('User not found for ID:', req.params.userId);
      return res.status(404).send('User not found');
    }
    console.log('Completed todos found for user:', user.todos);
    res.send(user.completedTodos);
  } catch (error) {
    console.error('Error fetching completed todos for user ID:', req.params.userId, error);
    res.status(500).send(error);
  }
});

// delete completed todos 
router.delete('/users/:userId/completed-todos/:todoId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).send('User not found');
    }
    user.completedTodos = user.completedTodos.filter(todo => todo._id.toString() !== req.params.todoId);
    await user.save();
    res.send(user.completedTodos);
  } catch (error) {
    console.error('Error deleting completed todo:', error);
    res.status(500).send(error);
  }
});

//add profile picture
router.put('/user/:userId/update-image', async (req, res) => {
  try {
    const { userId } = req.params;
    const { imageUri } = req.body;

    const user = await User.findByIdAndUpdate(
      userId,
      { 'image.url': imageUri },
      { new: true }
    );

    if (!user) {
      return res.status(404).send('User not found');
    }

    res.json(user);
  } catch (error) {
    console.error('Error updating profile image:', error);
    res.status(500).send('Internal server error');
  }
});

export default router;