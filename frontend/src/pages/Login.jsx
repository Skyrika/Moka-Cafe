import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import { FaSpinner } from "react-icons/fa";
import "./Login.css";

const Login = () => {
  // Penjelasan: State ini menyimpan input email atau username yang diketik pengguna.
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  // Penjelasan: State ini menyimpan status password yang ditampilkan atau disembunyikan.
  const [showPassword, setShowPassword] = useState(false);
  // Penjelasan: State ini mengontrol tampilan loading saat proses login berjalan.
  const [loading, setLoading] = useState(false);
  // Penjelasan: State ini menyimpan pesan error atau sukses yang akan ditampilkan.
  const [message, setMessage] = useState(null); // { type: 'error'|'success', text }

  // Penjelasan: Mengambil fungsi login dan data user dari context autentikasi.
  const { login, user } = useContext(AuthContext);
  const navigate = useNavigate();

  // Penjelasan: Menjalankan proses saat komponen dirender atau ketika data user berubah.
  useEffect(() => {
    if (user && user.role === "admin") {
      navigate("/admin");
    }
  }, [user, navigate]);

  // Penjelasan: Fungsi ini bertugas memproses login saat form dikirim.
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    setLoading(true);

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: identifier, password }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        login({
          username: data.user?.username || identifier,
          role: data.user?.role || "user",
        });

        setMessage({ type: "success", text: `Selamat datang, ${data.user?.username || identifier}!` });
        setTimeout(() => {
          if (data.user?.role === "admin") navigate("/admin");
          else navigate("/beli");
        }, 600);
      } else {
        setMessage({ type: "error", text: data.message || "Username atau password salah." });
      }
    } catch (err) {
      // log the error and show a friendly message
      /* eslint-disable no-console */
      console.error(err);
      /* eslint-enable no-console */
      setMessage({ type: "error", text: "Tidak dapat terhubung ke server backend." });
    } finally {
      setLoading(false);
    }
  };

  // Penjelasan: Menampilkan struktur halaman login yang modern dan responsif.
  return (
    <div className="login-page">
      <div className="login-container">
        <aside className="illustration" aria-hidden>
          <div className="illustration-card">
            <svg
              viewBox="0 0 200 200"
              xmlns="http://www.w3.org/2000/svg"
              className="coffee-svg"
            >
              <defs>
                <linearGradient id="g" x1="0" x2="1">
                  <stop offset="0%" stopColor="#C49A6C" />
                  <stop offset="100%" stopColor="#8B5E3C" />
                </linearGradient>
              </defs>
              <rect
                width="100%"
                height="100%"
                rx="18"
                fill="url(#g)"
                opacity="0.08"
              />
              <g transform="translate(30,30) scale(1.1)">
                <path
                  d="M60 20c0 0-4-8-18-8s-18 8-18 8c0 0-8 18 18 18h18c26 0 18-18 18-18z"
                  fill="#fff"
                  opacity="0.9"
                />
                <rect
                  x="10"
                  y="40"
                  rx="8"
                  width="90"
                  height="60"
                  fill="#fff"
                  opacity="0.9"
                />
                <circle cx="60" cy="70" r="22" fill="#F4E7D3" />
              </g>
            </svg>
            <h3>Moka Cafe</h3>
            <p>
              Modern POS Dashboard for your cafe — fast, elegant, and reliable.
            </p>
          </div>
        </aside>

        <main className="form-card" role="main">
          <div className="form-inner">
            <div className="brand">
              <div className="logo" aria-hidden>
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="3"
                    y="3"
                    width="18"
                    height="18"
                    rx="6"
                    fill="#8B5E3C"
                  />
                  <path
                    d="M8 14c1-4 7-4 8 0"
                    stroke="#F4E7D3"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <div>
                <h1>Welcome Back</h1>
                <p className="subtitle">
                  Login untuk mengakses Dashboard Moka Cafe
                </p>
              </div>
            </div>

            {message && (
              <div
                className={`alert ${message.type === "error" ? "error" : "success"}`}
                role="alert"
              >
                {message.type === "error" ? "⚠" : "✓"} {message.text}
              </div>
            )}

            <form
              onSubmit={handleSubmit}
              className="login-form"
              aria-label="login form"
            >
              {/* Penjelasan: Input ini menerima username atau email pengguna untuk proses login. */}
              <label htmlFor="identifier" className="sr-only">
                Email atau Username
              </label>
              <div className="input-group">
                <span className="icon">
                  <FiMail />
                </span>
                <input
                  id="identifier"
                  name="identifier"
                  type="text"
                  placeholder="Email atau Username"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  required
                  aria-required="true"
                />
              </div>

              {/* Penjelasan: Input ini menerima password pengguna untuk divalidasi. */}
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <div className="input-group">
                <span className="icon">
                  <FiLock />
                </span>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  aria-required="true"
                />
                <button
                  type="button"
                  className="show-btn"
                  onClick={() => setShowPassword((s) => !s)}
                  aria-label={
                    showPassword ? "Sembunyikan password" : "Tampilkan password"
                  }
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>

              {/* <div className="options">
                <label className="remember">
                  <input
                    type="checkbox"
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                    aria-checked={remember}
                  />
                  Remember me
                </label>
                <a href="#" className="forgot">Forgot password?</a>
              </div> */}

              {/* Penjelasan: Tombol ini mengirim form login dan menampilkan loading saat proses berjalan. */}
              <button className="btn-login" type="submit" disabled={loading}>
                {loading ? <FaSpinner className="spinner" /> : null}
                <span className="btn-text">
                  {loading ? "Logging in..." : "Login"}
                </span>
                <span className="ripple" aria-hidden></span>
              </button>
            </form>

            <footer className="login-footer">© 2026 Moka Cafe</footer>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Login;
