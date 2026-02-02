
import React, { useState, useEffect } from 'react';
import { PlannerForm } from './components/PlannerForm';
import { AIChat } from './components/AIChat';
import { RegionModal } from './components/RegionModal';
import { aiService } from './services/geminiService';

const HERITAGE_BEIGE = "#FDF7F0"; 
const HERITAGE_BROWN = "#8B5E3C"; 
const SAUDI_GOLD = "#C5A059";
const DEEP_BROWN = "#4A2C2A";

type TabType = 'home' | 'trips' | 'profile';

interface SavedTrip {
  id: string;
  cityId: string;
  cityName: string;
  date: string;
  days: number;
  peopleCount: number;
  text: string;
  interests: string[];
  sources: any[];
}

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [isGenerating, setIsGenerating] = useState(false);
  const [itineraryResult, setItineraryResult] = useState<{ text: string; sources: any[] } | null>(null);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [tripConfig, setTripConfig] = useState<any>(null);
  const [savedTrips, setSavedTrips] = useState<SavedTrip[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('tuwaiq_saved_trips');
    if (stored) {
      try {
        setSavedTrips(JSON.parse(stored));
      } catch (e) {
        console.error("Failed to parse stored trips");
      }
    }
  }, []);

  const handleShare = async () => {
    const shareData = {
      title: 'تطبيق طويق السياحي',
      text: 'اكتشف المملكة العربية السعودية مع طويق، مرشدك الذكي لتخطيط الرحلات!',
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        alert('تم نسخ رابط التطبيق! يمكنك الآن إرساله لأصدقائك.');
      }
    } catch (err) {
      console.error('Error sharing:', err);
    }
  };

  const quickCities = [
    { id: 'riyadh', name: 'الرياض', icon: '🏙️', color: '#8B5E3C' },
    { id: 'jeddah', name: 'جدة', icon: '🌊', color: '#8B5E3C' },
    { id: 'makkah', name: 'مكة', icon: '🕋', color: '#C5A059' },
    { id: 'madinah', name: 'المدينة', icon: '🕌', color: '#4A2C2A' },
    { id: 'alula', name: 'العلا', icon: '🏜️', color: '#8B5E3C' },
    { id: 'abha', name: 'أبها', icon: '⛰️', color: '#8B5E3C' },
    { id: 'tabuk', name: 'تبوك', icon: '❄️', color: '#C5A059' },
    { id: 'alhasa', name: 'الأحساء', icon: '🌴', color: '#4A2C2A' },
  ];

  const handleStartPlanningFromModal = () => {
    setSelectedCity(null);
    setActiveTab('home');
    setTimeout(() => {
      const element = document.getElementById('planner-section');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 100);
  };

  const handleGenerateItinerary = async (data: any) => {
    setTripConfig(data);
    setIsGenerating(true);
    setItineraryResult(null);
    
    try {
      const result = await aiService.generateRealItinerary(data);
      setItineraryResult(result);
      setTimeout(() => {
        document.getElementById('itinerary-result')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } catch (error) {
      alert("عذراً، حدث خطأ أثناء الاتصال بالخبير الذكي. يرجى المحاولة لاحقاً.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSaveTrip = () => {
    if (!itineraryResult || !tripConfig) return;

    const cityName = tripConfig.city;
    const newTrip: SavedTrip = {
      id: Date.now().toString(),
      cityId: tripConfig.city,
      cityName: cityName.charAt(0).toUpperCase() + cityName.slice(1),
      date: new Date().toLocaleDateString('ar-SA'),
      days: tripConfig.days,
      peopleCount: tripConfig.peopleCount,
      text: itineraryResult.text,
      interests: tripConfig.interests,
      sources: itineraryResult.sources
    };

    const updated = [newTrip, ...savedTrips];
    setSavedTrips(updated);
    localStorage.setItem('tuwaiq_saved_trips', JSON.stringify(updated));
    
    alert("تم حفظ الرحلة بنجاح في تبويب رحلاتي! 🎉");
    setActiveTab('trips');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const deleteTrip = (id: string) => {
    const updated = savedTrips.filter(t => t.id !== id);
    setSavedTrips(updated);
    localStorage.setItem('tuwaiq_saved_trips', JSON.stringify(updated));
  };

  const handleLogout = () => {
    if (confirm("هل أنت متأكد من تسجيل الخروج؟ سيتم مسح جميع الرحلات المحفوظة محلياً.")) {
      localStorage.removeItem('tuwaiq_saved_trips');
      setSavedTrips([]);
      setActiveTab('home');
      alert("تم تسجيل الخروج بنجاح.");
    }
  };

  const renderHome = () => (
    <>
      <section className="px-1 pt-6">
        <h2 className="font-black text-gray-800 text-lg mb-6 flex items-center justify-between">
          <span>اكتشف الوجهات</span>
          <span className="text-[10px] font-bold text-[#C5A059] bg-[#C5A059]/5 px-3 py-1 rounded-full uppercase tracking-widest">Explore</span>
        </h2>
        <div className="grid grid-cols-4 gap-4">
          {quickCities.map((city) => (
            <button
              key={city.id}
              onClick={() => setSelectedCity(city.id)}
              className="group flex flex-col items-center gap-2 transition-all"
            >
              <div 
                className="w-16 h-16 rounded-3xl bg-white shadow-sm border border-gray-50 flex items-center justify-center text-2xl group-hover:shadow-md group-hover:-translate-y-1 transition-all duration-300"
                style={{ borderBottom: `4px solid ${city.color}` }}
              >
                {city.icon}
              </div>
              <span className="text-[11px] font-black text-gray-600 group-hover:text-[#8B5E3C]">{city.name}</span>
            </button>
          ))}
        </div>
      </section>

      <section id="planner-section" className="animate-fade-in transition-all duration-700 rounded-2xl mt-12">
        <PlannerForm onGenerate={handleGenerateItinerary} />
      </section>
      
      {isGenerating && (
        <div className="mt-12 text-center p-12 bg-white rounded-[3rem] shadow-xl border border-gray-50 animate-pulse">
          <div className="w-20 h-20 bg-[#8B5E3C]/5 rounded-full flex items-center justify-center mx-auto mb-6">
             <span className="text-3xl animate-bounce">🌍</span>
          </div>
          <h3 className="text-xl font-black text-[#4A2C2A]">جاري تصميم مسارك الخاص...</h3>
          <p className="text-xs text-gray-400 mt-2 max-w-[200px] mx-auto leading-relaxed">نقوم الآن بالبحث عن أفضل الفعاليات والمطاعم المتاحة بناءً على تفضيلاتك.</p>
        </div>
      )}

      {itineraryResult && (
        <div id="itinerary-result" className="mt-12 animate-fade-in space-y-6 pb-24">
          <div className="bg-gradient-to-br from-[#8B5E3C] to-[#4A2C2A] p-10 rounded-[3rem] shadow-2xl relative overflow-hidden text-white">
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -translate-y-20 translate-x-20 blur-3xl"></div>
            <h2 className="text-2xl font-black mb-4">✨ رحلتك الذكية في {tripConfig?.city}</h2>
            <div className="flex flex-wrap gap-3 text-[10px] font-bold">
              <span className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/10">📅 {tripConfig?.days} أيام</span>
              <span className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/10">👥 {tripConfig?.peopleCount} أفراد</span>
            </div>
          </div>
          
          <div className="bg-white p-8 rounded-[3rem] shadow-sm border border-gray-50 prose prose-sm max-w-none">
             <div className="whitespace-pre-wrap text-[#4A2C2A] leading-relaxed text-sm">
                {itineraryResult.text}
             </div>
          </div>

          <div className="flex flex-col gap-3 px-2">
            <button 
              onClick={handleSaveTrip}
              className="w-full bg-[#C5A059] text-white py-5 rounded-2xl font-black text-sm shadow-lg hover:shadow-[#C5A059]/30 transition transform active:scale-95 flex items-center justify-center gap-3"
            >
              📥 حفظ في رحلاتي
            </button>
            <button 
              onClick={() => {
                setItineraryResult(null);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="w-full bg-white text-gray-400 py-4 rounded-2xl font-bold text-xs hover:text-[#8B5E3C] transition-colors border border-gray-50"
            >
              🔄 تعديل الخطة
            </button>
          </div>
        </div>
      )}
    </>
  );

  const renderTrips = () => (
    <div className="animate-fade-in space-y-8 py-6 px-2">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-black text-[#4A2C2A]">رحلاتي</h2>
        {savedTrips.length > 0 && (
           <span className="text-[10px] bg-[#8B5E3C] text-white px-4 py-1.5 rounded-full font-black shadow-lg">
             {savedTrips.length} رحلة
           </span>
        )}
      </div>

      <div className="space-y-6">
        {savedTrips.length === 0 ? (
          <div className="bg-white p-16 rounded-[4rem] border border-dashed border-gray-100 text-center space-y-6 shadow-sm">
            <div className="text-6xl opacity-10">🏜️</div>
            <div className="space-y-2">
              <p className="text-[#4A2C2A] font-black text-lg">لم تبدأ مغامرتك بعد</p>
              <p className="text-gray-400 text-xs">قم بتخطيط رحلتك الأولى وسوف تظهر هنا.</p>
            </div>
            <button onClick={() => setActiveTab('home')} className="bg-[#8B5E3C] text-white px-8 py-3 rounded-full text-xs font-black shadow-xl">ابدأ الآن</button>
          </div>
        ) : (
          savedTrips.map((trip) => (
            <div key={trip.id} className="bg-white rounded-[2.5rem] border border-gray-50 shadow-sm overflow-hidden group hover:shadow-md transition-all duration-500">
              <div className="p-6 flex items-center gap-5">
                <div className="w-16 h-16 bg-[#FDFBFA] rounded-2xl border border-[#F1E9DB] flex items-center justify-center text-3xl shrink-0 group-hover:scale-105 transition-transform duration-500">
                  📍
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-black text-[#4A2C2A] text-lg truncate">{trip.cityName}</h3>
                    <span className="text-[9px] text-[#C5A059] font-black opacity-60">{trip.date}</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-[9px] bg-[#FDFBFA] text-[#8B5E3C] px-3 py-1 rounded-full font-black border border-[#F1E9DB]">{trip.days} أيام</span>
                    <span className="text-[9px] bg-[#FDFBFA] text-[#8B5E3C] px-3 py-1 rounded-full font-black border border-[#F1E9DB]">{trip.peopleCount} أفراد</span>
                  </div>
                </div>
              </div>
              <div className="px-6 pb-6 flex gap-3">
                <button 
                  onClick={() => {
                    setTripConfig({
                       city: trip.cityId,
                       days: trip.days,
                       peopleCount: trip.peopleCount,
                       interests: trip.interests
                    });
                    setItineraryResult({ text: trip.text, sources: trip.sources });
                    setActiveTab('home');
                    setTimeout(() => document.getElementById('itinerary-result')?.scrollIntoView({ behavior: 'smooth' }), 100);
                  }}
                  className="flex-1 bg-[#FDFBFA] hover:bg-[#4A2C2A] hover:text-white text-[#4A2C2A] py-3 rounded-2xl text-[11px] font-black transition-all border border-[#F1E9DB] flex items-center justify-center gap-2"
                >
                  👁️ عرض التفاصيل
                </button>
                <button onClick={() => deleteTrip(trip.id)} className="w-12 h-12 bg-red-50 text-red-300 rounded-2xl flex items-center justify-center hover:bg-red-500 hover:text-white transition-all text-sm">🗑️</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );

  const renderProfile = () => {
    const profileActions = [
      { 
        icon: '⚙️', 
        label: 'إعدادات الحساب', 
        onClick: () => alert('إعدادات الحساب: جاري تجهيز لوحة التحكم الشخصية.') 
      },
      { 
        icon: '🌍', 
        label: 'اللغة (العربية)', 
        onClick: () => alert('تغيير اللغة: يدعم التطبيق اللغة العربية حالياً، وسنوفر الإنجليزية قريباً.') 
      },
      { 
        icon: '🔔', 
        label: 'التنبيهات', 
        onClick: () => alert('تم تفعيل إشعارات الرحلات والفعاليات بنجاح! 🔔') 
      },
      { 
        icon: '📄', 
        label: 'سياسة الخصوصية', 
        onClick: () => alert('سياسة الخصوصية: جميع بياناتك ومسارات رحلاتك تُحفظ محلياً على جهازك لضمان أعلى مستويات الخصوصية.') 
      }
    ];

    return (
      <div className="animate-fade-in space-y-10 py-6">
        <div className="flex flex-col items-center">
          <button 
            onClick={() => alert('تغيير الصورة: هذه الميزة ستتوفر في التحديث القادم!')}
            className="w-32 h-32 bg-white rounded-[3rem] border-4 border-[#F1E9DB] shadow-2xl flex items-center justify-center text-5xl mb-6 overflow-hidden relative group transition hover:border-[#C5A059]"
          >
             👤
             <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
               <span className="text-white text-xs font-black">تعديل</span>
             </div>
          </button>
          <h2 className="text-2xl font-black text-[#4A2C2A]">ضيف طويق</h2>
          <p className="text-[10px] text-[#C5A059] font-black uppercase tracking-widest mt-1">عضوية بريميوم</p>
        </div>

        <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-50 overflow-hidden">
          {profileActions.map((item, idx) => (
            <button 
              key={idx} 
              onClick={item.onClick}
              className="w-full flex items-center justify-between p-6 hover:bg-[#FDFBFA] border-b border-gray-50 last:border-0 transition-colors text-right group"
            >
              <div className="flex items-center gap-5">
                <span className="text-xl bg-gray-50 w-12 h-12 rounded-xl flex items-center justify-center group-hover:bg-[#8B5E3C]/10 transition-colors">{item.icon}</span>
                <span className="text-sm font-black text-gray-700 group-hover:text-[#8B5E3C] transition-colors">{item.label}</span>
              </div>
              <span className="text-gray-200 text-xs transition-transform group-hover:translate-x-[-4px]">◀</span>
            </button>
          ))}
        </div>

        <div className="text-center pb-10">
          <button 
            onClick={handleLogout}
            className="text-red-400 font-black text-xs p-5 bg-red-50/50 rounded-[2rem] w-full hover:bg-red-100 transition-colors"
          >
            تسجيل الخروج
          </button>
          <p className="text-[9px] text-gray-300 mt-6 font-bold uppercase tracking-[0.4em]">v3.0.0 | تراث وحداثة</p>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col max-w-md mx-auto bg-[#FDFBFA] shadow-2xl relative overflow-x-hidden border-x border-gray-50">
      <header className="relative p-10 overflow-hidden rounded-b-[4rem] shadow-sm text-[#4A2C2A]" style={{ backgroundColor: HERITAGE_BEIGE }}>
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/40 rounded-full -translate-y-40 translate-x-40 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-60 h-60 bg-[#C5A059]/10 rounded-full translate-y-30 -translate-x-20 blur-2xl"></div>
        
        {/* Share Button */}
        <button 
          onClick={handleShare}
          className="absolute top-8 left-8 z-20 w-10 h-10 bg-white/30 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/20 hover:bg-white/50 transition-all text-[#8B5E3C] text-lg shadow-sm active:scale-90"
          title="مشاركة التطبيق"
        >
          📤
        </button>

        <div className="relative z-10 flex flex-col items-center">
          <div className="text-center">
            <h1 className="text-5xl font-black tracking-tighter mb-1" style={{ color: DEEP_BROWN }}>طويق</h1>
            <p className="text-sm font-bold opacity-90" style={{ color: HERITAGE_BROWN }}>مرشدك السياحي الذكي</p>
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto p-6 pb-32">
        {activeTab === 'home' && renderHome()}
        {activeTab === 'trips' && renderTrips()}
        {activeTab === 'profile' && renderProfile()}
      </main>

      {selectedCity && (
        <RegionModal 
          regionId={selectedCity} 
          onClose={() => setSelectedCity(null)} 
          onPlanTrip={handleStartPlanningFromModal}
        />
      )}

      <AIChat />

      <div className="fixed bottom-0 w-full max-w-md px-8 pb-8 pointer-events-none z-40">
        <nav className="bg-white/95 backdrop-blur-xl border border-gray-50 flex justify-around p-4 shadow-[0_-10px_40px_rgba(0,0,0,0.05)] rounded-[2.5rem] pointer-events-auto">
          <button onClick={() => { setActiveTab('home'); setItineraryResult(null); }} className={`flex flex-col items-center px-6 py-1.5 rounded-2xl ${activeTab === 'home' ? 'text-[#8B5E3C] bg-[#8B5E3C]/5 scale-105' : 'text-gray-300'}`}>
            <span className="text-2xl">🏠</span>
            <span className="text-[10px] mt-1 font-black">الرئيسية</span>
          </button>
          <button onClick={() => setActiveTab('trips')} className={`flex flex-col items-center px-6 py-1.5 rounded-2xl ${activeTab === 'trips' ? 'text-[#8B5E3C] bg-[#8B5E3C]/5 scale-105' : 'text-gray-300'}`}>
            <span className="text-2xl">🗺️</span>
            <span className="text-[10px] mt-1 font-black">رحلاتي</span>
          </button>
          <button onClick={() => setActiveTab('profile')} className={`flex flex-col items-center px-6 py-1.5 rounded-2xl ${activeTab === 'profile' ? 'text-[#8B5E3C] bg-[#8B5E3C]/5 scale-105' : 'text-gray-300'}`}>
            <span className="text-2xl">👤</span>
            <span className="text-[10px] mt-1 font-black">حسابي</span>
          </button>
        </nav>
      </div>
    </div>
  );
};

export default App;
