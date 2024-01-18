const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");
const Cryptr = require("cryptr");
const cryptr = new Cryptr("myTotallySecretKey");
const nodemailer = require("nodemailer");
//VALIDATION OF USER INPUTS PREREQUISITES
const Joi = require("joi");

const registerSchema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().min(6).required().email(),
  password: Joi.string().min(6).required(),
  role:Joi.string().required(),
  permissions: Joi.array(),
});

const loginSchema = Joi.object({
  email: Joi.string().min(6).required().email(),
  password: Joi.string().min(6).required(),
});

//ADMIN TOKEN VERIFICATIOn
const adminVerify = require("../adminauth/adminverfiy");
const inviteUserTemplate = require("../../templates/inviteUserTemplate");
const feLink = require("../../link");


//SIGNUP USER
router.post("/register", adminVerify, async (req, res) => {
  //CHECKING IF USER EMAIL ALREADY EXISTS
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) res.status(400).send("Email already exists");

  //HASHING THE PASSWORD

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  //ON PROCESS OF ADDING NEW USER
  let permissions = [];
    if ( req.body.role === "employee") {
      permissions = ["employee-all"];
    }
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
    role: req.body.role,
    permissions:permissions
  });

  try {
    //VALIDATION OF USER INPUTS

    const { error } = await registerSchema.validateAsync(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    else {
      //NEW USER IS ADDED

      const saveUser = await user.save();
      //   res.send({ user: user._id });
      if(saveUser)
      {
      const encryptedString = cryptr.encrypt(user._id);

      const link = `${feLink}verification/${encryptedString}`;

      const transporter = await nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_ID,
          pass: process.env.EMAIL_PWD,
        },
      });

      const mailOptions = {
        from: process.env.EMAIL_ID,
        to: req.body.email,
        subject: `Your Company Admin has invited You to Join Crish BALA CRM`,
        html: inviteUserTemplate(link, req.body.email, req.body.password),
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
          // res.status(401).send("error");
          res
            .status(401)
            .json({ status: "401", message: "Mail Authentication Error" });
        } else {
          console.log("Email sent: " + info.response);
          // needs to be changed
          res.status(200).json({
            status: "200",
            message: "User Created Successfully",
          });
        }
      });

      res
        .status(200)
        .json({ status: "200", message: "User Created Successfully" });
      }
      //res.send("user created");
    }
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

//SIGNIN USER

router.post("/login", async (req, res) => {
  //CHECKING IF USER EMAIL EXISTS

  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Incorrect Email- ID");

  //CHECKING IF USER PASSWORD MATCHES

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("Incorrect Password");

  try {
    //VALIDATION OF USER INPUTS

    const { error } = await loginSchema.validateAsync(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    else {
      console.log(user.role);
      if (user.role === "employee") {
        const token = jwt.sign(
          { _id: user._id },
          process.env.EMPLOYEE_TOKEN_SECRET
        );

        res.header("auth-token", token).send( {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          token: token,
          permissions: user.permissions,
        });
      } else {
        res.status(201).json({ message: "seems like you are not a employee" });
      }
    }
  } catch (error) {
    res.status(400).send(error);
  }
});
module.exports = router;
