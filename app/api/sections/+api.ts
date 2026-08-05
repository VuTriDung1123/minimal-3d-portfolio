import { prisma } from "../../../lib/prisma";

// 1. LẤY NỘI DUNG SECTION (GET)
export async function GET(request: Request) {
  const url = new URL(request.url);
  const key = url.searchParams.get("key");

  if (!key)
    return Response.json({ error: "Thiếu Section Key" }, { status: 400 });

  try {
    const section = await prisma.pageSection.findUnique({
      where: { sectionKey: key },
    });
    // Trả về data hoặc 1 object rỗng nếu chưa có
    return Response.json(section || {});
  } catch (error) {
    console.error("API GET Section Error:", error);
    return Response.json({ error: "Lỗi tải cấu hình" }, { status: 500 });
  }
}

// 2. CẬP NHẬT HOẶC TẠO MỚI SECTION (POST)
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { sectionKey, contentEn, contentVi, contentJp } = body;

    if (!sectionKey)
      return Response.json({ error: "Missing sectionKey" }, { status: 400 });

    const updatedSection = await prisma.pageSection.upsert({
      where: { sectionKey },
      update: { contentEn, contentVi, contentJp },
      create: { sectionKey, contentEn, contentVi, contentJp },
    });

    return Response.json(updatedSection);
  } catch (error) {
    console.error("API POST Section Error:", error);
    return Response.json({ error: "Không thể lưu cấu hình" }, { status: 500 });
  }
}
