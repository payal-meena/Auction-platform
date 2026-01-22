const express = require("express");
const  protect=require("../middleware/authMiddleware.js");
const validate = require("../middleware/validateMiddleware.js");
const { sendRequestSchema } = require("../validations/requestValidation.js");
const  {
    sendRequest,
    getMyRequests,
    acceptRequest,
    rejectRequest,
    completeRequest
} =require("../controllers/requestController.js");
const router = express.Router();


router.post("/", protect, validate(sendRequestSchema), sendRequest);


router.get("/", protect, getMyRequests);


router.put("/:id/accept", protect, acceptRequest);

router.put("/:id/reject", protect, rejectRequest);


router.put("/:id/complete", protect, completeRequest);

module.exports = router;
