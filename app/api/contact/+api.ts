import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, subject, message } = body;

    // Kiểm tra dữ liệu đầu vào
    if (!email || !message) {
      return Response.json(
        { error: "Vui lòng điền đầy đủ email và nội dung." },
        { status: 400 },
      );
    }

    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.error("Chưa cấu hình biến môi trường Email.");
      return Response.json({ error: "Lỗi cấu hình máy chủ." }, { status: 500 });
    }

    // Khởi tạo trình gửi email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // 1. Gửi thông báo đến email của bạn
    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
      replyTo: email,
      to: process.env.EMAIL_USER,
      subject: `[LENSARK PORTFOLIO] ${subject || "Tin nhắn mới"}`,
      text: `Bạn nhận được một tin nhắn từ: ${email}\n\nNội dung:\n${message}`,
    });

    // 2. Gửi email phản hồi tự động cho khách
    await transporter.sendMail({
      from: `"Vũ Trí Dũng" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: `[Auto-Reply] Cảm ơn bạn đã liên hệ!`,
      text: `Chào bạn,\n\nCảm ơn bạn đã ghé thăm Portfolio và để lại lời nhắn.\nHệ thống đã ghi nhận nội dung của bạn:\n\n"${message}"\n\nMình sẽ kiểm tra và phản hồi lại bạn qua email này trong thời gian sớm nhất nhé.\n\nTrân trọng,\nVũ Trí Dũng.`,
    });

    return Response.json({ success: true });
  } catch (error) {
    console.error("=== LỖI GỬI EMAIL ===", error);
    return Response.json(
      { error: "Không thể gửi thư vào lúc này." },
      { status: 500 },
    );
  }
}
