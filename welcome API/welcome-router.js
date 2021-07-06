const express= require('express');

const router= express.Router();

router.get('/', (req, res) =>{
    res.send(
        `<h4>Welcome to my server! :)</h4>`
    );
});

router.get('/api', (req, res) =>{
    res.send(
        `<p>API waiting for endpoint...</p>`
    );
});

module.exports= router;