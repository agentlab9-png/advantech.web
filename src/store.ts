export interface ChatMessage {
  from: 'bot' | 'user';
  text: string;
  time: string;
}

export interface Conversation {
  id: string;
  customerName: string;
  customerPhone: string;
  messages: ChatMessage[];
  createdAt: number;
  read: boolean;
}

export interface Partner {
  id: string;
  name: string;
  desc: string;
  logo: string; // URL path or base64 data URL
  createdAt: number;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  price: string;
  image: string;
  featured?: boolean;
  createdAt: number;
}

export interface SiteSettings {
  phone1: string;
  phone2: string;
  fax: string;
  email: string;
  address: string;
  telegramBotToken: string;
  telegramBotUsername: string; // e.g. AdvantechBot (without @)
  telegramChatId: string;
  whatsappNumber: string;         // AI WhatsApp (Order Now button)
  whatsappBusinessNumber: string; // Real/business WhatsApp (Products CTA)
  adminPassword: string;
  nanoBananaApiKey: string;
  nanoBananaEndpoint: string;
  nanoBananaEditEndpoint: string;
  heroVideoUrl: string;
}

const DEFAULT_SETTINGS: SiteSettings = {
  phone1: '+964 790 634 7388',
  phone2: '+964 770 623 5052',
  fax: '+964 780 614 7403',
  email: 'info@advantechco.com',
  address: "Sina'a Street, Opposite to University of Technology, Baghdad, Iraq",
  telegramBotToken: '',
  telegramBotUsername: '',
  telegramChatId: '',
  whatsappNumber: '9647906347388',
  whatsappBusinessNumber: '',
  adminPassword: '87879596',
  nanoBananaApiKey: '',
  nanoBananaEndpoint: 'https://api.nanobanana.io/v1/images/generate',
  nanoBananaEditEndpoint: 'https://api.nanobanana.io/v1/images/edits',
  heroVideoUrl: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_105406_16f4600d-7a92-4292-b96e-b19156c7830a.mp4',
};

const DEFAULT_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'FortiGate Next-Gen Firewall',
    category: 'Network Security',
    description: 'Enterprise-grade next-generation firewall for data centers, SMBs and healthcare sectors.',
    price: '',
    image: 'https://advantechco.com/assets/images/fortigate-firewall-500x500-500x500.14482047_std.jpg',
    createdAt: Date.now(),
  },
  {
    id: '2',
    name: 'Grandstream IP Telephony Solution',
    category: 'IP Telephony',
    description: 'Advanced IP telephony and collaboration solutions for enterprise and SMB environments.',
    price: '',
    image: 'https://advantechco.com/assets/images/Grandstream-solution.14481546_std.jpg',
    createdAt: Date.now() - 1000,
  },
  {
    id: '3',
    name: 'Cisco Corporate Network Solution',
    category: 'Networking',
    description: 'Corporate and branch backbone infrastructure solutions with latest Cisco technology.',
    price: '',
    image: 'https://advantechco.com/assets/images/Cisco_design_temp_4-J.14482856_std.jpg',
    createdAt: Date.now() - 2000,
  },
];

// ── Settings ──────────────────────────────────────────────
export function getSettings(): SiteSettings {
  try {
    const raw = localStorage.getItem('advantech_settings');
    if (raw) return { ...DEFAULT_SETTINGS, ...JSON.parse(raw) };
  } catch {}
  return { ...DEFAULT_SETTINGS };
}
export function saveSettings(s: SiteSettings) {
  localStorage.setItem('advantech_settings', JSON.stringify(s));
  window.dispatchEvent(new Event('settingsUpdated'));
}

// ── Products ──────────────────────────────────────────────
export function getProducts(): Product[] {
  try {
    const raw = localStorage.getItem('advantech_products');
    if (raw) return JSON.parse(raw);
  } catch {}
  localStorage.setItem('advantech_products', JSON.stringify(DEFAULT_PRODUCTS));
  return DEFAULT_PRODUCTS;
}
export function saveProducts(p: Product[]) {
  localStorage.setItem('advantech_products', JSON.stringify(p));
}
export function addProduct(p: Omit<Product, 'id' | 'createdAt'>): Product {
  const products = getProducts();
  const np: Product = { ...p, id: Date.now().toString(), createdAt: Date.now() };
  products.unshift(np);
  saveProducts(products);
  return np;
}
export function updateProduct(id: string, updates: Partial<Product>) {
  saveProducts(getProducts().map(p => p.id === id ? { ...p, ...updates } : p));
}
export function deleteProduct(id: string) {
  saveProducts(getProducts().filter(p => p.id !== id));
}

// ── Partners ──────────────────────────────────────────────
const BASE = import.meta.env.BASE_URL;
const DEFAULT_PARTNERS: Partner[] = [
  { id: '1', name: 'Fortinet',    desc: 'Next-Generation Firewall & Security', logo: `${BASE}logo-fortinet.png`,    createdAt: Date.now() },
  { id: '2', name: 'Grandstream', desc: 'IP Telephony & Collaboration',        logo: `${BASE}logo-grandstream.svg`, createdAt: Date.now() - 1000 },
  { id: '3', name: 'Cisco',       desc: 'Networking & Infrastructure',         logo: `${BASE}logo-cisco.jpg`,       createdAt: Date.now() - 2000 },
];
export function getPartners(): Partner[] {
  try {
    const raw = localStorage.getItem('advantech_partners');
    if (raw) return JSON.parse(raw);
  } catch {}
  localStorage.setItem('advantech_partners', JSON.stringify(DEFAULT_PARTNERS));
  return DEFAULT_PARTNERS;
}
export function savePartners(list: Partner[]) {
  localStorage.setItem('advantech_partners', JSON.stringify(list));
  window.dispatchEvent(new Event('partnersUpdated'));
}
export function addPartner(p: Omit<Partner, 'id' | 'createdAt'>): Partner {
  const list = getPartners();
  const np: Partner = { ...p, id: Date.now().toString(), createdAt: Date.now() };
  list.push(np);
  savePartners(list);
  return np;
}
export function updatePartner(id: string, updates: Partial<Partner>) {
  savePartners(getPartners().map(p => p.id === id ? { ...p, ...updates } : p));
}
export function deletePartner(id: string) {
  savePartners(getPartners().filter(p => p.id !== id));
}

// ── Conversations ─────────────────────────────────────────
export function getConversations(): Conversation[] {
  try {
    const raw = localStorage.getItem('advantech_conversations');
    if (raw) return JSON.parse(raw);
  } catch {}
  return [];
}
function saveConversations(list: Conversation[]) {
  localStorage.setItem('advantech_conversations', JSON.stringify(list));
}
export function addConversation(c: Omit<Conversation, 'id' | 'createdAt'>): Conversation {
  const conv: Conversation = { ...c, id: Date.now().toString(), createdAt: Date.now() };
  const list = getConversations();
  list.unshift(conv);
  saveConversations(list);
  window.dispatchEvent(new Event('conversationsUpdated'));
  return conv;
}
export function markConversationRead(id: string) {
  saveConversations(getConversations().map(c => c.id === id ? { ...c, read: true } : c));
}
export function deleteConversation(id: string) {
  saveConversations(getConversations().filter(c => c.id !== id));
  window.dispatchEvent(new Event('conversationsUpdated'));
}
export function getUnreadCount(): number {
  return getConversations().filter(c => !c.read).length;
}

// ── Auth — uses a random session token (harder to spoof) ──
function genToken() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}
export function isAdminLoggedIn(): boolean {
  const token = sessionStorage.getItem('adv_sess_token');
  const stored = localStorage.getItem('adv_sess_ref');
  return !!(token && stored && token === stored);
}
export function adminLogin(password: string): boolean {
  const settings = getSettings();
  if (password === settings.adminPassword) {
    const tok = genToken();
    sessionStorage.setItem('adv_sess_token', tok);
    localStorage.setItem('adv_sess_ref', tok);
    return true;
  }
  return false;
}
export function adminLogout() {
  sessionStorage.removeItem('adv_sess_token');
  localStorage.removeItem('adv_sess_ref');
}

// ── Rate limiter — prevents order spam (1 order / product / 60s) ──
export function canOrder(productId: string): boolean {
  const key = `order_rl_${productId}`;
  const last = parseInt(localStorage.getItem(key) || '0', 10);
  return Date.now() - last > 60_000;
}
export function markOrdered(productId: string) {
  localStorage.setItem(`order_rl_${productId}`, Date.now().toString());
}

// ── Telegram helper ───────────────────────────────────────
export async function sendTelegramMessage(text: string): Promise<boolean> {
  const { telegramBotToken, telegramChatId } = getSettings();
  if (!telegramBotToken || !telegramChatId) return false;
  try {
    const res = await fetch(
      `https://api.telegram.org/bot${telegramBotToken}/sendMessage`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: telegramChatId, text, parse_mode: 'Markdown' }),
      }
    );
    return res.ok;
  } catch {
    return false;
  }
}
