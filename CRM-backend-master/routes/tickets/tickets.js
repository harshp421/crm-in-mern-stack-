const router = require("express").Router();
const Ticket = require("../../models/Ticket");

// VALIDATION OF USER INPUTS PREREQUISITES
const Joi = require("joi");
const verify = require("./verify");



// need to be changed
const ticketSchema = Joi.object({
  title: Joi.string().min(3).required(),
  desc: Joi.string().min(3),
  client: Joi.string().required(),
  status: Joi.string().required(),
  priority: Joi.string().required(),
  category: Joi.string().required(),
  // Add more fields as needed
});

// GET ALL TICKETS
router.get("/", verify, async (req, res) => {
  try {
    const tickets = await Ticket.find().populate("client");
    res.status(200).send({ status: "200", message: tickets });
  } catch (error) {
    console.log(error);
    res.status(200).send({ status: "500", message: error });
  }
});

// CREATE A NEW TICKET
router.post("/", async (req, res) => {
  try {
    // VALIDATION OF USER INPUTS
    const { error } = await ticketSchema.validateAsync(req.body);
    if (error) {
      res.status(200).send({ status: "400", message: error });
      return;
    } else {
      const ticket = new Ticket(req.body);
      await ticket.save();
      res
        .status(200)
        .send({ status: "200", message: "Ticket Created Successfully" });
    }
  } catch (err) {
    res.status(200).send({ status: "500", message: err });
  }
});

router.get("/:clientId", async (req, res) => {
    const clientId=req.params.clientId;
    try {
      const clientTickets = await Ticket.find({ client: clientId }).populate("client");
      res.status(200).send({ status: "200", message: clientTickets });
    } catch (error) {
      console.log(error);
      res.status(200).send({ status: "500", message: error });
    }
  });

  router.get("/view/:id", async (req, res) => {
    const id = req.params.id;
    console.log(id,'"id');
  
    try {
      const ticket = await Ticket.find({ _id: id }).populate("client");
      res.status(200).send({ status: "200", message: ticket });
    } catch (error) {
      console.log(error);
      res.status(200).send({ status: "500", message: error });
    }
  });

  router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { status, assignee } = req.body;
  
    try {
  
      // Update the ticket with the provided status and assignee
      const updatedTicket = await Ticket.findByIdAndUpdate(
        {_id:id},
        { status, assignee },
        { new: true } // To return the updated ticket
      );
       
      if (!updatedTicket) {
        return res.status(404).json({ message: 'Ticket not found' });
      }
      const populatedTicket=await updatedTicket.populate("assignee")
  
      res.status(200).json({ message: 'Ticket updated successfully', ticket: populatedTicket });
    } catch (error) {
      console.error('Error updating ticket:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });


  router.put('/:id/message', async (req, res) => {
    const { id } = req.params;
    const { message, senderId, senderName ,role} = req.body;
  
    try {
      // Fetch the ticket by ID
      const ticket = await Ticket.findById(id);
  
      if (!ticket) {
        return res.status(404).json({ message: 'Ticket not found' });
      }
  
      // Add the new message to the conversation array
      ticket.conversation.push({ message, senderId, senderName,role });
  
      // Save the updated ticket
      const updatedTicket = await ticket.save();
  
      res.status(200).json({
        message: 'Message added to ticket conversation successfully',
        ticket: updatedTicket,
      });
    } catch (error) {
      console.error('Error adding message to ticket conversation:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  //employee tickets 
  // GET TICKETS ASSIGNED TO AN EMPLOYEE
router.get("/employee/:employeeId", async (req, res) => {
  try {
    const employeeId = req.params.employeeId;
    // Find tickets assigned to the employee
    const assignedTickets = await Ticket.find({ assignee: employeeId }).populate("client");

    res.status(200).send({ status: "200", message: assignedTickets });
  } catch (error) {
    console.error(error);
    res.status(500).send({ status: "500", message: "Internal Server Error" });
  }
});
router.put("/employee/:id", async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {

    // Update the ticket with the provided status and assignee
    const updatedTicket = await Ticket.findByIdAndUpdate(
      {_id:id},
      { status },
      { new: true } // To return the updated ticket
    );
     
    if (!updatedTicket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }
    const populatedTicket=await updatedTicket.populate("assignee")

    res.status(200).json({ message: 'Ticket updated successfully', ticket: populatedTicket });
  } catch (error) {
    console.error('Error updating ticket:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});
module.exports = router;
