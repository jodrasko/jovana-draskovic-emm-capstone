const { Router, json } = require("express");
const { v4: uuid } = require("uuid");
const fs = require("fs");
const notesRouter = Router();

const readData = () => {
  const notesData = fs.readFileSync("./data/notes.json");
  return JSON.parse(notesData);
};

const writeData = (notesData) => {
  fs.writeFileSync("./data/notes.json", JSON.stringify(notesData, null, 2));
};

// full url: /note
notesRouter.get("/", (req, res) => {
  const notesData = readData();
  res.status(200).json(notesData);
});

// full url: /note/123
notesRouter.get("/:noteId", (req, res) => {
  const notesData = readData();

  const note = notesData.find((note) => note.noteId === req.params.noteId);

  if (!note) {
    return res.status(404).send("The note is not found");
  }

  res.status(200).json(note);
});

//create note
notesRouter.post("/", (req, res) => {
  const notesData = readData();

  // Validate request details
  if (
    !req.body ||
    !req.body.physicianId ||
    !req.body.profileId ||
    !req.body.remark ||
    !req.body.date
  ) {
    // Send back error message
    return res.status(400).json({ message: "Please send required fields" });
  }

  const { date, remark, profileId, physicianId } = req.body;

  const newNote = {
    noteId: uuid(),
    physicianId: physicianId,
    profileId: profileId,
    remark: remark,
    date: date
  };

  notesData.push(newNote);
  writeData(notesData);

  res.status(200).json({ newNote });
});

// update note
notesRouter.put("/:noteId", (req, res) => {
  const notesData = readData();

  const index = notesData.findIndex(
    (note) => note.noteId === req.params.noteId
  );

  if (index < 0) {
    return res.status(404).send({ message: "Note not found" });
  }

  // Validate request details
  if (
    !req.body ||
    !req.body.physicianId ||
    !req.body.profileId ||
    !req.body.remark ||
    !req.body.date
  ) {
    // Send back error message
    return res.status(400).json({ message: "Please send required fields" });
  }

  const { date, remark, profileId, physicianId } = req.body;

  const updatedNote = {
    noteId: req.params.noteId,
    physicianId: physicianId,
    profileId: profileId,
    remark: remark,
    date: date
  };

  notesData.splice(index, 1, updatedNote);
  writeData(notesData);

  res.status(200).json(updatedNote);
});

// delete note
notesRouter.delete("/:noteId", (req, res) => {
  let notesData = readData();
  const note = notesData.find((note) => note.noteId === req.params.noteId);

  if (!note) {
    return res.status(404).send("Note not found");
  }

  notesData = notesData.filter((note) => note.noteId !== req.params.noteId);
  writeData(notesData);

  return res.status(200).send();
});

module.exports = notesRouter;
