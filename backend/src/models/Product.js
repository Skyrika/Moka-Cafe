// Model untuk merepresentasikan data produk yang berasal dari database.
export class Product {
  constructor({ id, name, price, category = 'drink' }) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.category = category;
  }
}
