
import React from 'react';

/**
 * مكون شعار "طويق" (Minimalist KSA Map)
 * خريطة رسومية بسيطة جداً للمملكة تعبر عن الهوية الوطنية بأسلوب عصري
 */
export const SaudiMap: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-6 w-full animate-fade-in group">
      <div className="relative flex flex-col items-center justify-center transition-transform duration-700 group-hover:scale-105">
        
        {/* رسم تخطيطي بسيط جداً لخريطة المملكة العربية السعودية */}
        <svg viewBox="0 0 200 160" className="w-48 h-36 mb-6 drop-shadow-sm">
          <path 
            d="M25,60 L45,40 L80,30 L120,25 L160,35 L175,60 L170,90 L150,110 L120,135 L90,140 L60,130 L40,115 L20,95 L15,80 Z" 
            fill="#006C35" 
            className="opacity-90"
          />
          {/* لمسة فنية بسيطة توحي بالتضاريس أو العمق بدون تفاصيل مشوهة */}
          <path 
            d="M80,30 L120,25 L160,35 L140,60 L100,70 L60,60 Z" 
            fill="#C5A059" 
            opacity="0.2"
          />
        </svg>

        {/* كلمة طويق بخط سعودي أصيل تحت الخريطة */}
        <div className="text-center">
          <h2 className="text-5xl font-black text-[#4A2C2A] leading-none mb-2" style={{ fontFamily: "'Tajawal', sans-serif" }}>طويق</h2>
          <div className="flex items-center justify-center gap-1.5">
             <div className="w-1.5 h-1.5 bg-[#C5A059] rounded-full"></div>
             <div className="w-10 h-[1px] bg-[#4A2C2A]/10"></div>
             <div className="w-1.5 h-1.5 bg-[#C5A059] rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
