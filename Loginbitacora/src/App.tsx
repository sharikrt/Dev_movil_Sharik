import { useState, useEffect } from "react";

interface Particle {
  id: number;
  left: number;
  delay: number;
  duration: number;
  size: number;
}

function useParticles(count: number) {
  const [particles, setParticles] = useState<Particle[]>([]);
  useEffect(() => {
    setParticles(
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 12,
        duration: 10 + Math.random() * 14,
        size: Math.random() > 0.7 ? 3 : 2,
      }))
    );
  }, [count]);
  return particles;
}

export default function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const particles = useParticles(28);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => setLoading(false), 2200);
  }

  return (
    <div
      className="relative min-h-screen w-full overflow-hidden flex items-center justify-center"
      style={{
        background:
          "radial-gradient(ellipse 80% 60% at 50% 0%, #1a2240 0%, #0b0e1a 60%)",
      }}
    >
      {/* Particles */}
      {particles.map((p) => (
        <span
          key={p.id}
          className="particle"
          style={{
            left: `${p.left}%`,
            bottom: "-4px",
            width: p.size,
            height: p.size,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
          }}
        />
      ))}

      {/* Grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(201,168,76,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(201,168,76,0.04) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Ambient glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none"
        style={{
          width: 600,
          height: 600,
          marginTop: -300,
          background:
            "radial-gradient(circle, rgba(201,168,76,0.07) 0%, transparent 70%)",
        }}
      />

      {/* Book scene — perspective wrapper */}
      <div className="book-scene w-full max-w-md px-4" style={{ zIndex: 10 }}>
        {/* The card animates open like a book */}
        <div className="book-card">
          {/* Gold top rule */}
          <div
            className="h-px w-full"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(201,168,76,0.7), transparent)",
            }}
          />

          <div
            className="rounded-b-lg overflow-hidden"
            style={{
              background: "linear-gradient(160deg, #141a2e 0%, #0f1320 100%)",
              border: "1px solid rgba(201,168,76,0.12)",
              borderTop: "none",
              boxShadow:
                "0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(201,168,76,0.06) inset",
            }}
          >
            {/* Header */}
            <div className="px-10 pt-10 pb-8 text-center">
              <div className="flex justify-center mb-6">
                <div className="book-logo" style={{ perspective: "300px" }}>
                  {/* Left cover */}
                  <div className="book-logo-cover-left" />
                  {/* Right cover */}
                  <div className="book-logo-cover-right" />
                  {/* Spine */}
                  <div className="book-logo-spine" />
                  {/* Pages turning — rendered inside preserve-3d context */}
                  {[0, 1, 2].map((i) => (
                    <div key={i} className="book-logo-page" style={{ transformStyle: "preserve-3d" }}>
                      <div className="book-logo-page-inner">
                        <span style={{ width: "80%" }} />
                        <span style={{ width: "60%" }} />
                        <span style={{ width: "70%" }} />
                        <span style={{ width: "50%" }} />
                        <span style={{ width: "65%" }} />
                      </div>
                      <div className="book-logo-page-back" />
                    </div>
                  ))}
                </div>
              </div>

              <h1
                className="font-serif text-4xl font-light tracking-wide mb-1 shimmer-text"
                style={{ fontFamily: "'Fraunces', serif" }}
              >
                Bitácora
              </h1>
              <p
                className="text-xs tracking-[0.25em] uppercase"
                style={{
                  color: "rgba(201,168,76,0.5)",
                  fontFamily: "'Outfit', sans-serif",
                  fontWeight: 300,
                }}
              >
                Portal Académico
              </p>
              <div className="mt-4 flex items-center gap-3">
                <div className="flex-1 h-px" style={{ background: "rgba(201,168,76,0.15)" }} />
                <span className="text-xs" style={{ color: "rgba(201,168,76,0.3)" }}>✦</span>
                <div className="flex-1 h-px" style={{ background: "rgba(201,168,76,0.15)" }} />
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="px-10 pb-10 space-y-5">
              {/* Email */}
              <div
                className="animate-fade-in-up"
                style={{ animationDelay: "0.9s" }}
              >
                <label
                  className="block text-xs tracking-widest uppercase mb-2"
                  style={{ color: "rgba(201,168,76,0.55)", fontWeight: 500 }}
                >
                  Correo institucional
                </label>
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => setFocused("email")}
                    onBlur={() => setFocused(null)}
                    placeholder="nombre@universidad.edu"
                    required
                    className="input-glow w-full rounded px-4 py-3 text-sm outline-none transition-all duration-300"
                    style={{
                      background:
                        focused === "email"
                          ? "rgba(201,168,76,0.06)"
                          : "rgba(255,255,255,0.03)",
                      border: `1px solid ${focused === "email" ? "rgba(201,168,76,0.4)" : "rgba(201,168,76,0.15)"}`,
                      color: "#e8e4d9",
                      fontFamily: "'Outfit', sans-serif",
                      caretColor: "#c9a84c",
                    }}
                  />
                  <svg
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 transition-opacity duration-300"
                    style={{ opacity: focused === "email" ? 0.7 : 0.3 }}
                    fill="none" viewBox="0 0 24 24" stroke="#c9a84c" strokeWidth="1.5"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round"
                      d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                </div>
              </div>

              {/* Password */}
              <div
                className="animate-fade-in-up"
                style={{ animationDelay: "1.05s" }}
              >
                <label
                  className="block text-xs tracking-widest uppercase mb-2"
                  style={{ color: "rgba(201,168,76,0.55)", fontWeight: 500 }}
                >
                  Contraseña
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={() => setFocused("password")}
                    onBlur={() => setFocused(null)}
                    placeholder="••••••••••"
                    required
                    className="input-glow w-full rounded px-4 py-3 text-sm outline-none transition-all duration-300 pr-10"
                    style={{
                      background:
                        focused === "password"
                          ? "rgba(201,168,76,0.06)"
                          : "rgba(255,255,255,0.03)",
                      border: `1px solid ${focused === "password" ? "rgba(201,168,76,0.4)" : "rgba(201,168,76,0.15)"}`,
                      color: "#e8e4d9",
                      fontFamily: "'Outfit', sans-serif",
                      caretColor: "#c9a84c",
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 transition-opacity duration-200"
                    style={{ opacity: focused === "password" ? 0.7 : 0.3, color: "#c9a84c" }}
                    tabIndex={-1}
                  >
                    {showPassword ? (
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                        <path strokeLinecap="round" strokeLinejoin="round"
                          d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                      </svg>
                    ) : (
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                        <path strokeLinecap="round" strokeLinejoin="round"
                          d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    )}
                  </button>
                </div>
                <div className="flex justify-end mt-1.5">
                  <a
                    href="#"
                    className="text-xs transition-colors duration-200"
                    style={{ color: "rgba(201,168,76,0.45)" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(201,168,76,0.8)")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(201,168,76,0.45)")}
                  >
                    ¿Olvidaste tu contraseña?
                  </a>
                </div>
              </div>

              {/* Submit */}
              <div
                className="animate-fade-in-up pt-2"
                style={{ animationDelay: "1.2s" }}
              >
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary w-full py-3.5 rounded text-sm font-semibold tracking-widest uppercase transition-all duration-300"
                  style={{
                    background: loading
                      ? "rgba(201,168,76,0.4)"
                      : "linear-gradient(135deg, #c9a84c 0%, #a07030 100%)",
                    color: "#0b0e1a",
                    fontFamily: "'Outfit', sans-serif",
                    letterSpacing: "0.15em",
                    cursor: loading ? "not-allowed" : "pointer",
                  }}
                  onMouseEnter={(e) => {
                    if (!loading) e.currentTarget.style.transform = "translateY(-1px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="10" stroke="rgba(11,14,26,0.3)" strokeWidth="3" />
                        <path d="M12 2a10 10 0 0110 10" stroke="#0b0e1a" strokeWidth="3" strokeLinecap="round" />
                      </svg>
                      Verificando...
                    </span>
                  ) : (
                    "Ingresar al portal"
                  )}
                </button>
              </div>

              {/* Divider */}
              <div
                className="flex items-center gap-3 animate-fade-in-up"
                style={{ animationDelay: "1.3s" }}
              >
                <div className="flex-1 h-px" style={{ background: "rgba(201,168,76,0.1)" }} />
                <span
                  className="text-xs"
                  style={{ color: "rgba(201,168,76,0.25)", letterSpacing: "0.1em" }}
                >
                  o continúa con
                </span>
                <div className="flex-1 h-px" style={{ background: "rgba(201,168,76,0.1)" }} />
              </div>

              {/* SSO */}
              <div
                className="animate-fade-in-up"
                style={{ animationDelay: "1.4s" }}
              >
                <button
                  type="button"
                  className="w-full py-3 rounded text-sm font-medium tracking-wide flex items-center justify-center gap-2.5 transition-all duration-300"
                  style={{
                    background: "rgba(255,255,255,0.02)",
                    border: "1px solid rgba(201,168,76,0.15)",
                    color: "rgba(232,228,217,0.7)",
                    fontFamily: "'Outfit', sans-serif",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(201,168,76,0.05)";
                    e.currentTarget.style.borderColor = "rgba(201,168,76,0.35)";
                    e.currentTarget.style.color = "#e8e4d9";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(255,255,255,0.02)";
                    e.currentTarget.style.borderColor = "rgba(201,168,76,0.15)";
                    e.currentTarget.style.color = "rgba(232,228,217,0.7)";
                  }}
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
                    <rect x="2" y="2" width="9" height="9" rx="1.5" fill="rgba(201,168,76,0.6)" />
                    <rect x="13" y="2" width="9" height="9" rx="1.5" fill="rgba(201,168,76,0.4)" />
                    <rect x="2" y="13" width="9" height="9" rx="1.5" fill="rgba(201,168,76,0.4)" />
                    <rect x="13" y="13" width="9" height="9" rx="1.5" fill="rgba(201,168,76,0.2)" />
                  </svg>
                  Acceso institucional (SSO)
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Footer note */}
        <div
          className="text-center mt-4 animate-fade-in"
          style={{ animationDelay: "1.5s" }}
        >
          <p className="text-xs" style={{ color: "rgba(201,168,76,0.25)", letterSpacing: "0.05em" }}>
            ¿Problemas para acceder?{" "}
            <a
              href="#"
              className="transition-colors duration-200"
              style={{ color: "rgba(201,168,76,0.45)" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(201,168,76,0.8)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(201,168,76,0.45)")}
            >
              Contactar soporte
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
