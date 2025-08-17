const express = require("express");
const socket = require("socket.io");
const http = require("http");
const {Chess} = require("chess.js");
const path = require("path");



const app = express();
const server = http.createServer(app);
const io = socket(server);

const chess = new Chess();

let players = {};
let currentplayer = "w";

app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/",(req , res) =>{
    res.render("index.ejs" ,{title: "Chess Game"} );
});

io.on("connection",function(uniquesocket){
    console.log("connected");

    if(!players.white){
        players.white = uniquesocket.id;
        uniquesocket.emit("playerRole","w");
    }else if (!players.black){
        players.black = uniquesocket.id;
        uniquesocket.emit("playerRole", "b");
    }else{
        uniquesocket.emit("spectatorRole");
    }

    uniquesocket.on("disconnect",function(){
        if(uniquesocket.id === players.white) {
            delete players.white;
        }else if (uniquesocket.id === players.black){
            delete players.black;
        }

    });

    uniquesocket.on("move",(move)=>{
        try {
            if(chess.turn() === "w" && uniquesocket.id !== players.white) return ;
            if(chess.turn() === "b" && uniquesocket.id !== players.black) return ;
            

            const result = chess.move(move);
            if(result){
                currentplayer = chess.turn();
                io.emit("move" , move);
                io.emit("boardstate" , chess.fen());
            }else{
                console.log("invalid move");
                uniquesocket.emit("invalid move ", move);
            }
        } catch (error) {
            console.log(error);
            uniquesocket.emit("invalid move", move);
            
        };
    });

    


});

server.listen(3000, ()=>{
    console.log("listing on port 3000");
});