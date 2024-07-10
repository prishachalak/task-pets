
import express from "express";

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

router.post('/users/add-module', async (req, res) => {
  const { email, moduleId } = req.body;

  try {
      // Find user by email and update modules array
      const user = await User.findOneAndUpdate({ email }, { $push: { modules: moduleId } }, { new: true });

      if (!user) {
          return res.status(404).json({ error: 'User not found' });
      }

      return res.status(200).json(user);
  } catch (error) {
      console.error('Error adding module to user:', error);
      return res.status(500).json({ error: 'Server error' });
  }
});

export default router;
