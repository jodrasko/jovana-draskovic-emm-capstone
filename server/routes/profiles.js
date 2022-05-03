const { Router, json } = require("express");
const fs = require("fs");
const profilesRouter = Router();
const ObjectId = require("mongodb").ObjectId;
const dbo = require("../db/mongodbconnection");

require("dotenv").config();
// const { MongoClient } = require("mongodb");
// // Replace the uri string with your MongoDB deployment's connection string.
// //const URI = process.env.MONGO_DATABASE;
// const URI = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB}`;

// const client = new MongoClient(URI);

// async function findOneProfileByUsername(client, username) {
//   let result = false;
//   try {
//     // Connect to the MongoDB cluster
//     await client.connect();

//     // Make the appropriate DB calls
//     result = await client
//       .db("emm_store")
//       .collection("profiles")
//       .findOne({ username: username });

//     if (result) {
//       console.log(
//         `Found a profile in the collection with the name '${username}':`
//       );
//       console.log(result);
//     } else {
//       console.log(`No profiles found with the name '${username}'`);
//     }
//   } catch (e) {
//     console.error(e);
//   } finally {
//     // Close the connection to the MongoDB cluster
//     await client.close();
//   }

//   return result;
// }

const readData = () => {
  const profilesData = fs.readFileSync("./data/profiles.json");
  return JSON.parse(profilesData); // parsing (creating) a javascript object
};

const writeData = (profilesData) => {
  fs.writeFileSync(
    "./data/profiles.json",
    JSON.stringify(profilesData, null, 2)
  );
};

profilesRouter.get("/", (req, res) => {
  const profilesData = readData();

  const newProfilesData = profilesData.map((profile) => {
    const {
      profileId,
      username,
      preferredName,
      familyDoctor,
      emergencyContact,
      pharmacyInfo
    } = profile;
    const reducedProfile = {
      profileId,
      username,
      preferredName,
      familyDoctor,
      emergencyContact,
      pharmacyInfo
    };
    return reducedProfile;
  });
  res.status(200).json(newProfilesData);
});

profilesRouter.get("/:profileId", (req, res) => {
  // const profilesData = readData();
  const dbConnect = dbo.getDb();

  console.log("profileId=", req.params.profileId);
  const queryObj = { _id: ObjectId(req.params.profileId) };
  dbConnect
    .collection("profiles")
    .findOne(queryObj)
    .then((response) => {
      console.log("id-response=", response);
      const profile = response;
      console.log("profile=", profile);
      if (!profile) {
        return res.status(404).send("The profile is not found");
      }

      const {
        profileId,
        username,
        preferredName,
        familyDoctor,
        emergencyContact,
        pharmacyInfo
      } = profile;

      // don't return password
      const reducedProfile = {
        profileId,
        username,
        preferredName,
        familyDoctor,
        emergencyContact,
        pharmacyInfo
      };

      res.status(200).json(reducedProfile);
    })
    .catch((err) => {
      console.log(err);
    });
  // console.log("profile=", profile);
  // const profile = profilesData.find(
  //   (profile) => profile.profileId === req.params.profileId
  // );
});

const profileValidation = (req, res, next) => {
  if (
    !req.body.familyDoctor ||
    !req.body.emergencyContact ||
    !req.body.pharmacyInfo
  ) {
    return res
      .status(400)
      .send(
        "Please make sure to include Family Doctor, Emergency Contact and Pharmacy Information for the profile"
      );
  } else {
    next();
  }
};

profilesRouter.put("/:profileId", profileValidation, (req, res) => {
  //update profile with that profileId
  const profilesData = readData(); // the read data is stored in the variable profilesData.

  const index = profilesData.findIndex(
    (profile) => profile.profileId === req.params.profileId //returns the index of the first profileId in the array that satisfies the provided testing function.
  );

  if (index < 0) {
    return res.status(404).send("The profile is not found");
  }

  const profile = profilesData.find(
    (profile) => profile.profileId === req.params.profileId // returns the first element in the provided array that satisfies the provided testing function
  );

  const updatedProfile = {
    profileId: profile.profileId,
    username: profile.username,
    password: profile.password,
    preferredName: profile.preferredName,
    familyDoctor: req.body.familyDoctor,
    emergencyContact: req.body.emergencyContact,
    pharmacyInfo: req.body.pharmacyInfo
  };

  profilesData.splice(index, 1, updatedProfile); // changes the contents of an array by removing or replacing existing elements and/or adding new elements in place.
  writeData(profilesData);

  res.status(200).json(updatedProfile);
});

module.exports = profilesRouter;
