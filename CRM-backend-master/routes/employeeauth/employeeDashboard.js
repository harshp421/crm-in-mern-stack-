//EMPLOYEE DASHBOARD

//EMPLOYEE CAN VIEW

const router = require("express").Router();
const verify = require("./employeeverify");
const ServiceRequest = require("../../models/ServiceRequest");
const Lead = require("../../models/Contacts");
const Contact = require("../../models/Contacts");
const Ticket = require("../../models/Ticket");

//SERVICE REQUEST API'S

//GET

router.get("/servicerequest", verify, async (req, res) => {
  try {
    const tickets = await ServiceRequest.find().exec();
    res.status(200).send(tickets);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

//LEAD API'S

//GET

router.get("/lead", verify, async (req, res) => {
  try {
    const leads = await Lead.find().exec();
    res.status(200).send(leads);
  } catch (error) {
    console.log(error);
  }
});

//CONTACT API'S

//GET

router.get("/contact", verify, async (req, res) => {
  try {
    const contacts = await Contact.find().exec();
    res.status(200).send(contacts);
  } catch (error) {
    console.log(error);
  }
});

//ticket dashboard information 
router.get('/:employeeId', async (req, res) => {
  const employeeId = req.params.employeeId;

  try {
    // Find all tickets assigned to the employee
    const tickets = await Ticket.find({ assignee: employeeId });

    // Calculate ticket statistics
    const totalTickets = tickets.length;
    const openTickets = tickets.filter((ticket) => ticket.status === 'open').length;
    const inProgressTickets = tickets.filter((ticket) => ticket.status === 'in-progress').length;
    const closedTickets = tickets.filter((ticket) => ticket.status === 'closed').length;
    
    // Find completed tickets and sort them by completion date in descending order

    const completedTickets = tickets
      .filter((ticket) => ticket.status === 'closed')
      .sort((a, b) => b.date - a.date);


    // Send the ticket statistics as a response
    res.status(200).json({
      totalTickets,
      openTickets,
      inProgressTickets,
      closedTickets,
      tickets,
      completedTickets  
    });
  } catch (error) {
    console.error('Error fetching ticket information:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
