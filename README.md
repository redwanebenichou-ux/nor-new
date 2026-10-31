# من نور إلى نور - منصة التعليم القرآني عن بُعد

منصة رقمية تجمعك بمعلّم قرآن حقيقي، أينما كنت. تهدف إلى تمكين المتعلم من دراسة القرآن الكريم عن بُعد مع معلم حقيقي، مع توفير حفظ القرآن الكريم ومراجعته، وأحكام التجويد، والقراءات، والتعليم المباشر والتفاعلي.

## المميزات

- **أدوار متعددة**: متعلم، ولي أمر، معلم، إدارة
- **نظام الحجز**: حجز حصص مباشرة مع المعلمين
- **متابعة التقدم**: متابعة حفظ القرآن والتجويد والتقييمات
- **مكتبة المحتوى**: محتوى تعليمي ديني وتربوي
- **تعلم العربية**: مخصص لغير الناطقين بالعربية
- **لوحة تحكم شاملة**: لكل دور لوحة خاصة به
- **تصميم متجاوب**: يعمل على جميع الأجهزة
- **دعم اللغة العربية**: واجهة كاملة باللغة العربية مع اتجاه RTL

## التقنيات المستخدمة

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **Authentication**: Supabase Auth
- **Database**: Supabase PostgreSQL
- **Icons**: Lucide React
- **Notifications**: React Hot Toast

## متطلبات التشغيل

- Node.js 18+ 
- npm أو yarn

## التثبيت والتشغيل

1. **استنساخ المشروع**
```bash
git clone <repository-url>
cd "نور الى نور"
```

2. **تثبيت المكتبات**
```bash
npm install
```

3. **إعداد متغيرات البيئة**
```bash
cp .env.example .env
```

أضف متغيرات Supabase الخاصة بك:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. **تشغيل المشروع في وضع التطوير**
```bash
npm run dev
```

5. **بناء المشروع للإنتاج**
```bash
npm run build
```

6. **معاينة البناء**
```bash
npm run preview
```

## النشر على Vercel

المشروع جاهز للنشر مباشرة: ملف `vercel.json` يضبط كل شيء (إطار Vite، أمر البناء `npm run build`، مجلد الإخراج `dist`، وتحويل مسارات SPA إلى `index.html`).

### الطريقة الأولى: Vercel CLI (بدون GitHub)

من داخل مجلد المشروع:

```bash
# 1) تسجيل الدخول (مرة واحدة فقط، يفتح المتصفح)
npx vercel login

# 2) نشر بيئة معاينة
npx vercel

# 3) نشر الإنتاج (الرابط النهائي)
npx vercel --prod
```

في أول نشر سيطلب: تأكيد المجلد، واسم المشروع، وجذر المشروع (اتركه `./`).

### الطريقة الثانية: عبر GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/<user>/<repo>.git
git push -u origin main
```

ثم من [vercel.com/new](https://vercel.com/new) اختر المستودع واضغط Deploy — سيقرأ `vercel.json` تلقائياً.

### متغيرات البيئة (اختيارية)

بدونها يعمل الموقع في وضع العرض التجريبي (Demo) مع الحسابات التجريبية. لتشغيل Supabase الحقيقي أضف في Vercel ضمن **Settings → Environment Variables**:

```
VITE_SUPABASE_URL
VITE_SUPABASE_ANON_KEY
```

ثم أعد النشر (Redeploy). لا ترفع ملف `.env` إلى المستودع — فهو مستبعد في `.gitignore` و`.vercelignore`.

### ملاحظات مهمة

- التطبيق يستخدم `HashRouter`، لذلك كل التنقل بعد `#` ويعمل على الاستضافة الثابتة دون إعداد خادم.
- البناء على Vercel يستخدم مسارات مطلقة تلقائياً (`VERCEL=1`)، بينما البناء المحلي يبقى نسبياً لكي يفتح `dist/index.html` من القرص مباشرة.
- لا حاجة إلى أي خادم Node أو قاعدة بيانات — الموقع ثابت بالكامل.

## هيكل المشروع

```
src/
  components/     # مكونات قابلة لإعادة الاستخدام
  contexts/       # Context API
  lib/           # إعدادات المكتبات (Supabase)
  pages/         # صفحات التطبيق
  types/         # أنواع TypeScript
  utils/         # وظائف مساعدة
```

## الأدوار والصلاحيات

- **متعلم (student)**: حجز الحصص، متابعة التقدم، الحضور للحصص
- **ولي أمر (parent)**: متابعة الأبناء، رؤية التقييمات
- **معلم (teacher)**: إدارة الطلاب، إدارة الحصص، التقييم
- **إدارة (admin)**: إدارة كاملة للمنصة

## ملاحظات

- المشروع جاهز للمعاينة مع بيانات تجريبية
- في وضع عدم وجود إعدادات Supabase، سيعمل التطبيق في وضع العرض
- جميع المسارات تعمل مع React Router (SPA)

## حسابات تجريبية (Demo)

عند عدم وجود إعدادات Supabase (وضع العرض)، يمكن تسجيل الدخول باستخدام:

| الدور | البريد الإلكتروني | كلمة المرور |
|---|---|---|
| متعلم (Student) | student@demo.com | demo123 |
| معلم (Teacher) | teacher@demo.com | demo123 |
| ولي أمر (Parent) | parent@demo.com | demo123 |
| إدارة (Admin) | admin@demo.com | demo123 |

أو استخدم أزرار "حسابات تجريبية" في صفحة تسجيل الدخول.

## الترخيص

جميع الحقوق محفوظة © 2024 من نور إلى نور
