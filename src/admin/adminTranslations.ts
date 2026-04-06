import { useLang } from '../contexts/LanguageContext';

export interface AdminT {
  // Dashboard
  adminPanel: string;
  overview: string;
  products: string;
  settings: string;
  aiGenerator: string;
  controlPanel: string;
  viewSite: string;
  logout: string;
  totalProducts: string;
  withPrice: string;
  categories: string;
  telegram: string;
  connected: string;
  notSet: string;
  recentProducts: string;
  manage: string;
  noProducts: string;
  quickActions: string;
  addNewProduct: string;
  generateImage: string;
  updateContact: string;
  setupTelegram: string;
  // Login
  adminDashboard: string;
  adminPassword: string;
  enterPassword: string;
  login: string;
  wrongPassword: string;
  // Products Manager
  productsTotal: string;
  addProduct: string;
  productSaved: string;
  productName: string;
  category: string;
  description: string;
  price: string;
  priceHint: string;
  productImage: string;
  update: string;
  cancel: string;
  deleteConfirm: string;
  uploadImage: string;
  urlImage: string;
  dragHere: string;
  clickOrDrag: string;
  changeImage: string;
  removeImage: string;
  apply: string;
  editProduct: string;
  featured: string;
  // Settings Manager
  siteSettings: string;
  settingsSaved: string;
  contactInfo: string;
  mobile1: string;
  mobile2: string;
  fax: string;
  email: string;
  address: string;
  whatsappAI: string;
  whatsappAIHint: string;
  whatsappBusiness: string;
  whatsappBusinessHint: string;
  heroVideo: string;
  videoUrl: string;
  botToken: string;
  botTokenHint: string;
  botUsername: string;
  botUsernameHint: string;
  chatId: string;
  chatIdHint: string;
  sendTest: string;
  testSent: string;
  testFailed: string;
  sending: string;
  botWarning: string;
  howToGetId: string;
  changePassword: string;
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
  passwordHint: string;
  passwordMin: string;
  passwordMatch: string;
  saveAll: string;
  // NanoBanana AI
  aiImageGenerator: string;
  aiDesc: string;
  apiConfig: string;
  apiEndpoint: string;
  apiEndpointHint: string;
  editEndpoint: string;
  editEndpointHint: string;
  apiKey: string;
  saveConfig: string;
  saved: string;
  setupRequired: string;
  setupHint: string;
  generateTab: string;
  editTab: string;
  generateForm: string;
  editForm: string;
  productNameLabel: string;
  promptLabel: string;
  promptHint: string;
  finalPrompt: string;
  generateBtn: string;
  generatingBtn: string;
  uploadForEdit: string;
  uploadForEditHint: string;
  editPrompt: string;
  editPromptPH: string;
  editBtn: string;
  editingBtn: string;
  generatedImages: string;
  publishProduct: string;
  published: string;
  // Partners Manager
  partnersTitle: string;
  partnersSubtitle: string;
  addPartner: string;
  newPartner: string;
  logoLabel: string;
  uploadLogo: string;
  nameLabel: string;
  descLabel: string;
  save: string;
  changeLogo: string;
  noPartners: string;
}

const en: AdminT = {
  adminPanel: 'Advantech', controlPanel: 'Admin Panel', viewSite: 'View Site', logout: 'Logout',
  overview: 'Overview', products: 'Products', settings: 'Settings', aiGenerator: 'NanoBanana AI',
  totalProducts: 'Total Products', withPrice: 'With Price', categories: 'Categories',
  telegram: 'Telegram', connected: 'Connected', notSet: 'Not Set',
  recentProducts: 'Recent Products', manage: 'Manage →', noProducts: 'No products yet.',
  quickActions: 'Quick Actions', addNewProduct: 'Add New Product',
  generateImage: 'Generate Product Image (AI)', updateContact: 'Update Contact Info', setupTelegram: 'Setup Telegram Bot',
  adminDashboard: 'Admin Dashboard', adminPassword: 'Admin Password',
  enterPassword: 'Enter admin password', login: 'Login', wrongPassword: 'Incorrect password. Please try again.',
  productsTotal: 'products total', addProduct: 'Add Product', productSaved: 'Product saved successfully.',
  productName: 'Product Name *', category: 'Category', description: 'Description',
  price: 'Price', priceHint: "Leave empty to show 'Contact for price'",
  productImage: 'Product Image', update: 'Update', cancel: 'Cancel', deleteConfirm: 'Delete this product?',
  uploadImage: 'Upload Image', urlImage: 'URL', dragHere: 'Drag image here',
  clickOrDrag: 'or click to choose from device', changeImage: 'Click or drag to change image',
  removeImage: 'Remove image', apply: 'Apply', editProduct: 'Edit Product', featured: 'Featured',
  siteSettings: 'Site Settings', settingsSaved: 'Settings saved successfully.',
  contactInfo: 'Contact Information', mobile1: 'Mobile 1', mobile2: 'Mobile 2',
  fax: 'Fax', email: 'Email', address: 'Address',
  whatsappAI: 'WhatsApp AI (Order Now button)', whatsappAIHint: "Used in the floating 'Order Now' button (AI WhatsApp)",
  whatsappBusiness: 'WhatsApp Business (Products section)', whatsappBusinessHint: "Used in 'Chat on WhatsApp' button in Products section",
  heroVideo: 'Hero Video', videoUrl: 'Video URL (.mp4 or CloudFront)',
  botToken: 'Bot Token', botTokenHint: 'From @BotFather on Telegram',
  botUsername: 'Bot Username (without @)', botUsernameHint: "Used for 'Order via Telegram' button link",
  chatId: 'Chat ID', chatIdHint: 'Your personal Telegram chat ID. Use @userinfobot to get it.',
  sendTest: 'Send Test Message', testSent: 'Test Sent ✓', testFailed: 'Failed — check token/ID',
  sending: 'Sending...', botWarning: 'The bot token is sent directly from your browser. Consider a backend proxy for production.',
  howToGetId: 'How to get Chat ID:', changePassword: 'Change Admin Password',
  currentPassword: 'Current Password', newPassword: 'New Password', confirmPassword: 'Confirm New Password',
  passwordHint: 'Leave both empty to keep current password.', passwordMin: 'Password must be at least 6 characters.',
  passwordMatch: 'Passwords do not match.', saveAll: 'Save All Settings',
  aiImageGenerator: 'AI Image Generator', aiDesc: 'Generate or edit product images with AI.',
  apiConfig: 'API Configuration', apiEndpoint: 'Generate Endpoint URL',
  apiEndpointHint: 'Accepts: POST with { prompt, n, size, response_format }',
  editEndpoint: 'Edit Endpoint URL', editEndpointHint: 'Accepts: POST with { image (base64), prompt, n, size }',
  apiKey: 'API Key', saveConfig: 'Save Config', saved: 'Saved', setupRequired: 'Setup required',
  setupHint: 'Click ⚙️ above to enter your API key and endpoint URLs.',
  generateTab: 'Generate Image', editTab: 'Edit Image',
  generateForm: 'Generate Product Image', editForm: 'Edit Existing Image',
  productNameLabel: 'Product Name *', promptLabel: 'Prompt', promptHint: "Use {product_name} placeholder",
  finalPrompt: 'Final prompt:', generateBtn: 'Generate Image', generatingBtn: 'Generating...',
  uploadForEdit: 'Upload image to edit', uploadForEditHint: 'Drag & drop or click to upload',
  editPrompt: 'Edit Instruction', editPromptPH: 'e.g. Change background to white, remove text...',
  editBtn: 'Edit Image', editingBtn: 'Editing...',
  generatedImages: 'Results', publishProduct: 'Publish as Product', published: 'Published!',
  partnersTitle: 'Agencies & Partners', partnersSubtitle: 'Add or edit partners shown on the site',
  addPartner: 'Add Partner', newPartner: 'New Partner', logoLabel: 'Logo',
  uploadLogo: 'Upload logo image', nameLabel: 'Name', descLabel: 'Description',
  save: 'Save', changeLogo: 'Change Logo', noPartners: 'No partners — add the first agency',
};

const ar: AdminT = {
  adminPanel: 'أدفانتك', controlPanel: 'لوحة التحكم', viewSite: 'عرض الموقع', logout: 'تسجيل الخروج',
  overview: 'نظرة عامة', products: 'المنتجات', settings: 'الإعدادات', aiGenerator: 'NanoBanana AI',
  totalProducts: 'إجمالي المنتجات', withPrice: 'بسعر محدد', categories: 'التصنيفات',
  telegram: 'تيليغرام', connected: 'متصل', notSet: 'غير محدد',
  recentProducts: 'أحدث المنتجات', manage: '← إدارة', noProducts: 'لا توجد منتجات بعد.',
  quickActions: 'إجراءات سريعة', addNewProduct: 'إضافة منتج جديد',
  generateImage: 'توليد صورة منتج (AI)', updateContact: 'تحديث معلومات التواصل', setupTelegram: 'إعداد بوت تيليغرام',
  adminDashboard: 'لوحة التحكم', adminPassword: 'كلمة مرور الأدمن',
  enterPassword: 'أدخل كلمة المرور', login: 'دخول', wrongPassword: 'كلمة مرور خاطئة. حاول مجدداً.',
  productsTotal: 'منتج', addProduct: 'إضافة منتج', productSaved: 'تم حفظ المنتج.',
  productName: 'اسم المنتج *', category: 'التصنيف', description: 'الوصف',
  price: 'السعر', priceHint: "اتركه فارغاً لعرض 'تواصل للسعر'",
  productImage: 'صورة المنتج', update: 'تحديث', cancel: 'إلغاء', deleteConfirm: 'هل تريد حذف هذا المنتج؟',
  uploadImage: 'رفع صورة', urlImage: 'رابط URL', dragHere: 'اسحب الصورة هنا',
  clickOrDrag: 'أو اضغط للاختيار من الجهاز', changeImage: 'اضغط أو اسحب لتغيير الصورة',
  removeImage: 'إزالة الصورة', apply: 'تطبيق', editProduct: 'تعديل المنتج', featured: 'مميز',
  siteSettings: 'إعدادات الموقع', settingsSaved: 'تم حفظ الإعدادات.',
  contactInfo: 'معلومات التواصل', mobile1: 'موبايل 1', mobile2: 'موبايل 2',
  fax: 'فاكس', email: 'البريد الإلكتروني', address: 'العنوان',
  whatsappAI: 'واتساب AI (زر اطلب الآن)', whatsappAIHint: 'يُستخدم في زر "اطلب الآن" العائم',
  whatsappBusiness: 'واتساب الحقيقي (قسم المنتجات)', whatsappBusinessHint: 'يُستخدم في زر "تحدث عبر واتساب" في المنتجات',
  heroVideo: 'فيديو الهيرو', videoUrl: 'رابط الفيديو (.mp4)',
  botToken: 'توكن البوت', botTokenHint: 'من @BotFather على تيليغرام',
  botUsername: 'اسم البوت (بدون @)', botUsernameHint: 'يُستخدم في زر "اطلب عبر تيليغرام"',
  chatId: 'Chat ID', chatIdHint: 'معرّفك الشخصي على تيليغرام. استخدم @userinfobot للحصول عليه.',
  sendTest: 'إرسال رسالة تجريبية', testSent: 'تم الإرسال ✓', testFailed: 'فشل — تحقق من التوكن والـ ID',
  sending: 'جارٍ الإرسال...', botWarning: 'يُرسَل التوكن من متصفحك مباشرة. يُنصح باستخدام proxy في الإنتاج.',
  howToGetId: 'كيف تحصل على Chat ID:', changePassword: 'تغيير كلمة مرور الأدمن',
  currentPassword: 'كلمة المرور الحالية', newPassword: 'كلمة مرور جديدة', confirmPassword: 'تأكيد كلمة المرور',
  passwordHint: 'اترك الحقلين فارغين للإبقاء على كلمة المرور الحالية.', passwordMin: 'يجب أن تكون كلمة المرور 6 أحرف على الأقل.',
  passwordMatch: 'كلمتا المرور غير متطابقتين.', saveAll: 'حفظ جميع الإعدادات',
  aiImageGenerator: 'مولّد الصور بالذكاء الاصطناعي', aiDesc: 'ولّد أو عدّل صور المنتجات بالذكاء الاصطناعي.',
  apiConfig: 'إعدادات API', apiEndpoint: 'رابط التوليد',
  apiEndpointHint: 'يقبل: POST مع { prompt, n, size, response_format }',
  editEndpoint: 'رابط التعديل', editEndpointHint: 'يقبل: POST مع { image (base64), prompt, n, size }',
  apiKey: 'مفتاح API', saveConfig: 'حفظ الإعدادات', saved: 'تم الحفظ', setupRequired: 'إعداد مطلوب',
  setupHint: 'اضغط ⚙️ لإدخال مفتاح API وروابط الـ endpoints.',
  generateTab: 'توليد صورة', editTab: 'تعديل صورة',
  generateForm: 'توليد صورة منتج', editForm: 'تعديل صورة موجودة',
  productNameLabel: 'اسم المنتج *', promptLabel: 'البرومبت', promptHint: 'استخدم {product_name} كـ placeholder',
  finalPrompt: 'البرومبت النهائي:', generateBtn: 'توليد الصورة', generatingBtn: 'جارٍ التوليد...',
  uploadForEdit: 'ارفع صورة للتعديل', uploadForEditHint: 'اسحب أو اضغط للرفع',
  editPrompt: 'تعليمة التعديل', editPromptPH: 'مثال: غيّر الخلفية إلى أبيض، احذف النص...',
  editBtn: 'تعديل الصورة', editingBtn: 'جارٍ التعديل...',
  generatedImages: 'النتائج', publishProduct: 'نشر كمنتج', published: 'تم النشر!',
  partnersTitle: 'الوكالات والشركاء', partnersSubtitle: 'أضف أو عدّل الشركاء الظاهرين بالموقع',
  addPartner: 'إضافة شريك', newPartner: 'شريك جديد', logoLabel: 'اللوكو',
  uploadLogo: 'ارفع صورة اللوكو', nameLabel: 'الاسم', descLabel: 'الوصف',
  save: 'حفظ', changeLogo: 'تغيير اللوكو', noPartners: 'لا يوجد شركاء — أضف أول وكالة',
};

const ku: AdminT = {
  adminPanel: 'ئەدڤانتێک', controlPanel: 'پانێلی کنترۆل', viewSite: 'مەڵبەند ببینە', logout: 'دەرچوون',
  overview: 'پوختەیەک', products: 'بەرهەمەکان', settings: 'ڕێکخستنەکان', aiGenerator: 'NanoBanana AI',
  totalProducts: 'کۆی بەرهەمەکان', withPrice: 'بە نرخ', categories: 'پۆلەکان',
  telegram: 'تێلێگرام', connected: 'پەیوەستە', notSet: 'دانەنراوە',
  recentProducts: 'بەرهەمە دوایینەکان', manage: '← بەڕێوەبردن', noProducts: 'هیچ بەرهەمێک نییە.',
  quickActions: 'کاری خێرا', addNewProduct: 'بەرهەمی نوێ زیاد بکە',
  generateImage: 'وێنەی بەرهەم دروست بکە (AI)', updateContact: 'زانیاری پەیوەندی نوێ بکەرەوە', setupTelegram: 'بۆتی تێلێگرام ڕێک بخە',
  adminDashboard: 'پانێلی کنترۆل', adminPassword: 'ووشەی نهێنی ئەدمین',
  enterPassword: 'ووشەی نهێنی بنووسە', login: 'چوونەژوورەوە', wrongPassword: 'ووشەی نهێنی هەڵەیە. دووبارە هەوڵ بدەرەوە.',
  productsTotal: 'بەرهەم', addProduct: 'بەرهەم زیاد بکە', productSaved: 'بەرهەمەکە پاشەکەوت کرا.',
  productName: 'ناوی بەرهەم *', category: 'پۆل', description: 'وەسف',
  price: 'نرخ', priceHint: "بەتاڵ بهێڵە بۆ نیشاندانی 'پەیوەندی بکە بۆ نرخ'",
  productImage: 'وێنەی بەرهەم', update: 'نوێکردنەوە', cancel: 'پاشگەزبوونەوە', deleteConfirm: 'ئایا دەتەوێت ئەم بەرهەمە بسڕیتەوە؟',
  uploadImage: 'بارکردنی وێنە', urlImage: 'بەستەر URL', dragHere: 'وێنەکە ئێرە بکێشە',
  clickOrDrag: 'یان کلیک بکە بۆ هەڵبژاردن', changeImage: 'کلیک بکە یان بکێشە بۆ گۆڕین',
  removeImage: 'وێنەکە لابردن', apply: 'جێبەجێکردن', editProduct: 'دەستکاریکردنی بەرهەم', featured: 'تایبەت',
  siteSettings: 'ڕێکخستنەکانی مەڵبەند', settingsSaved: 'ڕێکخستنەکان پاشەکەوت کران.',
  contactInfo: 'زانیاری پەیوەندی', mobile1: 'مۆبایل ١', mobile2: 'مۆبایل ٢',
  fax: 'فاکس', email: 'ئیمەیل', address: 'ناونیشان',
  whatsappAI: 'واتساپی AI (دوگمەی داواکاری)', whatsappAIHint: 'لە دوگمەی "داواکاری" ی شەناوی بەکار دێت',
  whatsappBusiness: 'واتساپی ڕاستەقینە (بەشی بەرهەمەکان)', whatsappBusinessHint: 'لە دوگمەی "واتساپ" ی بەشی بەرهەمەکان بەکار دێت',
  heroVideo: 'ڤیدیۆی هیرۆ', videoUrl: 'بەستەری ڤیدیۆ (.mp4)',
  botToken: 'تۆکنی بۆت', botTokenHint: 'لە @BotFather لە تێلێگرام',
  botUsername: 'ناوی بۆت (بەبێ @)', botUsernameHint: 'لە دوگمەی داواکاری بەکار دێت',
  chatId: 'Chat ID', chatIdHint: 'ناسنامەکەت لە تێلێگرام. @userinfobot بەکاربێنە.',
  sendTest: 'پەیامی تاقیکردنەوە بنێرە', testSent: 'نێردرا ✓', testFailed: 'شکستی هێنا — تۆکن/ID بپشکنە',
  sending: 'دەنێرێت...', botWarning: 'تۆکنەکە ڕاستەوخۆ لە براوزەرەکەت دەنێردرێت.',
  howToGetId: 'چۆن Chat ID بدەستبهێنی:', changePassword: 'گۆڕینی ووشەی نهێنی',
  currentPassword: 'ووشەی نهێنی ئێستا', newPassword: 'ووشەی نهێنی نوێ', confirmPassword: 'ووشەی نهێنی دووبارە بنووسە',
  passwordHint: 'هەر دوو خانە بەتاڵ بهێڵە بۆ مانەوەی ووشەی نهێنی ئێستا.', passwordMin: 'ووشەی نهێنی دەبێت لانیکەم ٦ پیت بێت.',
  passwordMatch: 'ووشەکانی نهێنی یەکسان نین.', saveAll: 'هەموو ڕێکخستنەکان پاشەکەوت بکە',
  aiImageGenerator: 'دروستکەری وێنەی AI', aiDesc: 'وێنەی بەرهەمەکان دروست بکە یان دەستکاری بکە.',
  apiConfig: 'ڕێکخستنی API', apiEndpoint: 'بەستەری دروستکردن',
  apiEndpointHint: 'قبوڵدەکات: POST لەگەڵ { prompt, n, size, response_format }',
  editEndpoint: 'بەستەری دەستکاری', editEndpointHint: 'قبوڵدەکات: POST لەگەڵ { image (base64), prompt, n, size }',
  apiKey: 'کلیلی API', saveConfig: 'ڕێکخستنەکان پاشەکەوت بکە', saved: 'پاشەکەوت کرا', setupRequired: 'ڕێکخستن پێویستە',
  setupHint: '⚙️ کلیک بکە بۆ داخلکردنی کلیلی API.',
  generateTab: 'وێنە دروست بکە', editTab: 'وێنە دەستکاری بکە',
  generateForm: 'وێنەی بەرهەم دروست بکە', editForm: 'وێنەی هەبوو دەستکاری بکە',
  productNameLabel: 'ناوی بەرهەم *', promptLabel: 'برومپت', promptHint: '{product_name} بەکاربێنە',
  finalPrompt: 'برومپتی کۆتایی:', generateBtn: 'وێنە دروست بکە', generatingBtn: 'دادەنرێت...',
  uploadForEdit: 'وێنە بار بکە بۆ دەستکاری', uploadForEditHint: 'بکێشە یان کلیک بکە بۆ بارکردن',
  editPrompt: 'ڕێنمایی دەستکاری', editPromptPH: 'نموونە: پاشزەمینەکە سپی بکەرەوە...',
  editBtn: 'وێنە دەستکاری بکە', editingBtn: 'دەستکاری دەکرێت...',
  generatedImages: 'ئەنجامەکان', publishProduct: 'وەک بەرهەم بڵاو بکەرەوە', published: 'بڵاو کرایەوە!',
  partnersTitle: 'نوێنەرایەتی و هاوبەشەکان', partnersSubtitle: 'هاوبەشەکانی نیشاندراو لە مەڵبەند زیاد بکە یان دەستکاری بکە',
  addPartner: 'هاوبەش زیاد بکە', newPartner: 'هاوبەشی نوێ', logoLabel: 'لۆگۆ',
  uploadLogo: 'وێنەی لۆگۆ بار بکە', nameLabel: 'ناو', descLabel: 'وەسف',
  save: 'پاشەکەوت بکە', changeLogo: 'لۆگۆ بگۆڕە', noPartners: 'هیچ هاوبەشێک نییە — یەکەمیان زیاد بکە',
};

const map = { en, ar, ku };

export function useAdminT(): AdminT {
  const { lang } = useLang();
  return map[lang];
}
