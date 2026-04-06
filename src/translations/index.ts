export type Lang = 'en' | 'ar' | 'ku';

export interface T {
  companyName: string; companySubtitle: string;
  navHome: string; navAbout: string; navProducts: string; navPartners: string; navContact: string;
  heroTagline: string; heroLine1: string; heroLine2: string;
  heroDesc: string; heroStat: string; heroCTA1: string; heroCTA2: string;
  aboutTag: string; aboutHeading: string; aboutHeadingHighlight: string;
  aboutDesc1: string; aboutDesc2: string; aboutSlogan: string;
  svc1Title: string; svc1Desc: string; svc2Title: string; svc2Desc: string;
  svc3Title: string; svc3Desc: string; svc4Title: string; svc4Desc: string;
  productsTag: string; productsTitle: string; productsDesc: string;
  productsAll: string; productsContactPrice: string;
  productsOrder: string; productsSent: string; productsEmpty: string;
  productsFeatured: string; productsViewDetails: string;
  productsCTATitle: string; productsCTADesc: string; productsCTABtn: string;
  partnersTag: string; partnersTitle: string;
  contactTag: string; contactTitle: string; contactDesc: string;
  mobile1: string; mobile2: string; emailLabel: string; addressLabel: string;
  tgTitle: string; tgDesc: string; tgBtn: string;
  copyright: string; address: string;
  // Order form
  orderTitle: string; orderProductLabel: string;
  orderName: string; orderNamePH: string;
  orderPhone: string; orderPhonePH: string;
  orderAddress: string; orderAddressPH: string;
  orderQty: string;
  orderNotes: string; orderNotesPH: string;
  orderSubmit: string; orderSending: string;
  orderSuccessTitle: string; orderSuccessMsg: string;
  orderErrorMsg: string; orderFallback: string;
  orderClose: string; orderWhatsapp: string;
  orderRequired: string;
  // CTA button
  orderNow: string;
  // Chat widget
  chatBtn: string;
  chatTitle: string;
  chatSubtitle: string;
  chatPlaceholder: string;
  chatSend: string;
  chatWelcome: string;
  chatAskName: string;
  chatAskPhone: string;
  chatThanks: string;
  chatConnecting: string;
  chatOffline: string;
  chatTyping: string;
}

const en: T = {
  companyName: 'Advanced Technologies', companySubtitle: 'Computers & Networks',
  navHome: 'Home', navAbout: 'About Us', navProducts: 'Products', navPartners: 'Partners', navContact: 'Contact',
  heroTagline: '25+ Years of Excellence in IT Solutions',
  heroLine1: 'Become', heroLine2: 'Tech Leader.',
  heroDesc: 'We deliver cutting-edge IT solutions empowering businesses with state-of-the-art technologies and 25+ years of expertise in Iraq and the Middle East.',
  heroStat: '1000+ Enterprises & SMBs Trusted Us!',
  heroCTA1: 'Explore Our Products', heroCTA2: 'Order via Telegram',
  aboutTag: 'About Us', aboutHeading: '25+ Years of IT', aboutHeadingHighlight: 'Excellence',
  aboutDesc1: 'Advanced Technologies Computers and Networks is a well-known IT company located in Baghdad, Iraq. Supported by highly skilled professional staff with more than 25 years of experience in IT business in Iraq and the Middle East.',
  aboutDesc2: 'Our aim is to offer our customers state-of-the-art technologies in the IT field. We always recommend and offer our clients the highest technologies with the latest trends.',
  aboutSlogan: '"Buy from Experts... Buy Your Peace of Mind!"',
  svc1Title: 'IP Telephony & Collaboration', svc1Desc: 'Advanced IP telephony systems and unified communications for businesses of all sizes.',
  svc2Title: 'Wired & Wireless Networks', svc2Desc: 'Complete network access solutions for homes, offices, and corporate campuses.',
  svc3Title: 'Corporate Infrastructure', svc3Desc: 'Backbone solutions for corporate headquarters and branch offices.',
  svc4Title: 'Next-Gen Firewall Security', svc4Desc: 'Enterprise security for data centers, SMBs, retail, financial, and healthcare sectors.',
  productsTag: 'Our Portfolio', productsTitle: 'Products & Solutions',
  productsDesc: 'Trusted technology brands delivering enterprise-grade performance.',
  productsAll: 'All', productsContactPrice: 'Contact for price',
  productsOrder: 'Order', productsSent: 'Sent!', productsEmpty: 'No products in this category.',
  productsFeatured: 'Featured', productsViewDetails: 'View Details',
  productsCTATitle: 'Need a custom solution?', productsCTADesc: 'Chat with our team on WhatsApp to get a tailored quote.', productsCTABtn: 'Chat on WhatsApp',
  partnersTag: 'Trusted Brands', partnersTitle: 'Our Technology Partners',
  contactTag: 'Get In Touch', contactTitle: 'Contact Us',
  contactDesc: 'Visit our showroom in Baghdad or reach us through any channel below.',
  mobile1: 'Mobile 1', mobile2: 'Mobile 2', emailLabel: 'Email', addressLabel: 'Address',
  tgTitle: 'Order via Telegram Bot', tgDesc: 'Send your order directly through our Telegram bot — fast and easy.', tgBtn: 'Start Order',
  copyright: '© 2025 Advanced Technologies Computers & Networks. All Rights Reserved.',
  address: "Sina'a Street, Opposite to University of Technology, Baghdad, Iraq",
  orderTitle: 'Place Your Order',
  orderProductLabel: 'Product',
  orderName: 'Full Name', orderNamePH: 'e.g. Ahmed Mohammed',
  orderPhone: 'Phone Number', orderPhonePH: 'e.g. 07901234567',
  orderAddress: 'Delivery Address', orderAddressPH: 'City, District, Street...',
  orderQty: 'Quantity',
  orderNotes: 'Notes', orderNotesPH: 'Any additional info or specifications...',
  orderSubmit: 'Send Order', orderSending: 'Sending...',
  orderSuccessTitle: 'Order Sent!',
  orderSuccessMsg: "We've received your order and will contact you shortly.",
  orderErrorMsg: 'Failed to send via Telegram.',
  orderFallback: 'Contact us directly:',
  orderClose: 'Close', orderWhatsapp: 'WhatsApp',
  orderRequired: 'Please fill in all required fields.',
  orderNow: 'Order Now',
  chatBtn: 'Chat with us',
  chatTitle: 'Advanced Technologies',
  chatSubtitle: 'We usually reply in minutes',
  chatPlaceholder: 'Type a message...',
  chatSend: 'Send',
  chatWelcome: 'Hello! 👋 Welcome to Advanced Technologies. How can we help you today?',
  chatAskName: 'Great! May I have your name please?',
  chatAskPhone: 'Thank you! And your phone number so we can follow up?',
  chatThanks: "Perfect! We've received your message and will contact you shortly. You can also reach us at:",
  chatConnecting: 'Connecting...',
  chatOffline: 'We\'re currently offline. Leave a message and we\'ll get back to you.',
  chatTyping: 'Support is typing...',
};

const ar: T = {
  companyName: 'التكنولوجيا المتقدمة', companySubtitle: 'كمبيوترات وشبكات',
  navHome: 'الرئيسية', navAbout: 'عنّا', navProducts: 'المنتجات', navPartners: 'شركاؤنا', navContact: 'تواصل معنا',
  heroTagline: 'أكثر من 25 عاماً من التميز في حلول تكنولوجيا المعلومات',
  heroLine1: 'كن', heroLine2: 'رائداً تقنياً.',
  heroDesc: 'نقدم حلول تكنولوجيا معلومات متطورة تُمكّن الشركات بأحدث التقنيات وخبرة تزيد عن 25 عاماً في العراق والشرق الأوسط.',
  heroStat: 'أكثر من 1000 شركة وثقت بنا!',
  heroCTA1: 'استكشف منتجاتنا', heroCTA2: 'اطلب عبر تيليغرام',
  aboutTag: 'عنّا', aboutHeading: 'أكثر من 25 عاماً من', aboutHeadingHighlight: 'التميز التقني',
  aboutDesc1: 'التكنولوجيا المتقدمة للكمبيوترات والشبكات شركة معروفة في بغداد، العراق. يدعمها فريق من المتخصصين ذوي المهارات العالية بخبرة تزيد عن 25 عاماً في سوق العراق والشرق الأوسط.',
  aboutDesc2: 'هدفنا تقديم أحدث تقنيات المعلومات لعملائنا. نحرص دائماً على توصية عملائنا بأرقى التقنيات وفق أحدث التوجهات.',
  aboutSlogan: '"اشترِ من الخبراء... اشترِ راحة بالك!"',
  svc1Title: 'هواتف IP والتعاون', svc1Desc: 'أنظمة هواتف IP متقدمة واتصالات موحدة للشركات بمختلف أحجامها.',
  svc2Title: 'الشبكات السلكية واللاسلكية', svc2Desc: 'حلول شبكات كاملة للمنازل والمكاتب والحرم الجامعي المؤسسي.',
  svc3Title: 'البنية التحتية للشركات', svc3Desc: 'حلول العمود الفقري لمقرات الشركات والفروع.',
  svc4Title: 'أمان الجدار الناري من الجيل التالي', svc4Desc: 'أمان مؤسسي لمراكز البيانات، الشركات الصغيرة، التجزئة، القطاع المالي والصحي.',
  productsTag: 'محفظتنا', productsTitle: 'المنتجات والحلول',
  productsDesc: 'علامات تجارية موثوقة تقدم أداءً على مستوى المؤسسات.',
  productsAll: 'الكل', productsContactPrice: 'تواصل للسعر',
  productsOrder: 'اطلب', productsSent: 'تم!', productsEmpty: 'لا توجد منتجات في هذه الفئة.',
  productsFeatured: 'مميز', productsViewDetails: 'عرض التفاصيل',
  productsCTATitle: 'تحتاج حلاً مخصصاً؟', productsCTADesc: 'تواصل مع فريقنا عبر واتساب للحصول على عرض سعر مناسب.', productsCTABtn: 'تحدث عبر واتساب',
  partnersTag: 'علامات موثوقة', partnersTitle: 'شركاؤنا التقنيون',
  contactTag: 'تواصل معنا', contactTitle: 'اتصل بنا',
  contactDesc: 'زر معرضنا في بغداد أو تواصل معنا عبر أي قناة أدناه.',
  mobile1: 'موبايل 1', mobile2: 'موبايل 2', emailLabel: 'البريد الإلكتروني', addressLabel: 'العنوان',
  tgTitle: 'اطلب عبر بوت تيليغرام', tgDesc: 'أرسل طلبك مباشرة عبر بوت تيليغرام — سريع وسهل.', tgBtn: 'ابدأ الطلب',
  copyright: '© 2025 التكنولوجيا المتقدمة للكمبيوترات والشبكات. جميع الحقوق محفوظة.',
  address: 'شارع الصناعة، مقابل الجامعة التكنولوجية، بغداد، العراق',
  orderTitle: 'تقديم طلب',
  orderProductLabel: 'المنتج',
  orderName: 'الاسم الكامل', orderNamePH: 'مثال: أحمد محمد',
  orderPhone: 'رقم الهاتف', orderPhonePH: 'مثال: 07901234567',
  orderAddress: 'عنوان التسليم', orderAddressPH: 'المدينة، المنطقة، الشارع...',
  orderQty: 'الكمية',
  orderNotes: 'ملاحظات', orderNotesPH: 'أي معلومات إضافية أو مواصفات...',
  orderSubmit: 'إرسال الطلب', orderSending: 'جاري الإرسال...',
  orderSuccessTitle: 'تم إرسال الطلب!',
  orderSuccessMsg: 'استلمنا طلبك وسنتواصل معك قريباً.',
  orderErrorMsg: 'فشل الإرسال عبر تيليغرام.',
  orderFallback: 'تواصل معنا مباشرة:',
  orderClose: 'إغلاق', orderWhatsapp: 'واتساب',
  orderRequired: 'يرجى تعبئة جميع الحقول المطلوبة.',
  orderNow: 'اطلب الآن',
  chatBtn: 'تحدث معنا',
  chatTitle: 'التكنولوجيا المتقدمة',
  chatSubtitle: 'نرد عادةً خلال دقائق',
  chatPlaceholder: 'اكتب رسالة...',
  chatSend: 'إرسال',
  chatWelcome: 'مرحباً! 👋 أهلاً بك في التكنولوجيا المتقدمة. كيف يمكنني مساعدتك؟',
  chatAskName: 'رائع! ما اسمك من فضلك؟',
  chatAskPhone: 'شكراً! وما رقم هاتفك حتى نتواصل معك؟',
  chatThanks: 'ممتاز! استلمنا رسالتك وسنتواصل معك قريباً. يمكنك أيضاً التواصل معنا على:',
  chatConnecting: 'جاري الاتصال...',
  chatOffline: 'نحن غير متصلين حالياً. اترك رسالة وسنرد عليك.',
  chatTyping: 'الدعم يكتب...',
};

const ku: T = {
  companyName: 'تەکنەلۆژیای پێشکەوتوو', companySubtitle: 'کۆمپیوتەر و تێکنەتۆڕ',
  navHome: 'سەرەتا', navAbout: 'دەربارەمان', navProducts: 'بەرهەمەکان', navPartners: 'هاوبەشەکان', navContact: 'پەیوەندی',
  heroTagline: 'زیاتر لە ٢٥ ساڵ سەرکەوتوویی لە چارەسەری تەکنەلۆژیا',
  heroLine1: 'ببە', heroLine2: 'پێشەنگی تەکنەلۆژیا.',
  heroDesc: 'ئێمە چارەسەری تەکنەلۆژیای بەرپێشکەوتوو دەگەیەنین کە کاروباری ئێوە بە نوێترین تەکنەلۆژیاکان بەهێز دەکات — بە ئەزموونی زیاتر لە ٢٥ ساڵ لە عێراق و ڕۆژهەڵاتی ناوین.',
  heroStat: 'زیاتر لە ١٠٠٠ کۆمپانیا باوەڕیان پێمان کرد!',
  heroCTA1: 'بەرهەمەکانمان بپشکنە', heroCTA2: 'داواکاری لە تێلێگرام',
  aboutTag: 'دەربارەمان', aboutHeading: 'زیاتر لە ٢٥ ساڵ', aboutHeadingHighlight: 'سەرکەوتوویی لە IT',
  aboutDesc1: 'تەکنەلۆژیای پێشکەوتوو بۆ کۆمپیوتەر و تێکنەتۆڕ کۆمپانیایەکی IT ی ناودار لە بەغدا، عێراق. پشتیوانی تیمێکی پسپۆڕ و شارەزا دەکات کە ئەزمoonیان لە کاروباری IT ی عێراق و ڕۆژهەڵاتی ناوین زیاتر لە ٢٥ ساڵە.',
  aboutDesc2: 'ئامانجمان ئەوەیە کە نوێترین تەکنەلۆژیاکانی بواری IT بۆ کڕیارەکانمان پێشکەش بکەین. هەمیشە نوێترین و باشترین تەکنەلۆژیاکان بۆ کڕیارەکانمان پێشنیار دەکەین.',
  aboutSlogan: '"لە پسپۆڕان بکڕە... ئارامی ژیانت بکڕە!"',
  svc1Title: 'تەلەفۆنی IP و کۆکاری', svc1Desc: 'سیستەمی تەلەفۆنی IP ی پێشکەوتوو و پەیوەندیی یەکگرتوو بۆ کاروبارەکانی جۆرەجۆر.',
  svc2Title: 'تێکنەتۆڕی سیمدار و بێسیم', svc2Desc: 'چارەسەری تەواوی تێکنەتۆڕ بۆ ماڵ، ئۆفیس و کۆمپانیاکانی گەورە.',
  svc3Title: 'بنەمای کۆرپۆرەیت', svc3Desc: 'چارەسەری ئەستێنی بۆ سەرەکەکانی کۆمپانیاکان و لقەکانیان.',
  svc4Title: 'ئەمنیەتی فایەروالی نەوەی داهاتوو', svc4Desc: 'ئەمنیەتی سازمانی بۆ سێنتەرەکانی داتا، کۆمپانیاکانی بچووک، بازرگانی، دارایی و تەندروستی.',
  productsTag: 'پۆرتفۆلیۆمان', productsTitle: 'بەرهەم و چارەسەرەکان',
  productsDesc: 'براندی پشتیوانکراو کە کارایی لاستیکی لە ئاستی سازمانی دەبەخشێت.',
  productsAll: 'هەموو', productsContactPrice: 'پەیوەندی بکە بۆ زانینی نرخ',
  productsOrder: 'داواکاری', productsSent: 'نێردرا!', productsEmpty: 'هیچ بەرهەمێک لەم بەشەدا نییە.',
  productsFeatured: 'تایبەت', productsViewDetails: 'وردەکارییەکان ببینە',
  productsCTATitle: 'پێویستت بە چارەسەرێکی تایبەت هەیە؟', productsCTADesc: 'لەگەڵ تیمەکەمان لە واتساپ قسە بکە بۆ وەرگرتنی نرخنامەی تایبەتت.', productsCTABtn: 'لە واتساپ قسە بکە',
  partnersTag: 'براندی پشتیوانکراو', partnersTitle: 'هاوبەشە تەکنەلۆژیەکانمان',
  contactTag: 'پەیوەندی بکەرەوە', contactTitle: 'پەیوەندیمان پێوە بکە',
  contactDesc: 'سەردانی نمایشگاکەمان بکە لە بەغدا، یان لە ڕێگەی هەر کانالێک لە ژێردا.',
  mobile1: 'مۆبایل ١', mobile2: 'مۆبایل ٢', emailLabel: 'ئیمەیڵ', addressLabel: 'ناونیشان',
  tgTitle: 'داواکاری لە ڕێگەی بۆتی تێلێگرام', tgDesc: 'داواکارییەکەت بەڕاستەوخۆ لە ڕێگەی بۆتی تێلێگرامەوە بنێرە — خێرا و ئاسان.', tgBtn: 'داواکاری دەست پێ بکە',
  copyright: '© ٢٠٢٥ تەکنەلۆژیای پێشکەوتوو بۆ کۆمپیوتەر و تێکنەتۆڕ. هەموو مافەکان پارێزراون.',
  address: 'شەقامی سیناعە، بەرامبەر زانکۆی تەکنەلۆژیا، بەغدا، عێراق',
  orderTitle: 'داواکارییەکەت تۆمار بکە',
  orderProductLabel: 'بەرهەم',
  orderName: 'ناوی تەواو', orderNamePH: 'نموونە: ئەحمەد محەمەد',
  orderPhone: 'ژمارەی تەلەفۆن', orderPhonePH: 'نموونە: 07901234567',
  orderAddress: 'ناونیشانی گەیاندن', orderAddressPH: 'شار، ناوچە، شەقام...',
  orderQty: 'ژمارە',
  orderNotes: 'تێبینی', orderNotesPH: 'هەر زانیاری زیادەیەک یان تایبەتمەندی...',
  orderSubmit: 'داواکاری بنێرە', orderSending: 'دەنێرێت...',
  orderSuccessTitle: 'داواکاری نێردرا!',
  orderSuccessMsg: 'داواکارییەکەت وەرگرتین و بەم زووانەیەک پەیوەندیت پێوە دەکەین.',
  orderErrorMsg: 'ناتوانرا لە ڕێگەی تێلێگرامەوە بنێردرێت.',
  orderFallback: 'ڕاستەوخۆ پەیوەندیمان پێوە بکە:',
  orderClose: 'داخستن', orderWhatsapp: 'واتساپ',
  orderRequired: 'تکایە هەموو خانەکانی پێویست پڕ بکەرەوە.',
  orderNow: 'ئێستا داواکاری بکە',
  chatBtn: 'لەگەڵمان قسە بکە',
  chatTitle: 'تەکنەلۆژیای پێشکەوتوو',
  chatSubtitle: 'بە گشتی لە چەند خولەکدا وەڵاممان دەدەیتەوە',
  chatPlaceholder: 'نامەیەک بنووسە...',
  chatSend: 'بنێرە',
  chatWelcome: '👋 بەخێربێیت بۆ تەکنەلۆژیای پێشکەوتوو. چۆن یارمەتیت بدەین؟',
  chatAskName: 'باشە! تکایە ناوت بڵێ؟',
  chatAskPhone: 'سوپاس! ژمارەی تەلەفۆنت بڵێ بۆ ئەوەی پەیوەندیت پێوە بکەین؟',
  chatThanks: 'نایاب! نامەکەت وەرگرتین و بەم زووانەیەک پەیوەندیت پێوە دەکەین. هەروەها دەتوانیت لە ڕێگەی ئەمەوە پەیوەندیمان پێوە بکەیت:',
  chatConnecting: 'پەیوەندی دەکرێت...',
  chatOffline: 'ئێمە ئێستا ئۆنلاین نین. نامەیەک بهێڵە و وەڵامت دەدەینەوە.',
  chatTyping: 'پشتگیری دەنووسێت...',
};

export const translations: Record<Lang, T> = { en, ar, ku };
