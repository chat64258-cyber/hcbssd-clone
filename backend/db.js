import { JSONFilePreset } from "lowdb/node";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";
import { fileURLToPath } from "url";
import path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const defaultData = {
  admins: [],
  news: [],
  stats: [],
  initiatives: [],
  registrations: [],
};

const db = await JSONFilePreset(path.join(__dirname, "data.json"), defaultData);

// Seed admins
if (db.data.admins.length === 0) {
  const hash = bcrypt.hashSync("admin123", 10);
  db.data.admins.push({ id: uuidv4(), username: "admin", password: hash, createdAt: new Date().toISOString() });
  console.log("✅ Default admin created: admin / admin123");
}

// Seed stats
if (db.data.stats.length === 0) {
  db.data.stats = [
    { id: uuidv4(), key: "jobs",          label: "فرصة عمل لائقة",                    value: "210",         unit: "",     color: "#1F3A5F" },
    { id: uuidv4(), key: "members",       label: "منتسبًا في ست دفعات مكتملة",         value: "381",         unit: "",     color: "#1F3A5F" },
    { id: uuidv4(), key: "retention",     label: "استمرارية من المقاعد",                value: "72",          unit: "%",    color: "#D7AA35" },
    { id: uuidv4(), key: "savings",       label: "د.ك وفر سنوي للدولة",               value: "1,353,000",   unit: "د.ك",  color: "#D7AA35" },
    { id: uuidv4(), key: "employ_rate",   label: "نسبة التوظيف التراكمية",              value: "55.1",        unit: "%",    color: "#D7AA35" },
    { id: uuidv4(), key: "continuity",    label: "استمرارية وظيفية - شركاء لتوظيفهم",  value: "97.6",        unit: "%",    color: "#D7AA35" },
    { id: uuidv4(), key: "impact_2030",   label: "د.ك أثر تراكمي متوقع حتى 2030",    value: "17,950,000",  unit: "د.ك",  color: "#2E9E6B" },
    { id: uuidv4(), key: "sandhom_proj",  label: "مشروعًا ضمن المحور الإنشائي",        value: "73",          unit: "",     color: "#C8102E" },
    { id: uuidv4(), key: "sandhom_mem",   label: "منتسبًا في ساندهم",                  value: "86",          unit: "",     color: "#C8102E" },
  ];
}

// Seed initiatives
if (db.data.initiatives.length === 0) {
  db.data.initiatives = [
    { id: uuidv4(), slug: "shurakaa", name: "شركاء لتوظيفهم", tag: "الإدماج الوظيفي",   description: "من التدريب إلى التوظيف والاستقرار الوظيفي للأشخاص ذوي الإعاقة.",                        statValue: "97.6%",   statLabel: "استمرارية وظيفية",          color: "#1F3A5F", logo: "", active: true, updatedAt: new Date().toISOString() },
    { id: uuidv4(), slug: "sanedhom", name: "ساندهم",          tag: "إعادة الإدماج",      description: "مسار تأهيل مهني واجتماعي يبدأ داخل المؤسسة الإصلاحية ويمتد إلى ما بعد الإفراج.", statValue: "73",       statLabel: "مشروعًا على أربع مراحل",    color: "#C8102E", logo: "", active: true, updatedAt: new Date().toISOString() },
    { id: uuidv4(), slug: "taafee",   name: "تعافي",            tag: "التعافي المستدام",  description: "دعم صحي ونفسي واجتماعي واقتصادي يعيد بناء الإنسان ومسار حياته.",                   statValue: "6/12",    statLabel: "أشهر متابعة بعد الخروج",    color: "#2E9E6B", logo: "", active: true, updatedAt: new Date().toISOString() },
    { id: uuidv4(), slug: "amal",     name: "أمل",              tag: "الحماية والتمكين",  description: "مبادرة لدعم الأطفال والنساء وكبار السن والأسر الأكثر احتياجًا.",                   statValue: "4",       statLabel: "فئات اجتماعية رئيسية",      color: "#7A4B8F", logo: "", active: true, updatedAt: new Date().toISOString() },
  ];
}

// Seed news
if (db.data.news.length === 0) {
  db.data.news = [
    { id: uuidv4(), title: "انضمام اليونسكو ومنظمة العمل الدولية إلى مبادرة شركاء لتوظيفهم", body: "أعلنت جمعية البناء البشري للتنمية الاجتماعية عن انضمام منظمة اليونسكو ومنظمة العمل الدولية إلى جهود مبادرة شركاء لتوظيفهم الداعمة للأشخاص ذوي الإعاقة.", image: "", category: "شركاء",    published: true, createdAt: new Date().toISOString() },
    { id: uuidv4(), title: "انطلاق الدفعة الثانية من مبادرة ساندهم",                             body: "تفتح جمعية البناء البشري باب التسجيل للدفعة الثانية من مبادرة ساندهم الوطنية لإعادة دمج المفرج عنهم في المجتمع.",                                              image: "", category: "ساندهم",   published: true, createdAt: new Date().toISOString() },
    { id: uuidv4(), title: "توقيع مذكرة تفاهم مع وزارة الشؤون الاجتماعية",                       body: "وقّعت جمعية البناء البشري للتنمية الاجتماعية مذكرة تفاهم مع وزارة الشؤون الاجتماعية لتعزيز التعاون في مجال تمكين الفئات الأكثر احتياجاً.",                   image: "", category: "شراكات",  published: true, createdAt: new Date().toISOString() },
  ];
}

await db.write();
export default db;
