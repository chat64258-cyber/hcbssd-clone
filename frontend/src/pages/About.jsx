export default function About() {
  return (
    <div dir="rtl" className="py-16">
      <div className="container max-w-4xl mx-auto">
        <p className="eyebrow mb-2"><span />من نحن</p>
        <h1 className="text-4xl font-bold text-[#1F3A5F] mb-4">جمعية البناء البشري للتنمية الاجتماعية</h1>
        <div className="gold-rule" />
        <p className="text-gray-600 leading-relaxed text-lg mt-4 mb-8">
          جمعية نفع عام كويتية أُسست بموجب القرار الوزاري 155/أ لسنة 2022، تعمل على بناء قدرات فئات الرعاية الاجتماعية عبر مبادرات وطنية متخصصة تجمع بين التدخل المهني والتمكين الحقيقي والاندماج المستدام في المجتمع وسوق العمل.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {[
            { title: "الرؤية", text: "مجتمع كويتي متماسك يضم كل أفراده في مسيرة التنمية الوطنية.", color: "#1F3A5F" },
            { title: "الرسالة", text: "تمكين الفئات الأكثر احتياجاً عبر برامج تدخل متخصصة وشراكات وطنية فعّالة.", color: "#D7AA35" },
            { title: "القيم", text: "الاحترام الإنساني · الأثر الحقيقي · الشراكة المستدامة · الشفافية.", color: "#2E9E6B" },
            { title: "المنهجية", text: "نهج علمي يجمع بين منهجية SPI وقياس العائد الاجتماعي على الاستثمار SROI.", color: "#C8102E" },
          ].map((v) => (
            <div key={v.title} className="rounded-xl bg-white border border-gray-100 p-6 shadow-sm">
              <div className="w-8 h-1 rounded mb-3" style={{ background: v.color }} />
              <h3 className="font-bold text-[#1F3A5F] text-lg mb-2">{v.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{v.text}</p>
            </div>
          ))}
        </div>
        <div className="bg-[#1F3A5F] rounded-2xl p-8 text-white">
          <h2 className="text-2xl font-bold mb-6 text-[#D7AA35]">الشراكات الدولية</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-white/80 leading-relaxed">
            <div>✦ منظمة اليونسكو — شريك استراتيجي في مبادرة شركاء لتوظيفهم</div>
            <div>✦ منظمة العمل الدولية — دعم وتوثيق تجربة تشغيل ذوي الإعاقة</div>
            <div>✦ مكتب الأمم المتحدة — شراكة مع ممثل الأمين العام بالكويت</div>
            <div>✦ وزارة الشؤون الاجتماعية الكويتية</div>
          </div>
        </div>
      </div>
    </div>
  );
}
