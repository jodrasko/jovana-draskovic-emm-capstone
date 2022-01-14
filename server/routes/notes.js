const { Router, json } = require("express");
const { v4: uuid } = require("uuid");
const fs = require("fs");
const notesRouter = Router();

const readData = () => {
  const notesData = fs.readFileSync("./data/notes.json");
  return JSON.parse(notesData);
};

const writeFile = (notesData) => {
  fs.writeFileSync("./data/notes.json", JSON.stringify(notesData, null, 2));
};

notesRouter.get("/", (req, res) => {
  const notesData = readData();

  //   let newnotesData = notesData.map((note) => {
  //     const { id, title, channel, image } = note;
  //     return { id, title, channel, image };
  //   });
  res.status(200).json(notesData);
});

notesRouter.get("/:noteId", (req, res) => {
  const notesData = readData();

  const note = notesData.find((note) => note.noteId === req.params.noteId);

  if (!note) {
    return res.status(404).send("The note is not found");
  }

  res.status(200).json(note);
});

module.exports = notesRouter;
