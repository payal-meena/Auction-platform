const  mongoose =require("mongoose");

const requestSchema = new mongoose.Schema(
  {
    requester: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    offeredSkill: {
      name: { type: String, required: true },
      level: {
        type: String,
        enum: ["Beginner", "Intermediate", "Advanced"],
        required: true,
      },
    },

    requestedSkill: {
      name: { type: String, required: true },
      level: {
        type: String,
        enum: ["Beginner", "Intermediate", "Advanced"],
        required: true,
      },
    },

    status: {
      type: String,
      enum: ["pending", "accepted", "rejected", "completed"],
      default: "pending",
    },

    requesterAccepted: {
      type: Boolean,
      default: false,
    },

    receiverAccepted: {
      type: Boolean,
      default: false,
    },

    requesterCompleted: {
      type: Boolean,
      default: false,
    },

    receiverCompleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Request = mongoose.model("Request", requestSchema);
module.exports= Request;