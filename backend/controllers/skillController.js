
const Skill = require("../models/Skill");
const User = require("../models/User");

// =======================
// ADD SKILL
// =======================
const addSkill = async (req, res) => {
  try {
    const {
      skillName,
      level,
      type,
      experience,
      description,
      exchangeSkills
    } = req.body;

    console.log("req.user:", req.user);
    console.log("req.body:", req.body);

    // Auth check
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Required fields
    if (!skillName || !type) {
      return res.status(400).json({
        message: "skillName and type are required"
      });
    }

    // Type validation
    if (!["Offer", "Learn"].includes(type)) {
      return res.status(400).json({
        message: "Invalid skill type"
      });
    }

    // Duplicate skill check
    const existingSkill = await Skill.findOne({
      skillName,
      userId: req.user
    });

    if (existingSkill) {
      return res.status(400).json({
        message: "Skill already exists"
      });
    }

    // Create skill
    const skill = new Skill({
      skillName,
      level: level
        ? level.charAt(0).toUpperCase() + level.slice(1).toLowerCase()
        : "Beginner",
      type,
      experience: Number(experience) || 0,
      description: description || "",
      exchangeSkills: exchangeSkills || "",
      userId: req.user
    });


    await skill.save();

    return res.status(201).json({
      success: true,
      message: "Skill added successfully",
      skill
    });

  } catch (error) {
    console.error("Add skill error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};

// =======================
// GET MY SKILLS
// =======================
const getMySkills = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const skills = await Skill.find({ userId: req.user });

    const offered = skills.filter(skill => skill.type === "Offer");
    const learn = skills.filter(skill => skill.type === "Learn");

    return res.status(200).json({
      success: true,
      offered,
      learn
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// =======================
// DELETE SKILL 
// =======================
const deleteSkill = async (req, res) => {
  try {
    const { id } = req.params;

    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const skill = await Skill.findOneAndDelete({
      _id: id,
      userId: req.user
    });

    if (!skill) {
      return res.status(404).json({
        message: "Skill not found"
      });
    }

    return res.status(200).json({
      success: true,
      message: "Skill deleted successfully",
      skill
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// =======================
// UPDATE SKILL
// =======================
const updateSkill = async (req, res) => {
  try {
    const { id } = req.params;
    const { skillName, level, experience, description, exchangeSkills } = req.body;

    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const skill = await Skill.findOne({
      _id: id,
      userId: req.user
    });

    if (!skill) {
      return res.status(404).json({
        message: "Skill not found"
      });
    }

    // Update fields if provided
    if (skillName) skill.skillName = skillName;
    if (level) skill.level = level;
    if (experience !== undefined) skill.experience = Number(experience);
    if (description !== undefined) skill.description = description;
    if (exchangeSkills !== undefined) skill.exchangeSkills = exchangeSkills;

    await skill.save();

    return res.status(200).json({
      success: true,
      message: "Skill updated successfully",
      skill
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// =======================
module.exports = {
  addSkill,
  getMySkills,
  deleteSkill,
  updateSkill
};
