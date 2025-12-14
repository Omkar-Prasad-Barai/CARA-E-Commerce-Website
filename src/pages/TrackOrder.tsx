import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

/* ═══════════════════════════════════════════════════
   CONSTANTS & HELPERS
═══════════════════════════════════════════════════ */
const STORAGE_KEY = 'orderTrackingStep';

function getOrInitStep(): number {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (raw === null) {
    localStorage.setItem(STORAGE_KEY, '1');
    return 1;
  }
  const current = Math.max(1, Math.min(4, parseInt(raw, 10)));
  // Don't auto-increment past 4; only increment if < 4
  if (current < 4) {
    localStorage.setItem(STORAGE_KEY, String(current + 1));
  }
  return current;
}

/* ═══════════════════════════════════════════════════
   ALL CSS — injected once into <head>
═══════════════════════════════════════════════════ */
const ANIMATION_CSS = `
/* ---------- Sky & scene ---------- */
@keyframes cloudDrift {
  0%   { transform: translateX(0); }
  100% { transform: translateX(-200px); }
}
@keyframes cloudDrift2 {
  0%   { transform: translateX(0); }
  100% { transform: translateX(-160px); }
}
@keyframes treeDrift {
  0%   { transform: translateX(0); }
  100% { transform: translateX(-320px); }
}
@keyframes roadDash {
  0%   { background-position: 0 0; }
  100% { background-position: -80px 0; }
}
/* ---------- Truck states ---------- */
@keyframes idleBounce {
  0%, 100% { transform: translateY(0px); }
  50%       { transform: translateY(-4px); }
}
@keyframes driveBounce {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  25%       { transform: translateY(-3px) rotate(0.4deg); }
  75%       { transform: translateY(-1px) rotate(-0.3deg); }
}
@keyframes wheelSpin {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}
/* ---------- Exhaust ---------- */
@keyframes puff1 {
  0%   { opacity: 0;   transform: translate(0px, 0px)    scale(0.4); }
  20%  { opacity: 0.6; transform: translate(-6px, -4px)  scale(0.7); }
  60%  { opacity: 0.3; transform: translate(-16px, -14px) scale(1.2); }
  100% { opacity: 0;   transform: translate(-26px, -24px) scale(1.8); }
}
@keyframes puff2 {
  0%   { opacity: 0;   transform: translate(0px, 0px)    scale(0.3); }
  20%  { opacity: 0.5; transform: translate(-5px, -6px)  scale(0.6); }
  60%  { opacity: 0.25;transform: translate(-14px,-18px)  scale(1.1); }
  100% { opacity: 0;   transform: translate(-22px,-28px)  scale(1.6); }
}
@keyframes puff3 {
  0%   { opacity: 0;   transform: translate(0px, 0px)    scale(0.5); }
  20%  { opacity: 0.4; transform: translate(-8px, -3px)  scale(0.8); }
  60%  { opacity: 0.2; transform: translate(-20px,-12px)  scale(1.3); }
  100% { opacity: 0;   transform: translate(-30px,-22px)  scale(1.9); }
}
.exhaust-puff1 { animation: puff1 1.4s ease-out infinite; }
.exhaust-puff2 { animation: puff2 1.4s ease-out infinite 0.45s; }
.exhaust-puff3 { animation: puff3 1.4s ease-out infinite 0.9s; }

/* ---------- Speed lines ---------- */
@keyframes speedLine {
  0%   { transform: scaleX(0); opacity: 0; }
  40%  { transform: scaleX(1); opacity: 0.6; }
  100% { transform: scaleX(1.5); opacity: 0; }
}
.speed-line { animation: speedLine 0.8s ease-out infinite; transform-origin: right center; }
.speed-line:nth-child(2) { animation-delay: 0.2s; }
.speed-line:nth-child(3) { animation-delay: 0.4s; }

/* ---------- Loading boxes ---------- */
@keyframes boxFloat {
  0%   { transform: translateY(20px); opacity: 0; }
  40%  { transform: translateY(0px);  opacity: 1; }
  70%  { transform: translateY(0px);  opacity: 1; }
  100% { transform: translateY(-8px); opacity: 0; }
}
.loading-box1 { animation: boxFloat 1.6s ease-in-out infinite; }
.loading-box2 { animation: boxFloat 1.6s ease-in-out infinite 0.55s; }
.loading-box3 { animation: boxFloat 1.6s ease-in-out infinite 1.1s; }

/* ---------- Confetti / Celebration ---------- */
@keyframes confettiPop {
  0%   { transform: scale(0) rotate(0deg);   opacity: 1; }
  60%  { transform: scale(1.4) rotate(180deg); opacity: 0.9; }
  100% { transform: scale(0.8) rotate(360deg); opacity: 0; }
}
@keyframes sparkle {
  0%, 100% { opacity: 0; transform: scale(0); }
  50%       { opacity: 1; transform: scale(1); }
}
.confetti-item { animation: confettiPop 1.2s ease-out infinite; }
.confetti-item:nth-child(2) { animation-delay: 0.2s; }
.confetti-item:nth-child(3) { animation-delay: 0.4s; }
.confetti-item:nth-child(4) { animation-delay: 0.6s; }
.confetti-item:nth-child(5) { animation-delay: 0.8s; }
.confetti-item:nth-child(6) { animation-delay: 1.0s; }
.sparkle { animation: sparkle 1.5s ease-in-out infinite; }
.sparkle:nth-child(2) { animation-delay: 0.3s; }
.sparkle:nth-child(3) { animation-delay: 0.6s; }
.sparkle:nth-child(4) { animation-delay: 0.9s; }

/* ---------- Stepper ---------- */
@keyframes stepPulse {
  0%, 100% { box-shadow: 0 0 0 0 rgba(8,129,120,0.4); }
  50%       { box-shadow: 0 0 0 10px rgba(8,129,120,0); }
}
@keyframes stepFillIn {
  from { stroke-dashoffset: 40; }
  to   { stroke-dashoffset: 0; }
}
.step-active-circle { animation: stepPulse 1.8s ease-in-out infinite; }

/* ---------- Shared entrance ---------- */
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(24px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes popIn {
  0%   { opacity: 0; transform: scale(0.7); }
  70%  { transform: scale(1.05); }
  100% { opacity: 1; transform: scale(1); }
}
.fade-up { animation: fadeUp 0.5s ease forwards; }
.pop-in  { animation: popIn  0.5s ease forwards; }

/* ---------- Road dashes ---------- */
.road-animate {
  background-image: repeating-linear-gradient(
    90deg,
    rgba(255,255,255,0.7) 0px,
    rgba(255,255,255,0.7) 36px,
    transparent 36px,
    transparent 80px
  );
  background-size: 80px 100%;
  animation: roadDash 0.5s linear infinite;
}
.road-static {
  background-image: repeating-linear-gradient(
    90deg,
    rgba(255,255,255,0.5) 0px,
    rgba(255,255,255,0.5) 36px,
    transparent 36px,
    transparent 80px
  );
  background-size: 80px 100%;
}

/* ---------- Tree scroll ---------- */
.tree-layer-fast {
  display: flex;
  gap: 60px;
  align-items: flex-end;
  animation: treeDrift 3.5s linear infinite;
  white-space: nowrap;
}
.tree-layer-slow {
  display: flex;
  gap: 90px;
  align-items: flex-end;
  animation: treeDrift 6s linear infinite;
  white-space: nowrap;
}
.cloud-layer {
  animation: cloudDrift 12s linear infinite;
  position: absolute;
  top: 18px;
  left: 0;
  display: flex;
  gap: 110px;
  align-items: center;
}
.cloud-layer2 {
  animation: cloudDrift2 18s linear infinite;
  position: absolute;
  top: 32px;
  left: 60px;
  display: flex;
  gap: 140px;
  align-items: center;
}
/* ---------- Wheel ---------- */
.wheel-spinning { animation: wheelSpin 0.4s linear infinite; }
.truck-idle     { animation: idleBounce 1.6s ease-in-out infinite; }
.truck-driving  { animation: driveBounce 0.35s ease-in-out infinite; }
`;

/* ═══════════════════════════════════════════════════
   SVG TRUCK
═══════════════════════════════════════════════════ */
const TruckSVG: React.FC<{ isMoving: boolean; isDelivered: boolean }> = ({ isMoving, isDelivered }) => (
  <svg
    viewBox="0 0 160 90"
    width="160"
    height="90"
    xmlns="http://www.w3.org/2000/svg"
    aria-label="Delivery truck"
  >
    {/* ── Truck shadow ── */}
    <ellipse cx="80" cy="87" rx="58" ry="5" fill="rgba(0,0,0,0.12)" />

    {/* ── Cargo body ── */}
    <rect x="2" y="28" width="98" height="48" rx="6" ry="6"
      fill="var(--color-primary, #088178)" />
    {/* Cargo body highlight */}
    <rect x="2" y="28" width="98" height="12" rx="6" ry="6"
      fill="rgba(255,255,255,0.12)" />
    {/* Cargo side panel lines */}
    <line x1="34" y1="28" x2="34" y2="76" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5"/>
    <line x1="66" y1="28" x2="66" y2="76" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5"/>

    {/* ── CARA brand badge ── */}
    <rect x="10" y="36" width="52" height="22" rx="4" fill="rgba(255,255,255,0.15)"/>
    <text x="36" y="52" textAnchor="middle" fill="white" fontSize="10" fontWeight="800" fontFamily="Inter,sans-serif">CARA</text>

    {/* ── Package icon on side ── */}
    <rect x="70" y="38" width="20" height="18" rx="3" fill="rgba(255,255,255,0.25)"/>
    <line x1="80" y1="38" x2="80" y2="56" stroke="rgba(255,255,255,0.5)" strokeWidth="1.2"/>
    <line x1="70" y1="47" x2="90" y2="47" stroke="rgba(255,255,255,0.5)" strokeWidth="1.2"/>

    {/* ── Cab body ── */}
    <rect x="98" y="38" width="56" height="38" rx="6" ry="6"
      fill="#0a6b64" />
    {/* Cab highlight */}
    <rect x="98" y="38" width="56" height="10" rx="6" ry="6"
      fill="rgba(255,255,255,0.1)" />

    {/* ── Windshield ── */}
    <rect x="120" y="41" width="30" height="20" rx="4"
      fill="rgba(180,230,255,0.85)" stroke="rgba(255,255,255,0.4)" strokeWidth="1"/>
    {/* Windshield glare */}
    <line x1="123" y1="44" x2="130" y2="57" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" strokeLinecap="round"/>

    {/* ── Front grille ── */}
    <rect x="150" y="52" width="8" height="18" rx="2"
      fill="#054f4a" />
    <line x1="150" y1="56" x2="158" y2="56" stroke="rgba(255,255,255,0.3)" strokeWidth="1"/>
    <line x1="150" y1="61" x2="158" y2="61" stroke="rgba(255,255,255,0.3)" strokeWidth="1"/>
    <line x1="150" y1="66" x2="158" y2="66" stroke="rgba(255,255,255,0.3)" strokeWidth="1"/>

    {/* ── Headlight ── */}
    <rect x="153" y="48" width="6" height="4" rx="1"
      fill={isMoving ? '#fffde7' : '#c8e6c9'} />
    {isMoving && (
      <ellipse cx="160" cy="50" rx="6" ry="3" fill="rgba(255,253,200,0.35)"/>
    )}

    {/* ── Exhaust pipe (left side of cab bottom) ── */}
    <rect x="98" y="72" width="5" height="6" rx="1" fill="#054f4a"/>

    {/* ── Door ── */}
    <rect x="102" y="45" width="16" height="24" rx="3"
      fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.2)" strokeWidth="1"/>
    {/* Door handle */}
    <rect x="116" y="56" width="4" height="2" rx="1" fill="rgba(255,255,255,0.5)"/>

    {/* ── Rear brake light ── */}
    <rect x="2" y="48" width="4" height="8" rx="1"
      fill={isDelivered ? '#ef4444' : 'rgba(255,80,80,0.4)'} />

    {/* ── Wheels ── */}
    {/* Rear wheel */}
    <g transform="translate(24, 76)">
      <circle r="12" fill="#1e293b" />
      <circle r="8"  fill="#334155" />
      <circle r="4"  fill="#64748b" />
      {/* Spokes */}
      <g className={isMoving ? 'wheel-spinning' : ''}>
        <line x1="-8" y1="0" x2="8" y2="0"  stroke="#94a3b8" strokeWidth="1.5"/>
        <line x1="0" y1="-8" x2="0" y2="8"  stroke="#94a3b8" strokeWidth="1.5"/>
        <line x1="-5.6" y1="-5.6" x2="5.6" y2="5.6" stroke="#94a3b8" strokeWidth="1.2"/>
        <line x1="5.6" y1="-5.6" x2="-5.6" y2="5.6"  stroke="#94a3b8" strokeWidth="1.2"/>
      </g>
    </g>
    {/* Front-rear wheel */}
    <g transform="translate(62, 76)">
      <circle r="12" fill="#1e293b" />
      <circle r="8"  fill="#334155" />
      <circle r="4"  fill="#64748b" />
      <g className={isMoving ? 'wheel-spinning' : ''}>
        <line x1="-8" y1="0" x2="8" y2="0"  stroke="#94a3b8" strokeWidth="1.5"/>
        <line x1="0" y1="-8" x2="0" y2="8"  stroke="#94a3b8" strokeWidth="1.5"/>
        <line x1="-5.6" y1="-5.6" x2="5.6" y2="5.6" stroke="#94a3b8" strokeWidth="1.2"/>
        <line x1="5.6" y1="-5.6" x2="-5.6" y2="5.6"  stroke="#94a3b8" strokeWidth="1.2"/>
      </g>
    </g>
    {/* Cab wheel */}
    <g transform="translate(126, 76)">
      <circle r="12" fill="#1e293b" />
      <circle r="8"  fill="#334155" />
      <circle r="4"  fill="#64748b" />
      <g className={isMoving ? 'wheel-spinning' : ''}>
        <line x1="-8" y1="0" x2="8" y2="0"  stroke="#94a3b8" strokeWidth="1.5"/>
        <line x1="0" y1="-8" x2="0" y2="8"  stroke="#94a3b8" strokeWidth="1.5"/>
        <line x1="-5.6" y1="-5.6" x2="5.6" y2="5.6" stroke="#94a3b8" strokeWidth="1.2"/>
        <line x1="5.6" y1="-5.6" x2="-5.6" y2="5.6"  stroke="#94a3b8" strokeWidth="1.2"/>
      </g>
    </g>
  </svg>
);

/* ═══════════════════════════════════════════════════
   CLOUD SVG
═══════════════════════════════════════════════════ */
const CloudSVG: React.FC<{ size?: number; opacity?: number }> = ({ size = 60, opacity = 0.8 }) => (
  <svg width={size} height={size * 0.6} viewBox="0 0 60 36" fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="30" cy="26" rx="26" ry="10" fill={`rgba(255,255,255,${opacity})`}/>
    <ellipse cx="22" cy="22" rx="14" ry="12" fill={`rgba(255,255,255,${opacity})`}/>
    <ellipse cx="38" cy="24" rx="12" ry="10" fill={`rgba(255,255,255,${opacity})`}/>
    <ellipse cx="30" cy="18" rx="10" ry="10" fill={`rgba(255,255,255,${opacity})`}/>
  </svg>
);

/* ═══════════════════════════════════════════════════
   TREE SVG
═══════════════════════════════════════════════════ */
const TreeSVG: React.FC<{ height?: number }> = ({ height = 40 }) => (
  <svg width={height * 0.65} height={height} viewBox="0 0 26 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="11" y="28" width="4" height="12" rx="2" fill="#8b5a2b"/>
    <ellipse cx="13" cy="22" rx="10" ry="12" fill="#22c55e"/>
    <ellipse cx="13" cy="16" rx="7" ry="9" fill="#16a34a"/>
    <ellipse cx="13" cy="11" rx="5" ry="7" fill="#15803d"/>
  </svg>
);

/* ═══════════════════════════════════════════════════
   WAREHOUSE ICON
═══════════════════════════════════════════════════ */
const WarehouseSVG: React.FC = () => (
  <svg width="52" height="52" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="4" y="20" width="44" height="28" rx="3" fill="var(--color-primary,#088178)" opacity="0.9"/>
    <polygon points="0,22 26,4 52,22" fill="#0a6b64"/>
    <rect x="20" y="30" width="12" height="18" rx="2" fill="rgba(255,255,255,0.3)"/>
    <rect x="8"  y="28" width="10" height="8" rx="1" fill="rgba(255,255,255,0.25)"/>
    <rect x="34" y="28" width="10" height="8" rx="1" fill="rgba(255,255,255,0.25)"/>
    <rect x="22" y="22" width="8"  height="4" rx="1" fill="rgba(255,255,255,0.4)"/>
    <text x="26" y="50" textAnchor="middle" fill="white" fontSize="5" fontWeight="700" fontFamily="Inter,sans-serif">START</text>
  </svg>
);

/* ═══════════════════════════════════════════════════
   HOUSE SVG
═══════════════════════════════════════════════════ */
const HouseSVG: React.FC = () => (
  <svg width="52" height="52" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="6" y="22" width="40" height="26" rx="2" fill="#f59e0b" opacity="0.9"/>
    <polygon points="2,24 26,4 50,24" fill="#d97706"/>
    <rect x="19" y="32" width="14" height="16" rx="2" fill="rgba(255,255,255,0.35)"/>
    <rect x="9"  y="28" width="9" height="7" rx="1" fill="rgba(255,255,255,0.3)"/>
    <rect x="34" y="28" width="9" height="7" rx="1" fill="rgba(255,255,255,0.3)"/>
    <rect x="24" y="14" width="4" height="4" rx="1" fill="rgba(255,255,255,0.5)"/>
    <text x="26" y="50" textAnchor="middle" fill="white" fontSize="5" fontWeight="700" fontFamily="Inter,sans-serif">HOME</text>
  </svg>
);

/* ═══════════════════════════════════════════════════
   LOADING BOXES (Step 2)
═══════════════════════════════════════════════════ */
const LoadingBoxes: React.FC = () => (
  <div style={{ position: 'absolute', top: '-24px', left: '50%', transform: 'translateX(-60%)', display: 'flex', gap: '6px', alignItems: 'flex-end' }}>
    {[
      { cls: 'loading-box1', color: '#f59e0b' },
      { cls: 'loading-box2', color: 'var(--color-primary)' },
      { cls: 'loading-box3', color: '#ec4899' },
    ].map((b, i) => (
      <div key={i} className={b.cls} style={{
        width: '16px', height: '16px', borderRadius: '3px',
        background: b.color, opacity: 0.9,
        boxShadow: `0 2px 6px ${b.color}55`,
      }}/>
    ))}
  </div>
);

/* ═══════════════════════════════════════════════════
   CONFETTI CELEBRATION (Step 4)
═══════════════════════════════════════════════════ */
const Confetti: React.FC = () => {
  const items = [
    { color: '#f59e0b', x: -30, y: -40, size: 8  },
    { color: '#ec4899', x:  20, y: -50, size: 6  },
    { color: '#3b82f6', x: -10, y: -35, size: 10 },
    { color: '#22c55e', x:  35, y: -42, size: 7  },
    { color: '#a855f7', x: -40, y: -28, size: 5  },
    { color: '#ef4444', x:  15, y: -55, size: 9  },
  ];
  return (
    <div style={{ position: 'absolute', top: '30%', left: '50%', pointerEvents: 'none' }}>
      {items.map((item, i) => (
        <div
          key={i}
          className="confetti-item"
          style={{
            position: 'absolute',
            width: item.size, height: item.size,
            borderRadius: '2px',
            background: item.color,
            left: item.x, top: item.y,
            animationDelay: `${i * 0.2}s`,
            boxShadow: `0 0 6px ${item.color}`,
          }}
        />
      ))}
      {/* Sparkle stars */}
      {[0,1,2,3].map((i) => (
        <div key={`s${i}`} className="sparkle" style={{
          position: 'absolute',
          width: 6, height: 6,
          borderRadius: '50%',
          background: '#fff',
          boxShadow: '0 0 8px #fff, 0 0 16px #f59e0b',
          left: [-20, 30, -35, 25][i],
          top: [-30, -45, -20, -55][i],
          animationDelay: `${i * 0.3}s`,
        }}/>
      ))}
    </div>
  );
};

/* ═══════════════════════════════════════════════════
   EXHAUST SMOKE (Step 3)
═══════════════════════════════════════════════════ */
const ExhaustSmoke: React.FC = () => (
  <div style={{ position: 'absolute', bottom: '28px', left: '-8px', pointerEvents: 'none' }}>
    {['exhaust-puff1','exhaust-puff2','exhaust-puff3'].map((cls, i) => (
      <div key={i} className={cls} style={{
        position: 'absolute',
        width: 14, height: 14,
        borderRadius: '50%',
        background: `rgba(180,180,180,${0.55 - i * 0.05})`,
        filter: 'blur(2px)',
        bottom: 0, left: 0,
      }}/>
    ))}
  </div>
);

/* ═══════════════════════════════════════════════════
   SPEED LINES (Step 3)
═══════════════════════════════════════════════════ */
const SpeedLines: React.FC = () => (
  <div style={{ position: 'absolute', right: '100%', top: '50%', transform: 'translateY(-50%)', display: 'flex', flexDirection: 'column', gap: '7px', paddingRight: '8px', pointerEvents: 'none' }}>
    {[30, 45, 28].map((w, i) => (
      <div key={i} className="speed-line" style={{
        width: w, height: 2, borderRadius: 2,
        background: 'linear-gradient(to right, transparent, rgba(8,129,120,0.5))',
      }}/>
    ))}
  </div>
);

/* ═══════════════════════════════════════════════════
   TRUCK ANIMATION SCENE
═══════════════════════════════════════════════════ */
interface SceneProps { step: number }

const TruckScene: React.FC<SceneProps> = ({ step }) => {
  // Truck horizontal position: step1=left(8%), step2=left(8%), step3=center(42%), step4=right(76%)
  const truckLeft = step === 1 ? 8 : step === 2 ? 8 : step === 3 ? 42 : 76;
  const isMoving    = step === 3;
  const isDelivered = step === 4;
  const isLoading   = step === 2;

  return (
    <div style={{
      width: '100%',
      height: '230px',
      borderRadius: '20px',
      overflow: 'hidden',
      position: 'relative',
      border: '1.5px solid var(--color-border-color)',
      boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
      userSelect: 'none',
    }}>
      {/* ── SKY GRADIENT ── */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(180deg, #bfdbfe 0%, #dbeafe 40%, #e0f2fe 70%, #f0fdf4 100%)',
      }}/>

      {/* ── SUN ── */}
      <div style={{
        position: 'absolute', top: 18, right: 36,
        width: 28, height: 28, borderRadius: '50%',
        background: 'radial-gradient(circle, #fde68a 40%, #fbbf24 100%)',
        boxShadow: '0 0 18px rgba(251,191,36,0.5)',
      }}/>

      {/* ── CLOUDS ── */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '70px', overflow: 'hidden' }}>
        <div className="cloud-layer">
          {[0,1,2,3].map(i => <CloudSVG key={i} size={70} opacity={0.9}/>)}
        </div>
        <div className="cloud-layer2">
          {[0,1,2,3].map(i => <CloudSVG key={i} size={48} opacity={0.65}/>)}
        </div>
      </div>

      {/* ── BACKGROUND BUILDINGS ── */}
      <div style={{ position: 'absolute', bottom: '68px', left: 0, right: 0, height: '50px', overflow: 'hidden', opacity: 0.25 }}>
        {[20,60,110,160,210,270,320,380,440,500].map((x, i) => (
          <div key={i} style={{
            position: 'absolute', bottom: 0, left: x,
            width: [18,24,16,20,22,18,14,26,20,16][i % 10],
            height: [38,50,30,44,36,42,28,48,34,40][i % 10],
            background: '#94a3b8',
            borderRadius: '3px 3px 0 0',
          }}/>
        ))}
      </div>

      {/* ── TREE LAYER (back) ── */}
      <div style={{ position: 'absolute', bottom: '68px', left: 0, right: 0, height: '44px', overflow: 'hidden' }}>
        <div className={isMoving ? 'tree-layer-slow' : ''} style={{ display: 'flex', gap: '90px', alignItems: 'flex-end' }}>
          {[0,1,2,3,4,5,6,7].map(i => <TreeSVG key={i} height={32}/>)}
        </div>
      </div>

      {/* ── ROAD ── */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        height: '72px',
        background: '#475569',
        borderTop: '3px solid #64748b',
      }}>
        {/* Road shoulder stripe */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: '#f8fafc', opacity: 0.6 }}/>
        {/* Centre lane dashes */}
        <div
          className={isMoving ? 'road-animate' : 'road-static'}
          style={{
            position: 'absolute',
            top: '50%', left: 0, right: 0,
            height: '4px',
            marginTop: '-2px',
            borderRadius: '2px',
          }}
        />
        {/* Road bottom stripe */}
        <div style={{ position: 'absolute', bottom: '8px', left: 0, right: 0, height: '3px', background: '#f8fafc', opacity: 0.5 }}/>
      </div>

      {/* ── TREE LAYER (front) ── */}
      <div style={{ position: 'absolute', bottom: '70px', left: 0, right: 0, height: '54px', overflow: 'hidden', zIndex: 2 }}>
        <div className={isMoving ? 'tree-layer-fast' : ''} style={{ display: 'flex', gap: '60px', alignItems: 'flex-end' }}>
          {[0,1,2,3,4,5,6,7].map(i => <TreeSVG key={i} height={42}/>)}
        </div>
      </div>

      {/* ── WAREHOUSE (left landmark) ── */}
      <div style={{
        position: 'absolute',
        bottom: '70px',
        left: '12px',
        zIndex: 3,
        opacity: step <= 2 ? 1 : 0.3,
        transition: 'opacity 0.8s ease',
      }}>
        <WarehouseSVG/>
      </div>

      {/* ── HOUSE (right landmark) ── */}
      <div style={{
        position: 'absolute',
        bottom: '70px',
        right: '12px',
        zIndex: 3,
        opacity: isDelivered ? 1 : 0.3,
        transition: 'opacity 0.8s ease',
      }}>
        <HouseSVG/>
        {isDelivered && <Confetti/>}
      </div>

      {/* ── TRUCK WRAPPER ── */}
      <div style={{
        position: 'absolute',
        bottom: '68px',
        left: `${truckLeft}%`,
        transform: 'translateX(-50%)',
        zIndex: 10,
        transition: 'left 1.5s cubic-bezier(0.4, 0, 0.2, 1)',
      }}>
        {/* Loading boxes above truck when step 2 */}
        {isLoading && <LoadingBoxes/>}

        {/* Speed lines behind truck when moving */}
        {isMoving && <SpeedLines/>}

        {/* Exhaust smoke */}
        {isMoving && <ExhaustSmoke/>}

        {/* Truck + animation class */}
        <div className={isMoving ? 'truck-driving' : isDelivered ? '' : 'truck-idle'}>
          <TruckSVG isMoving={isMoving} isDelivered={isDelivered}/>
        </div>
      </div>

      {/* ── STEP LABEL OVERLAY ── */}
      <div style={{
        position: 'absolute',
        top: '10px',
        left: '50%',
        transform: 'translateX(-50%)',
        background: 'rgba(255,255,255,0.85)',
        backdropFilter: 'blur(8px)',
        borderRadius: '20px',
        padding: '4px 16px',
        fontSize: '12px',
        fontWeight: 700,
        color: 'var(--color-primary)',
        border: '1px solid rgba(8,129,120,0.2)',
        whiteSpace: 'nowrap',
        zIndex: 20,
      }}>
        {step === 1 ? '📦 Waiting at Warehouse'
        : step === 2 ? '⚙️ Loading your order…'
        : step === 3 ? '🚛 Out for Delivery!'
        : '🎉 Delivered!'}
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════
   PROGRESS STEPPER
═══════════════════════════════════════════════════ */
interface StepDef { id: number; label: string; description: string; emoji: string }

const STEP_DEFS: StepDef[] = [
  { id: 1, label: 'Order Placed',  description: 'Your order has been confirmed',   emoji: '📦' },
  { id: 2, label: 'Processing',    description: 'Your order is being prepared',    emoji: '⚙️' },
  { id: 3, label: 'Shipped',       description: 'Your order is on the way',        emoji: '🚛' },
  { id: 4, label: 'Delivered',     description: 'Your order has been delivered',   emoji: '🏠' },
];

const ProgressStepper: React.FC<{ step: number }> = ({ step }) => {
  const isMobile = window.innerWidth < 540;

  return isMobile ? (
    /* ── VERTICAL (mobile) ── */
    <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
      {STEP_DEFS.map((s, idx) => {
        const done    = s.id < step;
        const active  = s.id === step;
        const pending = s.id > step;
        const isLast  = idx === STEP_DEFS.length - 1;
        return (
          <div key={s.id} style={{ display: 'flex', gap: '16px' }}>
            {/* Left column: circle + line */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: '44px' }}>
              <div
                className={active ? 'step-active-circle' : ''}
                style={{
                  width: 44, height: 44, borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '18px',
                  background: done
                    ? 'linear-gradient(135deg,#10b981,#059669)'
                    : active
                    ? 'linear-gradient(135deg,var(--color-primary),#06a39a)'
                    : 'var(--color-card-bg)',
                  border: pending ? '2.5px solid var(--color-border-color)' : 'none',
                  boxShadow: done
                    ? '0 4px 12px rgba(16,185,129,0.4)'
                    : active
                    ? '0 4px 16px rgba(8,129,120,0.4)'
                    : 'none',
                  flexShrink: 0,
                  transition: 'all 0.5s ease',
                }}
              >
                {done ? <span style={{ color: '#fff', fontSize: '20px' }}>✓</span> : s.emoji}
              </div>
              {!isLast && (
                <div style={{
                  width: '3px', flex: 1, minHeight: '36px',
                  margin: '4px 0',
                  background: done
                    ? 'linear-gradient(180deg,#10b981,#059669)'
                    : 'var(--color-border-color)',
                  borderRadius: '4px',
                  transition: 'background 0.5s ease',
                  ...(pending ? { backgroundImage: 'repeating-linear-gradient(180deg,var(--color-border-color) 0,var(--color-border-color) 6px,transparent 6px,transparent 12px)', background: 'none' } : {}),
                }}/>
              )}
            </div>
            {/* Right: text */}
            <div style={{ paddingTop: '8px', paddingBottom: isLast ? 0 : '28px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
                <strong style={{
                  fontSize: '15px', fontWeight: 700,
                  color: pending ? 'var(--color-text-light)' : active ? 'var(--color-primary)' : '#059669',
                  transition: 'color 0.3s ease',
                }}>
                  {s.label}
                </strong>
                {active && <span style={{ fontSize: '10px', fontWeight: 700, color: 'var(--color-primary)', background: 'var(--color-primary-light)', padding: '2px 8px', borderRadius: '20px' }}>CURRENT</span>}
                {done   && <span style={{ fontSize: '10px', fontWeight: 700, color: '#059669', background: 'rgba(16,185,129,0.12)', padding: '2px 8px', borderRadius: '20px' }}>✓ DONE</span>}
              </div>
              <p style={{ fontSize: '13px', color: pending ? 'var(--color-text-light)' : 'var(--color-text-p)', margin: 0 }}>
                {s.description}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  ) : (
    /* ── HORIZONTAL (desktop) ── */
    <div style={{ position: 'relative', padding: '0 8px' }}>
      {/* Rail */}
      <div style={{ position: 'absolute', top: '22px', left: '8%', right: '8%', height: '4px', background: 'var(--color-border-color)', borderRadius: '4px', zIndex: 0 }}/>
      {/* Progress fill */}
      <div style={{
        position: 'absolute', top: '22px', left: '8%', height: '4px',
        width: `${((step - 1) / 3) * 84}%`,
        background: 'linear-gradient(90deg, #10b981, var(--color-primary))',
        borderRadius: '4px', zIndex: 1,
        transition: 'width 0.8s cubic-bezier(0.4,0,0.2,1)',
      }}/>
      {/* Steps */}
      <div style={{ display: 'flex', justifyContent: 'space-between', position: 'relative', zIndex: 2 }}>
        {STEP_DEFS.map((s) => {
          const done    = s.id < step;
          const active  = s.id === step;
          const pending = s.id > step;
          return (
            <div key={s.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', flex: 1 }}>
              <div
                className={active ? 'step-active-circle' : ''}
                style={{
                  width: 44, height: 44, borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '18px',
                  background: done
                    ? 'linear-gradient(135deg,#10b981,#059669)'
                    : active
                    ? 'linear-gradient(135deg,var(--color-primary),#06a39a)'
                    : 'var(--color-card-bg)',
                  border: pending ? '2.5px solid var(--color-border-color)' : 'none',
                  boxShadow: done
                    ? '0 4px 12px rgba(16,185,129,0.35)'
                    : active
                    ? '0 4px 16px rgba(8,129,120,0.45)'
                    : 'none',
                  transform: active ? 'scale(1.15)' : 'scale(1)',
                  transition: 'all 0.5s ease',
                }}
              >
                {done ? <span style={{ color: '#fff', fontSize: '20px', fontWeight: 700 }}>✓</span> : s.emoji}
              </div>
              <div style={{ textAlign: 'center' }}>
                <p style={{
                  margin: '0 0 3px',
                  fontSize: '13px', fontWeight: 700,
                  color: pending ? 'var(--color-text-light)' : active ? 'var(--color-primary)' : '#059669',
                  transition: 'color 0.3s ease',
                }}>
                  {s.label}
                </p>
                <p style={{ margin: 0, fontSize: '11px', color: pending ? 'var(--color-text-light)' : 'var(--color-text-p)', lineHeight: 1.3 }}>
                  {s.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════
   STAR RATING
═══════════════════════════════════════════════════ */
const StarRating: React.FC<{ value: number; onChange: (v: number) => void }> = ({ value, onChange }) => {
  const [hovered, setHovered] = useState(0);
  return (
    <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
      {[1,2,3,4,5].map((star) => {
        const on = (hovered || value) >= star;
        return (
          <button key={star} type="button" id={`star-${star}`}
            onClick={() => onChange(star)}
            onMouseEnter={() => setHovered(star)}
            onMouseLeave={() => setHovered(0)}
            aria-label={`${star} star`}
            style={{
              background: 'none', border: 'none', padding: '4px', cursor: 'pointer',
              transform: on ? 'scale(1.2) rotate(-5deg)' : 'scale(1)',
              transition: 'transform 0.2s ease',
              filter: on ? 'drop-shadow(0 2px 6px rgba(245,158,11,0.5))' : 'none',
            }}
          >
            <svg width="36" height="36" viewBox="0 0 24 24" fill={on ? '#f59e0b' : 'none'}
              stroke={on ? '#f59e0b' : 'var(--color-border-color)'} strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>
            </svg>
          </button>
        );
      })}
    </div>
  );
};

/* ═══════════════════════════════════════════════════
   TOAST NOTIFICATION
═══════════════════════════════════════════════════ */
const Toast: React.FC<{ visible: boolean; message: string }> = ({ visible, message }) => (
  <div style={{
    position: 'fixed', bottom: '32px', left: '50%',
    transform: `translateX(-50%) translateY(${visible ? '0' : '16px'})`,
    background: 'linear-gradient(135deg, #10b981, #059669)',
    color: '#fff', padding: '14px 28px', borderRadius: '14px',
    fontSize: '14px', fontWeight: 700,
    boxShadow: '0 8px 32px rgba(16,185,129,0.4)',
    zIndex: 9999, whiteSpace: 'nowrap',
    opacity: visible ? 1 : 0,
    pointerEvents: visible ? 'auto' : 'none',
    transition: 'all 0.4s cubic-bezier(0.4,0,0.2,1)',
    display: 'flex', alignItems: 'center', gap: '8px',
  }}>
    ✓ {message}
  </div>
);

/* ═══════════════════════════════════════════════════
   MAIN PAGE
═══════════════════════════════════════════════════ */
const TrackOrder: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<number>(1);

  // Review state
  const [rating, setRating]       = useState(0);
  const [comment, setComment]     = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // ── Initialize step from localStorage on mount ──
  useEffect(() => {
    const s = getOrInitStep();
    setStep(s);
  }, []);

  // ── Countdown after review submitted ──
  useEffect(() => {
    if (submitted) {
      timerRef.current = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            navigate('/shop');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [submitted, navigate]);

  const handleSubmit = () => {
    if (rating === 0) {
      alert('Please select a star rating before submitting.');
      return;
    }
    localStorage.removeItem(STORAGE_KEY);
    localStorage.setItem('cara_feedback_submitted', 'true');
    setSubmitted(true);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 4000);
  };

  const goShop = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    navigate('/shop');
  };

  const orderId = sessionStorage.getItem('lastOrderId') || '#CARA-IND-0909';
  const ratingLabels = ['', 'Poor 😞', 'Fair 😐', 'Good 🙂', 'Great 😊', 'Excellent 🤩'];

  return (
    <>
      {/* ── Inject CSS once ── */}
      <style dangerouslySetInnerHTML={{ __html: ANIMATION_CSS }}/>

      {/* ══════════════ PAGE HEADER ══════════════ */}
      <section style={{
        display: 'flex', flexDirection: 'column',
        justifyContent: 'center', alignItems: 'center',
        textAlign: 'center', padding: '14px',
        backgroundImage: "url('/images/banner/b1.jpg')",
        backgroundSize: 'cover', backgroundPosition: 'center',
        height: '20vh', width: '100%',
      }}>
        <h2 style={{ color: '#fff', fontSize: 'clamp(28px,6vw,46px)', fontWeight: 700, lineHeight: 1.2, margin: 0 }}>
          Track Your Order
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '16px', marginTop: '10px', lineHeight: 1.65 }}>
          Follow your package's journey in real-time
        </p>
      </section>

      {/* ══════════════ MAIN CONTENT ══════════════ */}
      <section style={{
        padding: 'clamp(24px,4vw,56px) clamp(16px,4vw,80px)',
        minHeight: '70vh',
        background: 'var(--color-bg-color)',
      }}>
        <div style={{
          maxWidth: '760px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '28px',
        }}>

          {/* ── Order ID badge ── */}
          <div className="fade-up" style={{
            display: 'flex', alignItems: 'center', gap: '10px',
            padding: '12px 18px',
            background: 'var(--color-primary-light)',
            borderRadius: '12px',
            border: '1px solid rgba(8,129,120,0.2)',
          }}>
            <span style={{ fontSize: '20px' }}>📦</span>
            <span style={{ fontSize: '14px', color: 'var(--color-text-p)' }}>Tracking order:</span>
            <strong style={{ fontSize: '15px', color: 'var(--color-primary)', letterSpacing: '0.5px' }}>
              {orderId}
            </strong>
            <span style={{
              marginLeft: 'auto', fontSize: '12px', fontWeight: 700,
              color: step === 4 ? '#059669' : 'var(--color-primary)',
              background: step === 4 ? 'rgba(16,185,129,0.12)' : 'var(--color-primary-light)',
              padding: '3px 10px', borderRadius: '20px',
              border: `1px solid ${step === 4 ? 'rgba(16,185,129,0.3)' : 'rgba(8,129,120,0.2)'}`,
            }}>
              Step {step} / 4
            </span>
          </div>

          {/* ════════════════════════════════════════
              1. TRUCK ANIMATION SCENE (own container)
          ════════════════════════════════════════ */}
          <div className="fade-up" style={{ animationDelay: '0.1s' }}>
            <TruckScene step={step}/>
          </div>

          {/* ════════════════════════════════════════
              2. PROGRESS STEPPER (own card)
          ════════════════════════════════════════ */}
          <div className="fade-up" style={{
            background: 'var(--color-card-bg)',
            borderRadius: '20px',
            padding: 'clamp(20px,3vw,36px)',
            border: '1px solid var(--color-border-color)',
            boxShadow: 'var(--color-card-shadow)',
            animationDelay: '0.15s',
          }}>
            <h3 style={{ textAlign: 'center', fontSize: '16px', fontWeight: 700, color: 'var(--color-text-main)', margin: '0 0 28px' }}>
              Order Progress
            </h3>
            <ProgressStepper step={step}/>

            {/* Helper nudge */}
            <p style={{
              textAlign: 'center', marginTop: '24px', marginBottom: 0,
              fontSize: '12px', color: 'var(--color-text-light)', fontStyle: 'italic',
            }}>
              {step < 4
                ? `Refresh this page to simulate the next stage (Step ${step} of 4)`
                : '🎉 Your order journey is complete!'}
            </p>
          </div>

          {/* ════════════════════════════════════════
              3. THANK YOU CARD (Step 4 only)
          ════════════════════════════════════════ */}
          {step === 4 && (
            <div className="pop-in" style={{
              background: 'linear-gradient(135deg, rgba(16,185,129,0.1) 0%, rgba(8,129,120,0.06) 100%)',
              border: '1.5px solid rgba(16,185,129,0.35)',
              borderRadius: '20px',
              padding: 'clamp(20px,3vw,36px)',
              textAlign: 'center',
              boxShadow: '0 4px 24px rgba(16,185,129,0.12)',
            }}>
              <div style={{
                width: '72px', height: '72px', borderRadius: '50%',
                background: 'linear-gradient(135deg,#10b981,#059669)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 16px',
                boxShadow: '0 8px 28px rgba(16,185,129,0.45)',
                fontSize: '32px',
              }}>
                ✓
              </div>
              <h2 style={{ fontSize: 'clamp(18px,3vw,24px)', fontWeight: 800, color: 'var(--color-text-main)', margin: '0 0 10px' }}>
                🎉 Thank you for your purchase!
              </h2>
              <p style={{ fontSize: '15px', color: 'var(--color-text-p)', margin: 0, lineHeight: 1.7 }}>
                Your order has been delivered successfully. We hope you love your purchase!
              </p>
            </div>
          )}

          {/* ════════════════════════════════════════
              4. RATING & REVIEW SECTION (Step 4 only)
          ════════════════════════════════════════ */}
          {step === 4 && !submitted && (
            <div className="fade-up" style={{
              background: 'var(--color-card-bg)',
              border: '1px solid var(--color-border-color)',
              borderRadius: '20px',
              padding: 'clamp(20px,3vw,36px)',
              boxShadow: 'var(--color-card-shadow)',
            }}>
              <h3 style={{ textAlign: 'center', fontSize: '20px', fontWeight: 800, color: 'var(--color-text-main)', margin: '0 0 6px' }}>
                Rate Your Experience
              </h3>
              <p style={{ textAlign: 'center', fontSize: '14px', color: 'var(--color-text-p)', margin: '0 0 24px' }}>
                How was your delivery experience?
              </p>

              <StarRating value={rating} onChange={setRating}/>

              {rating > 0 && (
                <p style={{ textAlign: 'center', marginTop: '8px', marginBottom: '0', fontSize: '14px', fontWeight: 700, color: '#f59e0b' }}>
                  {ratingLabels[rating]}
                </p>
              )}

              <textarea
                id="review-textarea"
                placeholder="Share your feedback with us..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={4}
                style={{
                  width: '100%', marginTop: '20px',
                  padding: '14px 16px',
                  background: 'var(--color-bg-color)',
                  border: '1.5px solid var(--color-border-color)',
                  borderRadius: '12px',
                  fontSize: '14px', color: 'var(--color-text-main)',
                  resize: 'vertical', outline: 'none',
                  fontFamily: 'inherit',
                  transition: 'border-color 0.25s ease',
                  boxSizing: 'border-box',
                }}
                onFocus={(e) => { e.currentTarget.style.borderColor = 'var(--color-primary)'; }}
                onBlur={(e)  => { e.currentTarget.style.borderColor = 'var(--color-border-color)'; }}
              />

              <button
                id="submit-review-btn"
                type="button"
                onClick={handleSubmit}
                style={{
                  marginTop: '16px', width: '100%',
                  padding: '16px',
                  background: 'linear-gradient(135deg, var(--color-primary), #06a39a)',
                  color: '#fff', border: 'none',
                  borderRadius: '14px',
                  fontSize: '16px', fontWeight: 700,
                  cursor: 'pointer', letterSpacing: '0.5px',
                  boxShadow: '0 4px 18px rgba(8,129,120,0.4)',
                  transition: 'all 0.3s ease',
                  display: 'flex', alignItems: 'center',
                  justifyContent: 'center', gap: '8px',
                }}
                onMouseEnter={(e) => { const el = e.currentTarget; el.style.transform='translateY(-2px)'; el.style.boxShadow='0 8px 28px rgba(8,129,120,0.5)'; }}
                onMouseLeave={(e) => { const el = e.currentTarget; el.style.transform='translateY(0)'; el.style.boxShadow='0 4px 18px rgba(8,129,120,0.4)'; }}
              >
                ⭐ Submit Review
              </button>
            </div>
          )}

          {/* ════════════════════════════════════════
              5. POST-SUBMIT: Countdown + Continue Button
          ════════════════════════════════════════ */}
          {submitted && (
            <div className="pop-in" style={{
              background: 'var(--color-card-bg)',
              border: '1px solid var(--color-border-color)',
              borderRadius: '20px',
              padding: '28px',
              textAlign: 'center',
              boxShadow: 'var(--color-card-shadow)',
            }}>
              <div style={{ fontSize: '48px', marginBottom: '12px' }}>🛍️</div>
              <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--color-text-main)', margin: '0 0 6px' }}>
                Thank you for your review!
              </h3>
              <p style={{ fontSize: '14px', color: 'var(--color-text-p)', margin: '0 0 20px' }}>
                Redirecting you to the shop in <strong style={{ color: 'var(--color-primary)', fontSize: '18px' }}>{countdown}</strong> seconds…
              </p>

              {/* Progress bar for countdown */}
              <div style={{ height: '4px', background: 'var(--color-border-color)', borderRadius: '4px', marginBottom: '20px', overflow: 'hidden' }}>
                <div style={{
                  height: '100%',
                  width: `${((3 - countdown) / 3) * 100}%`,
                  background: 'linear-gradient(90deg, var(--color-primary), #10b981)',
                  borderRadius: '4px',
                  transition: 'width 1s linear',
                }}/>
              </div>

              <button
                id="continue-shopping-btn"
                type="button"
                onClick={goShop}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '8px',
                  padding: '14px 32px',
                  background: 'linear-gradient(135deg, var(--color-primary), #06a39a)',
                  color: '#fff', border: 'none',
                  borderRadius: '50px',
                  fontSize: '15px', fontWeight: 700,
                  cursor: 'pointer', letterSpacing: '0.3px',
                  boxShadow: '0 4px 18px rgba(8,129,120,0.4)',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => { const el = e.currentTarget; el.style.transform='translateY(-2px)'; el.style.boxShadow='0 8px 28px rgba(8,129,120,0.5)'; }}
                onMouseLeave={(e) => { const el = e.currentTarget; el.style.transform='translateY(0)'; el.style.boxShadow='0 4px 18px rgba(8,129,120,0.4)'; }}
              >
                🛒 Continue Shopping →
              </button>
            </div>
          )}

        </div>
      </section>

      {/* ── TOAST ── */}
      <Toast visible={showToast} message="Thank you for your review! Redirecting to shop…"/>
    </>
  );
};

export default TrackOrder;
