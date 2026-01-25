const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

const {
  addSkill,
  getMySkills,
  getUserSkills,
  deleteSkill,
  updateSkill,
  addWantedSkill,
  getMyWantedSkills,
} = require("../controllers/skillController");

// 🔐 PROTECTED ROUTES
router.post("/", protect, upload.single("thumbnail"), addSkill);
router.get("/my", protect, getMySkills);
router.get("/user/:userId", getUserSkills);
router.put("/:id", protect, updateSkill);
router.delete("/:id", protect, deleteSkill);

// WANTED SKILLS
router.post("/wanted", protect, addWantedSkill);
router.get("/wanted/my", protect, getMyWantedSkills);

module.exports = router;
