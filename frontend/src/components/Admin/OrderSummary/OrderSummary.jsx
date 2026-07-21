// Komponen untuk menampilkan ringkasan pesanan (subtotal, pajak, total) dan tombol bayar.
function Summary({ cart }) {
  // Menghitung subtotal dari semua item di keranjang.
  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.qty,
    0
  );

  // Menghitung pajak 11% dari subtotal.
  const tax = subtotal * 0.11;
  const total = subtotal + tax;

  return (
    <div className="summary">
      <h2>Ringkasan</h2>

      <p>
        <span>Subtotal</span>
        <span>Rp {subtotal.toLocaleString("id-ID")}</span>
      </p>

      <p>
        <span>Pajak (11%)</span>
        <span>Rp {tax.toLocaleString("id-ID")}</span>
      </p>

      <hr />

      <h3>
        <span>Total</span>
        <span>Rp {total.toLocaleString("id-ID")}</span>
      </h3>

      <button>Bayar</button>
    </div>
  );
}

export default Summary;
