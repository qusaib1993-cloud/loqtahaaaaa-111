import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";

dotenv.config();

// Ensure fetch is available on Node (if using older Node versions, though Node 18+ has it natively)
// We use the global fetch

async function sendWhatsApp(to: string, message: string) {
  const url = process.env.WHATSAPP_API_URL;
  const token = process.env.WHATSAPP_TOKEN;
  
  if (!url) {
    console.warn("⚠️ WHATSAPP_API_URL environment variable is not set. WhatsApp dispatch skipped.");
    return false;
  }

  // Format Jordanian phone numbers for international gateways
  // Expected formats: 079XXXXXXX, +96279XXXXXXX, 96279XXXXXXX, 79XXXXXXX
  let cleanedPhone = to.replace(/[\s\-\+]/g, '');
  if (cleanedPhone.startsWith('07')) {
    cleanedPhone = '962' + cleanedPhone.slice(1);
  } else if (cleanedPhone.startsWith('7')) {
    cleanedPhone = '962' + cleanedPhone;
  } else if (!cleanedPhone.startsWith('962') && cleanedPhone.length === 9) {
    cleanedPhone = '962' + cleanedPhone;
  }

  try {
    // Generate a robust payload matching 99% of WhatsApp API Gateways
    const payload = {
      token: token,
      to: cleanedPhone,
      phone: cleanedPhone,
      body: message,
      message: message,
      text: message,
      msg: message,
      chatId: `${cleanedPhone}@c.us`
    };

    console.log(`📞 Sending WhatsApp to ${cleanedPhone} using gateway URL: ${url}`);
    
    // Some gateways use GET or query params, but POST is the industry standard.
    // We send POST with headers and body for maximum compatibility.
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        'x-api-key': token || '',
        'token': token || '',
      },
      body: JSON.stringify(payload),
    });

    const textResponse = await response.text();
    console.log(`📱 WhatsApp API gateway response status: ${response.status}`, textResponse);
    return response.ok;
  } catch (error) {
    console.error(`❌ Failed to send WhatsApp notification to ${cleanedPhone}:`, error);
    return false;
  }
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middlewares to parse request bodies
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // API POST endpoint to capture orders
  app.post("/api/order", async (req, res) => {
    try {
      const {
        name,
        phone,
        governorate,
        address,
        height,
        weight,
        quantity,
        colors,
        totalPrice
      } = req.body;

      console.log("📝 Received new order details:", req.body);

      if (!name || !phone || !governorate || !height || !weight) {
        return res.status(400).json({
          success: false,
          error: "جميع الحقول المطلوبة (الاسم، الهاتف، المحافظة، الطول، الوزن) يجب تعبئتها."
        });
      }

      // 1. Message to Merchant (رقم الماجر المعتمد: 962775347250)
      const merchantPhone = "962775347250";
      const merchantMessage = `🔔 *طلب تفصيل جديد - لقطة كوليكشن*

*تفاصيل العميل:*
• *الاسم:* ${name}
• *الهاتف:* ${phone}
• *المحافظة:* ${governorate}
• *العنوان:* ${address || 'لم يتم تحديده بالتفصيل'}

*تفاصيل الطلب والتفصيل الخصوصي:*
• *الطول:* ${height} سم
• *الوزن:* ${weight} كجم
• *الألوان المحددة:* ${colors || 'اللون الافتراضي'}
• *الكمية:* ${quantity || 1}
• *الإجمالي للمحاسبة:* ${totalPrice || 39} دينار أردني

الطلب جاهز للتفصيل والتجهيز الفوري ✨`;

      // 2. Message to Customer (رقم الزبونة)
      const customerMessage = `✨ *مرحباً بكِ في عالم الأناقة مع لقطة كوليكشن* ✨

عزيزتي *${name}*،
يسعدنا جداً تأكيد استلام طلبكِ الخاص بتفصيل عباءتكِ الفاخرة بالقياسات المعتمدة:
• *الطول:* ${height} سم
• *الوزن:* ${weight} كجم
• *الألوان المحددة:* ${colors || 'اللون الافتراضي'}
• *السعر الإجمالي:* ${totalPrice || 39} دينار أردني (الدفع نقداً عند الاستلام 💵)

تم إرسال طلبكِ فوراً إلى خط الإنتاج والتفصيل الخصوصي لضمان ملاءمته التامة لكِ.
سيصلكِ الطلب بمشيئة الله خلال يومين إلى 3 أيام عمل، وسيقوم مندوب التوصيل بالتواصل معكِ هاتفياً لتنسيق موعد التسليم الدقيق ومكان اللقاء.

شكراً لثقتكِ بـ *لقطة كوليكشن* 🖤👑`;

      // Send both messages in background asynchronously
      const merchantSent = await sendWhatsApp(merchantPhone, merchantMessage);
      const customerSent = await sendWhatsApp(phone, customerMessage);

      return res.status(200).json({
        success: true,
        merchantSent,
        customerSent,
        order: { name, phone, governorate, address, height, weight, quantity, colors, totalPrice }
      });
    } catch (error: any) {
      console.error("❌ Error processing order in backend API route:", error);
      return res.status(500).json({
        success: false,
        error: "حدث خطأ أثناء معالجة الطلب في السيرفر الخلفي.",
        details: error.message
      });
    }
  });

  // Health check
  app.get("/api/health", (req, res) => {
    res.json({ status: "healthy" });
  });

  // Vite Integration
  if (process.env.NODE_ENV !== "production") {
    console.log("🚀 Starting server in DEVELOPMENT mode with Vite middleware...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("📦 Starting server in PRODUCTION mode...");
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`👑 Laqta Collection Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
