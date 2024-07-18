// import express from "express";
// import mongoose from 'mongoose';
// import User from "../models/user";

// const router = express.Router();

// const {
//   signup,
//   signin,
//   forgotPassword,
//   resetPassword,
// } = require("../controllers/auth");

// router.get("/", (req, res) => {
//   return res.json({
//     data: "",
//   });
// });
// router.post("/signup", signup);
// router.post("/signin", signin);
// router.post("/forgot-password", forgotPassword);
// router.post("/reset-password", resetPassword);

// router.get("/module-list", async (req, res) => {
//   const apiUrl = "http://api.nusmods.com/2015-2016/1/moduleList.json"; 

//   try {
//     const response = await fetch(apiUrl);
//     if (!response.ok) {
//       throw new Error("Network response was not ok");
//     }
//     const data = await response.json();
//     res.json(data);
//   } catch (error) {
//     console.error("Error fetching module list:", error);
//     res.status(500).json({ error: "Error fetching module list" });
//   }
// });

// router.put('/user/:userId/add-module', async (req, res) => {
//   const { userId } = req.params;
//   const { module } = req.body;

//   if (!mongoose.Types.ObjectId.isValid(userId)) {
//       return res.status(400).json({ error: "Invalid user ID" });
//   }

//   if (!module || !module.moduleCode) {
//       return res.status(400).json({ error: "Invalid module data" });
//   }

//   try {
//       const user = await User.findById(userId);
//       if (!user) {
//           return res.status(404).json({ error: "User not found" });
//       }

//       const moduleExists = user.modules.some(mod => mod.moduleCode === module.moduleCode);
//       if (moduleExists) {
//           return res.status(400).json({ error: "Module already added" });
//       }

//       user.modules.push(module);
//       await user.save();

//       res.json(user);
//   } catch (error) {
//       console.error("Error adding module: ", error);
//       res.status(500).json({ error: "Internal server error" });
//   }
// });

// router.put('/user/:userId/remove-module', async (req, res) => {
//   const { userId } = req.params;
//   const { moduleCode } = req.body;

//   if (!mongoose.Types.ObjectId.isValid(userId)) {
//       return res.status(400).json({ error: "Invalid user ID" });
//   }

//   if (!moduleCode) {
//       return res.status(400).json({ error: "Module code is required" });
//   }

//   try {
//       const user = await User.findById(userId);
//       if (!user) {
//           return res.status(404).json({ error: "User not found" });
//       }

//       user.modules = user.modules.filter(mod => mod.moduleCode !== moduleCode);
//       await user.save();

//       res.json(user);
//   } catch (error) {
//       console.error("Error removing module: ", error.message);
//       res.status(500).json({ error: "Internal server error" });
//   }
// });

// // Add a new todo
// router.post('/api/users/:userId/todos', async (req, res) => {
//   console.log('Received request to add todo');
//   try {
//     const user = await User.findById(req.params.userId);
//     if (!user) {
//       return res.status(404).send('User not found');
//     }
//     const todo = { text: req.body.text };
//     user.todos.push(todo);
//     await user.save();
//     console.log('Todo added:', todo);
//     res.status(201).send(todo);
//   } catch (error) {
//     console.error('Error adding todo:', error);
//     res.status(500).send(error);
//   }
// });

// // Get all the todos
// router.get('/api/users/:userId/todos', async (req, res) => {
//   console.log(`Fetching todos for user ID: ${req.params.userId}`);
//   try {
//     const user = await User.findById(req.params.userId);
//     if (!user) {
//       console.log('User not found');
//       return res.status(404).send('User not found');
//     }
//     console.log('Todos found:', user.todos);
//     res.send(user.todos);
//   } catch (error) {
//     console.error('Error fetching todos:', error);
//     res.status(500).send(error);
//   }
// });

// // Update a todo
// router.put('/api/users/:userId/todos/:todoId', async (req, res) => {
//   try {
//     const user = await User.findById(req.params.userId);
//     if (!user) {
//       return res.status(404).send('User not found');
//     }
//     const todo = user.todos.id(req.params.todoId);
//     if (!todo) {
//       return res.status(404).send('Todo not found');
//     }
//     todo.text = req.body.text !== undefined ? req.body.text : todo.text;
//     todo.completed = req.body.completed !== undefined ? req.body.completed : todo.completed;
//     await user.save();
//     res.send(todo);
//   } catch (error) {
//     res.status(500).send(error);
//   }
// });

// // Delete a todo
// router.delete('/api/users/:userId/todos/:todoId', async (req, res) => {
//   try {
//     const user = await User.findById(req.params.userId);
//     if (!user) {
//       return res.status(404).send('User not found');
//     }
//     user.todos = user.todos.filter(todo => todo._id.toString() !== req.params.todoId);
//     await user.save();
//     res.send(user.todos);
//   } catch (error) {
//     res.status(500).send(error);
//   }
// });

// router.get('/test', (req, res) => {
//   console.log('Test route accessed');
//   res.send('Test route works');
// });

// export default router;

import express from "express";
import mongoose from 'mongoose';
import User from "../models/user";

const router = express.Router();

const {
  signup,
  signin,
  forgotPassword,
  resetPassword,
} = require("../controllers/auth");

router.get("/", (req, res) => {
  return res.json({
    data: "",
  });
});
router.post("/signup", signup);
router.post("/signin", signin);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

router.get("/module-list", async (req, res) => {
  const apiUrl = "http://api.nusmods.com/2015-2016/1/moduleList.json"; 

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
  console.log('Received request to add todo');
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      console.log('User not found');
      return res.status(404).send('User not found');
    }
    const todo = { text: req.body.text };
    user.todos.push(todo);
    await user.save();
    console.log('Todo added:', todo);
    res.status(201).send(todo);
  } catch (error) {
    console.error('Error adding todo:', error);
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

router.delete('/users/:userId/todos/:todoId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).send('User not found');
    }
    user.todos = user.todos.filter(todo => todo._id.toString() !== req.params.todoId);
    await user.save();
    res.send(user.todos);
  } catch (error) {
    console.error('Error deleting todo:', error);
    res.status(500).send(error);
  }
});

export default router;