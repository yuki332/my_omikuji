import React from 'react';

export const MysticParticles: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      
      {/* 1. Divine Light Beams / Sunbeams (御光・神威の光芒) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[700px] opacity-40 pointer-events-none animate-ray">
        <div className="w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#FFE892]/60 via-[#FFF5D6]/20 to-transparent" />
      </div>

      {/* Light Rays Cone shapes */}
      <div className="absolute top-[-50px] left-[10%] w-[300px] h-[800px] bg-gradient-to-b from-[#FFF5C3]/40 via-[#FFE892]/10 to-transparent transform -rotate-12 blur-2xl opacity-60 animate-ray" style={{ animationDelay: '1s' }} />
      <div className="absolute top-[-50px] right-[10%] w-[350px] h-[850px] bg-gradient-to-b from-[#FFF5C3]/40 via-[#FFE1EC]/15 to-transparent transform rotate-12 blur-2xl opacity-60 animate-ray" style={{ animationDelay: '3s' }} />
      <div className="absolute top-[-50px] left-[40%] w-[250px] h-[750px] bg-gradient-to-b from-[#FFE892]/50 via-[#E2F5ED]/15 to-transparent blur-2xl opacity-70 animate-ray" style={{ animationDelay: '2s' }} />

      {/* 2. Mystical Divine Aura Orbs (御神気の光環) */}
      <div className="absolute top-[-10%] left-[15%] w-[550px] h-[550px] bg-gradient-to-br from-[#FFF5C3]/80 via-[#FFE1EC]/45 to-transparent rounded-full blur-3xl animate-divine-aura" />
      <div className="absolute top-[35%] right-[-10%] w-[500px] h-[500px] bg-gradient-to-tl from-[#E2F5ED]/70 via-[#FFF3D6]/60 to-transparent rounded-full blur-3xl animate-divine-aura" style={{ animationDelay: '2.5s' }} />
      <div className="absolute bottom-[-15%] left-[25%] w-[600px] h-[600px] bg-gradient-to-tr from-[#FFF8DC]/90 via-[#F3E5F5]/50 to-transparent rounded-full blur-3xl animate-divine-aura" style={{ animationDelay: '5s' }} />

      {/* 3. Sacred Torii Gate Silhouette Watermark Background Motif (鳥居の神聖シルエット) */}
      <div className="absolute top-[8%] left-1/2 -translate-x-1/2 opacity-[0.06] text-[#8B6208] flex flex-col items-center pointer-events-none select-none">
        <svg className="w-[320px] h-[220px] sm:w-[480px] sm:h-[320px]" viewBox="0 0 200 140" fill="currentColor">
          {/* Torii Gate Outline */}
          <path d="M10 20 C60 12, 140 12, 190 20 L186 28 C140 22, 60 22, 14 28 Z" />
          <path d="M20 34 H180 V40 H20 Z" />
          <path d="M35 25 V130 H48 V25 Z" />
          <path d="M152 25 V130 H165 V25 Z" />
          <path d="M92 40 V65 H108 V40 Z" />
          {/* Sacred Sun Circle behind Torii */}
          <circle cx="100" cy="75" r="38" fill="currentColor" opacity="0.4" />
        </svg>
      </div>

      {/* 4. Floating Shimmering Divine Spirit Orbs (神霊の光玉) */}
      <div className="absolute top-[10%] left-[8%] w-4 h-4 bg-[#FFE892] rounded-full blur-[2px] shadow-[0_0_12px_#FFE892] animate-particle-1" style={{ animationDelay: '0s' }} />
      <div className="absolute top-[20%] right-[12%] w-3 h-3 bg-[#D4AF37] rounded-full blur-[1px] shadow-[0_0_10px_#D4AF37] animate-particle-2" style={{ animationDelay: '2s' }} />
      <div className="absolute top-[45%] left-[18%] w-3.5 h-3.5 bg-[#FBCFE8] rounded-full blur-[1.5px] shadow-[0_0_10px_#FBCFE8] animate-particle-3" style={{ animationDelay: '4s' }} />
      <div className="absolute top-[65%] right-[22%] w-4 h-4 bg-[#A7F3D0] rounded-full blur-[2px] shadow-[0_0_12px_#A7F3D0] animate-particle-1" style={{ animationDelay: '6s' }} />
      <div className="absolute top-[75%] left-[30%] w-3 h-3 bg-[#FFE892] rounded-full blur-[1px] shadow-[0_0_8px_#FFE892] animate-particle-2" style={{ animationDelay: '3s' }} />
      <div className="absolute top-[85%] right-[8%] w-4 h-4 bg-[#FDE68A] rounded-full blur-[1.5px] shadow-[0_0_12px_#FDE68A] animate-particle-3" style={{ animationDelay: '8s' }} />

      {/* 5. Floating Sacred Sakura & Paper Shide Petals (桜・紙垂の舞) */}
      <div className="absolute left-[12%] animate-particle-1 opacity-70" style={{ animationDelay: '1s' }}>
        <div className="w-3 h-4 bg-gradient-to-br from-[#FBCFE8] to-[#FFF3D6] rounded-tl-full rounded-br-full rotate-45 shadow-sm" />
      </div>
      <div className="absolute left-[82%] animate-particle-2 opacity-60" style={{ animationDelay: '5s' }}>
        <div className="w-2.5 h-3.5 bg-gradient-to-br from-[#F472B6] to-[#FDE68A] rounded-tl-full rounded-br-full -rotate-12 shadow-sm" />
      </div>
      <div className="absolute left-[45%] animate-particle-3 opacity-60" style={{ animationDelay: '9s' }}>
        <div className="w-3 h-3.5 bg-gradient-to-br from-[#FBCFE8] to-[#FFFFFF] rounded-tr-full rounded-bl-full rotate-12 shadow-sm" />
      </div>
      <div className="absolute left-[68%] animate-particle-1 opacity-70" style={{ animationDelay: '3s' }}>
        <div className="w-2 h-3 bg-gradient-to-br from-[#FDE68A] to-[#FFF8DC] rounded-tl-full rounded-br-full rotate-90 shadow-sm" />
      </div>

    </div>
  );
};
