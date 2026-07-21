import React, { useState } from 'react';

export default function MokaLogin({ onLoginSuccess }) {
  const [userId, setUserId] = useState('');
  const [pin, setPin] = useState('');
  const [isBouncing, setIsBouncing] = useState(false);
  const maxPinLength = 4;

  const handleKeyPress = (val) => {
    if (pin.length < maxPinLength) {
      setPin((prev) => prev + val);
      triggerBounce();
    }
  };

  const handleBackspace = () => {
    setPin((prev) => prev.slice(0, -1));
  };

  const triggerBounce = () => {
    setIsBouncing(true);
    setTimeout(() => setIsBouncing(false), 150);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    if (!userId.trim() || pin.length !== maxPinLength) {
      alert('Harap masukkan ID staf dan PIN 4 digit!');
      return;
    }

    onLoginSuccess?.();
  };

  return (
    <div className="flex w-full min-h-screen items-center justify-center bg-[#FAF9F6] text-[#1A1C1A] antialiased relative overflow-hidden p-4">
      {/* Background Image dengan Overlay */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?q=80&w=1600&auto=format&fit=crop')",
        }}
      >
        <div className="absolute inset-0 bg-[#FAF9F6]/80 backdrop-blur-md"></div>
      </div>

      {/* Card Form Login */}
      <main className="relative z-10 w-full max-w-[440px]">
        <div className="bg-white/90 backdrop-blur-lg shadow-2xl rounded-3xl border border-gray-200/60 p-6 sm:p-8 w-full flex flex-col items-center">
          
          {/* Header Brand */}
          <div className="text-center mb-6">
            <div className="flex items-center justify-center gap-2 mb-1 text-[#33210D]">
              <span className="material-symbols-outlined text-[38px]">coffee_maker</span>
              <h1 className="text-3xl font-bold font-serif-custom tracking-tight text-[#33210D]">Moka Cafe</h1>
            </div>
            <p className="text-sm font-medium text-gray-600">Masuk Staf (ID & PIN)</p>
          </div>

          {/* Form Login */}
          <form onSubmit={handleLogin} className="w-full">
            {/* Input ID Pengguna */}
            <div className="mb-4 w-full">
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5" htmlFor="userId">
                ID Staf / Username
              </label>
              <div className="relative flex items-center">
                <div className="absolute left-3.5 text-gray-400 flex items-center justify-center pointer-events-none">
                  <span className="material-symbols-outlined text-[22px]">person</span>
                </div>
                <input
                  id="userId"
                  type="text"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  placeholder="Masukkan ID Staf"
                  className="w-full bg-gray-50 border border-gray-300 focus:border-[#33210D] focus:ring-1 focus:ring-[#33210D] rounded-xl pl-11 pr-4 py-2.5 text-sm text-gray-900 transition-colors duration-200 outline-none"
                />
              </div>
            </div>

            {/* Display PIN Password */}
            <div className="mb-5 w-full">
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5" htmlFor="pinDisplay">
                PIN Keamanan (4 Digit)
              </label>
              <div className="relative flex items-center">
                <div className="absolute left-3.5 text-gray-400 flex items-center justify-center pointer-events-none">
                  <span className="material-symbols-outlined text-[22px]">lock</span>
                </div>
                <input
                  id="pinDisplay"
                  type="password"
                  value={pin}
                  readOnly
                  placeholder="••••"
                  className={`w-full bg-gray-100 border-b-2 border-gray-300 focus:border-[#33210D] pl-11 pr-4 py-2.5 text-center font-bold text-2xl text-[#33210D] tracking-[0.4em] transition-all duration-150 outline-none rounded-t-xl ${
                    isBouncing ? 'scale-[1.02] border-[#33210D]' : ''
                  }`}
                />
              </div>
            </div>

            {/* Keypad Angka */}
            <div className="grid grid-cols-3 gap-2.5 mb-6">
              {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => handleKeyPress(num)}
                  className="bg-white shadow-sm border border-gray-200 rounded-xl py-2.5 font-serif-custom text-xl font-bold text-gray-800 hover:bg-gray-100 active:bg-gray-200 active:scale-95 transition-all duration-150 flex items-center justify-center cursor-pointer"
                >
                  {num}
                </button>
              ))}

              <button
                type="button"
                onClick={handleBackspace}
                className="bg-gray-100 hover:bg-red-50 hover:text-red-600 rounded-xl py-2.5 text-gray-600 active:scale-95 transition-all flex items-center justify-center cursor-pointer"
                title="Hapus"
              >
                <span className="material-symbols-outlined text-[24px]">backspace</span>
              </button>

              <button
                type="button"
                onClick={() => handleKeyPress('0')}
                className="bg-white shadow-sm border border-gray-200 rounded-xl py-2.5 font-serif-custom text-xl font-bold text-gray-800 hover:bg-gray-100 active:bg-gray-200 active:scale-95 transition-all duration-150 flex items-center justify-center cursor-pointer"
              >
                0
              </button>

              <div className="flex items-center justify-center">
                {pin && (
                  <button
                    type="button"
                    onClick={() => setPin('')}
                    className="text-xs text-red-500 font-semibold hover:underline"
                  >
                    Reset
                  </button>
                )}
              </div>
            </div>

            {/* Tombol Masuk */}
            <button
              type="submit"
              className="w-full bg-[#33210D] text-white font-semibold py-3 rounded-xl shadow-md hover:bg-[#4b3621] active:scale-[0.98] transition-all duration-200 flex justify-center items-center gap-2 cursor-pointer"
            >
              <span>Masuk Sistem</span>
              <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
            </button>
          </form>

          {/* Footer Link */}
          <div className="mt-5 flex justify-between w-full text-xs font-medium text-gray-500">
            <a href="#" className="hover:text-[#33210D] transition-colors">
              Lupa PIN?
            </a>
            <a href="#" className="hover:text-[#33210D] transition-colors flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px]">help</span>
              Bantuan
            </a>
          </div>
        </div>

        {/* Status Terminal */}
        <div className="mt-4 text-center flex items-center justify-center gap-2 text-xs font-medium text-gray-600">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>Sistem Daring • Terminal 01</span>
        </div>
      </main>
    </div>
  );
}