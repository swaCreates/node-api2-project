const express= require('express');
const post_router= require('./posts/post-router.js');
const welcome_router= require('./welcome API/welcome-router.js');
const server= express();
const port= 3050;

server.use(express.json()); // <---helps express to parse json objects
server.use('/posts', post_router); // <-- uses every route inside of post-router.js
server.use(welcome_router);

server.listen(port, () => {
    console.log(`Server listening on port ${port}...`);
})