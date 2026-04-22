"use client";

import { useState, useEffect, useRef } from "react";

// ─── Fake Data ────────────────────────────────────────────────────────────────

const REVENUE_DATA = [
  { month: "Jul", value: 38400 },
  { month: "Aug", value: 52100 },
  { month: "Sep", value: 47800 },
  { month: "Oct", value: 61200 },
  { month: "Nov", value: 55900 },
  { month: "Dec", value: 74300 },
  { month: "Jan", value: 68500 },
  { month: "Feb", value: 82100 },
  { month: "Mar", value: 79400 },
  { month: "Apr", value: 91700 },
  { month: "May", value: 88200 },
  { month: "Jun", value: 103400 },
];

const TRAFFIC_DATA = [
  { day: "Mon", sessions: 2840, bounce: 38 },
  { day: "Tue", sessions: 3120, bounce: 42 },
  { day: "Wed", sessions: 2950, bounce: 35 },
  { day: "Thu", sessions: 3680, bounce: 29 },
  { day: "Fri", sessions: 4120, bounce: 33 },
  { day: "Sat", sessions: 2400, bounce: 51 },
  { day: "Sun", sessions: 1980, bounce: 58 },
];

const RECENT_TRANSACTIONS = [
  { id: "TXN-8821", user: "Mariko Tanaka", amount: 4200, status: "paid", product: "Enterprise Plan", avatar: "MT" },
  { id: "TXN-8820", user: "Lorenzo Esposito", amount: 890, status: "paid", product: "Pro Plan", avatar: "LE" },
  { id: "TXN-8819", user: "Aisha Okonkwo", amount: 12500, status: "pending", product: "Custom Build", avatar: "AO" },
  { id: "TXN-8818", user: "Chen Wei", amount: 240, status: "paid", product: "Starter Plan", avatar: "CW" },
  { id: "TXN-8817", user: "Priya Nair", amount: 4200, status: "failed", product: "Enterprise Plan", avatar: "PN" },
  { id: "TXN-8816", user: "James Okafor", amount: 890, status: "paid", product: "Pro Plan", avatar: "JO" },
];

const TOP_PAGES = [
  { path: "/dashboard", views: 14820, change: 12 },
  { path: "/products", views: 9340, change: -4 },
  { path: "/pricing", views: 7210, change: 28 },
  { path: "/blog/ai-trends", views: 5890, change: 64 },
  { path: "/docs/api", views: 4120, change: 9 },
];

const NAV_ITEMS = [
  { icon: "◈", label: "Overview", id: "overview" },
  { icon: "◫", label: "Analytics", id: "analytics" },
  { icon: "◎", label: "Revenue", id: "revenue" },
  { icon: "◷", label: "Customers", id: "customers" },
  { icon: "◉", label: "Products", id: "products" },
  { icon: "◌", label: "Settings", id: "settings" },
];

// ─── Sparkline Chart ──────────────────────────────────────────────────────────

function Sparkline({ data, color = "#e8ff5a", height = 48 }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const w = 120;
  const h = height;
  const pad = 2;

  const points = data
    .map((v, i) => {
      const x = pad + (i / (data.length - 1)) * (w - pad * 2);
      const y = h - pad - ((v - min) / range) * (h - pad * 2);
      return `${x},${y}`;
    })
    .join(" ");

  const area = `M${pad},${h} ` + data
    .map((v, i) => {
      const x = pad + (i / (data.length - 1)) * (w - pad * 2);
      const y = h - pad - ((v - min) / range) * (h - pad * 2);
      return `L${x},${y}`;
    })
    .join(" ") + ` L${w - pad},${h} Z`;

  return (
    <svg width={w} height={h} style={{ overflow: "visible" }}>
      <defs>
        <linearGradient id={`grad-${color.replace("#", "")}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill={`url(#grad-${color.replace("#", "")})`} />
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// ─── Revenue Bar Chart ────────────────────────────────────────────────────────

function RevenueChart({ data }) {
  const [hovered, setHovered] = useState(null);
  const max = Math.max(...data.map((d) => d.value));

  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: "6px", height: "140px", paddingTop: "16px" }}>
      {data.map((d, i) => {
        const pct = (d.value / max) * 100;
        const isHov = hovered === i;
        return (
          <div
            key={d.month}
            style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "6px", cursor: "pointer" }}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
          >
            {isHov && (
              <div style={{
                fontSize: "10px", fontFamily: "'DM Mono', monospace", color: "#e8ff5a",
                background: "rgba(232,255,90,0.1)", border: "1px solid rgba(232,255,90,0.3)",
                padding: "2px 5px", borderRadius: "4px", whiteSpace: "nowrap",
                position: "absolute", transform: "translateY(-32px)",
              }}>
                ${(d.value / 1000).toFixed(1)}k
              </div>
            )}
            <div
              style={{
                width: "100%", borderRadius: "4px 4px 0 0",
                height: `${pct}%`,
                background: isHov
                  ? "linear-gradient(to top, #e8ff5a, #b8ff00)"
                  : "linear-gradient(to top, rgba(232,255,90,0.5), rgba(232,255,90,0.2))",
                transition: "all 0.2s ease",
                position: "relative",
              }}
            />
            <span style={{ fontSize: "10px", color: isHov ? "#e8ff5a" : "#555", fontFamily: "'DM Mono', monospace" }}>
              {d.month}
            </span>
          </div>
        );
      })}
    </div>
  );
}

// ─── Traffic Bar Chart ────────────────────────────────────────────────────────

function TrafficChart({ data }) {
  const maxSessions = Math.max(...data.map((d) => d.sessions));

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      {data.map((d) => (
        <div key={d.day} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={{ width: "28px", fontSize: "11px", color: "#555", fontFamily: "'DM Mono', monospace" }}>
            {d.day}
          </span>
          <div style={{ flex: 1, height: "10px", background: "rgba(255,255,255,0.04)", borderRadius: "99px", overflow: "hidden" }}>
            <div
              style={{
                width: `${(d.sessions / maxSessions) * 100}%`,
                height: "100%",
                background: "linear-gradient(to right, #e8ff5a80, #e8ff5a)",
                borderRadius: "99px",
                transition: "width 0.8s cubic-bezier(0.16,1,0.3,1)",
              }}
            />
          </div>
          <span style={{ width: "36px", textAlign: "right", fontSize: "11px", color: "#888", fontFamily: "'DM Mono', monospace" }}>
            {(d.sessions / 1000).toFixed(1)}k
          </span>
        </div>
      ))}
    </div>
  );
}

// ─── Donut Chart ──────────────────────────────────────────────────────────────

function DonutChart() {
  const segments = [
    { label: "Organic", pct: 38, color: "#e8ff5a" },
    { label: "Paid", pct: 27, color: "#5affb0" },
    { label: "Referral", pct: 20, color: "#5ab4ff" },
    { label: "Direct", pct: 15, color: "#ff8c5a" },
  ];

  const r = 40;
  const cx = 60;
  const cy = 60;
  const circumference = 2 * Math.PI * r;
  let offset = 0;

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
      <svg width="120" height="120">
        {segments.map((seg, i) => {
          const dash = (seg.pct / 100) * circumference;
          const gap = circumference - dash;
          const el = (
            <circle
              key={i}
              cx={cx} cy={cy} r={r}
              fill="none"
              stroke={seg.color}
              strokeWidth="14"
              strokeDasharray={`${dash} ${gap}`}
              strokeDashoffset={-(offset / 100) * circumference + circumference / 4}
              style={{ transition: "all 0.3s ease" }}
            />
          );
          offset += seg.pct;
          return el;
        })}
        <text x={cx} y={cy - 6} textAnchor="middle" fill="#fff" fontSize="14" fontWeight="700" fontFamily="'DM Mono', monospace">
          100%
        </text>
        <text x={cx} y={cy + 10} textAnchor="middle" fill="#555" fontSize="9" fontFamily="'DM Mono', monospace">
          Traffic
        </text>
      </svg>
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        {segments.map((seg) => (
          <div key={seg.label} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div style={{ width: "8px", height: "8px", borderRadius: "2px", background: seg.color, flexShrink: 0 }} />
            <span style={{ fontSize: "11px", color: "#888", fontFamily: "'DM Mono', monospace" }}>{seg.label}</span>
            <span style={{ fontSize: "11px", color: "#ccc", fontFamily: "'DM Mono', monospace", marginLeft: "auto" }}>{seg.pct}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Stat Card ────────────────────────────────────────────────────────────────

function StatCard({ label, value, change, data, color }) {
  const positive = change >= 0;
  return (
    <div style={{
      background: "rgba(255,255,255,0.025)",
      border: "1px solid rgba(255,255,255,0.07)",
      borderRadius: "16px",
      padding: "20px 22px",
      display: "flex",
      flexDirection: "column",
      gap: "10px",
      backdropFilter: "blur(12px)",
      position: "relative",
      overflow: "hidden",
      transition: "border-color 0.2s",
    }}
      onMouseEnter={(e) => e.currentTarget.style.borderColor = "rgba(232,255,90,0.2)"}
      onMouseLeave={(e) => e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <p style={{ margin: 0, fontSize: "11px", color: "#555", letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: "'DM Mono', monospace" }}>
            {label}
          </p>
          <p style={{ margin: "6px 0 0", fontSize: "26px", fontWeight: "800", color: "#fff", fontFamily: "'Syne', sans-serif", letterSpacing: "-0.02em" }}>
            {value}
          </p>
        </div>
        <div style={{ opacity: 0.8 }}>
          <Sparkline data={data} color={color} />
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
        <span style={{
          fontSize: "12px", fontFamily: "'DM Mono', monospace",
          color: positive ? "#5affb0" : "#ff5a7a",
          background: positive ? "rgba(90,255,176,0.1)" : "rgba(255,90,122,0.1)",
          padding: "2px 8px", borderRadius: "99px",
        }}>
          {positive ? "+" : ""}{change}%
        </span>
        <span style={{ fontSize: "11px", color: "#444", fontFamily: "'DM Mono', monospace" }}>vs last month</span>
      </div>
    </div>
  );
}

// ─── Main Dashboard ───────────────────────────────────────────────────────────

export default function Dashboard() {
  const [activeNav, setActiveNav] = useState("overview");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [searchQuery, setSearchQuery] = useState("");
  const [notifOpen, setNotifOpen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (d) =>
    d.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false });

  const formatDate = (d) =>
    d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });

  const statCards = [
    {
      label: "Total Revenue",
      value: "$103.4k",
      change: 17.2,
      color: "#e8ff5a",
      data: REVENUE_DATA.map((d) => d.value),
    },
    {
      label: "Active Users",
      value: "24,812",
      change: 8.4,
      color: "#5affb0",
      data: [180, 210, 195, 240, 228, 265, 248],
    },
    {
      label: "Conversions",
      value: "3.68%",
      change: -1.2,
      color: "#5ab4ff",
      data: [3.9, 4.1, 3.8, 3.5, 3.7, 3.6, 3.7],
    },
    {
      label: "Avg. Order",
      value: "$284",
      change: 5.9,
      color: "#ff8c5a",
      data: [240, 260, 255, 270, 265, 280, 284],
    },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Mono:wght@300;400;500&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        body {
          background: #080808;
          color: #e0e0e0;
          font-family: 'DM Mono', monospace;
          min-height: 100vh;
        }

        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #222; border-radius: 99px; }

        input::placeholder { color: #333; }
        input:focus { outline: none; }

        .nav-item {
          display: flex; align-items: center; gap: 12px;
          padding: 10px 14px; border-radius: 10px;
          cursor: pointer; transition: all 0.15s ease;
          border: 1px solid transparent;
          white-space: nowrap; overflow: hidden;
          font-family: 'DM Mono', monospace;
          font-size: 13px; color: #555;
          text-decoration: none;
        }
        .nav-item:hover { background: rgba(255,255,255,0.04); color: #aaa; }
        .nav-item.active {
          background: rgba(232,255,90,0.08);
          border-color: rgba(232,255,90,0.15);
          color: #e8ff5a;
        }

        .card {
          background: rgba(255,255,255,0.025);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 16px;
          backdrop-filter: blur(12px);
          transition: border-color 0.2s;
        }
        .card:hover { border-color: rgba(255,255,255,0.12); }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .fade-up { animation: fadeUp 0.4s cubic-bezier(0.16,1,0.3,1) both; }

        @keyframes pulse {
          0%, 100% { opacity: 1; } 50% { opacity: 0.4; }
        }
        .pulse { animation: pulse 2s ease infinite; }
      `}</style>

      <div style={{ display: "flex", height: "100vh", overflow: "hidden", background: "#080808" }}>

        {/* ── Sidebar ── */}
        <aside style={{
          width: sidebarCollapsed ? "64px" : "220px",
          flexShrink: 0,
          borderRight: "1px solid rgba(255,255,255,0.06)",
          display: "flex",
          flexDirection: "column",
          padding: "20px 12px",
          gap: "4px",
          transition: "width 0.3s cubic-bezier(0.16,1,0.3,1)",
          overflow: "hidden",
          background: "rgba(0,0,0,0.4)",
          backdropFilter: "blur(20px)",
        }}>
          {/* Logo */}
          <div style={{
            display: "flex", alignItems: "center", gap: "10px",
            padding: "8px 4px 20px", borderBottom: "1px solid rgba(255,255,255,0.06)", marginBottom: "8px"
          }}>
            <div style={{
              width: "32px", height: "32px", borderRadius: "8px", flexShrink: 0,
              background: "linear-gradient(135deg, #e8ff5a, #5affb0)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "14px", fontWeight: "800", color: "#000",
              fontFamily: "'Syne', sans-serif",
            }}>N</div>
            {!sidebarCollapsed && (
              <span style={{ fontSize: "16px", fontWeight: "700", color: "#fff", fontFamily: "'Syne', sans-serif", letterSpacing: "-0.02em" }}>
                Nexus
              </span>
            )}
          </div>

          {/* Nav */}
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              className={`nav-item ${activeNav === item.id ? "active" : ""}`}
              onClick={() => setActiveNav(item.id)}
              style={{ background: "none", border: activeNav === item.id ? "1px solid rgba(232,255,90,0.15)" : "1px solid transparent" }}
            >
              <span style={{ fontSize: "16px", flexShrink: 0 }}>{item.icon}</span>
              {!sidebarCollapsed && item.label}
            </button>
          ))}

          <div style={{ flex: 1 }} />

          {/* User */}
          <div style={{
            display: "flex", alignItems: "center", gap: "10px",
            padding: "10px 6px", borderTop: "1px solid rgba(255,255,255,0.06)",
            paddingTop: "16px", marginTop: "4px", overflow: "hidden",
          }}>
            <div style={{
              width: "30px", height: "30px", borderRadius: "8px", flexShrink: 0,
              background: "linear-gradient(135deg, #5ab4ff, #5affb0)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "11px", fontWeight: "700", color: "#000", fontFamily: "'Syne', sans-serif",
            }}>KM</div>
            {!sidebarCollapsed && (
              <div style={{ overflow: "hidden" }}>
                <p style={{ fontSize: "12px", color: "#ccc", fontWeight: "500", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  Kenji Mori
                </p>
                <p style={{ fontSize: "10px", color: "#444" }}>Admin</p>
              </div>
            )}
          </div>
        </aside>

        {/* ── Main ── */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>

          {/* ── Topbar ── */}
          <header style={{
            height: "60px", borderBottom: "1px solid rgba(255,255,255,0.06)",
            display: "flex", alignItems: "center", gap: "16px",
            padding: "0 24px", flexShrink: 0,
            background: "rgba(0,0,0,0.3)", backdropFilter: "blur(20px)",
          }}>
            <button
              onClick={() => setSidebarCollapsed((v) => !v)}
              style={{ background: "none", border: "none", cursor: "pointer", color: "#555", fontSize: "18px", padding: "4px" }}
            >
              ☰
            </button>

            {/* Search */}
            <div style={{
              flex: 1, maxWidth: "380px",
              display: "flex", alignItems: "center", gap: "10px",
              background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: "10px", padding: "0 14px", height: "36px",
            }}>
              <span style={{ color: "#444", fontSize: "14px" }}>⌕</span>
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search anything..."
                style={{
                  background: "none", border: "none", color: "#aaa",
                  fontSize: "13px", fontFamily: "'DM Mono', monospace", width: "100%",
                }}
              />
              <kbd style={{ fontSize: "10px", color: "#333", background: "rgba(255,255,255,0.05)", padding: "2px 6px", borderRadius: "4px" }}>⌘K</kbd>
            </div>

            <div style={{ flex: 1 }} />

            {/* Clock */}
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: "13px", color: "#ccc", fontFamily: "'DM Mono', monospace" }}>
                {formatTime(currentTime)}
              </div>
              <div style={{ fontSize: "10px", color: "#444", fontFamily: "'DM Mono', monospace" }}>
                {formatDate(currentTime)}
              </div>
            </div>

            {/* Notif */}
            <div style={{ position: "relative" }}>
              <button
                onClick={() => setNotifOpen((v) => !v)}
                style={{
                  background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)",
                  borderRadius: "10px", width: "36px", height: "36px",
                  cursor: "pointer", color: "#888", fontSize: "15px",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  position: "relative",
                }}
              >
                🔔
                <span className="pulse" style={{
                  position: "absolute", top: "6px", right: "6px",
                  width: "6px", height: "6px", borderRadius: "50%",
                  background: "#e8ff5a",
                }} />
              </button>
              {notifOpen && (
                <div className="card" style={{
                  position: "absolute", right: 0, top: "44px", width: "280px",
                  padding: "16px", zIndex: 100,
                }}>
                  <p style={{ fontSize: "12px", color: "#e8ff5a", marginBottom: "12px", fontWeight: "600" }}>Notifications</p>
                  {[
                    { msg: "New enterprise signup: Acme Corp", time: "2m ago" },
                    { msg: "Monthly report generated", time: "1h ago" },
                    { msg: "Server usage above 80%", time: "3h ago" },
                  ].map((n, i) => (
                    <div key={i} style={{ padding: "8px 0", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                      <p style={{ fontSize: "12px", color: "#ccc" }}>{n.msg}</p>
                      <p style={{ fontSize: "10px", color: "#444", marginTop: "2px" }}>{n.time}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </header>

          {/* ── Content ── */}
          <main style={{ flex: 1, overflow: "auto", padding: "28px 28px" }}>

            {/* Page Header */}
            <div className="fade-up" style={{ marginBottom: "28px", animationDelay: "0ms" }}>
              <h1 style={{ fontSize: "24px", fontWeight: "800", fontFamily: "'Syne', sans-serif", color: "#fff", letterSpacing: "-0.03em" }}>
                Overview
              </h1>
              <p style={{ fontSize: "12px", color: "#444", marginTop: "4px" }}>
                Fiscal year · Jun 2024 – Jun 2025
              </p>
            </div>

            {/* Stat Cards */}
            <div className="fade-up" style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "16px", marginBottom: "24px",
              animationDelay: "60ms",
            }}>
              {statCards.map((card) => (
                <StatCard key={card.label} {...card} />
              ))}
            </div>

            {/* Middle Row */}
            <div className="fade-up" style={{
              display: "grid",
              gridTemplateColumns: "2fr 1fr",
              gap: "16px", marginBottom: "24px",
              animationDelay: "120ms",
            }}>
              {/* Revenue Chart */}
              <div className="card" style={{ padding: "22px 24px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "4px" }}>
                  <h2 style={{ fontSize: "14px", fontWeight: "700", fontFamily: "'Syne', sans-serif", color: "#fff" }}>
                    Revenue
                  </h2>
                  <div style={{ display: "flex", gap: "6px" }}>
                    {["12M", "6M", "3M"].map((t, i) => (
                      <button key={t} style={{
                        background: i === 0 ? "rgba(232,255,90,0.1)" : "none",
                        border: i === 0 ? "1px solid rgba(232,255,90,0.2)" : "1px solid transparent",
                        color: i === 0 ? "#e8ff5a" : "#444",
                        fontSize: "10px", padding: "3px 8px", borderRadius: "6px",
                        cursor: "pointer", fontFamily: "'DM Mono', monospace",
                      }}>
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
                <p style={{ fontSize: "11px", color: "#444", marginBottom: "4px" }}>Total earnings this year</p>
                <p style={{ fontSize: "28px", fontWeight: "800", fontFamily: "'Syne', sans-serif", color: "#fff", letterSpacing: "-0.03em" }}>
                  $762,500
                  <span style={{ fontSize: "13px", color: "#5affb0", fontFamily: "'DM Mono', monospace", fontWeight: "400", marginLeft: "10px" }}>+24.1%</span>
                </p>
                <RevenueChart data={REVENUE_DATA} />
              </div>

              {/* Traffic Sources */}
              <div className="card" style={{ padding: "22px 24px" }}>
                <h2 style={{ fontSize: "14px", fontWeight: "700", fontFamily: "'Syne', sans-serif", color: "#fff", marginBottom: "4px" }}>
                  Traffic Sources
                </h2>
                <p style={{ fontSize: "11px", color: "#444", marginBottom: "18px" }}>By channel · this month</p>
                <DonutChart />
              </div>
            </div>

            {/* Bottom Row */}
            <div className="fade-up" style={{
              display: "grid",
              gridTemplateColumns: "1.5fr 1fr 1fr",
              gap: "16px",
              animationDelay: "180ms",
            }}>
              {/* Recent Transactions */}
              <div className="card" style={{ padding: "22px 24px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                  <h2 style={{ fontSize: "14px", fontWeight: "700", fontFamily: "'Syne', sans-serif", color: "#fff" }}>
                    Transactions
                  </h2>
                  <button style={{
                    background: "none", border: "none", cursor: "pointer",
                    fontSize: "11px", color: "#e8ff5a", fontFamily: "'DM Mono', monospace",
                  }}>View all →</button>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  {RECENT_TRANSACTIONS.map((tx) => (
                    <div key={tx.id} style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                      <div style={{
                        width: "32px", height: "32px", borderRadius: "8px", flexShrink: 0,
                        background: "rgba(255,255,255,0.06)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: "10px", fontWeight: "700", color: "#ccc", fontFamily: "'Syne', sans-serif",
                      }}>
                        {tx.avatar}
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p style={{ fontSize: "12px", color: "#ccc", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                          {tx.user}
                        </p>
                        <p style={{ fontSize: "10px", color: "#444" }}>{tx.product}</p>
                      </div>
                      <div style={{ textAlign: "right", flexShrink: 0 }}>
                        <p style={{ fontSize: "12px", color: "#fff", fontWeight: "600" }}>
                          ${tx.amount.toLocaleString()}
                        </p>
                        <span style={{
                          fontSize: "9px", padding: "1px 6px", borderRadius: "99px",
                          background:
                            tx.status === "paid" ? "rgba(90,255,176,0.1)" :
                            tx.status === "pending" ? "rgba(232,255,90,0.1)" :
                            "rgba(255,90,122,0.1)",
                          color:
                            tx.status === "paid" ? "#5affb0" :
                            tx.status === "pending" ? "#e8ff5a" :
                            "#ff5a7a",
                          fontFamily: "'DM Mono', monospace",
                        }}>
                          {tx.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Daily Traffic */}
              <div className="card" style={{ padding: "22px 24px" }}>
                <h2 style={{ fontSize: "14px", fontWeight: "700", fontFamily: "'Syne', sans-serif", color: "#fff", marginBottom: "4px" }}>
                  Daily Traffic
                </h2>
                <p style={{ fontSize: "11px", color: "#444", marginBottom: "16px" }}>Sessions this week</p>
                <TrafficChart data={TRAFFIC_DATA} />
              </div>

              {/* Top Pages */}
              <div className="card" style={{ padding: "22px 24px" }}>
                <h2 style={{ fontSize: "14px", fontWeight: "700", fontFamily: "'Syne', sans-serif", color: "#fff", marginBottom: "16px" }}>
                  Top Pages
                </h2>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  {TOP_PAGES.map((page, i) => (
                    <div key={page.path} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <span style={{ fontSize: "10px", color: "#333", fontFamily: "'DM Mono', monospace", width: "14px" }}>
                        {i + 1}
                      </span>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p style={{ fontSize: "11px", color: "#aaa", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                          {page.path}
                        </p>
                        <p style={{ fontSize: "10px", color: "#444" }}>
                          {page.views.toLocaleString()} views
                        </p>
                      </div>
                      <span style={{
                        fontSize: "10px", fontFamily: "'DM Mono', monospace",
                        color: page.change >= 0 ? "#5affb0" : "#ff5a7a",
                      }}>
                        {page.change >= 0 ? "+" : ""}{page.change}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </main>
        </div>
      </div>
    </>
  );
}