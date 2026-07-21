import Sidebar from "../../../components/Admin/Sidebar/Sidebar";
import StaffProfileCard from "../../../components/Admin/StaffProfileCard/StaffProfileCard";
import OperatingHoursCard from "../../../components/Admin/OperatingHoursCard/OperatingHoursCard";
import TaxConfigCard from "../../../components/Admin/TaxConfigCard/TaxConfigCard";
import "./Pengaturan.css";

// Halaman pengaturan sistem untuk admin — mengelola staf, jam operasional, dan pajak.
export default function Pengaturan() {
  return (
    <div className="admin-page-shell">
      <Sidebar />

      <div className="pengaturan-container">
        {/* Judul halaman */}
        <div className="pengaturan-header">
          <h2 className="pengaturan-title">Pengaturan Sistem</h2>
          <p className="pengaturan-subtitle">
            Kelola preferensi operasional dan konfigurasi staf kafe Anda.
          </p>
        </div>

        {/* Grid layout untuk kartu pengaturan */}
        <div className="pengaturan-grid">
          <StaffProfileCard />
          <OperatingHoursCard />
          <TaxConfigCard />
        </div>
      </div>
    </div>
  );
}
