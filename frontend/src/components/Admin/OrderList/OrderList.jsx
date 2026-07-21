import "./OrderList.css";

function OrderList() {
  const orders = [
    {
      customer: "Andi",
      items: ["Espresso x2", "Latte x1"],
      total: "Rp 85.000",
    },
    {
      customer: "Budi",
      items: ["Croissant x2", "Matcha x1"],
      total: "Rp 66.000",
    },
  ];

  return (
    <div className="order-list">
      <h2>Pesanan Saat Ini</h2>

      {orders.map((order, index) => (
        <div className="order-card" key={index}>
          <h3>{order.customer}</h3>

          {order.items.map((item, i) => (
            <p key={i}>{item}</p>
          ))}

          <div className="total">
            Total: {order.total}
          </div>
        </div>
      ))}
    </div>
  );
}

export default OrderList;