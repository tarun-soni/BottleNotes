const express = require('express');
const router = express.Router();
const config = require('config');
const auth = require('../../middleware/auth')
const Notes = require('../../models/Notes')
const User = require('../../models/User')
const { check, validationResult } = require('express-validator');


// @route    POST api/note
// @desc     Create user notes
// @access   Private
router.post('/',
  [auth, [
    check('desc', 'note desc is required').not().isEmpty()
  ]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, desc } = req.body;

    const newNote = { title, desc }
    try {
      const notes = await Notes.findOne({ user: req.user.id })
      notes.notes.unshift(newNote);
      await notes.save()
      return res.json(notes);
    } catch (err) {
      console.error('error in notes POST route: api/notes >>>>>', err)
      res.status(500).send('Server Error');
    }
  }
);


//@route       GET api/notes/user/:user_id
//@desc        get notes by user id
//@access      private
router.get('/notes/:user_id', auth, async (req, res) => {
  try {
    const notes = await Notes.findOne({ user: req.params.user_id })
      .populate('user', ['name']);

    if (!notes) {
      return res.status(400).send({ msg: 'NO Notes Found' })
    }

    res.json(notes);
  } catch (err) {

    if (err.kind == 'ObjectId') {
      return res.status(400).send({ msg: 'No notes Not Found' })
    }
    console.error('error in note GET route: user/userid >>>>>', err)
    res.status(500).send('Server Error');
  }
})


module.exports = router;
