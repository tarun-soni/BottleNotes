const express = require("express");
const router = express.Router();
// const config = require('config');
const auth = require("../../middleware/auth");
const Notes = require("../../models/Notes");
const User = require("../../models/User");
const { check, validationResult } = require("express-validator");

// @route    POST api/note
// @desc     Create user notes
// @access   Private
router.post(
  "/",
  [auth, [check("desc", "note desc is required").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, desc } = req.body;

    const newNote = { title, desc };
    try {
      let notes = await Notes.findOne({ user: req.user.id });
      console.log("notes :>> ", notes);

      if (notes === null) {
        notes = new Notes({
          user: req.user.id,
          notes: newNote,
        });
        await notes.save();
        return res.json(notes);
      }

      notes.notes.unshift(newNote);
      await notes.save();
      return res.json(notes);
    } catch (err) {
      console.error("error in notes POST route: api/notes >>>>>", err);
      res.status(500).send("Server Error");
    }
  }
);

//@route       GET api/note/notes/user/:user_id
//@desc        get notes by user id
//@access      private
router.get("/notes", auth, async (req, res) => {
  try {
    const notes = await Notes.findOne({ user: req.user.id }).populate("user", [
      "name",
    ]);

    if (!notes) {
      return res.status(400).send({ msg: "NO Notes Found" });
    }

    res.json(notes);
  } catch (err) {
    if (err.kind == "ObjectId") {
      return res.status(400).send({ msg: "No notes Not Found" });
    }
    console.error("error in note GET route: user/userid >>>>>", err);
    res.status(500).send("Server Error");
  }
});

// @route       put api/note/:note_id
// @desc        edit specific note
// @access      private
router.put("/:note_id", auth, async (req, res) => {
  try {
    const notes = await Notes.findOne({ user: req.user.id });

    //Find index of specific object using findIndex method.
    objIndex = notes.notes.findIndex((obj) => obj._id == req.params.note_id);

    //Update object's name property.
    notes.notes[objIndex].title = req.body.title;
    notes.notes[objIndex].desc = req.body.desc;
    notes.notes[objIndex].status = req.body.status;

    await notes.save();

    res.json(notes);
  } catch (err) {
    console.error("error in note put route: note/noteid >>>>>", err);
    res.status(500).send("Server Error");
  }
});

// @route       DELETE api/note/:note_id
// @desc        delete specific note
// @access      private
router.delete("/:note_id", auth, async (req, res) => {
  try {
    const note = await Notes.findOne({ user: req.user.id });

    console.log("note.notes :>> ", note.notes);
    note.notes = note.notes.filter(
      (n) => n._id.toString() !== req.params.note_id
    );

    await note.save();

    // return res.json({ msg: 'Note Removed' })
    return res.json(note.notes);
  } catch (err) {
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Note not found" });
    }
    console.error("error in route post delete note ", err);
    res.status(500).send("Server error");
  }
});

module.exports = router;
