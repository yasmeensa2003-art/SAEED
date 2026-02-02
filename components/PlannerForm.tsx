
import React, { useState } from 'react';

interface PlannerFormProps {
  onGenerate: (data: any) => void;
}

export const PlannerForm: React.FC<PlannerFormProps> = ({ onGenerate }) => {
  const [city, setCity] = useState('riyadh');
  const [days, setDays] = useState(3);
  const [peopleCount, setPeopleCount] = useState(2);
  const [budget, setBudget] = useState('medium');
  const [travelStyle, setTravelStyle] = useState('family');
  const [interests, setInterests] = useState<string[]>(['تاريخ']);
  const [isLoading, setIsLoading] = useState(false);

  // قائمة شاملة لمدن المملكة العربية السعودية
  const saudiCities = [
    { group: "المنطقة الوسطى", cities: [
      { id: 'riyadh', name: 'الرياض', icon: '🏙️' },
      { id: 'qassim', name: 'القصيم (بريدة)', icon: '🌴' },
      { id: 'alkharj', name: 'الخرج', icon: '🚜' },
      { id: 'unaizah', name: 'عنيزة', icon: '🏘️' },
    ]},
    { group: "المنطقة الغربية", cities: [
      { id: 'jeddah', name: 'جدة', icon: '🌊' },
      { id: 'makkah', name: 'مكة المكرمة', icon: '🕋' },
      { id: 'madinah', name: 'المدينة المنورة', icon: '🕌' },
      { id: 'taif', name: 'الطائف', icon: '🌹' },
      { id: 'yanbu', name: 'ينبع', icon: '⚓' },
    ]},
    { group: "المنطقة الشرقية", cities: [
      { id: 'dammam', name: 'الدمام', icon: '🏢' },
      { id: 'khobar', name: 'الخبر', icon: '🌉' },
      { id: 'alhasa', name: 'الأحساء', icon: '🌴' },
      { id: 'jubail', name: 'الجبيل', icon: '🏭' },
      { id: 'hafr-al-batin', name: 'حفر الباطن', icon: '🏜️' },
    ]},
    { group: "المنطقة الشمالية", cities: [
      { id: 'tabuk', name: 'تبوك', icon: '❄️' },
      { id: 'hail', name: 'حائل', icon: '⛰️' },
      { id: 'alula', name: 'العلا', icon: '🏜️' },
      { id: 'arar', name: 'عرعر', icon: '🐪' },
      { id: 'sakaka', name: 'سكاكا', icon: '🏛️' },
    ]},
    { group: "المنطقة الجنوبية", cities: [
      { id: 'abha', name: 'أبها', icon: '☁️' },
      { id: 'jizan', name: 'جيزان', icon: '🛶' },
      { id: 'najran', name: 'نجران', icon: '🏰' },
      { id: 'al-baha', name: 'الباحة', icon: '⛰️' },
      { id: 'khamis-mushait', name: 'خميس مشيط', icon: '🏘️' },
    ]}
  ];

  const toggleInterest = (interest: string) => {
    setInterests(prev => 
      prev.includes(interest) ? prev.filter(i => i !== interest) : [...prev, interest]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const tripData = { city, days, peopleCount, budget, travelStyle, interests };
    
    setTimeout(() => {
      setIsLoading(false);
      onGenerate(tripData);
    }, 1200);
  };

  return (
    <div className="bg-white rounded-[3rem] shadow-[0_15px_40px_rgba(0,0,0,0.03)] p-8 border border-gray-50 relative overflow-hidden">
      <div className="relative z-10">
        <h3 className="text-xl font-black text-[#4A2C2A] mb-8 flex items-center gap-3">
          <span className="bg-[#8B5E3C] text-white w-10 h-10 rounded-2xl text-lg flex items-center justify-center">✨</span>
          خطط رحلتك بـ Ai
        </h3>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="block text-[10px] font-black text-gray-400 mr-2 uppercase tracking-widest">اختر مدينة من المملكة</label>
            <div className="relative">
              <select 
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full bg-[#FDFBFA] border border-[#F1E9DB] rounded-2xl px-5 py-4 text-sm font-black text-[#4A2C2A] focus:ring-2 focus:ring-[#8B5E3C] outline-none transition-all appearance-none"
              >
                {saudiCities.map((group) => (
                  <optgroup key={group.group} label={group.group}>
                    {group.cities.map((c) => (
                      <option key={c.id} value={c.id}>{c.icon} {c.name}</option>
                    ))}
                  </optgroup>
                ))}
              </select>
              <div className="absolute left-5 top-1/2 -translate-y-1/2 pointer-events-none text-[#C5A059] text-xs">
                ▼
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-[10px] font-black text-gray-400 mr-2 uppercase tracking-widest">عدد الأيام</label>
              <div className="flex items-center bg-[#FDFBFA] rounded-2xl border border-[#F1E9DB] p-1">
                <button type="button" onClick={() => setDays(Math.max(1, days - 1))} className="w-10 h-10 flex items-center justify-center bg-white rounded-xl text-[#8B5E3C] font-black shadow-sm">–</button>
                <span className="flex-1 text-center font-black text-sm">{days}</span>
                <button type="button" onClick={() => setDays(Math.min(30, days + 1))} className="w-10 h-10 flex items-center justify-center bg-white rounded-xl text-[#8B5E3C] font-black shadow-sm">+</button>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-[10px] font-black text-gray-400 mr-2 uppercase tracking-widest">عدد الأفراد</label>
              <div className="flex items-center bg-[#FDFBFA] rounded-2xl border border-[#F1E9DB] p-1">
                <button type="button" onClick={() => setPeopleCount(Math.max(1, peopleCount - 1))} className="w-10 h-10 flex items-center justify-center bg-white rounded-xl text-[#8B5E3C] font-black shadow-sm">–</button>
                <span className="flex-1 text-center font-black text-sm">{peopleCount}</span>
                <button type="button" onClick={() => setPeopleCount(Math.min(20, peopleCount + 1))} className="w-10 h-10 flex items-center justify-center bg-white rounded-xl text-[#8B5E3C] font-black shadow-sm">+</button>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <label className="block text-[10px] font-black text-gray-400 mr-2 uppercase tracking-widest">الميزانية المقترحة</label>
            <div className="flex bg-[#FDFBFA] p-1 rounded-2xl border border-[#F1E9DB]">
              {['low', 'medium', 'high'].map((b) => (
                <button
                  key={b}
                  type="button"
                  onClick={() => setBudget(b)}
                  className={`flex-1 py-3 rounded-xl text-[10px] font-black transition-all ${
                    budget === b ? 'bg-[#8B5E3C] text-white shadow-md' : 'text-gray-400'
                  }`}
                >
                  {b === 'low' ? 'اقتصادية' : b === 'medium' ? 'متوسطة' : 'فاخرة'}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <label className="block text-[10px] font-black text-gray-400 mr-2 uppercase tracking-widest">اهتماماتك</label>
            <div className="flex flex-wrap gap-2">
              {['تاريخ', 'طبيعة', 'تسوق', 'مغامرة', 'بحر', 'مطاعم'].map((interest) => (
                <button
                  key={interest}
                  type="button"
                  onClick={() => toggleInterest(interest)}
                  className={`px-4 py-2 rounded-full text-[10px] font-black border transition-all ${
                    interests.includes(interest) 
                    ? 'bg-[#C5A059] text-white border-[#C5A059] shadow-sm' 
                    : 'bg-white text-gray-400 border-gray-100'
                  }`}
                >
                  {interest}
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#8B5E3C] text-white py-5 rounded-2xl font-black text-sm shadow-xl hover:shadow-[#8B5E3C]/20 transition transform active:scale-95 disabled:opacity-50 flex items-center justify-center gap-3"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : (
              <>توليد البرنامج الذكي</>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
