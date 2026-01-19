const express = require("express");
const router = express.Router();
// const protect = require("../middleware/auth.middleware.js");

const {
  getMyProfile,
  updateProfile,
  addSkill,
  removeSkill,
} = require("../controllers/userController.js");

router.get("/me",  getMyProfile);
router.put("/me",  updateProfile);

router.post("/skill", addSkill);
router.delete("/skill/:type/:skillName", removeSkill);

module.exports = router;
