
import express from "express";
import mongoose from 'mongoose';
import User from "../models/user";

const router = express.Router();

// controllers
const {
  signup,
  signin,
  forgotPassword,
  resetPassword,
} = require("../controllers/auth");

router.get("/", (req, res) => {
  return res.json({
    data: "hello world from kaloraat auth API",
  });
});
router.post("/signup", signup);
router.post("/signin", signin);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

router.get("/module-list", async (req, res) => {
  const apiUrl = "http://api.nusmods.com/2015-2016/1/moduleList.json"; // Use the correct academic year and semester

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
      // Check if the user exists
      const user = await User.findById(userId);
      if (!user) {
          return res.status(404).json({ error: "User not found" });
      }

      // Check if the module is already in the user's modules
      const moduleExists = user.modules.some(mod => mod.moduleCode === module.moduleCode);
      if (moduleExists) {
          return res.status(400).json({ error: "Module already added" });
      }

      // Add the module to the user's modules
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


export default router;
