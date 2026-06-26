import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

export const dynamic = "force-dynamic";

const ORDER_EMAIL_TO = process.env.ORDER_EMAIL_TO || "Qusayalbdour98@gmail.com";
const RESEND_FROM = process.env.RESEND_FROM || "Loqta Collection <onboarding@resend.dev>";

function orderHtml(o: any) {
  const row = (label: string, val: any) =>
    `<tr>
      <td style="padding:10px 14px;color:#8a6d4b;font-weight:bold;white-space:nowrap;border-bottom:1px solid #f3ebd4;font-size:14px">${label}</td>
      <td style="padding:10px 14px;color:#1f3d36;border-bottom:1px solid #f3ebd4;font-size:14px">${val ?? "-"}</td>
    </tr>`;
  
  return `
  <div dir="rtl" style="font-family:Tahoma,Arial,sans-serif;background:#fbf7ee;padding:16px;max-width:100%">
    <div style="max-width:560px;margin:0 auto;background:#fff;border:1px solid #e6cf95;border-radius:24px;overflow:hidden;box-shadow:0 8px 30px rgba(0,0,0,0.05)">
      <!-- الهيدر -->
      <div style="background:linear-gradient(135deg,#15291f,#1f3d36);color:#e6cf95;padding:24px 20px;text-align:center">
        <div style="font-size:12px;letter-spacing:2px;font-weight:bold;margin-bottom:6px;color:#e6cf9580">L O Q T A</div>
        <h2 style="margin:0;font-size:22px;font-weight:bold">طلب جديد - لقطة كوليكشن</h2>
        <p style="margin:6px 0 0;color:#fbf7ee;font-size:13px opacity:0.85">${new Date(o.ts).toLocaleString("ar-JO", { timeZone: "Asia/Amman" })}</p>
        <span style="display:inline-block;background:#b8862f;color:#fff;font-size:11px;padding:4px 12px;border-radius:12px;margin-top:10px;font-weight:bold">بانتظار التأكيد الهاتفي</span>
      </div>
      
      <!-- جدول البيانات -->
      <table style="width:100%;border-collapse:collapse">
        ${row("الاسم الكامل", `<b>${o.name}</b>`)}
        ${row("رقم الهاتف", `<a href="tel:${o.phone}" style="color:#1f3d36;font-weight:bold;text-decoration:underline">${o.phone}</a>`)}
        ${row("المحافظة", o.gov)}
        ${row("العنوان بالتفصيل", o.address)}
        ${row("الطول والوزن", `<span style="background:#f3ebd4;padding:2px 8px;border-radius:4px;font-size:12px">${o.height} سم</span> &nbsp; <span style="background:#f3ebd4;padding:2px 8px;border-radius:4px;font-size:12px">${o.weight} كغ</span>`)}
        ${row("الكمية", o.quantity === 2 ? "<span style='color:#1f3d36;font-weight:bold'>قطعتين (عرض التوفير)</span>" : "قطعة واحدة")}
        ${row("خيارات الألوان", `اللون الأول: ${o.color}${o.color2 ? ` <br>اللون الثاني: ${o.color2}` : ""}`)}
        ${row("الإجمالي المستحق", `<span style="font-size:18px;color:#b8862f;font-weight:extrabold">${o.total} دينار أردني</span>`)}
      </table>

      <!-- زر الاتصال الهاتفي المباشر لخدمة العملاء من الموبايل -->
      <div style="padding:20px;background:#fff;text-align:center">
        <a href="tel:${o.phone}" style="display:block;background:#1f3d36;color:#e6cf95;padding:14px 20px;border-radius:12px;font-weight:bold;text-decoration:none;font-size:15px;box-shadow:0 4px 12px rgba(31,61,54,0.15)">
          📞 اتصلي بالزبونة الآن لتأكيد الطلب
        </a>
        <p style="margin:8px 0 0;color:#8a6d4b;font-size:11px">اضغطي على الزر أعلاه للاتصال المباشر بالزبونة من هاتفكِ لتأكيد الطلب والتوصيل.</p>
      </div>
    </div>
  </div>`;
}

async function sendEmail(o: any) {
  const key = process.env.RESEND_API_KEY;
  if (!key) return { sent: false, reason: "no_key" };
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: RESEND_FROM,
      to: [ORDER_EMAIL_TO],
      subject: `طلب جديد - ${o.name} - ${o.gov} - ${o.total} دينار`,
      html: orderHtml(o),
      reply_to: ORDER_EMAIL_TO,
    }),
  });
  if (!res.ok) {
    const t = await res.text();
    return { sent: false, reason: t.slice(0, 200) };
  }
  return { sent: true };
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const required = ["name", "phone", "gov", "address", "height", "weight"];
    for (const k of required) {
      if (!data?.[k]) return NextResponse.json({ ok: false, error: "بيانات ناقصة" }, { status: 400 });
    }
    const record = { ...data, ts: new Date().toISOString(), ua: req.headers.get("user-agent") || "" };

    // نسخة احتياطية محلية
    try {
      const dir = process.env.ORDERS_DIR || "/tmp";
      await fs.appendFile(path.join(dir, "loqta-orders.jsonl"), JSON.stringify(record) + "\n", "utf8");
    } catch (e) {}

    // إرسال الطلب على الإيميل
    let email: { sent: boolean; reason?: string } = { sent: false, reason: "skip" };
    try {
      email = await sendEmail(record);
    } catch (e) {
      email = { sent: false, reason: String(e).slice(0, 200) };
    }
    if (!email.sent) console.log("ORDER_EMAIL_NOT_SENT", email.reason, JSON.stringify(record));
    else console.log("ORDER_EMAIL_SENT", record.name);

    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ ok: false, error: "خطأ بالخادم" }, { status: 500 });
  }
}
