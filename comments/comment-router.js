const express= require('express');
const db= require('../data/db.js');

const router= express.Router();

// GET posts/:id/comments
router.get('/:id/comments', (req, res) => {
    const {id}= req.params;

    db.findPostComments(id)
    .then(comments => {
        if(comments.length === 0){
            res.status(404).json({
                request_errorMessage: 'The post with the specified ID does not exist or does not have any comments.'
            })
        } else{
            res.json(comments);
        }
    })
    .catch(err => {
        console.log('GET comments error:', err);
        res.status(500).json({
            server_error: 'The comments information could not be retrieved.'
        });
    });
});

router.post('/:id/comments', (req, res) => {
    const {id}= req.params;

    if(!req.body.text){
        return res.status(400).json({
            error_message: 'Please provide text for the comment.'
        });
    };

    const newComment= {...req.body, post_id: id};

    // 404 message is not working

    db.insertComment(newComment)
    .then(comment => {
        if(id){
            res.status(201).json(comment)
        } else{
            res.status(404).json({
                request_error: 'The post with the specified ID does not exist.'
            })
        }
    })
    .catch(err => {
        console.log('Error creating comment:', err);
        res.status(500).json({
            server_error: 'There was an error while saving the comment to the database.'
        })
    });
});


module.exports= router;