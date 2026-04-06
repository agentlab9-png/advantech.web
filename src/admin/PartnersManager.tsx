import { useState, useRef, useCallback } from 'react';
import { Plus, Trash2, Edit2, Check, X, Upload, ImageIcon, GripVertical } from 'lucide-react';
import { getPartners, savePartners, addPartner, updatePartner, deletePartner, type Partner } from '../store';
import { useAdminT } from './adminTranslations';
import { useTheme } from '../contexts/ThemeContext';
import { useLang } from '../contexts/LanguageContext';

function fileToBase64(file: File): Promise<string> {
  return new Promise((res, rej) => {
    const r = new FileReader();
    r.onload = () => res(r.result as string);
    r.onerror = rej;
    r.readAsDataURL(file);
  });
}

interface EditState { name: string; desc: string; logo: string; }

export default function PartnersManager() {
  const t = useAdminT();
  const { theme } = useTheme();
  const { isRTL } = useLang();
  const dk = theme !== 'light';

  const txt1 = dk ? 'text-white'      : 'text-slate-900';
  const txt2 = dk ? 'text-white/80'   : 'text-slate-700';
  const txt3 = dk ? 'text-white/50'   : 'text-slate-500';
  const cardCls = dk
    ? 'bg-white/[0.05] border border-white/[0.09] rounded-2xl'
    : 'bg-white border border-slate-200 rounded-2xl shadow-sm';
  const inpCls = [
    'w-full border rounded-xl px-3 py-2 text-sm focus:outline-none transition-colors',
    dk ? 'bg-white/[0.07] border-white/[0.12] text-white placeholder-white/35 focus:border-red-500'
       : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400 focus:border-red-500',
  ].join(' ');

  const [partners, setPartners] = useState<Partner[]>(getPartners);
  const [editId, setEditId]     = useState<string | null>(null);
  const [editVal, setEditVal]   = useState<EditState>({ name: '', desc: '', logo: '' });
  const [adding, setAdding]     = useState(false);
  const [newVal, setNewVal]     = useState<EditState>({ name: '', desc: '', logo: '' });
  const [dragging, setDragging] = useState<string | null>(null); // id being dragged

  const fileRef    = useRef<HTMLInputElement>(null);
  const newFileRef = useRef<HTMLInputElement>(null);

  const reload = () => setPartners(getPartners());

  /* ── Logo upload helper ── */
  const pickLogo = useCallback(async (file: File, target: 'edit' | 'new') => {
    if (!file.type.startsWith('image/')) return;
    const b64 = await fileToBase64(file);
    if (target === 'edit') setEditVal(v => ({ ...v, logo: b64 }));
    else setNewVal(v => ({ ...v, logo: b64 }));
  }, []);

  /* ── Save edit ── */
  const saveEdit = () => {
    if (!editId || !editVal.name.trim()) return;
    updatePartner(editId, { name: editVal.name, desc: editVal.desc, logo: editVal.logo });
    setEditId(null);
    reload();
  };

  /* ── Add new ── */
  const saveNew = () => {
    if (!newVal.name.trim() || !newVal.logo) return;
    addPartner({ name: newVal.name, desc: newVal.desc, logo: newVal.logo });
    setNewVal({ name: '', desc: '', logo: '' });
    setAdding(false);
    reload();
  };

  /* ── Delete ── */
  const remove = (id: string) => {
    deletePartner(id);
    reload();
  };

  /* ── Drag-to-reorder ── */
  const dragOver = (e: React.DragEvent, overId: string) => {
    e.preventDefault();
    if (!dragging || dragging === overId) return;
    const list = [...partners];
    const from = list.findIndex(p => p.id === dragging);
    const to   = list.findIndex(p => p.id === overId);
    list.splice(to, 0, list.splice(from, 1)[0]);
    setPartners(list);
  };
  const dragEnd = () => {
    savePartners(partners);
    setDragging(null);
  };

  return (
    <div>
      {/* Header */}
      <div className={`flex items-center justify-between mb-6 ${isRTL ? 'flex-row-reverse' : ''}`}>
        <div className={isRTL ? 'text-right' : ''}>
          <h2 className={`${txt1} text-xl font-bold mb-1`}>{t.partnersTitle}</h2>
          <p className={`${txt2} text-sm`}>{t.partnersSubtitle}</p>
        </div>
        <button onClick={() => { setAdding(true); setNewVal({ name: '', desc: '', logo: '' }); }}
          className="flex items-center gap-2 bg-red-700 hover:bg-red-600 text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors">
          <Plus size={15} /> {t.addPartner}
        </button>
      </div>

      {/* Add new form */}
      {adding && (
        <div className={`${cardCls} p-5 mb-5`}>
          <h3 className={`${txt1} font-bold mb-4 text-sm`}>{t.newPartner}</h3>
          <div className="space-y-3">
            {/* Logo upload */}
            <div>
              <label className={`${txt2} text-xs font-medium mb-1.5 block`}>{t.logoLabel}</label>
              <div
                onClick={() => newFileRef.current?.click()}
                className={`cursor-pointer rounded-xl border-2 border-dashed flex items-center justify-center gap-3 p-4 transition-colors
                  ${dk ? 'border-white/10 hover:border-red-500/50 bg-white/[0.03]' : 'border-slate-300 hover:border-red-400 bg-slate-50'}`}>
                <input ref={newFileRef} type="file" accept="image/*" className="hidden"
                  onChange={async e => { const f = e.target.files?.[0]; if (f) await pickLogo(f,'new'); e.target.value=''; }} />
                {newVal.logo ? (
                  <img src={newVal.logo} alt="" className="h-16 object-contain" />
                ) : (
                  <div className={`flex flex-col items-center gap-1 ${txt3}`}>
                    <Upload size={20} />
                    <span className="text-xs">{t.uploadLogo}</span>
                  </div>
                )}
              </div>
            </div>
            <div>
              <label className={`${txt2} text-xs font-medium mb-1 block`}>{t.nameLabel}</label>
              <input value={newVal.name} onChange={e => setNewVal(v=>({...v, name: e.target.value}))}
                className={inpCls} placeholder="e.g. Fortinet" />
            </div>
            <div>
              <label className={`${txt2} text-xs font-medium mb-1 block`}>{t.descLabel}</label>
              <input value={newVal.desc} onChange={e => setNewVal(v=>({...v, desc: e.target.value}))}
                className={inpCls} placeholder="e.g. Next-Generation Firewall & Security" />
            </div>
            <div className={`flex gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <button onClick={saveNew} disabled={!newVal.name.trim() || !newVal.logo}
                className="flex items-center gap-1.5 bg-red-700 hover:bg-red-600 disabled:opacity-40 text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors">
                <Check size={14} /> {t.save}
              </button>
              <button onClick={() => setAdding(false)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm transition-colors
                  ${dk ? 'bg-white/[0.06] text-white/70 hover:bg-white/10' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>
                <X size={14} /> {t.cancel}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Partners list */}
      <div className="space-y-3">
        {partners.map(p => (
          <div
            key={p.id}
            draggable
            onDragStart={() => setDragging(p.id)}
            onDragOver={e => dragOver(e, p.id)}
            onDragEnd={dragEnd}
            className={`${cardCls} p-4 flex items-center gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}
            style={{ opacity: dragging === p.id ? 0.5 : 1, cursor: 'grab' }}
          >
            <GripVertical size={16} className={`${txt3} shrink-0`} />

            {/* Logo preview */}
            <div className="bg-white rounded-xl flex items-center justify-center shrink-0"
                 style={{ width: 90, height: 50 }}>
              {editId === p.id && editVal.logo ? (
                <img src={editVal.logo} alt="" className="h-10 w-20 object-contain" />
              ) : (
                <img src={p.logo} alt={p.name} className="h-10 w-20 object-contain"
                  style={{ filter: p.logo.includes('grandstream') ? 'brightness(1.5) saturate(1.3)' : undefined }} />
              )}
            </div>

            {/* Edit mode */}
            {editId === p.id ? (
              <div className="flex-1 space-y-2">
                {/* Logo replace button */}
                <button onClick={() => fileRef.current?.click()}
                  className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg transition-colors
                    ${dk ? 'bg-white/[0.07] text-white/70 hover:bg-white/12' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>
                  <ImageIcon size={12} /> {t.changeLogo}
                </button>
                <input ref={fileRef} type="file" accept="image/*" className="hidden"
                  onChange={async e => { const f = e.target.files?.[0]; if(f) await pickLogo(f,'edit'); e.target.value=''; }} />
                <input value={editVal.name} onChange={e => setEditVal(v=>({...v, name: e.target.value}))}
                  className={`${inpCls} text-sm`} placeholder="الاسم" />
                <input value={editVal.desc} onChange={e => setEditVal(v=>({...v, desc: e.target.value}))}
                  className={`${inpCls} text-sm`} placeholder="الوصف" />
              </div>
            ) : (
              <div className={`flex-1 ${isRTL ? 'text-right' : ''}`}>
                <p className={`${txt1} font-semibold text-sm`}>{p.name}</p>
                <p className={`${txt3} text-xs mt-0.5`}>{p.desc}</p>
              </div>
            )}

            {/* Actions */}
            <div className={`flex items-center gap-2 shrink-0 ${isRTL ? 'flex-row-reverse' : ''}`}>
              {editId === p.id ? (
                <>
                  <button onClick={saveEdit}
                    className="p-2 bg-green-700 hover:bg-green-600 text-white rounded-lg transition-colors">
                    <Check size={14} />
                  </button>
                  <button onClick={() => setEditId(null)}
                    className={`p-2 rounded-lg transition-colors ${dk ? 'bg-white/[0.07] text-white/60 hover:bg-white/12' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}>
                    <X size={14} />
                  </button>
                </>
              ) : (
                <>
                  <button onClick={() => { setEditId(p.id); setEditVal({ name: p.name, desc: p.desc, logo: p.logo }); }}
                    className={`p-2 rounded-lg transition-colors ${dk ? 'bg-white/[0.07] text-white/60 hover:bg-white/12' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}>
                    <Edit2 size={14} />
                  </button>
                  <button onClick={() => remove(p.id)}
                    className="p-2 bg-red-900/30 hover:bg-red-700 text-red-400 hover:text-white rounded-lg transition-colors">
                    <Trash2 size={14} />
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      {partners.length === 0 && (
        <div className={`text-center py-16 ${txt3}`}>
          <ImageIcon size={32} className="mx-auto mb-3 opacity-40" />
          <p className="text-sm">{t.noPartners}</p>
        </div>
      )}
    </div>
  );
}
