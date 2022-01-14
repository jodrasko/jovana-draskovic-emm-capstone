const { Router, json } = require("express");
const { v4: uuid } = require("uuid");
const fs = require("fs");
const medicationsRouter = Router();

const readData = () => {
  const medicationsData = fs.readFileSync("./data/medications.json");
  return JSON.parse(medicationsData);
};

const writeFile = (medicationsData) => {
  fs.writeFileSync(
    "./data/medications.json",
    JSON.stringify(medicationsData, null, 2)
  );
};

medicationsRouter.get("/", (req, res) => {
  const medicationsData = readData();

  //   let newmedicationsData = medicationsData.map((medication) => {
  //     const { id, title, channel, image } = medication;
  //     return { id, title, channel, image };
  //   });
  res.status(200).json(medicationsData);
});

medicationsRouter.get("/:medicationId", (req, res) => {
  const medicationsData = readData();

  const medication = medicationsData.find(
    (medication) => medication.medicationId === req.params.medicationId
  );

  if (!medication) {
    return res.status(404).send("The medication is not found");
  }

  res.status(200).json(medication);
});

module.exports = medicationsRouter;
