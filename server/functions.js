// const jwt = require("jsonwebtoken");

// const jsonSecretKey = process.env.JSON_SECRET_KEY;

// module.exports.authorize = function authorize(req, res, next) {
//   // STEP 2: Logic for getting the token and
//   // decoding the contents of the token. The
//   // decoded contents should be placed on req.decoded
//   // If the token is not provided, or invalid, then
//   // this function should not continue on to the
//   // end-point.
//   const token = req.headers.authorization.split(" ")[1];
//   if (token) {
//     console.log("A token=", token);
//     jwt.verify(token, jsonSecretKey, (_err, decoded) => {
//       req.decoded = decoded;
//       console.log(decoded);
//       next();
//     });
//   } else {
//     res.status(403).json({ error: "No token. Unauthorized." });
//   }
// };
