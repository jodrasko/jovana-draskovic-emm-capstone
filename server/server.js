const express = require("express");
const app = express();
const port = process.env.PORT || 8080;
const jwt = require("jsonwebtoken");
const cors = require("cors");
const profilesRouter = require("./routes/profiles");

//const fn = require("./functions.js");
require("dotenv").config();

app.use(express.json());
app.use(cors());

// app.use(
//   cors({
//     origin: process.env.CLIENT_URL
//   })
// );

const jsonSecretKey = process.env.JSON_SECRET_KEY;

// this method is called first; open terminal to see changes.
function authorize(req, res, next) {
  // STEP 2: Logic for getting the token and
  // decoding the contents of the token. The
  // decoded contents should be placed on req.decoded
  // If the token is not provided, or invalid, then//
  // this function should not continue on to the
  // end-point.
  const token = req.headers.authorization.split(" ")[1];
  if (token) {
    console.log(token);
    jwt.verify(token, jsonSecretKey, (_err, decoded) => {
      req.decoded = decoded;
      console.log(decoded);
      next();
    });
  } else {
    res.status(403).json({ error: "No token. Unauthorized." });
  }
}

const users = {};

// Some Basic Sign Up Logic. Take a username, name,
// and password and add it to an object using the
// provided username as the key
app.post("/signup", (req, res) => {
  const { username, name, password } = req.body;
  users[username] = {
    name,
    password // NOTE: Passwords should NEVER be stored in the clear like this. Use a
    // library like bcrypt to Hash the password. For demo purposes only.
  };
  res.json({ success: "true" });
});

// A Basic Login end point
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const user = users[username];

  // console.log(user);
  if (user && user.password === password) {
    // STEP 1: When a user provides a correct username/password,
    // the user can be considered authenticated.
    // Create a JWT token for the user, and add their name to
    // the token. Send the token back to the client.
    const token = jwt.sign({ name: user.name }, jsonSecretKey);
    console.log("B token=", token);
    res.json({ token });
  } else {
    res.json({
      token: "",
      error: {
        message: "Error logging in. Invalid username/password combination."
      }
    });
  }
});

// A Profile end-point that will return user information,
// in this example, the user's name that they provided
// when they signed up.
// The authorize middleware function must check for
// a token, verify that the token is valid, decode
// the token and put the decoded data onto req.decoded
app.get("/profile", authorize, (req, res) => {
  console.log("req.decoded=", req.decoded);
  res.json(req.decoded);
});

app.use("/profile", profilesRouter);

app.listen(port, () => {
  console.log(`Listening on ${port}`);
});
