const express= require('express');
const db= require('../data/db.js');

const router= express.Router();

// GET /posts
router.get('/', (req, res) => {
    db.find()
    .then(posts => {
        res.json(posts);
    })
    .catch(err => {
        console.log('Error with posts:', err);
        res.status(500).json({
            error: 'The posts information could not be retrieved.'
        }).end();
    })
})

// GET /posts/:id
router.get('/:id', (req, res) => {
    const {id}= req.params;

    db.findById(id)
    .then(post => {
        // since the findById method returns an empty arr if it doesn't find a corresponding id
        // we need to test and make sure if it is an empty arr return 404 status
       
        if(post.length === 0){
            res.status(404).json({
                error_message: 'The post with the specified ID does not exist.'
            })
        } else{
            res.json(post);
        }
    })
    .catch(err => {
        console.log('Error with post-id:', err);
        res.status(500).json({
            error: 'The post information could not be retrieved.'
        }).end();
    });
})

// POST /posts
router.post('/', (req, res) => {
    // make sure both the title & contents are in the post request

    if(!req.body.title || !req.body.contents){
        res.status(400).json({
            error_message: 'Please provide title and contents for the post.'
        }).end();
    }

    db.insert(req.body)
    .then(post => {
        res.status(201).json(post);
    })
    .catch(err => {
        console.log('Error posting to database:', err);
        res.status(500).json({
            error: 'There was an error while saving the post to the database.'
        }).end();
    })
})

router.put('/:id', (req, res) => {
    
})

module.exports= router;
