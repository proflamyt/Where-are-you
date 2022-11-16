const express = require('express')
const {createServer } = require('http')
const {Server} = require('socket.io')
// const {initializeRoutes} = require('./routes')

let app = express()
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get("/", (req, res)=> {

})

const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

io.on("connection", (socket)=>{
    console.log("connected");
    console.log(socket.id)
})

httpServer.listen(3000, ()=>{
    console.log("App has already started")
})