const { Router, json } = require("express");
const { v4: uuid } = require("uuid");
const fs = require("fs");
const profilesRouter = Router();

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
// {
//   "profileId": "10",
//   "username": "a@b.com",
//   "password": "123",
//   "preferredName": "Arnold",
//   "familyDoctor": {
//     "name": "Dr. Isaiah Bregman",
//     "phone": "6048732255"
//   },
//   "emergencyContact": {
//     "name": "John Doe",
//     "phone": "6041235555"
//   },
//   "pharmacyInfo": {
//     "name": "Urban Fare",
//     "phone": "6049757550"
//   }

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
  const profilesData = readData();

  const profile = profilesData.find(
    (profile) => profile.profileId === req.params.profileId
  );

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

  const reducedProfile = {
    profileId,
    username,
    preferredName,
    familyDoctor,
    emergencyContact,
    pharmacyInfo
  };

  res.status(200).json(reducedProfile);
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
  const profilesData = readData();
  console.log("req body=", req.body);
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
