function connectionHandler(socket) {
  console.log('user connected');
  socket.emit('user connected');
}

module.exports = connectionHandler;
