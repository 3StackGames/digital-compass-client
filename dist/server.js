'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _socketIo = require('socket.io');

var _socketIo2 = _interopRequireDefault(_socketIo);

var _objectAssign = require('object-assign');

var _objectAssign2 = _interopRequireDefault(_objectAssign);

var io = (0, _socketIo2['default'])(3000);
var gameState = {
  players: [],
  question: '',
  answers: []
};

io.on('connection', function (socket) {
  socket.on('join player', onJoinPlayer);
  socket.on('submit answers', onSubmitAnswers);
  emitUpdateState();
});

function emitUpdateState() {
  io.emit('update state', gameState);
}

function onJoinPlayer(data) {
  var players = gameState.players;
  players.push(data);
  gameState = (0, _objectAssign2['default'])(gameState, {
    players: players
  });
  emitUpdateState();
}

function onSubmitAnswers(data) {
  gameState = (0, _objectAssign2['default'])(gameState, {
    answers: data.answers
  });
  emitUpdateState();
}
//# sourceMappingURL=server.js.map