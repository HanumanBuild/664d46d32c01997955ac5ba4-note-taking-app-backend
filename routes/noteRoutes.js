const express = require("express");
const Note = require("../model/note");
const auth = require("../middleware/auth");
const router = express.Router();

router.post("/", auth, async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!(title && content)) {
      return res.status(400).send("All input is required");
    }

    const note = await Note.create({
      user_id: req.user.user_id,
      title,
      content,
    });

    res.status(201).json(note);
  } catch (err) {
    console.log(err);
  }
});

router.get("/", auth, async (req, res) => {
  try {
    const notes = await Note.find({ user_id: req.user.user_id });
    res.status(200).json(notes);
  } catch (err) {
    console.log(err);
  }
});

router.put("/:id", auth, async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!(title && content)) {
      return res.status(400).send("All input is required");
    }

    const note = await Note.findByIdAndUpdate(
      req.params.id,
      { title, content, updated_at: Date.now() },
      { new: true }
    );

    res.status(200).json(note);
  } catch (err) {
    console.log(err);
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    await Note.findByIdAndDelete(req.params.id);
    res.status(200).send("Note deleted successfully");
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;