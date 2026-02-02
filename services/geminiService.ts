
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

export class AIService {
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }

  /**
   * إرسال رسالة دردشة عامة
   */
  async sendMessage(userMessage: string): Promise<string> {
    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: userMessage,
        config: {
          systemInstruction: "أنت خبير سياحي سعودي ودود. قدم معلومات دقيقة عن المملكة العربية السعودية. اجعل ردودك مختصرة وجذابة وباللغة العربية.",
          temperature: 0.7,
        },
      });
      return response.text || "عذراً، لم أستطع معالجة طلبك.";
    } catch (error) {
      return "حدث خطأ في الاتصال.";
    }
  }

  /**
   * توليد مسار رحلة حقيقي باستخدام Google Search Grounding
   */
  async generateRealItinerary(data: any): Promise<{ text: string; sources: any[] }> {
    try {
      const prompt = `بصفتك خبير سياحة سعودي، صمم برنامجا سياحيا حقيقيا ومفصلا لمدينة ${data.city} لمدة ${data.days} أيام لعدد ${data.peopleCount} أفراد بميزانية ${data.budget === 'low' ? 'اقتصادية' : data.budget === 'medium' ? 'متوسطة' : 'فاخرة'}. 
      الاهتمامات: ${data.interests.join(', ')}. 
      نمط الرحلة: ${data.travelStyle}. 
      يرجى ذكر أسماء حقيقية لمطاعم، متاحف، فعاليات حالية، ومقاهي مع توضيح سبب اختيار كل مكان. 
      اجعل الإجابة منظمة بوضوح لكل يوم.`;

      const response = await this.ai.models.generateContent({
        model: 'gemini-3-pro-preview', // نستخدم pro لدعم البحث والنتائج الأدق
        contents: prompt,
        config: {
          tools: [{ googleSearch: {} }],
          temperature: 0.5,
        },
      });

      const text = response.text || "";
      const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];

      return { text, sources };
    } catch (error) {
      console.error("Error generating itinerary:", error);
      throw error;
    }
  }
}

export const aiService = new AIService();
