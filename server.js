const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const Order = require('./logic/order');
const orderQueue = require('./logic/orderQueue');
const botManager = require('./logic/botManager');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(path.join(__dirname, 'public')));

// Helper to get current status
function getStatus() {
  return {
    pending: orderQueue.pending,
    completed: orderQueue.completed,
    bots: botManager.bots.map(bot => ({
      id: bot.id,
      working: bot.working,
      currentOrder: bot.currentOrder
    }))
  };
}

io.on('connection', (socket) => {
  socket.emit('update', getStatus());

  socket.on('newOrder', (type) => {
    const order = new Order(type);
    orderQueue.addOrder(order);
    io.emit('update', getStatus());
  });

  socket.on('addBot', () => {
    botManager.startBot(() => io.emit('update', getStatus()));
    io.emit('update', getStatus());
  });

  socket.on('removeBot', (botId) => {
    botManager.stopBot(botId);
    io.emit('update', getStatus());
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
