import React from 'react';

export const MysticParticles: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Mystical Divine Lights (御光 / 神秘のオーラ) */}
      <div className="absolute top-[-10%] left-[20%] w-[500px] h-[500px] bg-gradient-to-br from-[#FFF5C3]/70 via-[#FFE1EC]/40 to-transparent rounded-full blur-3xl animate-divine-aura" />
      <div className="absolute top-[40%] right-[-5%] w-[450px] h-[450px] bg-gradient-to-tl from-[#E2F5ED]/60 via-[#FFF3D6]/50 to-transparent rounded-full blur-3xl animate-divine-aura" style={{ animationDelay: '2s' }} />
      <div className="absolute bottom-[-10%] left-[30%] w-[550px] h-[550px] bg-gradient-to-tr from-[#FFF8DC]/80 via-[#F3E5F5]/40 to-transparent rounded-full blur-3xl animate-divine-aura" style={{ animationDelay: '4s' }} />

      {/* Floating Shimmering Light Orbs */}
      <div className="absolute top-[15%] left-[15%] w-3 h-3 bg-[#FFE892] rounded-full blur-[1px] animate-particle" style={{ animationDuration: '5s' }} />
      <div className="absolute top-[25%] right-[20%] w-2 h-2 bg-[#D4AF37] rounded-full blur-[1px] animate-particle" style={{ animationDuration: '6s', animationDelay: '1.5s' }} />
      <div className="absolute top-[55%] left-[8%] w-2.5 h-2.5 bg-[#FBCFE8] rounded-full blur-[1px] animate-particle" style={{ animationDuration: '7s', animationDelay: '0.8s' }} />
      <div className="absolute top-[70%] right-[12%] w-3 h-3 bg-[#A7F3D0] rounded-full blur-[1px] animate-particle" style={{ animationDuration: '5.5s', animationDelay: '2.5s' }} />
      <div className="absolute top-[80%] left-[35%] w-2 h-2 bg-[#FFE892] rounded-full blur-[1px] animate-particle" style={{ animationDuration: '6.5s', animationDelay: '3s' }} />
    </div>
  );
};
