# Chess-Game
The Chess Game with Socket.IO is a real-time, two-player online chess game. It allows players to connect to the same game room and play against each other over the internet without needing a database. The board state and moves are maintained in memory on the server, and updates are broadcast instantly using WebSockets via Socket.IO.

Objectives:
To build a real-time online chess game without persistent storage.
To use Socket.IO for bidirectional communication between client and server.
To handle synchronization of board state between two players.
To implement all chess rules and game-ending conditions.

Features:

Real-Time Multiplayer
Two players join the same game room via a link or code.
Moves are sent from one client to the server and broadcast to the opponent.
Chess Rules Implementation
Legal moves for all pieces (pawn, rook, knight, bishop, queen, king).




Game State Management:
The server holds the board state in memory.
No database required; game resets when players disconnect.

User Interface:

Web-based chessboard (HTML, CSS, JavaScript).
Drag-and-drop or click-to-move pieces.

Communication:
Socket.IO ensures instant updates to both players.
Basic chat system can be added for communication.

Tech Stack:

 Frontend:
React.js (for board rendering & state management).
Chessboard.js or custom chessboard using HTML/CSS .
Socket.IO client (for real-time events).

Backend:
Node.js + Express.
Socket.IO server (to manage rooms, moves, and game state).
No Database
Game states stored in server memory (using JavaScript objects).

System Workflow:

Connection
Player 1 creates a room → Server generates unique room ID.
Player 2 joins using the same room ID.

Game Start
Server initializes the board in memory.
Assigns colors (White/Black) to players.
Gameplay
Player makes a move → Client emits move event with details.
Server validates move → Updates board → Emits updated state to both players.
Game End
Game session ends when players leave/disconnect.

Example Socket Events:

joinRoom → Player joins a game room.
startGame → Server starts the game once 2 players join.
move → Player sends a move (e.g., {from: "e2", to: "e4"}).
updateBoard → Server sends updated board to both players.

Learning Outcomes:

Understanding real-time communication with Socket.IO.
Implementing state management on the server without a database.
Developing multiplayer game synchronization.
Applying object-oriented/game logic concepts for chess rules.