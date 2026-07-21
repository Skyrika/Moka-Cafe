import  { useEffect, useState } from "react";
import "./TaxConfigCard.css";

// Kartu konfigurasi pajak — mengambil, menampilkan, dan menyimpan pengaturan pajak.
export default function TaxConfigCard() {
  const [taxInclusive, setTaxInclusive] = useState(false);
  const [taxRate, setTaxRate] = useState(11);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState("");

  // Mengambil pengaturan pajak dari backend saat komponen dirender.
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        // Mengirim request GET ke endpoint settings.
        const response = await fetch("/api/settings");
        const result = await response.json();

        if (result.success) {
          setTaxRate(Number(result.data.taxRate ?? 11));
          setTaxInclusive(Boolean(result.data.taxInclusive));
        }
      } catch (error) {
        console.error("Gagal memuat pengaturan pajak:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  // Menyimpan pengaturan pajak ke backend.
  const handleSave = async () => {
    setSaving(true);
    setStatus("");

    try {
      // Mengirim request PUT dengan data pajak yang baru.
      const response = await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ taxRate: Number(taxRate), taxInclusive }),
      });
      const result = await response.json();

      if (response.ok && result.success) {
        setStatus("Pengaturan pajak berhasil disimpan.");
      } else {
        setStatus(result.message || "Gagal menyimpan pengaturan pajak.");
      }
    } catch (error) {
      console.error("Gagal menyimpan pengaturan pajak:", error);
      setStatus("Tidak dapat menyimpan pengaturan pajak. Coba lagi.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <section className="card card-span-12">
      <div className="card-header">
        <h3 className="card-title">
          <span className="material-symbols-outlined card-icon">account_balance</span>
          Konfigurasi Pajak
        </h3>
      </div>

      <div className="card-body">
        {loading ? (
          <p>Memuat pengaturan pajak...</p>
        ) : (
          <>
            {/* Input persentase pajak */}
            <div className="tax-input-group">
              <label className="tax-input-label">Pajak Penjualan Default (%)</label>
              <div className="tax-input-wrapper">
                <input
                  className="tax-input"
                  type="number"
                  min="0"
                  step="0.1"
                  value={taxRate}
                  onChange={(e) => setTaxRate(e.target.value)}
                />
                <span className="tax-unit-suffix">%</span>
              </div>
            </div>

            {/* Toggle apakah harga sudah termasuk pajak */}
            <div className="tax-toggle-row">
              <div className="tax-toggle-info">
                <p className="tax-setting-label">Harga Termasuk Pajak</p>
                <p className="tax-setting-desc">Harga menu sudah termasuk pajak</p>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={taxInclusive}
                  onChange={(e) => setTaxInclusive(e.target.checked)}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>

            {/* Tombol simpan dan status */}
            <div className="tax-save-row">
              <button
                type="button"
                className="tax-save-button"
                onClick={handleSave}
                disabled={saving}
              >
                {saving ? "Menyimpan..." : "Simpan Pengaturan"}
              </button>
              {status && <p className="tax-status-message">{status}</p>}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
