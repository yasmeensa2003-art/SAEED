
import React, { useState } from 'react';

interface ItineraryStep {
  time: string;
  activity: string;
}

interface Landmark {
  name: string;
  description: string;
  type: 'historical' | 'nature' | 'building' | 'entertainment' | 'religious' | 'shopping';
}

interface CityInfo {
  id: string;
  name: string;
  description: string;
  landmarks: Landmark[];
  climate: string;
  image: string;
  suggestedPlan: {
    dayTitle: string;
    steps: ItineraryStep[];
  }[];
}

const cityData: Record<string, CityInfo> = {
  riyadh: {
    id: 'riyadh',
    name: 'مدينة الرياض',
    description: 'عاصمة المملكة النابضة بالحياة، حيث يجتمع التاريخ العريق في الدرعية مع الحداثة العالمية في مركز الملك عبدالله المالي.',
    landmarks: [
      { name: 'حي الطريف التاريخي', type: 'historical', description: 'موقع تراث عالمي لليونسكو، يمثل مهد الدولة السعودية الأولى بعمارته الطينية الفريدة.' },
      { name: 'بوليفارد سيتي', type: 'entertainment', description: 'أكبر مركز ترفيهي في العاصمة، يضم مسارح ومطاعم وفعاليات عالمية متنوعة.' },
      { name: 'مركز الملك عبدالله المالي', type: 'building', description: 'تحفة معمارية حديثة تمثل الوجه المالي الجديد للمملكة بتصاميم مستوحاة من البيئة.' }
    ],
    climate: 'مشمس وجاف، أجواء رائعة شتاءً',
    image: 'https://images.unsplash.com/photo-1586724237569-f3d0c1dee8c8?auto=format&fit=crop&q=80&w=600',
    suggestedPlan: [
      {
        dayTitle: "يوم بين الماضي والمستقبل",
        steps: [
          { time: "09:00 ص", activity: "جولة في حي الطريف التاريخي (اليونسكو) بالدرعية." },
          { time: "01:00 م", activity: "غداء نجدي أصيل في مطل البجيري." },
          { time: "05:00 م", activity: "زيارة برج المملكة وتجربة جسر المشاهدة." },
          { time: "09:00 م", activity: "استمتاع بالعروض العالمية في بوليفارد سيتي." }
        ]
      }
    ]
  },
  jeddah: {
    id: 'jeddah',
    name: 'جدة - عروس البحر',
    description: 'بوابة الحرمين الشريفين ومركز الفنون، تتميز بأزقتها التاريخية في "البلد" وواجهتها البحرية العصرية.',
    landmarks: [
      { name: 'نافورة الملك فهد', type: 'building', description: 'أطول نافورة في العالم، تضخ مياه البحر لارتفاعات شاهقة وتعتبر أيقونة جدة.' },
      { name: 'منطقة البلد التاريخية', type: 'historical', description: 'قلب جدة التاريخي بمبانيه المتميزة برواشينها الخشبية وأزقتها الضيقة الساحرة.' },
      { name: 'نادي اليخوت', type: 'entertainment', description: 'وجهة عصرية فاخرة تضم مراسي لليخوت ومطاعم عالمية بإطلالة مباشرة على البحر.' }
    ],
    climate: 'رطب وحار صيفاً، معتدل شتاءً',
    image: 'https://images.unsplash.com/photo-1596701062351-be399b45e094?auto=format&fit=crop&q=80&w=600',
    suggestedPlan: [
      {
        dayTitle: "يوم على ضفاف البحر والأصالة",
        steps: [
          { time: "10:00 ص", activity: "جولة تاريخية في حارة المظلوم بالبلد." },
          { time: "02:00 م", activity: "تجربة الأكلات الشعبية (مثل اللصيمة والمطبق)." },
          { time: "05:30 م", activity: "مشاهدة الغروب في كورنيش جدة الواجهة البحرية." },
          { time: "09:00 م", activity: "عشاء فاخر في نادي اليخوت بجوار البحر." }
        ]
      }
    ]
  },
  alula: {
    id: 'alula',
    name: 'العلا - متحف حي',
    description: 'وجهة عالمية مذهلة تضم آثار الحجر (مدائن صالح) وتكوينات صخرية لا مثيل لها في العالم.',
    landmarks: [
      { name: 'جبل الفيل', type: 'nature', description: 'تكوين صخري طبيعي مذهل يشبه الفيل، يعتبر مكاناً مثالياً للتخييم ومراقبة النجوم.' },
      { name: 'مدائن صالح (الحجر)', type: 'historical', description: 'أول موقع مسجل في اليونسكو بالسعودية، يضم مقابر نبطية منحوتة في الجبال.' },
      { name: 'قاعة مرايا', type: 'building', description: 'أكبر مبنى مرايا في العالم، تعكس جمال الطبيعة الصحراوية المحيطة بها.' }
    ],
    climate: 'صحراوي نقي ولطيف ليلاً',
    image: 'https://images.unsplash.com/photo-1543080031-6b8c9d0b57e7?auto=format&fit=crop&q=80&w=600',
    suggestedPlan: [
      {
        dayTitle: "رحلة عبر الزمن",
        steps: [
          { time: "08:00 ص", activity: "زيارة الحجر (مدائن صالح) واستكشاف المقابر النبطية." },
          { time: "12:00 م", activity: "استراحة وغداء في واحة العلا بين النخيل." },
          { time: "04:30 م", activity: "مشاهدة غروب الشمس عند صخرة جبل الفيل." },
          { time: "08:00 م", activity: "تجربة مراقبة النجوم في سماء العلا الصافية." }
        ]
      }
    ]
  },
  makkah: {
    id: 'makkah',
    name: 'مكة المكرمة',
    description: 'أقدس بقاع الأرض، وجهة المسلمين الأولى ومهبط الوحي، حيث الروحانية والطمأنينة.',
    landmarks: [
      { name: 'المسجد الحرام', type: 'religious', description: 'أعظم مسجد في الإسلام، تتوسطه الكعبة المشرفة قبلة المسلمين في صلاتهم.' },
      { name: 'برج الساعة', type: 'building', description: 'أطول برج ساعة في العالم، يضم مجمعات تجارية وفنادق ومتحفاً للكون والوقت.' },
      { name: 'غار حراء', type: 'historical', description: 'المكان الذي نزل فيه الوحي على الرسول ﷺ، يقع في أعلى جبل النور.' }
    ],
    climate: 'حار وجاف أغلب العام',
    image: 'https://images.unsplash.com/photo-1565552645632-d7c5f5dc149c?auto=format&fit=crop&q=80&w=600',
    suggestedPlan: [
      {
        dayTitle: "مسار الروحانية والإيمان",
        steps: [
          { time: "04:00 ص", activity: "صلاة الفجر في المسجد الحرام." },
          { time: "10:00 ص", activity: "زيارة متحف السلام عليك أيها النبي." },
          { time: "05:00 م", activity: "جولة في جبل النور (غار حراء)." },
          { time: "09:00 م", activity: "تسوق من المجمعات المحيطة بالحرم." }
        ]
      }
    ]
  },
  abha: {
    id: 'abha',
    name: 'أبها البهية',
    description: 'عروس الجنوب المتربعة فوق الجبال، تتميز بالضباب والبرد والمناظر الطبيعية الخلابة.',
    landmarks: [
      { name: 'الجبل الأخضر', type: 'nature', description: 'مطل سياحي رائع يتميز بإضاءاته الخضراء ليلاً ومناظره الخلابة على مدينة أبها.' },
      { name: 'رجال ألمع', type: 'historical', description: 'قرية تراثية عمرها قرون، تتميز بمبانيها الحجرية الملونة وفن القط العسيري.' },
      { name: 'منتزه السودة', type: 'nature', description: 'أعلى قمة في المملكة، يكسوها الضباب وغابات العرعر الكثيفة وتوفر أنشطة مغامرات.' }
    ],
    climate: 'بارد وماطر شتاءً، معتدل صيفاً',
    image: 'https://images.unsplash.com/photo-1623880840103-3932e67a0776?auto=format&fit=crop&q=80&w=600',
    suggestedPlan: [
      {
        dayTitle: "يوم فوق السحاب",
        steps: [
          { time: "09:00 ص", activity: "الاستمتاع بالمطلات في منتزه السودة." },
          { time: "01:00 م", activity: "زيارة قرية رجال ألمع التراثية." },
          { time: "05:00 م", activity: "ركوب التلفريك لمشاهدة منحدرات الجبال." },
          { time: "08:00 م", activity: "جلسة شواء في الأجواء الباردة بالجبل الأخضر." }
        ]
      }
    ]
  }
};

const typeIcons: Record<Landmark['type'], string> = {
  historical: '🏛️',
  nature: '🌴',
  building: '🏢',
  entertainment: '🎡',
  religious: '🕌',
  shopping: '🛍️'
};

interface RegionModalProps {
  regionId: string;
  onClose: () => void;
  onPlanTrip: () => void;
}

export const RegionModal: React.FC<RegionModalProps> = ({ regionId, onClose, onPlanTrip }) => {
  const [expandedLandmark, setExpandedLandmark] = useState<string | null>(null);

  const info = cityData[regionId] || {
    id: regionId,
    name: 'استكشف هذه المدينة',
    description: 'وجهة فريدة تعكس جمال المملكة وتنوعها الثقافي والبيئي في هذه المنطقة.',
    landmarks: [],
    climate: 'متنوع وحيوي',
    image: 'https://images.unsplash.com/photo-1578891587250-486a40d2e49c?auto=format&fit=crop&q=80&w=600',
    suggestedPlan: []
  };

  const toggleLandmark = (name: string) => {
    setExpandedLandmark(expandedLandmark === name ? null : name);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 bg-black/70 backdrop-blur-md animate-fade-in">
      <div className="bg-[#f8f9fa] w-full max-w-md h-[90vh] sm:h-auto sm:max-h-[85vh] rounded-t-[3rem] sm:rounded-3xl overflow-hidden shadow-2xl transform transition-all animate-slide-up flex flex-col">
        
        {/* هيدر الصور */}
        <div className="relative h-64 shrink-0">
          <img src={info.image} alt={info.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#f8f9fa] via-transparent to-black/30"></div>
          
          <button 
            onClick={onClose}
            className="absolute top-6 left-6 w-10 h-10 bg-white/20 hover:bg-white/40 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-all border border-white/30"
          >
            ✕
          </button>
          
          <div className="absolute bottom-6 right-6 text-white text-right">
            <span className="bg-[#C5A059] text-white text-[10px] px-2 py-0.5 rounded-full font-bold mb-2 inline-block">وجهة مميزة</span>
            <h2 className="text-3xl font-black mb-1 drop-shadow-lg text-[#8B5E3C]">{info.name}</h2>
            <p className="text-xs font-bold text-gray-800 flex items-center gap-1 justify-end">
               <span>{info.climate}</span>
               <span className="text-sm">🌡️</span>
            </p>
          </div>
        </div>

        {/* محتوى التفاصيل - قابل للتمرير */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <section>
            <p className="text-gray-600 leading-relaxed text-sm text-justify">
              {info.description}
            </p>
          </section>

          {/* المعالم السياحية بتصميم مطور */}
          <section>
            <h3 className="text-[#8B5E3C] font-black text-sm mb-3 flex items-center gap-2">
              <span className="bg-[#8B5E3C] w-1 h-4 rounded-full"></span>
              أبرز المعالم السياحية
            </h3>
            <div className="flex flex-col gap-3">
              {info.landmarks.map((landmark) => {
                const isExpanded = expandedLandmark === landmark.name;
                return (
                  <div 
                    key={landmark.name}
                    className={`bg-white rounded-2xl border transition-all duration-300 overflow-hidden ${
                      isExpanded ? 'border-[#C5A059] shadow-md ring-1 ring-[#C5A059]/10' : 'border-gray-100 shadow-sm'
                    }`}
                  >
                    <button 
                      onClick={() => toggleLandmark(landmark.name)}
                      className="w-full flex items-center justify-between p-3 text-right"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-lg grayscale-0 group-hover:scale-110 transition-transform">
                          {typeIcons[landmark.type]}
                        </span>
                        <span className={`text-[11px] font-bold ${isExpanded ? 'text-[#8B5E3C]' : 'text-gray-700'}`}>
                          {landmark.name}
                        </span>
                      </div>
                      <span className={`text-[10px] transition-transform duration-300 ${isExpanded ? 'rotate-180 text-[#C5A059]' : 'text-gray-300'}`}>
                        {isExpanded ? '▲' : '▼'}
                      </span>
                    </button>
                    
                    {isExpanded && (
                      <div className="px-4 pb-4 animate-fade-in">
                        <div className="h-px bg-gray-50 mb-3 w-full"></div>
                        <p className="text-[10px] text-gray-500 leading-relaxed">
                          {landmark.description}
                        </p>
                        <div className="mt-2 flex items-center gap-2">
                          <span className="text-[9px] bg-gray-50 text-gray-400 px-2 py-0.5 rounded-full">
                            #{landmark.type === 'historical' ? 'تاريخ' : landmark.type === 'nature' ? 'طبيعة' : 'معلم'}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>

          {/* خطة سياحية مقترحة */}
          {info.suggestedPlan.length > 0 && (
            <section className="bg-white rounded-[2rem] p-5 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-[#8B5E3C] font-black text-sm flex items-center gap-2">
                  <span className="text-lg">📅</span>
                  برنامج سياحي مقترح
                </h3>
                <span className="text-[10px] text-[#C5A059] font-bold">يوم كامل</span>
              </div>
              
              <div className="space-y-6 relative border-r border-dashed border-gray-200 pr-4 mr-2">
                {info.suggestedPlan[0].steps.map((step, idx) => (
                  <div key={idx} className="relative">
                    {/* نقطة المسار */}
                    <div className="absolute -right-[1.4rem] top-1 w-3 h-3 rounded-full border-2 border-white bg-[#C5A059]"></div>
                    <div className="flex flex-col">
                      <span className="text-[10px] font-bold text-gray-400 mb-1">{step.time}</span>
                      <p className="text-[12px] font-bold text-gray-700 leading-tight">{step.activity}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* زر الإغلاق السفلي */}
        <div className="p-6 bg-white border-t border-gray-50">
          <button 
            onClick={onPlanTrip}
            className="w-full bg-[#8B5E3C] text-white py-4 rounded-2xl font-bold shadow-xl hover:shadow-[#8B5E3C]/10 transition transform active:scale-95 flex items-center justify-center gap-2"
          >
            <span className="text-xl">✨</span>
            تخطيط رحلة لهذه الوجهة
          </button>
        </div>
      </div>
    </div>
  );
};
