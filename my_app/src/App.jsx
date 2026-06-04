import { useState, useEffect, useRef } from "react";

const flavors = [
  {
    id: 1,
    name: "МАНГО",
    ukr: "Тропічний вибух",
    color: "#E8C84A",
    dark: "#A8861A",
    light: "#FFF8D6",
    emoji: "🥭",
    desc: "Соковите манго з Мадагаскару. Енергія сонця в кожному шматочку!",
    dots: "#F0A500",
    tag: "ХІТ"
  },
  {
    id: 2,
    name: "МАЛИНА",
    ukr: "Ягідний буст",
    color: "#E0557A",
    dark: "#A02050",
    light: "#FFE8EF",
    emoji: "🫐",
    desc: "Свіжа малина пряма з поля. Природна сила для переможців!",
    dots: "#C03060",
    tag: "НОВИНКА"
  },
  {
    id: 3,
    name: "КІВІ",
    ukr: "Зелена енергія",
    color: "#7DB840",
    dark: "#3D6A10",
    light: "#EAFADE",
    emoji: "🥝",
    desc: "Вітамін С зашкалює! Ківі із Нової Зеландії для справжніх чемпіонів.",
    dots: "#5A9020",
    tag: "ЕКО"
  }
];

const facts = [
  { icon: "🌿", text: "100% натуральні інгредієнти" },
  { icon: "💪", text: "Без цукру — з фруктозою" },
  { icon: "🏅", text: "Схвалено спортсменами" },
  { icon: "🌍", text: "Фрукти з 3 континентів" },
];

function CrocSVG({ style, animate }) {
  return (
      <svg viewBox="0 0 200 160" style={style} xmlns="http://www.w3.org/2000/svg">
        {/* Body */}
        <ellipse cx="95" cy="100" rx="65" ry="38" fill="#6BBF3E" />
        {/* Belly */}
        <ellipse cx="95" cy="108" rx="45" ry="24" fill="#C8E8A0" />
        {/* Tail */}
        <path d="M155 100 Q185 95 195 108 Q185 115 165 112 Q175 104 155 100Z" fill="#6BBF3E" />
        <path d="M175 107 Q185 103 192 108 Q185 112 178 110Z" fill="#5AA030" />
        {/* Head */}
        <ellipse cx="35" cy="96" rx="32" ry="22" fill="#6BBF3E" />
        {/* Snout */}
        <ellipse cx="14" cy="102" rx="18" ry="10" fill="#5AA030" />
        {/* Nostrils */}
        <circle cx="10" cy="98" r="2.5" fill="#3A7020" />
        <circle cx="18" cy="97" r="2.5" fill="#3A7020" />
        {/* Eye */}
        <circle cx="30" cy="82" r="9" fill="#FFF" />
        <circle cx="31" cy="83" r="5.5" fill="#1A1A00" />
        <circle cx="33" cy="81" r="2" fill="#FFF" />
        {/* Helmet */}
        <ellipse cx="36" cy="76" rx="22" ry="14" fill="#E0557A" />
        <ellipse cx="36" cy="72" rx="22" ry="8" fill="#F07090" />
        <ellipse cx="36" cy="70" rx="10" ry="4" fill="#FF90B0" />
        {/* Strap */}
        <path d="M20 80 Q18 90 22 94" stroke="#C03060" strokeWidth="3" fill="none" />
        <circle cx="22" cy="95" r="3" fill="#C03060" />
        {/* Front legs */}
        <ellipse cx="72" cy="132" rx="12" ry="7" fill="#5AA030" />
        <ellipse cx="118" cy="132" rx="12" ry="7" fill="#5AA030" />
        {/* Rollerblades */}
        <rect x="60" y="134" width="24" height="10" rx="3" fill="#E0557A" />
        <circle cx="65" cy="145" r="4" fill="#1A1A1A" />
        <circle cx="78" cy="145" r="4" fill="#1A1A1A" />
        <rect x="106" y="134" width="24" height="10" rx="3" fill="#E0557A" />
        <circle cx="111" cy="145" r="4" fill="#1A1A1A" />
        <circle cx="124" cy="145" r="4" fill="#1A1A1A" />
        {/* Ice cream in hand */}
        <line x1="58" y1="112" x2="50" y2="75" stroke="#C8A060" strokeWidth="3" strokeLinecap="round" />
        <ellipse cx="50" cy="65" rx="14" ry="16" fill="#E8C84A" />
        <ellipse cx="50" cy="54" rx="11" ry="12" fill="#E0557A" />
        <ellipse cx="50" cy="45" rx="8" ry="9" fill="#7DB840" />
        {/* Tongue teeth smile */}
        <path d="M8 104 Q14 112 22 110 Q18 106 14 108 Q10 110 8 104Z" fill="#FF6080" />
        {/* Teeth */}
        <rect x="9" y="105" width="4" height="5" rx="1" fill="#FFF" />
        <rect x="14" y="104" width="4" height="6" rx="1" fill="#FFF" />
        <rect x="19" y="105" width="4" height="5" rx="1" fill="#FFF" />
        {/* Speed lines */}
        {animate && <>
          <line x1="170" y1="88" x2="200" y2="85" stroke="#FFD700" strokeWidth="2" opacity="0.7" />
          <line x1="172" y1="96" x2="200" y2="95" stroke="#FFD700" strokeWidth="1.5" opacity="0.5" />
          <line x1="168" y1="104" x2="196" y2="106" stroke="#FFD700" strokeWidth="1" opacity="0.4" />
        </>}
      </svg>
  );
}

function Blob({ color, style }) {
  return (
      <svg viewBox="0 0 200 200" style={{ position: "absolute", ...style }} xmlns="http://www.w3.org/2000/svg">
        <path d="M45,-55C58,-42,68,-26,72,-8C76,10,74,30,64,46C54,62,36,74,16,78C-4,82,-26,78,-44,66C-62,54,-76,34,-76,14C-76,-6,-62,-26,-46,-41C-30,-56,-12,-66,7,-67C26,-68,32,-68,45,-55Z"
              transform="translate(100 100)" fill={color} />
      </svg>
  );
}

function StarBurst({ color, x, y, size = 40 }) {
  const pts = Array.from({ length: 12 }, (_, i) => {
    const angle = (i * 30 * Math.PI) / 180;
    const r = i % 2 === 0 ? size : size * 0.5;
    return `${x + r * Math.cos(angle)},${y + r * Math.sin(angle)}`;
  }).join(" ");
  return <polygon points={pts} fill={color} opacity="0.85" />;
}

export default function FitYummy() {
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState(null);
  const [scrollY, setScrollY] = useState(0);
  const [visible, setVisible] = useState({});
  const sectionRefs = useRef({});

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) setVisible((v) => ({ ...v, [e.target.dataset.id]: true }));
          });
        },
        { threshold: 0.15 }
    );
    Object.values(sectionRefs.current).forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const ref = (id) => (el) => {
    sectionRefs.current[id] = el;
    if (el) el.dataset.id = id;
  };

  const fl = flavors[active];

  return (
      <div style={{
        fontFamily: "'Nunito', 'Fredoka One', sans-serif",
        background: "#E8F5E9",
        minHeight: "100vh",
        overflowX: "hidden",
        color: "#1A1A1A",
      }}>
        <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;700;900&family=Fredoka+One&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        @keyframes float {
          0%,100%{transform:translateY(0px) rotate(-2deg)}
          50%{transform:translateY(-18px) rotate(2deg)}
        }
        @keyframes spin-slow {
          from{transform:rotate(0deg)}
          to{transform:rotate(360deg)}
        }
        @keyframes bounce-in {
          0%{transform:scale(0) rotate(-10deg);opacity:0}
          70%{transform:scale(1.15) rotate(3deg);opacity:1}
          100%{transform:scale(1) rotate(0deg)}
        }
        @keyframes slide-up {
          from{transform:translateY(60px);opacity:0}
          to{transform:translateY(0);opacity:1}
        }
        @keyframes slide-left {
          from{transform:translateX(80px);opacity:0}
          to{transform:translateX(0);opacity:1}
        }
        @keyframes wiggle {
          0%,100%{transform:rotate(-4deg)}
          50%{transform:rotate(4deg)}
        }
        @keyframes pulse-scale {
          0%,100%{transform:scale(1)}
          50%{transform:scale(1.06)}
        }
        @keyframes dots-bounce {
          0%,80%,100%{transform:scale(0)}
          40%{transform:scale(1)}
        }
        @keyframes marquee {
          from{transform:translateX(0)}
          to{transform:translateX(-50%)}
        }
        @keyframes croc-run {
          0%{transform:translateX(-200px) scaleX(1)}
          49%{transform:translateX(calc(100vw + 200px)) scaleX(1)}
          50%{transform:translateX(calc(100vw + 200px)) scaleX(-1)}
          99%{transform:translateX(-200px) scaleX(-1)}
          100%{transform:translateX(-200px) scaleX(1)}
        }
        @keyframes drip {
          0%{height:0;opacity:0}
          30%{opacity:1}
          100%{height:32px;opacity:0.6}
        }
        @keyframes rainbow-border {
          0%{border-color:#E8C84A}
          33%{border-color:#E0557A}
          66%{border-color:#7DB840}
          100%{border-color:#E8C84A}
        }
        @keyframes pop-in {
          0%{transform:scale(0.5) translateY(20px);opacity:0}
          60%{transform:scale(1.1) translateY(-4px)}
          100%{transform:scale(1) translateY(0);opacity:1}
        }
        @keyframes text-shimmer {
          0%,100%{background-position:0% 50%}
          50%{background-position:100% 50%}
        }
        @keyframes shake {
          0%,100%{transform:translateX(0)}
          25%{transform:translateX(-5px)}
          75%{transform:translateX(5px)}
        }
        @keyframes grow-in {
          from{transform:scaleX(0)}
          to{transform:scaleX(1)}
        }

        .nav-link {
          text-decoration:none;
          font-weight:700;
          font-size:15px;
          padding:8px 18px;
          border-radius:24px;
          transition:all 0.2s;
          color:#3A6020;
        }
        .nav-link:hover {
          background:#6BBF3E;
          color:#fff;
          transform:scale(1.08) rotate(-1deg);
        }
        .flavor-btn {
          border:none;
          outline:none;
          cursor:pointer;
          border-radius:50px;
          padding:12px 28px;
          font-family:'Fredoka One',sans-serif;
          font-size:18px;
          letter-spacing:1px;
          transition:all 0.25s cubic-bezier(.34,1.56,.64,1);
          position:relative;
          overflow:hidden;
        }
        .flavor-btn::after {
          content:'';
          position:absolute;
          inset:0;
          background:rgba(255,255,255,0.2);
          transform:translateX(-100%);
          transition:transform 0.3s;
        }
        .flavor-btn:hover::after { transform:translateX(0); }
        .flavor-btn:hover { transform:scale(1.1) translateY(-3px); box-shadow:0 12px 30px rgba(0,0,0,0.25); }
        .flavor-btn:active { transform:scale(0.97); }

        .card-3d {
          transition: transform 0.3s cubic-bezier(.34,1.56,.64,1), box-shadow 0.3s;
        }
        .card-3d:hover {
          transform: translateY(-12px) rotate(-1.5deg) scale(1.03);
          box-shadow: 0 24px 48px rgba(0,0,0,0.18);
        }

        .buy-btn {
          background: linear-gradient(135deg, #6BBF3E, #4A9020);
          color: white;
          border: none;
          padding: 16px 40px;
          border-radius: 50px;
          font-family: 'Fredoka One', sans-serif;
          font-size: 20px;
          cursor: pointer;
          letter-spacing: 1px;
          box-shadow: 0 8px 24px rgba(107,191,62,0.5);
          transition: all 0.25s cubic-bezier(.34,1.56,.64,1);
          position: relative;
          overflow: hidden;
        }
        .buy-btn:hover {
          transform: scale(1.08) translateY(-4px);
          box-shadow: 0 16px 40px rgba(107,191,62,0.6);
        }
        .buy-btn:active { transform: scale(0.97); }

        .fact-card {
          background: white;
          border-radius: 20px;
          padding: 20px 24px;
          display: flex;
          align-items: center;
          gap: 16px;
          box-shadow: 0 4px 16px rgba(0,0,0,0.08);
          transition: all 0.25s cubic-bezier(.34,1.56,.64,1);
        }
        .fact-card:hover {
          transform: translateY(-6px) rotate(1deg);
          box-shadow: 0 12px 32px rgba(0,0,0,0.15);
        }

        .section-enter { animation: slide-up 0.6s cubic-bezier(.34,1.56,.64,1) both; }
        .section-enter-left { animation: slide-left 0.6s cubic-bezier(.34,1.56,.64,1) both; }
      `}</style>

        {/* NAVBAR */}
        <nav style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
          background: scrollY > 60 ? "rgba(255,255,255,0.92)" : "transparent",
          backdropFilter: scrollY > 60 ? "blur(12px)" : "none",
          padding: "14px 40px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          transition: "all 0.3s",
          boxShadow: scrollY > 60 ? "0 4px 24px rgba(0,0,0,0.1)" : "none",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{
              width: 44, height: 44, borderRadius: "50%",
              background: "linear-gradient(135deg,#6BBF3E,#E8C84A)",
              display: "flex", alignItems: "center", justifyContent: "center",
              animation: "spin-slow 8s linear infinite",
              boxShadow: "0 4px 12px rgba(107,191,62,0.4)"
            }}>
              <span style={{ fontSize: 24 }}>🐊</span>
            </div>
            <div>
              <div style={{ fontFamily: "'Fredoka One'", fontSize: 22, lineHeight: 1, color: "#2A5A10" }}>
                Fit<span style={{ color: "#E8C84A" }}>Yummy</span>
              </div>
              <div style={{ fontSize: 10, color: "#6BBF3E", fontWeight: 700, letterSpacing: 1.5 }}>СМАЧНО • КОРИСНО</div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 4 }}>
            {["Смаки", "Про нас", "Де купити"].map(l => (
                <a key={l} href="#" className="nav-link">{l}</a>
            ))}
          </div>
          <button className="buy-btn" style={{ padding: "10px 24px", fontSize: 15 }}>
            🛒 Замовити
          </button>
        </nav>

        {/* HERO */}
        <section style={{
          minHeight: "100vh",
          background: `radial-gradient(ellipse at 20% 50%, ${fl.light} 0%, #E8F5E9 60%)`,
          display: "flex", alignItems: "center",
          padding: "100px 40px 40px",
          position: "relative",
          overflow: "hidden",
          transition: "background 0.6s",
        }}>
          {/* BG blobs */}
          <Blob color={fl.color + "33"} style={{ width: 500, height: 500, top: -80, right: -100, animation: "float 6s ease-in-out infinite" }} />
          <Blob color={fl.dots + "22"} style={{ width: 300, height: 300, bottom: 0, left: 80, animation: "float 8s ease-in-out infinite reverse" }} />

          {/* Scattered dots */}
          {[...Array(20)].map((_, i) => (
              <div key={i} style={{
                position: "absolute",
                width: 8 + (i % 4) * 6, height: 8 + (i % 4) * 6,
                borderRadius: "50%",
                background: [fl.color, fl.dark, "#6BBF3E", "#E0557A"][i % 4],
                left: `${5 + (i * 4.7) % 90}%`,
                top: `${8 + (i * 6.3) % 80}%`,
                opacity: 0.2 + (i % 5) * 0.1,
                animation: `float ${4 + i % 4}s ease-in-out infinite`,
                animationDelay: `${i * 0.3}s`,
              }} />
          ))}

          <div style={{ maxWidth: 1200, margin: "0 auto", width: "100%", display: "flex", alignItems: "center", gap: 60 }}>
            {/* Left text */}
            <div style={{ flex: 1, zIndex: 1 }}>
              <div style={{
                display: "inline-block",
                background: fl.color,
                color: fl.dark,
                borderRadius: 50,
                padding: "6px 20px",
                fontSize: 13,
                fontWeight: 900,
                letterSpacing: 2,
                marginBottom: 20,
                animation: "bounce-in 0.6s cubic-bezier(.34,1.56,.64,1) both",
              }}>
                ✦ ЕНЕРГІЯ СПОРТУ В КОЖНОМУ ШМАТОЧКУ ✦
              </div>

              <h1 style={{
                fontFamily: "'Fredoka One'",
                fontSize: "clamp(52px, 8vw, 88px)",
                lineHeight: 0.95,
                marginBottom: 24,
                animation: "slide-up 0.7s cubic-bezier(.34,1.56,.64,1) 0.1s both",
              }}>
                <span style={{ color: "#2A5A10", display: "block" }}>Смакуй.</span>
                <span style={{ color: fl.color, display: "block", textShadow: `4px 4px 0 ${fl.dark}` }}>Заряджайся.</span>
                <span style={{ color: "#E0557A", display: "block" }}>Перемагай.</span>
              </h1>

              <p style={{
                fontSize: 18, lineHeight: 1.7,
                color: "#4A6A30", maxWidth: 420, marginBottom: 36,
                animation: "slide-up 0.7s cubic-bezier(.34,1.56,.64,1) 0.2s both",
              }}>
                Ми поєднали шоколад, йогурт та свіжі фрукти, щоб дати тобі силу для нових перемог.{" "}
                <strong style={{ color: fl.dark }}>Корисне теж може бути смачним!</strong>
              </p>

              {/* Flavor selector */}
              <div style={{
                display: "flex", gap: 12, marginBottom: 36, flexWrap: "wrap",
                animation: "slide-up 0.7s cubic-bezier(.34,1.56,.64,1) 0.3s both",
              }}>
                {flavors.map((f, i) => (
                    <button
                        key={f.id}
                        className="flavor-btn"
                        onClick={() => setActive(i)}
                        style={{
                          background: active === i ? f.color : "white",
                          color: active === i ? f.dark : "#888",
                          boxShadow: active === i ? `0 8px 24px ${f.color}88` : "0 2px 8px rgba(0,0,0,0.1)",
                          border: `3px solid ${active === i ? f.dark : "#E0E0E0"}`,
                          transform: active === i ? "scale(1.05) translateY(-2px)" : "scale(1)",
                        }}>
                      {f.emoji} {f.name}
                    </button>
                ))}
              </div>

              <div style={{
                display: "flex", gap: 16, alignItems: "center",
                animation: "slide-up 0.7s cubic-bezier(.34,1.56,.64,1) 0.4s both",
              }}>
                <button className="buy-btn">🛒 Спробувати зараз</button>
                <div style={{ color: "#6BBF3E", fontWeight: 700, fontSize: 14 }}>
                  від 45 грн / шт
                </div>
              </div>
            </div>

            {/* Right — Ice cream hero visual */}
            <div style={{ flex: "0 0 420px", position: "relative", height: 520 }}>
              {/* Main ice cream tower */}
              <div style={{
                position: "absolute", left: "50%", top: "50%",
                transform: "translate(-50%, -50%)",
                animation: "float 4s ease-in-out infinite",
                zIndex: 2,
              }}>
                {/* Big ice cream SVG */}
                <svg viewBox="0 0 180 340" width="260" xmlns="http://www.w3.org/2000/svg">
                  {/* Wafer cone */}
                  <path d="M50 200 L90 340 L130 200Z" fill="#D4A060" />
                  <path d="M55 210 L90 320 L125 210Z" fill="#C89050" />
                  {/* Waffle pattern */}
                  {[0,1,2,3].map(r => [0,1,2].map(c => (
                      <line key={`${r}${c}`} x1={58+c*22} y1={215+r*25} x2={68+c*18} y2={235+r*20}
                            stroke="#B07840" strokeWidth="1.5" opacity="0.6" />
                  )))}
                  {/* Scoop 1 - bottom mango */}
                  <ellipse cx="90" cy="200" rx="46" ry="44" fill={fl.color} />
                  <ellipse cx="78" cy="188" rx="18" ry="16" fill={fl.color + "CC"} opacity="0.6" />
                  {/* Scoop 2 - raspberry */}
                  <ellipse cx="88" cy="152" rx="40" ry="38" fill="#E0557A" />
                  <ellipse cx="76" cy="142" rx="15" ry="13" fill="#F07090" opacity="0.6" />
                  {/* Scoop 3 - kiwi */}
                  <ellipse cx="90" cy="110" rx="34" ry="32" fill="#7DB840" />
                  <ellipse cx="80" cy="100" rx="13" ry="11" fill="#9ED860" opacity="0.6" />
                  {/* Chocolate top */}
                  <path d="M68 90 Q90 70 112 90 Q108 78 90 72 Q72 78 68 90Z" fill="#3A2010" />
                  {/* Sprinkles */}
                  {[
                    [100, 185, "#E0557A", 12], [75, 195, "#7DB840", 8],
                    [110, 160, "#E8C84A", 10], [70, 130, "#E8C84A", 8],
                    [108, 125, "#FF6080", 12], [82, 105, "#FFD700", 8],
                    [95, 170, "#7DB840", 10], [68, 155, "#E0557A", 8],
                  ].map(([x, y, c, r], i) => (
                      <ellipse key={i} cx={x} cy={y} rx={r/2} ry={3} fill={c}
                               transform={`rotate(${i*35} ${x} ${y})`} opacity="0.9" />
                  ))}
                  {/* Cherry on top */}
                  <circle cx="90" cy="70" r="10" fill="#CC2040" />
                  <circle cx="86" cy="67" r="3" fill="#FF4060" />
                  <path d="M90 60 Q95 45 100 48" stroke="#3A6020" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                  {/* Drips */}
                  <path d="M70 195 Q65 210 67 225" stroke={fl.color} strokeWidth="5" fill="none" strokeLinecap="round" opacity="0.8" />
                  <path d="M108 160 Q114 175 112 188" stroke="#E0557A" strokeWidth="4" fill="none" strokeLinecap="round" opacity="0.8" />
                </svg>
              </div>

              {/* Decorative stars */}
              {[[30, 40, fl.color], [350, 60, "#E0557A"], [20, 340, "#7DB840"], [370, 360, fl.color]].map(([x, y, c], i) => (
                  <div key={i} style={{
                    position: "absolute", left: x, top: y,
                    animation: `pulse-scale ${2+i*0.5}s ease-in-out infinite`,
                    animationDelay: `${i*0.4}s`,
                  }}>
                    <svg viewBox="0 0 40 40" width="36"><StarBurst color={c} x={20} y={20} size={20} /></svg>
                  </div>
              ))}

              {/* Tag badge */}
              <div style={{
                position: "absolute", right: 10, top: 60,
                background: fl.color, color: fl.dark,
                borderRadius: "50%", width: 72, height: 72,
                display: "flex", flexDirection: "column",
                alignItems: "center", justifyContent: "center",
                fontFamily: "'Fredoka One'",
                fontSize: 13, fontWeight: 900,
                animation: "wiggle 2s ease-in-out infinite",
                boxShadow: `0 8px 20px ${fl.color}88`,
                border: `4px solid ${fl.dark}`,
              }}>
                <div>{fl.tag}</div>
                <div style={{ fontSize: 20 }}>{fl.emoji}</div>
              </div>
            </div>
          </div>

          {/* Running croc at bottom */}
          <div style={{
            position: "absolute", bottom: 0, left: 0,
            animation: "croc-run 12s linear infinite",
            zIndex: 3,
          }}>
            <CrocSVG style={{ width: 160, height: 128 }} animate />
          </div>
        </section>

        {/* MARQUEE STRIP */}
        <div style={{
          background: "#2A5A10", overflow: "hidden",
          padding: "14px 0", position: "relative",
        }}>
          <div style={{
            display: "flex", gap: 0, whiteSpace: "nowrap",
            animation: "marquee 18s linear infinite",
            width: "max-content",
          }}>
            {[...Array(4)].map((_, ri) =>
                ["🏅 Природно смачно", "🌿 Без консервантів", "🐊 Crocorolo схвалює",
                  "💪 Спортивна їжа", "✦ ФітЮмі", "🥭 Манго", "🫐 Малина", "🥝 Ківі"
                ].map((t, i) => (
                    <span key={`${ri}-${i}`} style={{
                      color: "white", fontFamily: "'Fredoka One'", fontSize: 18,
                      padding: "0 32px", letterSpacing: 1,
                      borderRight: "2px solid rgba(255,255,255,0.2)",
                    }}>{t}</span>
                ))
            )}
          </div>
        </div>

        {/* FLAVORS SECTION */}
        <section ref={ref("flavors")} style={{ padding: "100px 40px", background: "#FAFFF5" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            <div style={{
              textAlign: "center", marginBottom: 70,
              ...(visible.flavors ? { animation: "slide-up 0.6s both" } : { opacity: 0 }),
            }}>
              <div style={{
                fontFamily: "'Fredoka One'", fontSize: 56,
                color: "#2A5A10", lineHeight: 1,
                textShadow: "3px 3px 0 #C8E8A0",
              }}>
                Обери свій смак 🍦
              </div>
              <p style={{ color: "#6A9A50", marginTop: 12, fontSize: 18 }}>
                Кожен шматочок — це маленька перемога
              </p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 32 }}>
              {flavors.map((f, i) => (
                  <div
                      key={f.id}
                      className="card-3d"
                      onMouseEnter={() => setHovered(i)}
                      onMouseLeave={() => setHovered(null)}
                      style={{
                        background: hovered === i ? f.light : "white",
                        borderRadius: 32,
                        padding: "40px 32px",
                        position: "relative",
                        overflow: "hidden",
                        boxShadow: hovered === i
                            ? `0 20px 48px ${f.color}44`
                            : "0 4px 20px rgba(0,0,0,0.08)",
                        border: `3px solid ${hovered === i ? f.color : "#F0F4EC"}`,
                        cursor: "pointer",
                        transition: "all 0.3s",
                        ...(visible.flavors ? {
                          animation: `pop-in 0.5s cubic-bezier(.34,1.56,.64,1) ${i * 0.15}s both`
                        } : { opacity: 0 }),
                      }}
                      onClick={() => setActive(i)}
                  >
                    {/* Tag */}
                    <div style={{
                      position: "absolute", top: 20, right: 20,
                      background: f.color, color: f.dark,
                      borderRadius: 20, padding: "4px 14px",
                      fontSize: 12, fontWeight: 900, letterSpacing: 1,
                    }}>
                      {f.tag}
                    </div>

                    {/* Big emoji */}
                    <div style={{
                      fontSize: 72, marginBottom: 16,
                      display: "block", lineHeight: 1,
                      animation: hovered === i ? "wiggle 0.5s ease-in-out infinite" : "none",
                    }}>
                      {f.emoji}
                    </div>

                    <div style={{ fontFamily: "'Fredoka One'", fontSize: 36, color: f.dark, marginBottom: 4 }}>
                      {f.name}
                    </div>
                    <div style={{ color: f.color, fontWeight: 700, fontSize: 14, marginBottom: 16, letterSpacing: 1 }}>
                      {f.ukr}
                    </div>
                    <p style={{ color: "#666", lineHeight: 1.6, fontSize: 15 }}>{f.desc}</p>

                    {/* Color stripe */}
                    <div style={{
                      position: "absolute", bottom: 0, left: 0, right: 0, height: 8,
                      background: f.color,
                      transform: hovered === i ? "scaleX(1)" : "scaleX(0)",
                      transformOrigin: "left",
                      transition: "transform 0.3s",
                    }} />
                  </div>
              ))}
            </div>
          </div>
        </section>

        {/* ABOUT / CHARACTER */}
        <section ref={ref("croc")} style={{
          padding: "100px 40px",
          background: "#2A5A10",
          position: "relative", overflow: "hidden",
        }}>
          {/* BG decoration */}
          <div style={{
            position: "absolute", inset: 0,
            backgroundImage: "radial-gradient(circle at 20% 50%, rgba(107,191,62,0.2) 0%, transparent 60%)",
          }} />

          <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", gap: 80, alignItems: "center", zIndex: 1, position: "relative" }}>
            <div style={{
              flex: "0 0 380px",
              ...(visible.croc ? { animation: "bounce-in 0.8s cubic-bezier(.34,1.56,.64,1) both" } : { opacity: 0 }),
            }}>
              <CrocSVG style={{
                width: "100%",
                filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.4))",
                animation: "float 4s ease-in-out infinite",
              }} />
            </div>

            <div style={{
              flex: 1, color: "white",
              ...(visible.croc ? { animation: "slide-left 0.7s cubic-bezier(.34,1.56,.64,1) 0.2s both" } : { opacity: 0 }),
            }}>
              <div style={{
                display: "inline-block",
                background: "#E8C84A", color: "#5A3010",
                borderRadius: 50, padding: "6px 20px",
                fontSize: 13, fontWeight: 900,
                letterSpacing: 2, marginBottom: 24,
              }}>
                🐊 CROCOROLO — НАШ АМБАСАДОР
              </div>
              <h2 style={{ fontFamily: "'Fredoka One'", fontSize: 52, lineHeight: 1.1, marginBottom: 24, textShadow: "3px 3px 0 rgba(0,0,0,0.2)" }}>
                Зустрічайся з<br />
                <span style={{ color: "#E8C84A" }}>Crocorolo!</span>
              </h2>
              <p style={{ fontSize: 18, lineHeight: 1.8, opacity: 0.9, marginBottom: 32, maxWidth: 480 }}>
                Народився у Франції, але серце — на Мадагаскарі. Він об'їздив весь світ
                на роликах і тепер ділиться енергією тропічних фруктів з усіма!
              </p>

              {/* Stats */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, maxWidth: 420 }}>
                {[
                  { n: "3", label: "Континенти" },
                  { n: "12", label: "Смаки" },
                  { n: "50k+", label: "Фанатів" },
                  { n: "100%", label: "Натурально" },
                ].map((s, i) => (
                    <div key={i} style={{
                      background: "rgba(255,255,255,0.1)",
                      borderRadius: 20, padding: "20px 24px",
                      backdropFilter: "blur(8px)",
                      border: "1px solid rgba(255,255,255,0.15)",
                      animation: visible.croc ? `pop-in 0.5s cubic-bezier(.34,1.56,.64,1) ${0.4 + i*0.1}s both` : "none",
                      opacity: visible.croc ? undefined : 0,
                    }}>
                      <div style={{ fontFamily: "'Fredoka One'", fontSize: 38, color: "#E8C84A" }}>{s.n}</div>
                      <div style={{ color: "rgba(255,255,255,0.7)", fontSize: 14, fontWeight: 700, letterSpacing: 1 }}>{s.label}</div>
                    </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FACTS */}
        <section ref={ref("facts")} style={{ padding: "100px 40px", background: "#E8F5E9" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            <div style={{
              textAlign: "center", marginBottom: 60,
              ...(visible.facts ? { animation: "slide-up 0.6s both" } : { opacity: 0 }),
            }}>
              <h2 style={{ fontFamily: "'Fredoka One'", fontSize: 52, color: "#2A5A10", textShadow: "3px 3px 0 #C8E8A0" }}>
                Чому FitYummy? 💚
              </h2>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 24 }}>
              {facts.map((f, i) => (
                  <div
                      key={i}
                      className="fact-card"
                      style={{
                        ...(visible.facts ? {
                          animation: `pop-in 0.5s cubic-bezier(.34,1.56,.64,1) ${i * 0.12}s both`
                        } : { opacity: 0 }),
                      }}
                  >
                    <div style={{
                      fontSize: 48, width: 72, height: 72,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      background: "#E8F5E9", borderRadius: 20,
                      animation: `wiggle ${3+i}s ease-in-out infinite`,
                    }}>
                      {f.icon}
                    </div>
                    <div style={{ fontSize: 18, fontWeight: 700, color: "#2A5A10" }}>{f.text}</div>
                  </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section style={{
          padding: "120px 40px",
          background: `linear-gradient(135deg, #E8C84A 0%, #E0557A 50%, #7DB840 100%)`,
          textAlign: "center", position: "relative", overflow: "hidden",
        }}>
          {/* Pattern */}
          <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.15 }} xmlns="http://www.w3.org/2000/svg">
            {[...Array(8)].map((_, r) =>
                [...Array(12)].map((_, c) => (
                    <circle key={`${r}-${c}`} cx={c * 90 + 45} cy={r * 90 + 45} r={12} fill="white" />
                ))
            )}
          </svg>

          <div style={{ position: "relative", zIndex: 1 }}>
            <div style={{ fontSize: 80, marginBottom: 16, animation: "float 3s ease-in-out infinite" }}>🍦</div>
            <h2 style={{
              fontFamily: "'Fredoka One'", fontSize: "clamp(40px,7vw,72px)",
              color: "white", textShadow: "4px 4px 0 rgba(0,0,0,0.2)",
              marginBottom: 20, lineHeight: 1.1,
            }}>
              Час заряджатися!
            </h2>
            <p style={{ color: "rgba(255,255,255,0.9)", fontSize: 20, marginBottom: 48, maxWidth: 500, margin: "0 auto 48px" }}>
              Спробуй всі три смаки і знайди свій улюблений. Перший крок до перемоги — смачний!
            </p>
            <div style={{ display: "flex", gap: 20, justifyContent: "center", flexWrap: "wrap" }}>
              <button style={{
                background: "white", color: "#2A5A10",
                border: "none", padding: "18px 48px",
                borderRadius: 50, fontFamily: "'Fredoka One'",
                fontSize: 22, cursor: "pointer",
                boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
                transition: "all 0.25s cubic-bezier(.34,1.56,.64,1)",
                animation: "pulse-scale 2s ease-in-out infinite",
              }}
                      onMouseEnter={e => e.target.style.transform = "scale(1.1) translateY(-4px)"}
                      onMouseLeave={e => e.target.style.transform = "scale(1)"}
              >
                🛒 Замовити зараз
              </button>
              <button style={{
                background: "transparent", color: "white",
                border: "3px solid white", padding: "18px 48px",
                borderRadius: 50, fontFamily: "'Fredoka One'",
                fontSize: 22, cursor: "pointer",
                transition: "all 0.25s cubic-bezier(.34,1.56,.64,1)",
              }}
                      onMouseEnter={e => { e.target.style.background = "white"; e.target.style.color = "#2A5A10"; }}
                      onMouseLeave={e => { e.target.style.background = "transparent"; e.target.style.color = "white"; }}
              >
                📍 Знайти магазин
              </button>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer style={{ background: "#1A3A0A", padding: "48px 40px", textAlign: "center" }}>
          <div style={{ fontFamily: "'Fredoka One'", fontSize: 32, color: "white", marginBottom: 8 }}>
            Fit<span style={{ color: "#E8C84A" }}>Yummy</span>
          </div>
          <div style={{ color: "#6BBF3E", fontSize: 13, letterSpacing: 2, marginBottom: 24 }}>
            СМАКУЙ • ЗАРЯДЖАЙСЯ • ПЕРЕМАГАЙ
          </div>
          <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 13 }}>
            © 2025 FitYummy — Енергія спорту в кожному шматочку 🐊
          </div>
        </footer>
      </div>
  );
}