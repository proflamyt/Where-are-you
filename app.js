const express = require('express')
const {createServer } = require('http')
const {Server} = require('socket.io')


let app = express()
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

// Middleware
io.use((socket, next) => {
    if (socket.handshake.headers.auth ) {

        const { auth } = socket.handshake.headers;
        const token = auth.split(" ")[1];
        jwt.verify(token, process.env.JWT_SECRETE_KEY, async (err, decodedToken) => {
            if (err) {
                throw new Error("Auth Error")
            }
            const user = await debug.User.findByPk(decodedToken.id);
            if (!user ) {
                throw new Error(
                    "Invalid Error or Password"
                )
            }
            socket.user = user;
            return next();
        })
    }
    else {
        throw new Error("Authentication Error")
    }

})

io.on("connection", (socket)=>{
    console.log("connected");
    console.log(socket.id)
})

httpServer.listen(3000, ()=>{
    console.log("App has already started")
})