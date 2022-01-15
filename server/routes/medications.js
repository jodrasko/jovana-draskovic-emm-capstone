const { Router, json } = require("express");
const { v4: uuid } = require("uuid");
const fs = require("fs");
const medicationsRouter = Router();

const readData = () => {
  const medicationsData = fs.readFileSync("./data/medications.json");
  return JSON.parse(medicationsData);
};

const writeData = (medicationsData) => {
  fs.writeFileSync(
    "./data/medications.json",
    JSON.stringify(medicationsData, null, 2)
  );
};

// full url: /medication/
medicationsRouter.get("/", (req, res) => {
  const medicationsData = readData();
  res.status(200).json(medicationsData);
});

// full url: /medication/123
medicationsRouter.get("/:medicationId", (req, res) => {
  const medicationsData = readData();

  const medication = medicationsData.find(
    (medication) => medication.medicationId === req.params.medicationId
  );

  if (!medication) {
    return res.status(404).send("The Medication is not found");
  }

  res.status(200).json(medication);
});

//create medication information
medicationsRouter.post("/", (req, res) => {
  const medicationsData = readData();
  console.log("medication data=", req.body);
  // Validate request details
  if (
    !req.body ||
    !req.body.name ||
    !req.body.dosage ||
    !req.body.refillExpireDate ||
    !req.body.profileId ||
    !req.body.physicianId
  ) {
    // Send back error message
    return res.status(400).json({ message: "Please send required fields" });
  }

  const { name, dosage, refillExpireDate, profileId, physicianId } = req.body;

  const newMedication = {
    medicationId: uuid(),
    physicianId: physicianId,
    profileId: profileId,
    name: name,
    dosage: dosage,
    refillExpireDate: refillExpireDate
  };

  medicationsData.push(newMedication);
  writeData(medicationsData);

  res.status(200).json({ newMedication });
});

// update medication information
medicationsRouter.put("/:medicationId", (req, res) => {
  const medicationsData = readData();

  const index = medicationsData.findIndex(
    (medication) => medication.medicationId === req.params.medicationId
  );
  console.log("index=", index);
  if (!index) {
    return res
      .status(404)
      .send({ message: "Medication Information not found" });
  }

  // Validate request details
  if (
    !req.body ||
    !req.body.name ||
    !req.body.dosage ||
    !req.body.refillExpireDate ||
    !req.body.profileId ||
    !req.body.physicianId
  ) {
    // Send back error message
    return res.status(400).json({ message: "Please send required fields" });
  }

  const { name, dosage, refillExpireDate, profileId, physicianId } = req.body;

  const updatedMedication = {
    medicationId: req.params.medicationId,
    physicianId: physicianId,
    profileId: profileId,
    name: name,
    dosage: dosage,
    refillExpireDate: refillExpireDate
  };

  console.log("update meds=", updatedMedication);

  medicationsData.splice(index, 1, updatedMedication);
  writeData(medicationsData);

  res
    .status(200)
    .json({ message: "Successfully Updated Medication Information" });
});

// delete medication information
medicationsRouter.delete("/:medicationId", (req, res) => {
  let medicationsData = readData();
  const medication = medicationsData.find(
    (medication) => medication.medicationId === req.params.medicationId
  );

  if (!medication) {
    return res.status(404).send("Medication Information not found");
  }

  medicationsData = medicationsData.filter(
    (medication) => medication.medicationId !== req.params.medicationId
  );
  writeData(medicationsData);

  return res.status(200).send();
});

module.exports = medicationsRouter;
