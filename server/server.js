const express = require("express");
const app = express();
const port = process.env.PORT || 8080;
const { v4: uuid } = require("uuid");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
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
const SALT_ROUNDS = 8;
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

  //console.log(req.headers); // check what is included in the req.headers.

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
  //console.log("authorization token:", authToken);

  if (authToken) {
    //console.log(authToken);
    jwt.verify(authToken, jsonSecretKey, (_err, decoded) => {
      req.decoded = decoded;
      //console.log(decoded);
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
  //console.log("req.body=", req.body);
  const { username, preferredName, password } = req.body; // this name is preferredName
  const profilesData = readData();

  const user = profilesData.find((profile) => profile.username === username);
  if (user) {
    return res.status(200).json({
      error: {
        message:
          "User with that username already exists. Please use a different username."
      }
    });
  }

  // Encrypt our raw password and store encrypted password along with the user info
  bcrypt.hash(password, SALT_ROUNDS, (err, hashedPassword) => {
    if (err) {
      return res.status(500).json({ message: "Couldn't encrypt the password" });
    }

    const profile = {
      profileId: uuid(), // to save in database -- express server
      username,
      preferredName,
      password: hashedPassword // library like bcrypt to Hash the password. For demo purposes only.
    };
    profilesData.push(profile); // adding to the array of profiles.
    writeFile(profilesData); // save new data

    res.json({ success: "true" });
  });
});

// A Basic Login end point
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  //console.log("username,password", username, password);
  const profilesData = readData();

  const user = profilesData.find((profile) => profile.username === username);
  //console.log("user", user);

  bcrypt.compare(password, user.password, (err, success) => {
    console.log("error message:", err);
    console.log("success:", success);
    if (err) {
      return res.status(500).json({ message: "Couldn't decrypt the password" });
    }

    // If password stored in DB doesn't match user login password, throw error
    if (!success) {
      return res.status(200).json({
        token: "",
        error: {
          message: "Error logging in. Invalid username/password combination."
        }
      });
    }

    // STEP 1: When a user provides a correct username/password,
    // the user can be considered authenticated.
    // Create a JWT token for the user, and add their name to
    // the token. Send the token back to the client.
    const token = jwt.sign(
      { preferredName: user.preferredName },
      jsonSecretKey
    );
    //console.log("B token=", token);
    res.status(200).json({ token, profileId: user.profileId });

    // Same as register logic, sign the token and send the token back to the client
    // const jwtToken = jwt.sign(
    //   {
    //     id: user[0].id,
    //     sub: user[0].email
    //   },
    //   JWT_SECRET,
    //   { expiresIn: "8h" }
    // );

    // return res.status(200).json({ authToken: jwtToken });
  });

  // console.log(user);
  // if (user && user.password === password) {
  //   // STEP 1: When a user provides a correct username/password,
  //   // the user can be considered authenticated.
  //   // Create a JWT token for the user, and add their name to
  //   // the token. Send the token back to the client.
  //   const token = jwt.sign(
  //     { preferredName: user.preferredName },
  //     jsonSecretKey
  //   );
  //   console.log("B token=", token);
  //   res.json({ token, profileId: user.profileId });
  // } else {
  //   res.json({
  //     token: "",
  //     error: {
  //       message: "Error logging in. Invalid username/password combination."
  //     }
  //   });
  // }
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

app.use("/profile", authorize, profilesRoutes);
app.use("/physician", authorize, physiciansRoutes);
app.use("/medication", authorize, medicationsRoutes);
app.use("/note", authorize, notesRoutes);

app.listen(port, () => {
  console.log(`Listening on ${port}`);
});
