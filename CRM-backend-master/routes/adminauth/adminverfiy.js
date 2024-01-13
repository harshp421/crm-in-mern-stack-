const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
   
  let token;

 if (req?.headers?.authorization?.startsWith("Bearer")) {
   token = req.headers.authorization.split(" ")[1];
   try {
     if (token) {
       const verified = jwt.verify(token, process.env.JWT_SECRET);
       ///const user = await User.findById(decoded?.id);
       req.user = verified;
       //console.log(req.user, "request body");
       next();
     }
   } catch (error) {
     throw new Error( "Not Authorized token expired, Please Login again 404");
   }
 } else {
   throw new Error(" There is no token attached to header 404");
 }
  // //const token = req.header("auth-token");
  // //if (!token) return res.status(401).send("Access Denied");

  // try {
  //   const verified = jwt.verify(token, process.env.ADMIN_TOKEN_SECRET);
  //   req.user = verified;
  //   next();
  // } catch (error) {
  //   res.status(400).send("Invalid token");
  // }
};


