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

require("dotenv").config();

app.use(express.json());
app.use(cors());

app.use(
  cors({
    origin: process.env.CLIENT_URL
  })
);
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

function authorize(req, res, next) {
  // If the token is not provided, or invalid, then
  // this function should not continue on to the
  // end-point.
  if (!req.headers.authorization)
    return res.status(401).json({ message: "not authorized" });

  // decoding the contents of the token. The
  // decoded contents should be placed on req.decoded
  // If the token is not provided, or invalid, then
  // this function should not continue on to the
  // end-point.
  const authToken = req.headers.authorization.split(" ")[1];

  if (authToken) {
    jwt.verify(authToken, jsonSecretKey, (_err, decoded) => {
      req.decoded = decoded;
      next();
    });
  } else {
    res.status(403).json({ error: "No token. Unauthorized." });
  }
}

// Basic Sign Up Logic. Take a username, preferredName,
// and password and add it to the profiles.json
app.post("/signup", (req, res) => {
  const { username, preferredName, password } = req.body;
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

  // Encrypt raw password and store encrypted password along with the user info
  bcrypt.hash(password, SALT_ROUNDS, (err, hashedPassword) => {
    if (err) {
      return res.status(500).json({ message: "Couldn't encrypt the password" });
    }

    const profile = {
      profileId: uuid(),
      username,
      preferredName,
      password: hashedPassword
    };
    profilesData.push(profile);
    writeFile(profilesData);

    res.json({ success: "true" });
  });
});

// Login end point
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  const profilesData = readData();

  const user = profilesData.find((profile) => profile.username === username);

  if (!user) {
    return res.status(200).json({
      token: "",
      error: {
        message: "Error logging in. Invalid username/password combination."
      }
    });
  }

  bcrypt.compare(password, user.password, (err, success) => {
    if (err) {
      return res
        .status(403)
        .json({ error: { message: "Couldn't decrypt the password" } });
    }

    // If password stored doesn't match user login password, throw error
    if (!success) {
      return res.status(200).json({
        token: "",
        error: {
          message: "Error logging in. Invalid username/password combination."
        }
      });
    }

    // When a user provides a correct username/password,
    // the user can be considered authenticated.
    // Create a JWT token for the user, and add their preferredName to
    // the token. Send the token back to the client.
    const token = jwt.sign(
      { preferredName: user.preferredName },
      jsonSecretKey
    );

    res.status(200).json({ token, profileId: user.profileId });
  });
});

// The authorize middleware function must check for
// a token and verify that the token is valid
app.use("/profile", authorize, profilesRoutes);
app.use("/physician", authorize, physiciansRoutes);
app.use("/medication", authorize, medicationsRoutes);
app.use("/note", authorize, notesRoutes);

app.listen(port, () => {
  console.log(`Listening on ${port}`);
});
