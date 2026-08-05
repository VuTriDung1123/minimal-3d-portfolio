import { prisma } from "../../../lib/prisma";

// 1. LẤY DANH SÁCH BÀI VIẾT (GET)
export async function GET(request: Request) {
  try {
    const posts = await prisma.post.findMany({
      orderBy: { createdAt: "desc" },
    });
    return Response.json(posts);
  } catch (error) {
    console.error("API GET Posts Error:", error);
    return Response.json(
      { error: "Lỗi hệ thống khi tải bài viết" },
      { status: 500 },
    );
  }
}

// 2. TẠO BÀI VIẾT MỚI (POST)
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const newPost = await prisma.post.create({
      data: body,
    });
    return Response.json(newPost, { status: 201 });
  } catch (error) {
    console.error("API POST Error:", error);
    return Response.json({ error: "Không thể tạo bài viết" }, { status: 500 });
  }
}

// 3. SỬA BÀI VIẾT (PUT)
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, createdAt, updatedAt, ...dataToUpdate } = body; // Bóc tách id để không update đè lên nó

    const updatedPost = await prisma.post.update({
      where: { id },
      data: dataToUpdate,
    });
    return Response.json(updatedPost);
  } catch (error) {
    return Response.json({ error: "Lỗi cập nhật bài viết" }, { status: 500 });
  }
}

// 4. XÓA BÀI VIẾT (DELETE)
export async function DELETE(request: Request) {
  try {
    // Lấy ID từ đường link URL, ví dụ: /api/posts?id=abc
    const url = new URL(request.url);
    const id = url.searchParams.get("id");

    if (!id)
      return Response.json({ error: "Thiếu ID bài viết" }, { status: 400 });

    await prisma.post.delete({
      where: { id },
    });
    return Response.json({ success: true });
  } catch (error) {
    return Response.json({ error: "Lỗi khi xóa bài viết" }, { status: 500 });
  }
}
