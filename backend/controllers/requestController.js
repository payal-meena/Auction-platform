import Request from "../models/Request.js";

export const sendRequest = async (req, res) => {
  try {
    const { receiver, offeredSkill, requestedSkill } = req.body;
    const requester = req.user.id; 

   
    if (requester === receiver) {
      return res.status(400).json({
        success: false,
        message: "You cannot send request to yourself",
      });
    }

    
    const existingRequest = await Request.findOne({
      requester,
      receiver,
      "offeredSkill.name": offeredSkill.name,
      "requestedSkill.name": requestedSkill.name,
      status: "pending",
    });

    if (existingRequest) {
      return res.status(400).json({
        success: false,
        message: "Request already sent",
      });
    }

    const request = await Request.create({
      requester,
      receiver,
      offeredSkill,
      requestedSkill,
    });

    res.status(201).json({
      success: true,
      message: "Skill request sent successfully",
      request,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const getMyRequests = async (req, res) => {
  try {
    const userId = req.user.id;

    const requests = await Request.find({
      $or: [{ requester: userId }, { receiver: userId }],
    })
      .populate("requester", "name email")
      .populate("receiver", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: requests.length,
      requests,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const acceptRequest = async (req, res) => {
  try {
    const request = await Request.findById(req.params.id);

    if (!request) {
      return res.status(404).json({
        success: false,
        message: "Request not found",
      });
    }

  
    if (request.receiver.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to accept this request",
      });
    }

    request.status = "accepted";
    request.receiverAccepted = true;

    await request.save();

    res.status(200).json({
      success: true,
      message: "Request accepted",
      request,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const rejectRequest = async (req, res) => {
  try {
    const request = await Request.findById(req.params.id);

    if (!request) {
      return res.status(404).json({
        success: false,
        message: "Request not found",
      });
    }

    if (request.receiver.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to reject this request",
      });
    }

    request.status = "rejected";
    await request.save();

    res.status(200).json({
      success: true,
      message: "Request rejected",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const completeRequest = async (req, res) => {
  try {
    const request = await Request.findById(req.params.id);

    if (!request) {
      return res.status(404).json({
        success: false,
        message: "Request not found",
      });
    }

    const userId = req.user.id;

    if (request.requester.toString() === userId) {
      request.requesterCompleted = true;
    }

    if (request.receiver.toString() === userId) {
      request.receiverCompleted = true;
    }

  
    if (request.requesterCompleted && request.receiverCompleted) {
      request.status = "completed";
    }

    await request.save();

    res.status(200).json({
      success: true,
      message: "Request marked as completed",
      request,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
