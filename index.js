const server= require('./server.js');
const port= 3050;

server.listen(port, () => {
    console.log(`Server listening on port ${port}...`);
})