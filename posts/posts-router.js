const express= require('express');
const db= require('../data/db.js');

const router= express.Router();

// GET /users
router.get('/', (req, res) => {
    db.find()
    .then(posts => {
        res.json(posts);
    })
    .catch(err => {
        console.log('Error by post:', err);
        res.status(500).json({
            error: 'The posts information could not be retrieved.'
        }).end();
    })
})

// GET /users/:id
router.get('/:id', (req, res) => {
    const {id}= req.params;

    db.findById(id)
    .then(post => {
        // since the findById method returns an empty arr if it doesn't find a corresponding id
        // we need to test and make sure if it is an empty arr return 404 status
       
        if(post.length === 0){
            res.status(404).json({
                message: 'The post with the specified ID does not exist.'
            })
        } else{
            res.json(post);
        }
    })
    .catch(err => {
        console.log('Error by post-id:', err);
        res.status(500).json({
            error: 'The post information could not be retrieved.'
        }).end();
    });
})

// POST /users
router.post('/', (req, res) => {

})

module.exports= router;
