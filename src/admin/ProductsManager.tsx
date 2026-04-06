import { useState, useEffect, useRef, useCallback } from 'react';
import { Plus, Pencil, Trash2, X, Check, Upload, Link, ImageIcon, Star, Download, FileUp } from 'lucide-react';
import { getProducts, addProduct, updateProduct, deleteProduct, type Product } from '../store';
import { useAdminT } from './adminTranslations';
import { useTheme } from '../contexts/ThemeContext';
import { useLang } from '../contexts/LanguageContext';

const CATEGORIES = ['Network Security', 'IP Telephony', 'Networking', 'Wireless', 'Infrastructure', 'Other'];

interface FormState { name: string; category: string; description: string; price: string; image: string; }
const EMPTY_FORM: FormState = { name: '', category: 'Network Security', description: '', price: '', image: '' };

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function ImageUploader({ value, onChange, t, isLight, bgInp, txt2, txt3 }:
  { value: string; onChange: (v: string) => void; t: ReturnType<typeof useAdminT>;
    isLight: boolean; bgInp: string; txt2: string; txt3: string }) {
  const [dragging, setDragging] = useState(false);
  const [tab, setTab] = useState<'upload' | 'url'>('upload');
  const [urlInput, setUrlInput] = useState(value.startsWith('http') ? value : '');
  const inputRef = useRef<HTMLInputElement>(null);

  const processFile = useCallback(async (file: File) => {
    if (!file.type.startsWith('image/')) return;
    onChange(await fileToBase64(file));
  }, [onChange]);

  const onDrop = useCallback(async (e: React.DragEvent) => {
    e.preventDefault(); setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) await processFile(file);
  }, [processFile]);

  const onFileChange = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) await processFile(file);
    e.target.value = '';
  }, [processFile]);

  const tabCls = (active: boolean) =>
    `flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
      active ? (isLight ? 'bg-white text-gray-800 shadow-sm' : 'bg-gray-600 text-white')
             : (isLight ? 'text-gray-400 hover:text-gray-700' : 'text-white/50 hover:text-white')
    }`;

  return (
    <div>
      <div className={`flex gap-1 mb-3 ${isLight ? 'bg-slate-200' : 'bg-gray-800'} rounded-xl p-1 w-fit`}>
        <button type="button" onClick={() => setTab('upload')} className={tabCls(tab === 'upload')}>
          <Upload size={12} /> {t.uploadImage}
        </button>
        <button type="button" onClick={() => setTab('url')} className={tabCls(tab === 'url')}>
          <Link size={12} /> {t.urlImage}
        </button>
      </div>

      {tab === 'upload' ? (
        <div onDragOver={e => { e.preventDefault(); setDragging(true); }} onDragLeave={() => setDragging(false)}
          onDrop={onDrop} onClick={() => inputRef.current?.click()}
          className={`relative cursor-pointer rounded-xl border-2 border-dashed transition-all duration-200 flex flex-col items-center justify-center gap-2 min-h-[140px] ${
            dragging ? 'border-red-500 bg-red-900/20 scale-[1.01]'
                     : isLight ? 'border-slate-300 hover:border-slate-400 bg-slate-50' : 'border-gray-600 hover:border-gray-500 bg-gray-800/50'
          }`}>
          <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={onFileChange} />
          {value && !value.startsWith('http') ? (
            <>
              <img src={value} alt="preview" className="w-full h-36 object-contain rounded-lg p-2" />
              <p className={`${txt3} text-xs pb-1`}>{t.changeImage}</p>
            </>
          ) : (
            <>
              <div className={`w-12 h-12 ${isLight ? 'bg-slate-200' : 'bg-gray-700'} rounded-xl flex items-center justify-center`}>
                <ImageIcon size={22} className={txt2} />
              </div>
              <div className="text-center">
                <p className={`${txt2} text-sm font-medium`}>{t.dragHere}</p>
                <p className={`${txt3} text-xs mt-0.5`}>{t.clickOrDrag}</p>
              </div>
            </>
          )}
        </div>
      ) : (
        <div className="space-y-2">
          <div className="flex gap-2">
            <input type="url" value={urlInput} onChange={e => setUrlInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && urlInput.trim() && onChange(urlInput.trim())}
              className={`flex-1 border rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-red-600 ${bgInp}`}
              placeholder="https://example.com/image.jpg" />
            <button type="button" onClick={() => urlInput.trim() && onChange(urlInput.trim())}
              className="px-4 py-2.5 bg-red-700 hover:bg-red-600 text-white rounded-xl text-sm font-medium transition-colors shrink-0">
              {t.apply}
            </button>
          </div>
          {value && value.startsWith('http') && (
            <img src={value} alt="preview"
              className={`w-full h-36 object-contain rounded-xl border p-2 ${isLight ? 'bg-slate-100 border-slate-200' : 'bg-gray-800 border-gray-700'}`}
              onError={e => { (e.target as HTMLImageElement).style.opacity = '0.3'; }} />
          )}
        </div>
      )}

      {value && (
        <button type="button" onClick={() => { onChange(''); setUrlInput(''); }}
          className={`mt-2 flex items-center gap-1 ${txt3} hover:text-red-500 text-xs transition-colors`}>
          <X size={12} /> {t.removeImage}
        </button>
      )}
    </div>
  );
}

export default function ProductsManager() {
  const t = useAdminT();
  const { theme } = useTheme();
  const { isRTL } = useLang();
  const isLight = theme === 'light';

  const bgCard  = isLight ? 'bg-white'      : 'bg-gray-900';
  const bgCard2 = isLight ? 'bg-slate-100'  : 'bg-gray-800';
  const border  = isLight ? 'border-slate-200' : 'border-gray-800';
  const border2 = isLight ? 'border-slate-300' : 'border-gray-700';
  const txt1    = isLight ? 'text-gray-900' : 'text-white';
  const txt2    = isLight ? 'text-gray-500' : 'text-white/50';
  const txt3    = isLight ? 'text-gray-400' : 'text-white/30';
  const bgInp   = isLight ? 'bg-slate-50 border-slate-300 text-gray-900' : 'bg-gray-800 border-gray-700 text-white';
  const bgModal = isLight ? 'bg-white'      : 'bg-gray-900';

  const [products, setProducts] = useState<Product[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [saved, setSaved] = useState(false);

  const importRef = useRef<HTMLInputElement>(null);

  const refresh = () => { setProducts(getProducts()); window.dispatchEvent(new Event('productsUpdated')); };
  useEffect(() => { refresh(); }, []);

  /* ── Excel Export (CSV) ── */
  const exportCSV = () => {
    const rows = [['Name', 'Brand', 'Description', 'Price']];
    getProducts().forEach(p => rows.push([p.name, p.category, p.description, p.price]));
    const csv = rows.map(r => r.map(c => `"${(c ?? '').replace(/"/g, '""')}"`).join(',')).join('\n');
    const blob = new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'products.csv'; a.click();
    URL.revokeObjectURL(url);
  };

  /* ── Excel Import (CSV) ── */
  const importCSV = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => {
      const text = (ev.target?.result as string).replace(/^\ufeff/, '');
      const lines = text.split(/\r?\n/).filter(l => l.trim());
      let imported = 0;
      lines.slice(1).forEach(line => {
        const cols = line.split(/,(?=(?:[^"]*"[^"]*")*[^"]*$)/).map(c => c.replace(/^"|"$/g, '').replace(/""/g, '"').trim());
        const [name, category, description, price] = cols;
        if (name) { addProduct({ name, category: category || 'Other', description: description || '', price: price || '', image: '' }); imported++; }
      });
      if (imported > 0) { refresh(); alert(`تم استيراد ${imported} منتج بنجاح`); }
    };
    reader.readAsText(file, 'utf-8');
    e.target.value = '';
  };

  const openAdd  = () => { setForm(EMPTY_FORM); setEditId(null); setShowForm(true); };
  const openEdit = (p: Product) => {
    setForm({ name: p.name, category: p.category, description: p.description, price: p.price, image: p.image });
    setEditId(p.id); setShowForm(true);
  };
  const handleSave = () => {
    if (!form.name.trim()) return;
    if (editId) updateProduct(editId, form); else addProduct(form);
    refresh(); setShowForm(false); setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };
  const handleDelete = (id: string) => { if (confirm(t.deleteConfirm)) { deleteProduct(id); refresh(); } };

  const inpCls = `w-full border rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-red-600 ${bgInp}`;

  return (
    <div>
      <div className={`flex items-center justify-between mb-6 ${isRTL ? 'flex-row-reverse' : ''}`}>
        <div className={isRTL ? 'text-right' : ''}>
          <h2 className={`${txt1} text-xl font-bold`}>{t.products}</h2>
          <p className={`${txt2} text-sm`}>{products.length} {t.productsTotal}</p>
        </div>
        <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <input ref={importRef} type="file" accept=".csv" className="hidden" onChange={importCSV} />
          <button onClick={() => importRef.current?.click()}
            title="استيراد من Excel"
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium border transition-colors ${isLight ? 'border-slate-300 text-slate-600 hover:bg-slate-100' : 'border-white/[0.12] text-white/70 hover:bg-white/[0.08]'}`}>
            <FileUp size={15} /> استيراد
          </button>
          <button onClick={exportCSV}
            title="تصدير إلى Excel"
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium border transition-colors ${isLight ? 'border-slate-300 text-slate-600 hover:bg-slate-100' : 'border-white/[0.12] text-white/70 hover:bg-white/[0.08]'}`}>
            <Download size={15} /> تصدير
          </button>
          <button onClick={openAdd}
            className={`flex items-center gap-2 bg-red-700 hover:bg-red-600 text-white rounded-xl px-4 py-2 text-sm font-medium transition-colors ${isRTL ? 'flex-row-reverse' : ''}`}>
            <Plus size={16} /> {t.addProduct}
          </button>
        </div>
      </div>

      {saved && (
        <div className="flex items-center gap-2 bg-green-900/40 border border-green-700/40 rounded-xl px-4 py-3 mb-4 text-green-400 text-sm">
          <Check size={16} /> {t.productSaved}
        </div>
      )}

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className={`${bgModal} border ${border2} rounded-2xl w-full max-w-lg p-6 max-h-[92vh] overflow-y-auto ${isLight ? '' : 'admin-scrollbar'}`}>
            <div className={`flex items-center justify-between mb-5 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <h3 className={`${txt1} font-bold text-lg`}>{editId ? t.editProduct : t.addProduct}</h3>
              <button onClick={() => setShowForm(false)} className={`${txt2} hover:${txt1}`}><X size={20} /></button>
            </div>

            <div className="space-y-4">
              <div>
                <label className={`${txt2} text-sm block mb-1 ${isRTL ? 'text-right' : ''}`}>{t.productName}</label>
                <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                  className={inpCls} placeholder="e.g. FortiGate 100F" />
              </div>
              <div>
                <label className={`${txt2} text-sm block mb-1 ${isRTL ? 'text-right' : ''}`}>{t.category}</label>
                <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} className={inpCls}>
                  {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className={`${txt2} text-sm block mb-1 ${isRTL ? 'text-right' : ''}`}>{t.description}</label>
                <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })}
                  rows={3} className={`${inpCls} resize-none`} />
              </div>
              <div>
                <label className={`${txt2} text-sm block mb-1 ${isRTL ? 'text-right' : ''}`}>
                  {t.price} <span className={`${txt3} text-xs`}>({t.priceHint})</span>
                </label>
                <input value={form.price} onChange={e => setForm({ ...form, price: e.target.value })}
                  className={inpCls} placeholder="e.g. $1,200" />
              </div>
              <div>
                <label className={`${txt2} text-sm block mb-2 ${isRTL ? 'text-right' : ''}`}>{t.productImage}</label>
                <ImageUploader value={form.image} onChange={v => setForm({ ...form, image: v })}
                  t={t} isLight={isLight} bgInp={bgInp} txt2={txt2} txt3={txt3} />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button onClick={handleSave}
                className="flex-1 bg-red-700 hover:bg-red-600 text-white rounded-xl py-2.5 font-semibold text-sm transition-colors">
                {editId ? t.update : t.addProduct}
              </button>
              <button onClick={() => setShowForm(false)}
                className={`flex-1 ${isLight ? 'bg-slate-100 hover:bg-slate-200 text-gray-700' : 'bg-gray-800 hover:bg-gray-700 text-white'} rounded-xl py-2.5 font-semibold text-sm transition-colors`}>
                {t.cancel}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Products List */}
      <div className="space-y-3">
        {products.map(p => (
          <div key={p.id} className={`${bgCard} border ${border} rounded-xl p-4 flex items-center gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
            {p.image
              ? <img src={p.image} alt={p.name} className={`w-14 h-14 object-contain rounded-lg ${bgCard2} shrink-0`} />
              : <div className={`w-14 h-14 ${bgCard2} rounded-lg shrink-0 flex items-center justify-center`}>
                  <ImageIcon size={20} className={txt3} />
                </div>}
            <div className={`flex-1 min-w-0 ${isRTL ? 'text-right' : ''}`}>
              <p className={`${txt1} font-semibold truncate`}>{p.name}</p>
              <p className={`${txt2} text-xs`}>{p.category}{p.price && ` • ${p.price}`}</p>
            </div>
            <div className={`flex gap-2 shrink-0 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <button onClick={() => { updateProduct(p.id, { featured: !p.featured }); refresh(); }}
                title={t.featured}
                className={`p-2 rounded-lg transition-colors ${p.featured
                  ? 'bg-yellow-500/20 text-yellow-500 hover:bg-yellow-500/30'
                  : `${bgCard2} ${txt3} hover:text-yellow-500`}`}>
                <Star size={14} fill={p.featured ? 'currentColor' : 'none'} />
              </button>
              <button onClick={() => openEdit(p)}
                className={`p-2 ${bgCard2} hover:bg-blue-900/40 ${txt2} hover:text-blue-400 rounded-lg transition-colors`}>
                <Pencil size={14} />
              </button>
              <button onClick={() => handleDelete(p.id)}
                className={`p-2 ${bgCard2} hover:bg-red-900/40 ${txt2} hover:text-red-400 rounded-lg transition-colors`}>
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}
        {products.length === 0 && <p className={`${txt3} text-center py-10`}>{t.noProducts}</p>}
      </div>
    </div>
  );
}
