class OrderQueue {
  constructor() {
    this.pending = [];
    this.completed = [];
  }
  addOrder(order) {
    if (order.type === 'VIP') {
      const idx = this.pending.findIndex(o => o.type === 'Normal');
      if (idx === -1) this.pending.push(order);
      else this.pending.splice(idx, 0, order);
    } else {
      this.pending.push(order);
    }
  }
  getNextOrder() { return this.pending.shift(); }
  requeueOrder(order) {
    order.status = 'PENDING';
    this.addOrder(order);
  }
  completeOrder(order) {
    order.status = 'COMPLETE';
    this.completed.push(order);
  }
}
module.exports = new OrderQueue();
