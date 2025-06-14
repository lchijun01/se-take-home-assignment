const orderQueue = require('./orderQueue');

function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

class BotManager {
  constructor() {
    this.bots = [];
    this.freeIds = [];
    this.nextId = 1;
  }

  startBot(updateCallback) {
    // assign the lowest free ID or next sequential
    let id = this.freeIds.length
      ? this.freeIds.sort((a,b)=>a-b).shift()
      : this.nextId++;

    const bot = {
      id,
      working: false,
      stop: false,
      currentOrder: null
    };

    (async () => {
      while (!bot.stop) {
        const order = orderQueue.getNextOrder();
        if (!order) {
          await sleep(1000);
          continue;
        }

        // Begin processing
        bot.working      = true;
        bot.currentOrder = order;
        order.status     = 'PROCESSING';
        updateCallback();

        // Cooking… (10sec)
        await sleep(10000);

        // Only complete if bot wasn’t removed mid-cook
        if (!bot.stop) {
          orderQueue.completeOrder(order);
        }

        // Reset state
        bot.working      = false;
        bot.currentOrder = null;
        updateCallback();
      }
    })();

    this.bots.push(bot);
  }

  stopBot(id) {
    // remove newest or specific
    const idx = id == null
      ? this.bots.length - 1
      : this.bots.findIndex(b => b.id === id);
    if (idx < 0) return;

    const bot = this.bots.splice(idx, 1)[0];

    // immediately requeue if it was mid-process
    if (bot.working && bot.currentOrder) {
      orderQueue.requeueOrder(bot.currentOrder);
    }

    // free its ID
    this.freeIds.push(bot.id);

    // signal it to stop before its next loop iteration
    bot.stop = true;
  }
}

module.exports = new BotManager();
