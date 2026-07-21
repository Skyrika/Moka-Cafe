import { FaQrcode, FaMoneyBillWave, FaCreditCard, FaWallet } from "react-icons/fa";
import "./PaymentMethods.css";

// Komponen untuk menampilkan pilihan metode pembayaran yang tersedia.
export default function PaymentMethods() {
  return (
    <div className="payment-grid">
      <button className="payment-btn">
        <FaQrcode />
        <span>QRIS</span>
      </button>

      <button className="payment-btn">
        <FaMoneyBillWave />
        <span>Tunai</span>
      </button>

      <button className="payment-btn">
        <FaCreditCard />
        <span>Kartu EDC</span>
      </button>

      <button className="payment-btn">
        <FaWallet />
        <span>E-Wallet</span>
      </button>
    </div>
  );
}
