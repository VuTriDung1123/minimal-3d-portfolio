import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY || "";
const genAI = new GoogleGenerativeAI(apiKey);

export async function POST(request: Request) {
  try {
    if (!apiKey) {
      return Response.json(
        { reply: "Lỗi hệ thống: Chưa cấu hình AI Key." },
        { status: 500 },
      );
    }

    const body = await request.json();
    const { messages, language = "vi" } = body;

    // Lấy tin nhắn cuối cùng của người dùng gửi lên
    const lastMessage = messages[messages.length - 1].content;

    // Thiết lập ngôn ngữ trả lời tương ứng
    const langMap: Record<string, string> = {
      vi: "Vietnamese",
      en: "English",
      jp: "Japanese",
    };
    const targetLang = langMap[language] || "English";

    // ĐỊNH HÌNH BỘ NÃO CỦA AI (SYSTEM PROMPT)
    const systemPrompt = `
      ROLE: Bạn là trợ lý ảo trên trang Portfolio cá nhân của Vũ Trí Dũng.
      
      THÔNG TIN CƠ BẢN VỀ TÁC GIẢ:
      - Tên: Vũ Trí Dũng.
      - Chuyên môn: Mobile Developer, tập trung vào Kotlin (Android) và Dart (Flutter).
      - Kiến thức phụ trợ: Quản trị mạng Cisco, giao thức SD-WAN, Google Cloud Platform (GCP).
      - Các dự án đang phát triển: Ứng dụng "Student Life Manager" và hệ thống Time Management "DuckTrack".
      - Phong cách thiết kế: Đang theo đuổi chủ nghĩa tối giản (Minimalism / Brutalism).

      HƯỚNG DẪN TRẢ LỜI:
      1. Luôn giữ thái độ chuyên nghiệp, ngắn gọn và đi thẳng vào vấn đề.
      2. Nếu khách hỏi thông tin không có trong dữ liệu, hãy khéo léo nói rằng bạn là AI và đề nghị họ dùng form liên hệ.
      3. BẮT BUỘC: Người dùng đang giao tiếp bằng ngôn ngữ ${targetLang}. Bạn PHẢI trả lời hoàn toàn bằng ${targetLang}.
    `;

    // Sử dụng model Flash cho tốc độ phản hồi cực nhanh
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      systemInstruction: systemPrompt,
    });

    const result = await model.generateContent(lastMessage);
    const reply = result.response.text();

    return Response.json({ reply });
  } catch (error) {
    console.error("Gemini AI Error:", error);
    return Response.json(
      {
        reply: "Hệ thống AI đang nâng cấp hoặc quá tải. Vui lòng thử lại sau.",
      },
      { status: 500 },
    );
  }
}
