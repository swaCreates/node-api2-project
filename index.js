const express= require('express');
const posts_router= require('./posts/posts-router.js');
const server= express();
const port= 3050;

server.use(express.json()); // <---helps express to parse json objects
server.use('/posts', posts_router); // <-- uses every route inside of posts-router.js

server.get('/', (req, res) =>{
    res.json({
        message: 'Welcome to my server :)',
    })
})

server.listen(port, () => {
    console.log(`Server listening on port ${port}...`);
})