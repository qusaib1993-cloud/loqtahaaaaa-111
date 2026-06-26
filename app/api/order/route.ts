import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

export const dynamic = "force-dynamic";

// دالة تنظيف وتنسيق الأرقام لشبكة الواتساب الأردنية بصيغة دولية بدون بلس
function formatJordanianPhone(phone: string): string {
  let cleaned = phone.replace(/[^\d]/g, ""); // إبقاء الأرقام فقط
  if (cleaned.startsWith("00962")) {
    cleaned = cleaned.slice(5);
  } else if (cleaned.startsWith("962")) {
    cleaned = cleaned.slice(3);
  }
  
  if (cleaned.startsWith("07")) {
    cleaned = cleaned.slice(1); // إزالة الصفر الأول لخدمة المحمول الأردنية
  }
  
  return "962" + cleaned; // إرجاع الرقم بالصيغة الدولية الكاملة 9627XXXXXXXX
}

// دالة إرسال رسائل الواتساب عبر بوابة UltraMsg
async function sendWhatsAppUltraMsg(to: string, message: string) {
  const url = process.env.WHATSAPP_API_URL;
  const token = process.env.WHATSAPP_TOKEN;

  if (!url || !token) {
    console.warn("⚠️ WHATSAPP_API_URL or WHATSAPP_TOKEN environment variables are missing. WhatsApp notification skipped.");
    return false;
  }

  const formattedPhone = formatJordanianPhone(to);

  try {
    const params = new URLSearchParams();
    params.append("token", token);
    params.append("to", formattedPhone);
    params.append("body", message);

    console.log(`📞 Direct WhatsApp post via UltraMsg to ${formattedPhone} with gateway URL: ${url}`);

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params.toString(),
    });

    const textResponse = await response.text();
    console.log(`📱 UltraMsg response status: ${response.status}`, textResponse);
    return response.ok;
  } catch (error) {
    console.error(`❌ Failed to send UltraMsg notification to ${formattedPhone}:`, error);
    return false;
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const required = ["name", "phone", "gov", "address", "height", "weight"];
    for (const k of required) {
      if (!data?.[k]) return NextResponse.json({ ok: false, error: "بيانات ناقصة" }, { status: 400 });
    }
    const record = { ...data, ts: new Date().toISOString(), ua: req.headers.get("user-agent") || "" };

    // 1. نسخة احتياطية محلية
    try {
      const dir = process.env.ORDERS_DIR || "/tmp";
      await fs.appendFile(path.join(dir, "loqta-orders.jsonl"), JSON.stringify(record) + "\n", "utf8");
    } catch (e) {}

    // 2. بناء وإرسال رسالة الإدمن (Merchant)
    const adminPhone = "962775347250";
    const merchantMessage = `🔔 *طلب تفصيل جديد - لقطة كوليكشن*

*تفاصيل الزبونة:*
• *الاسم الكامل:* ${record.name}
• *رقم الهاتف:* ${record.phone}
• *المحافظة:* ${record.gov}
• *العنوان بالتفصيل:* ${record.address}

*تفاصيل القياسات والتفصيل:*
• *الطول:* ${record.height} سم
• *الوزن:* ${record.weight} كغ
• *الكمية:* ${record.quantity === 2 ? "قطعتين (عرض التوفير)" : "قطعة واحدة"}
• *الألوان المحددة:* ${record.color}${record.color2 ? ` / اللون الثاني: ${record.color2}` : ""}

*الحساب والمجموع:*
• *المجموع المطلوب للمحاسبة:* ${record.total} دينار أردني (شامل التوصيل المجاني 🎁)

الطلب مسجّل الآن في النظام للتفصيل والاتصال الفوري 👑`;

    // 3. بناء وإرسال رسالة العميل (Customer)
    const customerMessage = `✨ *مرحباً بكِ في عالم الأناقة والجمال مع لقطة كوليكشن* ✨

عزيزتنا الزبونة الراقية *${record.name}*،

يسعدنا جداً إعلامكِ بأنه تم استلام طلبكِ الخاص وتأكيده بنجاح لتفصيل عباءتكِ الملكية الفاخرة بالقياسات التي أدخلتيها:
• *الطول:* ${record.height} سم
• *الوزن:* ${record.weight} كغ
• *الألوان:* اللون الأول: ${record.color}${record.color2 ? ` / اللون الثاني: ${record.color2}` : ""}
• *المجموع الكلي عند الاستلام:* ${record.total} دينار أردني (التوصيل والشحن مجاني بالكامل 🎁)

قد دخلت عباءتكِ الآن مرحلة القص والتفصيل اليدوي الخصوصي بدقة متناهية لتناسب تفاصيل قوامكِ وتمنحكِ مظهراً منسدلاً فخماً ومذهلاً.

📦 *موعد التوصيل:* ستصلكِ العباية مغلفة بعناية تامة خلال يومين إلى 3 أيام عمل كحد أقصى. وسيقوم مندوب التوصيل بالاتصال بكِ هاتفياً قبل وصوله لتنسيق الموعد المناسب لكِ وتسليمكِ الهدية الراقية (الشال والحزام) مجاناً 🚗.

نشكركِ جزيل الشكر لاختياركِ *لقطة كوليكشن* ونعدكِ بجودة تفوق توقعاتكِ الملكية 👑🖤`;

    // إرسال الرسالتين آلياً في الخلفية بشكل متوازي
    try {
      await Promise.all([
        sendWhatsAppUltraMsg(adminPhone, merchantMessage),
        sendWhatsAppUltraMsg(record.phone, customerMessage)
      ]);
    } catch (e) {
      console.error("❌ Error sending background WhatsApp messages:", e);
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("❌ General route handling error:", e);
    return NextResponse.json({ ok: false, error: "خطأ بالخادم" }, { status: 500 });
  }
}

