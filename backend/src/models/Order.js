export class Order {
  constructor({ id, items, totalAmount, paidAmount, change }) {
    this.id = id;
    this.items = items;
    this.totalAmount = totalAmount;
    this.paidAmount = paidAmount;
    this.change = change;
  }
}
