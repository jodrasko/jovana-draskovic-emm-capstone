const { Router, json } = require("express");
const { v4: uuid } = require("uuid");
const fs = require("fs");
const profilesRouter = Router();

// {
//   "profileId": "11",
//   "username": "c@d.com",
//   "password": "456",
//   "preferredName": "John",
//   "familyDoctor": {
//     "name": "Dr. Douglas Choo",
//     "phone": "6045732565"
//   },
//   "emergencyContact": {
//     "name": "Ana Hudson",
//     "phone": "6041235566"
//   },
//   "pharmacyInfo": {
//     "name": "Urban Fare",
//     "phone": "6049757550"
//   }
// },

const readData = () => {
  const profilesData = fs.readFileSync("./data/profiles.json");
  return JSON.parse(profilesData);
};

const writeData = (profilesData) => {
  fs.writeFileSync(
    "./data/profiles.json",
    JSON.stringify(profilesData, null, 2)
  );
};

profilesRouter.get("/", (req, res) => {
  const profilesData = readData();

  // let newprofilesData = profilesData.map((profile) => {
  //   // const { id, title, channel, image } = profile;
  //   return profile;
  // });
  res.status(200).json(profilesData);
});

profilesRouter.get("/:profileId", (req, res) => {
  const profilesData = readData();

  const profile = profilesData.find(
    (profile) => profile.profileId === req.params.profileId
  );

  if (!profile) {
    return res.status(404).send("The profile is not found");
  }

  res.status(200).json(profile);
});

// we can use PUT method here - Replace ALL current representations of the      | 4.3.4 |
// |         | target resource with the request payload.
//
// POST    | Perform resource-specific processing on the     | 4.3.3 |
//    |         | request payload.
// Create or replace the state of the target resource with the state defined by the representation enclosed in the request.
// https://en.wikipedia.org/wiki/Representational_state_transfer#Semantics_of_HTTP_methods
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
  const profilesData = readData();

  const index = profilesData.findIndex(
    (profile) => profile.profileId === req.params.profileId
  );
  console.log("index=", index);

  if (index < 0) {
    return res.status(404).send("The profile is not found");
  }

  const profile = profilesData.find(
    (profile) => profile.profileId === req.params.profileId
  );

  // Validate request details
  if (
    !req.body ||
    !req.body.familyDoctor ||
    !req.body.emergencyContact ||
    !req.body.pharmacyInfo
  ) {
    // Send back error message
    return res.status(400).json({ message: "Please send required fields" });
  }

  const updatedProfile = {
    profileId: profile.profileId,
    username: profile.username,
    password: profile.password,
    preferredName: profile.preferredName,
    familyDoctor: req.body.familyDoctor,
    emergencyContact: req.body.emergencyContact,
    pharmacyInfo: req.body.pharmacyInfo
  };

  profilesData.splice(index, 1, updatedProfile);
  writeData(profilesData);

  res.status(200).json(updatedProfile);
});

//"profileId": "11",
//   "username": "c@d.com",
//   "password": "456",
//   "preferredName": "John",
//   "familyDoctor": {
//     "name": "Dr. Douglas Choo",
//     "phone": "6045732565"
//   },
//   "emergencyContact": {
//     "name": "Ana Hudson",
//     "phone": "6041235566"
//   },
//   "pharmacyInfo": {
//     "name": "Urban Fare",
//     "phone": "6049757550"
//   }

const videoValidation = (req, res, next) => {
  if (!req.body.title || !req.body.description) {
    return res
      .status(400)
      .send("Please make sure to include title and description of the video");
  } else {
    next();
  }
};

profilesRouter.post("/", videoValidation, (req, res) => {
  const profilesData = readData();

  const newVideo = {
    id: uuid(),
    title: req.body.title,
    channel: "Unknown",
    image: "blue-image-placeholder.jpg",
    description: req.body.description,
    views: "100",
    likes: "50",
    duration: "2:05",
    video: "https://project-2-api.herokuapp.com/stream",
    timestamp: new Date().getTime(),
    comments: []
  };

  profilesData.push(newVideo);
  writeData(profilesData);

  res.status(201).json(newVideo);
});

module.exports = profilesRouter;
