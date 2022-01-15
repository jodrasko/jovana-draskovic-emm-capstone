const { Router, json } = require("express");
const { v4: uuid } = require("uuid");
const fs = require("fs");
const physiciansRouter = Router();

const readData = () => {
  const physiciansData = fs.readFileSync("./data/physicians.json");
  return JSON.parse(physiciansData);
};

const writeData = (physiciansData) => {
  fs.writeFileSync(
    "./data/physicians.json",
    JSON.stringify(physiciansData, null, 2)
  );
};

// full url: /physician/
physiciansRouter.get("/", (req, res) => {
  const physiciansData = readData();
  res.status(200).json(physiciansData);
});

// full url: /physician/123
physiciansRouter.get("/:physicianId", (req, res) => {
  const physiciansData = readData();

  const physician = physiciansData.find(
    (physician) => physician.physicianId === req.params.physicianId
  );

  if (!physician) {
    return res.status(404).send("The physician is not found");
  }

  res.status(200).json(physician);
});

//create physican information
physiciansRouter.post("/", (req, res) => {
  const physiciansData = readData();
  console.log("physican data=", req.body);
  // Validate request details
  if (!req.body || !req.body.name || !req.body.phone || !req.body.specialty) {
    // Send back error message
    return res.status(400).json({ message: "Please send required fields" });
  }

  const { name, phone, specialty } = req.body;

  const newPhysician = {
    physicianId: uuid(),
    name: name,
    phone: phone,
    specialty: specialty
  };

  physiciansData.push(newPhysician);
  writeData(physiciansData);

  res.status(200).json({ newPhysician });
});

// update physician information
physiciansRouter.put("/:physicianId", (req, res) => {
  const physiciansData = readData();

  const index = physiciansData.findIndex(
    (physician) => physician.physicianId === req.params.physicianId
  );
  console.log("index=", index);
  if (!index) {
    return res.status(404).send({ message: "Physician Information not found" });
  }

  // Validate request details
  if (!req.body || !req.body.name || !req.body.phone || !req.body.specialty) {
    // Send back error message
    return res.status(400).json({ message: "Please send required fields" });
  }

  const { name, phone, specialty } = req.body;

  const updatedPhysician = {
    physicianId: req.params.physicianId,
    name: name,
    phone: phone,
    specialty: specialty
  };

  physiciansData.splice(index, 1, updatedPhysician);
  writeData(physiciansData);

  res.status(200).json(updatedPhysician);
});

// delete physician information
physiciansRouter.delete("/:physicianId", (req, res) => {
  let physiciansData = readData();
  const physician = physiciansData.find(
    (physician) => physician.physicianId === req.params.physicianId
  );

  if (!physician) {
    return res.status(404).send("Physician Information not found");
  }

  physiciansData = physiciansData.filter(
    (physician) => physician.physicianId !== req.params.physicianId
  );
  writeData(physiciansData);

  return res.status(200).send();
});

module.exports = physiciansRouter;
