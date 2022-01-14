const { Router, json } = require("express");
const { v4: uuid } = require("uuid");
const fs = require("fs");
const physiciansRouter = Router();

const readData = () => {
  const physiciansData = fs.readFileSync("./data/physicians.json");
  return JSON.parse(physiciansData);
};

// const writeFile = (physiciansData) => {
//   fs.writeFileSync(
//     "./data/physicians.json",
//     JSON.stringify(physiciansData, null, 2)
//   );
// };

physiciansRouter.get("/", (req, res) => {
  const physiciansData = readData();

  //   let newphysiciansData = physiciansData.map((physician) => {
  //     const { id, title, channel, image } = physician;
  //     return { id, title, channel, image };
  //   });
  res.status(200).json(physiciansData);
});

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

module.exports = physiciansRouter;
