import ws from 'socket.io';
import assign from 'object-assign';

let io = ws(3000);
let gameState = {
  players: [],
  question: '',
  answers: []
}

io.on('connection', (socket) => {
  socket.on('join player', onJoinPlayer);
  socket.on('submit answers', onSubmitAnswers);
  emitUpdateState();
});

function emitUpdateState() {
  io.emit('update state', gameState);
}

function onJoinPlayer(data) {
  let players = gameState.players;
  players.push(data);
  gameState = assign(gameState, {
    players: players
  });
  emitUpdateState();
}

function onSubmitAnswers(data) {
  gameState = assign(gameState, {
    answers: data.answers
  });
  emitUpdateState();
}
