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
        console.log('Error requesting posts:', err);
        return res.status(500).json({
            server_errorMessage: 'The posts information could not be retrieved.'
        })
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
                request_errorMessage: 'The post with the specified ID does not exist.'
            })
        } else{
            res.json(post);
        }
    })
    .catch(err => {
        console.log('Error requesting by post-id:', err);
        return res.status(500).json({
            server_errorMessage: 'The post information could not be retrieved.'
        })
    });
})

// POST /posts
router.post('/', (req, res) => {
    // make sure both the title & contents are in the post request

    if(!req.body.title || !req.body.contents){
        return res.status(400).json({
            error_message: 'Please provide title and contents for the post.'
        })
    }

    db.insert(req.body)
    .then(post => {
        res.status(201).json(post);
    })
    .catch(err => {
        console.log('Error creating post:', err);
        return res.status(500).json({
            server_error: 'There was an error while saving the post to the database.'
        })
    })
})

// PUT /posts/:id
router.put('/:id', (req, res) => {
    const {id}= req.params;

    if(!req.body.title || !req.body.contents){
        return res.status(400).json({
            error_message: 'Please provide title and contents for the post.'
        })
    }

    // NEED TO KNOW WHY I DO NOT RECEIVE A 404 ERROR

    db.update(id, req.body)
    .then(updatedPost => {
        if(!id){
            res.status(404).json({
                posting_errorMessage: 'The post with the specified ID does not exist.'
            });
        } else{
            res.json(updatedPost);
        }
    })
    .catch(err => {
        console.log('Error updating post:', err)
        return res.status(500).json({
            server_error: 'The post information could not be modified.'
        })
    })
})

// DELETE /users/:id
router.delete('/:id', (req, res) => {
    const {id}= req.params;

    // NEED TO KNOW WHY I DO NOT RECEIVE A 404 ERROR

    db.remove(id)
    .then(() => {
        if(!id){
            res.status(404).json({
                delete_errorMessage: 'The post with the specified ID does not exist.'
            })
        } else{
            res.status(204).end();
        }
    })
    .catch(err => {
        console.log('Error deleting post:', err);
        res.status(500).json({
            server_error: 'The post could not be removed.'
        })
    })
})

module.exports= router;
