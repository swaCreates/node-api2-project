const express= require('express');
const post_router= require('./posts/post-router.js');
const comment_router= require('./comments/comment-router.js');
const welcome_router= require('./welcome API/welcome-router.js');
const helmet= require('helmet');
const server= express();


// built-in middleware
server.use(express.json()); // <---helps express to parse json objects

// third party middleware
server.use(helmet()); // <-- helps to hide the 'powered by' in our headers in the network tab

// routing middleware
server.use('/' ,welcome_router);
server.use('/api/posts', post_router); // <-- uses every route inside of post-router.js
server.use('/api/posts', comment_router); // <-- uses sub routes within the post-id

// this middleware function will only run if no route is found.
// always keep last
server.use((req, res) => {
	res.status(404).send(
        `<h3>The url ${req.url.toUpperCase()} was not found.</h3>`
    )
});

module.exports= server;