const express= require('express');
const server= express();
const port= 3050;

server.use(express.json()); // <---helps express to parse json objects

server.get('/', (req, res) =>{
    res.json({
        message: 'Welcome to my server :)',
    })
})

server.listen(port, () => {
    console.log(`Server listening on port ${port}...`);
})