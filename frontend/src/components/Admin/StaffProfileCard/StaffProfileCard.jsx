import React, { useState } from "react";
import "./StaffProfileCard.css";

export default function StaffProfileCard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [nama, setNama] = useState("");
  const [pin, setPin] = useState("");

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setNama("");
    setPin("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Staf Baru:", { nama, pin });
    handleCloseModal();
  };

  return (
    <section className="card card-span-8">
      {/* Header Card */}
      <div className="card-header">
        <h3 className="card-title">
          <span className="material-symbols-outlined card-icon">group</span>
          Profil Staf
        </h3>
        <button className="btn-add-staff" onClick={handleOpenModal}>
          <span className="material-symbols-outlined">add</span>
          Tambah Staf
        </button>
      </div>

      {/* Staff List */}
      <div className="staff-list">
        {/* Staff Item 1 */}
        <div className="staff-item">
          <div className="staff-info">
            <img
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop"
              alt="Elena Rostova"
              className="staff-avatar"
            />
            <div className="staff-details">
              <p className="staff-name">Elena Rostova</p>
              <p className="staff-role">Kepala Barista • PIN: ****</p>
            </div>
          </div>
          <button className="btn-icon" title="Edit Staf">
            <span className="material-symbols-outlined">edit</span>
          </button>
        </div>

        {/* Staff Item 2 */}
        <div className="staff-item">
          <div className="staff-info">
            <div className="staff-avatar-placeholder">MJ</div>
            <div className="staff-details">
              <p className="staff-name">Marcus James</p>
              <p className="staff-role">Kasir • PIN: ****</p>
            </div>
          </div>
          <button className="btn-icon" title="Edit Staf">
            <span className="material-symbols-outlined">edit</span>
          </button>
        </div>
      </div>

      {/* Pop-up Modal Tambah Staf */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Tambah Staf Baru</h3>
              <button className="btn-close" onClick={handleCloseModal}>
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="modal-body">
              <div className="input-group">
                <label className="input-label">Nama Staf</label>
                <input
                  type="text"
                  className="moka-input"
                  placeholder="Masukkan nama staf"
                  value={nama}
                  onChange={(e) => setNama(e.target.value)}
                  required
                />
              </div>

              <div className="input-group">
                <label className="input-label">PIN / Password</label>
                <input
                  type="password"
                  className="moka-input"
                  placeholder="Masukkan PIN / Password"
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  required
                />
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={handleCloseModal}
                >
                  Batal
                </button>
                <button type="submit" className="btn-primary">
                  Simpan Staf
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}