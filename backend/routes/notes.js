const express = require('express');
const router = express.Router();
const Notes = require('../models/Note')
const  fetchuser = require('../middleware/fetchuser');
const { body, validationResult } = require('express-validator');

// routes 1 :  get all notes 
router.get('/fetchallnotes',fetchuser, async (req, res) => {
    try{
        const notes = await Notes.find({user: req.user.id});
        res.json(notes);
    }
    catch(err){
        console.error(error.message);
        res.status(500).send("Internal server error")      
    }
})
// routes 2:  Insert  new note 
router.post('/addnote',fetchuser,[
    body('title','Enter validate title').isLength({ min: 3 }), 
    body('description','Enter validate description').isLength({ min: 5 }),   
], async (req, res) => {
    try{
        const {title, description,tag} = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
          }
        const note = new Notes({ title, description,tag,user: req.user.id})
        const saveNote = await note.save();
        res.json(saveNote);
    }
    catch(err){
        console.error(err.message);
        res.status(500).send("Internal server error")      
    }
})
// routes 3:  update  notes 
router.put('/updatenote/:id',fetchuser, async (req, res) => {
     const {title,description,tag }= req.body;
      try{
     const newNote ={};
     if(title){newNote.title = title}
     if(description){newNote.description = description}
     if (tag){newNote.tag = tag}
     let note = await Notes.findById(req.params.id);
     if (!note){return res.status(404).send("not found")}
     if (note.user.toString()!== req.user.id){
         return res.status(401).send("Not Allowed")
     }
     note = await Notes.findByIdAndUpdate(req.params.id,{$set: newNote},{new:true})
     res.json({note});
      }
      catch (err) {
        console.error(err.message);
        res.status(500).send("Internal server error")      

      }
});
// routes 4:  delete notes 
router.delete('/deletenote/:id',fetchuser, async (req, res) => {
    const {title,description,tag }= req.body;
    try{
    let note = await Notes.findById(req.params.id);
    if (!note){return res.status(404).send("not found")}
    
    if (note.user.toString()!== req.user.id){
        return res.status(401).send("Not Allowed")
    }
    note = await Notes.findByIdAndDelete(req.params.id)
    res.json("success: Note has been deleted");
} catch (err) {
    console.error(err.message);
    res.status(500).send("Internal server error") 
}
});
module.exports = router;