const express = require("express");
const app = express();
const port = process.env.PORT || 8080;
const { v4: uuid } = require("uuid");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const profilesRoutes = require("./routes/profiles");
const physiciansRoutes = require("./routes/physicians");
const medicationsRoutes = require("./routes/medications");
const notesRoutes = require("./routes/notes");

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

const readData = () => {
  const profilesData = fs.readFileSync("./data/profiles.json");
  return JSON.parse(profilesData);
};

const writeFile = (profilesData) => {
  fs.writeFileSync(
    "./data/profiles.json",
    JSON.stringify(profilesData, null, 2)
  );
};

// this method is called first; open terminal to see changes.
function authorize(req, res, next) {
  console.log("authorize middleware entered");

  console.log(req.headers); // check what is included in the req.headers.

  // STEP 2: Logic for handling authorization

  // If the token is not provided, or invalid, then
  // this function should not continue on to the
  // end-point.
  if (!req.headers.authorization)
    return res.status(401).json({ message: "not authorized" });

  // STEP 2: Logic for getting the token and
  // decoding the contents of the token. The
  // decoded contents should be placed on req.decoded
  // If the token is not provided, or invalid, then//
  // this function should not continue on to the
  // end-point.
  const authToken = req.headers.authorization.split(" ")[1];
  console.log("authorization token:", authToken);

  if (authToken) {
    console.log(authToken);
    jwt.verify(authToken, jsonSecretKey, (_err, decoded) => {
      req.decoded = decoded;
      console.log(decoded);
      next();
    });
  } else {
    res.status(403).json({ error: "No token. Unauthorized." });
  }
}

// Some Basic Sign Up Logic. Take a username, name,
// and password and add it to an object using the
// provided username as the key
app.post("/signup", (req, res) => {
  console.log("req.body=", req.body);
  const { username, preferredName, password } = req.body; // this name is preferredName
  const profilesData = readData();

  const profile = {
    profileId: uuid(), // to save in database -- express server
    username,
    preferredName,
    password // library like bcrypt to Hash the password. For demo purposes only.
  };

  profilesData.push(profile); // adding to the array of profiles.
  writeFile(profilesData); // save new data

  res.json({ success: "true" });
});

// A Basic Login end point
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const profilesData = readData();

  const user = profilesData.find((profile) => profile.username === username);

  // console.log(user);
  if (user && user.password === password) {
    // STEP 1: When a user provides a correct username/password,
    // the user can be considered authenticated.
    // Create a JWT token for the user, and add their name to
    // the token. Send the token back to the client.
    const token = jwt.sign(
      { preferredName: user.preferredName },
      jsonSecretKey
    );
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
app.get("/new-profile", authorize, (req, res) => {
  console.log("req.decoded=", req.decoded);
  res.json(req.decoded);
});

app.use("/profile", profilesRoutes);
app.use("/physician", physiciansRoutes);
app.use("/medication", medicationsRoutes);
app.use("/note", notesRoutes);

app.listen(port, () => {
  console.log(`Listening on ${port}`);
});
