let currentId = 1;
class Order {
  constructor(type) {
    this.id = currentId++;
    this.type = type;
    this.status = 'PENDING';
  }
}
module.exports = Order;
