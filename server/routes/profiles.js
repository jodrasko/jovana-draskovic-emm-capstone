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

  const index = profilesData.findIndex(
    (profile) => profile.profileId === req.params.profileId
  );

  if (index < 0) {
    return res.status(404).send("The profile is not found");
  }

  const profile = profilesData.find(
    (profile) => profile.profileId === req.params.profileId
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

  profilesData.splice(index, 1, updatedProfile);
  writeData(profilesData);

  res.status(200).json(updatedProfile);
});

module.exports = profilesRouter;
