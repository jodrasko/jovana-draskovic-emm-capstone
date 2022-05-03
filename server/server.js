const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;
const { v4: uuid } = require("uuid");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const cors = require("cors");

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

// //MONGODB CONNECTION
// const { MongoClient } = require("mongodb");

// Replace the uri string with your MongoDB deployment's connection string.
//const URI = process.env.MONGO_DATABASE;
// const URI = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB}`;
// const client = new MongoClient(URI);

// This will help us connect to the database
const dbo = require("./db/mongodbconnection");

// async function createProfile(dbo, newProfile) {
//   let result;
//   console.log("newProfile=", newProfile);

//   const dbConnect = dbo.getDb();
//   result = dbConnect
//   .collection('profiles')
//   .insertOne(newProfile);
// .find({})
// .limit(50)
// .toArray(function (err, result) {
//   if (err) {
//     res.status(400).send('Error fetching listings!');
//   } else {
//     res.json(result);
//   }
// });

// try {
//   // Connect to the MongoDB cluster
//   await client.connect();

//   // Make the appropriate DB calls
//   result = dbConnect
//   .collection('profiles')await client
//     .db("emm_store")
//     .collection("profiles")
//     .insertOne(newProfile);
//   console.log(
//     `New profile created with the following id: ${result.insertedId}`
//   );
// } catch (e) {
//   console.error(e);
// } finally {
//   // Close the connection to the MongoDB cluster
//   await client.close();
// }

//   console.log(
//     `New profile created with the following id: ${result.insertedId}`
//   );
//   return result.insertedId;
// }

async function findOneProfileByUsername(dbConnect, username) {
  let result = false;
  // try {
  // Connect to the MongoDB cluster
  // await client.connect();

  // Make the appropriate DB calls
  result = await dbConnect
    .collection("profiles")
    .findOne({ username: username });

  if (result) {
    console.log(
      `Found a profile in the collection with the name '${username}':`
    );
    console.log(result);
  } else {
    console.log(`No profiles found with the name '${username}'`);
  }
  // } catch (e) {
  //   console.error(e);
  // } finally {
  //   // Close the connection to the MongoDB cluster
  //   // await client.close();
  // }

  return result;
}

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
  // const profilesData = readData();

  const dbConnect = dbo.getDb();
  console.log("dbConnect=", dbConnect);
  //const user = profilesData.find((profile) => profile.username === username);
  //const userP = findOneProfileByUsername(client, username);
  let user;

  // dbConnect
  //   .collection("profiles")
  //   .findOne({ username: username }, (err, result) => {
  //     if (err) {
  //       res.status(400).send("Error inserting profile!");
  //     } else {
  //       // console.log(`Added a new profile with id ${result.insertedId}`);
  //       // // res.status(204).send();
  //       // res.json({ success: "true" });
  //       console.log("result=", result);
  //     }
  //   });

  findOneProfileByUsername(dbConnect, username)
    .then((response) => {
      console.log("response=", response);
      if (response) {
        user = response.data;
        console.log("user=", user);
        if (user) {
          return res.status(200).json({
            error: {
              message:
                "User with that username already exists. Please use a different username."
            }
          });
        }
      }
      // Encrypt raw password and store encrypted password along with the user info
      bcrypt.hash(password, SALT_ROUNDS, (err, hashedPassword) => {
        if (err) {
          return res
            .status(500)
            .json({ message: "Couldn't encrypt the password" });
        }

        const profile = {
          // profileId: uuid(),
          // _id: uuid(),
          username,
          preferredName,
          password: hashedPassword
        };
        //profilesData.push(profile);

        dbConnect.collection("profiles").insertOne(profile, (err, result) => {
          if (err) {
            res.status(400).send("Error inserting profile!");
          } else {
            console.log(`Added a new profile with id ${result.insertedId}`);
            // res.status(204).send();
            res.json({ success: "true" });
          }
        });
        // createProfile(client, profile);
        //writeFile(profilesData);
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

// Login end point
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  //const profilesData = readData();
  const dbConnect = dbo.getDb();
  //const user = profilesData.find((profile) => profile.username === username);
  //const user = findOneProfileByUsername(client, username);
  let user;
  findOneProfileByUsername(dbConnect, username)
    .then((response) => {
      console.log("response=", response);
      if (response) {
        user = response;
        if (!user) {
          return res.status(200).json({
            token: "",
            error: {
              message:
                "Error logging in. Invalid username/password combination."
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
                message:
                  "Error logging in. Invalid username/password combination."
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

          res.status(200).json({ token, profileId: user._id });
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

// perform a database connection when the server starts
dbo.connectToServer(function (err) {
  if (err) {
    console.error(err);
    //process.exit();
  }

  const profilesRoutes = require("./routes/profiles");
  const physiciansRoutes = require("./routes/physicians");
  const medicationsRoutes = require("./routes/medications");
  const notesRoutes = require("./routes/notes");

  // The authorize middleware function must check for
  // a token and verify that the token is valid
  app.use("/profile", authorize, profilesRoutes);
  app.use("/physician", authorize, physiciansRoutes);
  app.use("/medication", authorize, medicationsRoutes);
  app.use("/note", authorize, notesRoutes);

  // start the Express server
  app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
  });
});
// app.listen(port, () => {
//   console.log(`Listening on ${port}`);
// });
