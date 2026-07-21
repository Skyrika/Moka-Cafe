import React from "react";
import "./OperatingHoursCard.css";

export default function OperatingHoursCard() {
  return (
    <section className="card card-span-4">
      {/* Header Card */}
      <div className="card-header">
        <h3 className="card-title">
          <span className="material-symbols-outlined card-icon">schedule</span>
          Jam Operasional
        </h3>
      </div>

      {/* Form Body */}
      <form className="hours-form" onSubmit={(e) => e.preventDefault()}>
        <div className="hours-row">
          <span className="hours-day">Sen - Jum</span>
          <div className="hours-inputs">
            <input className="input-time" type="time" defaultValue="07:00" />
            <span className="time-separator">-</span>
            <input className="input-time" type="time" defaultValue="18:00" />
          </div>
        </div>

        <div className="hours-row">
          <span className="hours-day">Sabtu</span>
          <div className="hours-inputs">
            <input className="input-time" type="time" defaultValue="08:00" />
            <span className="time-separator">-</span>
            <input className="input-time" type="time" defaultValue="16:00" />
          </div>
        </div>

        <div className="hours-row closed">
          <span className="hours-day">Minggu</span>
          <span className="closed-badge">Tutup</span>
        </div>

        <button type="submit" className="btn-outline">
          Simpan Jam
        </button>
      </form>
    </section>
  );
}