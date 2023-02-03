const express = require('express');
const passport = require('passport');
const router = express.Router();
const notesController = require('../controller/notesController');


router.post('/updateNote',notesController.updateNote);
router.get('/:id',notesController.getNote);



module.exports = router;
