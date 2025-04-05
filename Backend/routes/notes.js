const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Notes = require("../models/Notes");
const { body, validationResult } = require("express-validator");

//Route1: get all the notes
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  const notes = await Notes.find({ user: req.user.id });
  res.json(notes);
});

//Route2: add a new note
router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "description must be atleast 5 chars").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { title, description, tag } = req.body;
      const newNote = new Notes({
        title:title,
        description: description,
        tag: tag,
        user: req.user.id,
      });
      const saveNote = await newNote.save();
      res.json(saveNote);
    } catch (error) {
        console.error(error.message);
      res.status(500).send("some error occured");
    }
  }
);

//Route3: update an existing note

router.put(
  "/updatenote/:id",
  fetchuser,async (req, res) => {
    
    const newNote = {};
    try {
      const { title, description, tag } = req.body;

      if(title) newNote.title = title;
      if(description) newNote.description = description;
      if(tag) newNote.tag = tag;

      //find the note to be updated and update it

      let note = await Notes.findById(req.params.id);
      if(!note){
        res.status(404).send("Not found");
      }

      if(note.user.toString()!==req.user.id){
        return res.status(401).send("Not allowed");
      }
      
      note  = await Notes.findByIdAndUpdate(req.params.id,{$set: newNote},{new:true});
      res.json({note});

    } catch (error) {
        console.error(error.message);
      res.status(500).send("some error occured");
    }
  }
);


//Route4: deleting a note

router.delete(
  "/deletenote/:id",
  fetchuser,async (req, res) => {
    
    const newNote = {};
    try {
      
      //find the note to be deleted and delete it
      let note = await Notes.findById(req.params.id);
      if(!note){
        res.status(404).send("Not found");
      }

      //allow user if only user owns this note
      if(note.user.toString()!==req.user.id){
        return res.status(401).send("Not allowed");
      }
      
      note  = await Notes.findByIdAndDelete(req.params.id);
      res.json({"status": "note has be deleted"});

    } catch (error) {
        console.error(error.message);
      res.status(500).send("some error occured");
    }
  }
);
module.exports = router;
