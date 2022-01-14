const { Router, json } = require("express");
const { v4: uuid } = require("uuid");
const fs = require("fs");
const profilesRouter = Router();

// {
//   "profileId": "11",
//   "userName": "c@d.com",
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

const writeFile = (profilesData) => {
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

//"profileId": "11",
//   "userName": "c@d.com",
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
  writeFile(profilesData);

  res.status(201).json(newVideo);
});

module.exports = profilesRouter;
