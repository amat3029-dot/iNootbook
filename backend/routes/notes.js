const express = require('express');
const router = express.Router();
const Note = require("../models/Note");
const { body, validationResult } = require('express-validator');
const fetchuser = require('../middleware/fetchuser'); // 🔥 added

router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id }); 
        res.json(notes);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});


router.post(
    '/addnotes',
    fetchuser, 
    [
        body('title', 'Title must not be empty').isLength({ min: 1 }),
        body('description', 'Description must not be empty').isLength({ min: 1 }),
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const { title, description, tag } = req.body;

            const note = new Note({
                title,
                description,
                tag: tag || "general",
                user: req.user.id 
            });

            const savedNote = await note.save();
            res.json(savedNote);

        } catch (error) {
            console.error(error.message);
            res.status(500).send("Server Error");
        }
    }
);


router.put('/updatenote/:id', fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;

    try {
        let note = await Note.findById(req.params.id);

        if (!note) {
            return res.status(404).send("Not found");
        }

        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not allowed");
        }

        const updatedNote = await Note.findByIdAndUpdate(
            req.params.id,
            {
                $set: { title, description, tag }
            },
            { new: true }
        );

        res.json(updatedNote);

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});


router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try {
        let note = await Note.findById(req.params.id);

        if (!note) {
            return res.status(404).send("Not found");
        }

        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not allowed");
        }

        await Note.findByIdAndDelete(req.params.id);
        res.json({ success: "Deleted" });

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});

module.exports = router;