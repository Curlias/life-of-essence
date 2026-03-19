import { Star, ArrowLeft, Heart, Share2, Citrus, Flower2, TreePine, Leaf, Sparkles, Droplets, Flame, Wind } from 'lucide-react';
import { fragrances } from '../data/fragrances';
import { perfumers } from '../data/perfumers';
import ReviewSection from './ReviewSection';

// Map note keywords to Lucide icons
function getNoteIcon(note) {
  const n = note.toLowerCase();
  if (/bergamota|limón|naranja|pomelo|mandarina|cítric|piña|neroli/.test(n)) return { Icon: Citrus, color: '#c4871a' };
  if (/rosa|jasmín|iris|violeta|magnolia|jacinto|lavanda|ylang|flor|geranio/.test(n)) return { Icon: Flower2, color: '#9b4dab' };
  if (/sándalo|cedro|oud|madera|árbol/.test(n)) return { Icon: TreePine, color: '#6b4f12' };
  if (/vetiver|pachulí|musgo|tierra|labdanum/.test(n)) return { Icon: Leaf, color: '#2d6a4f' };
  if (/vainilla|ámbar|benjuí|tonka|coumarin|resina|trufa|ambroxan/.test(n)) return { Icon: Sparkles, color: '#b8970a' };
  if (/pimienta|cardamomo|canela|especias|incienso|salvia/.test(n)) return { Icon: Flame, color: '#b03a2e' };
  if (/mar|aqua|almizcle|musgo blanco/.test(n)) return { Icon: Droplets, color: '#2980b9' };
  return { Icon: Wind, color: '#888' };
}

const concentrationFull = {
  'EdT': 'Eau de Toilette', 'EdP': 'Eau de Parfum',
  'EdC': 'Eau de Cologne', 'Extrait': 'Extrait de Parfum',
};

const familyConfig = {
  'Cítrica':   { Icon: Citrus,   color: '#c4871a' },
  'Floral':    { Icon: Flower2,  color: '#9b4dab' },
  'Amaderada': { Icon: TreePine, color: '#6b4f12' },
  'Oriental':  { Icon: Sparkles, color: '#8b2020' },
  'Fougère':   { Icon: Leaf,     color: '#2d6a4f' },
};

const seasonLabel = { primavera: 'Primavera', verano: 'Verano', otono: 'Otoño', invierno: 'Invierno', dia: 'Día', noche: 'Noche', calor: 'Calor', frio: 'Frío' };

export default function FragranceDetail({ fragrance, onBack, onOpenAuth, isLoggedIn, setCurrentPage, onSelectFragrance }) {
  const perfumer = perfumers.find(p => p.id === fragrance.perfumerId);
  const matches = fragrance.matches?.map(id => fragrances.find(f => f.id === id)).filter(Boolean) || [];
  const { Icon: FamilyIcon, color: familyColor } = familyConfig[fragrance.family] || familyConfig['Amaderada'];

  return (
    <div style={{ paddingTop: 64, minHeight: '100vh', backgroundColor: '#fafaf7' }}>
      {/* Breadcrumb */}
      <div style={{ backgroundColor: 'white', borderBottom: '1px solid #eee', padding: '12px 24px' }}>
        <div className="container">
          <button onClick={onBack} style={{
            display: 'flex', alignItems: 'center', gap: 6,
            color: 'var(--verde-bosque)', background: 'none', fontSize: '0.85rem', fontWeight: 500,
          }}>
            <ArrowLeft size={15} /> Volver al catálogo
          </button>
        </div>
      </div>

      <div className="container" style={{ paddingTop: 36, paddingBottom: 64 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: 40, alignItems: 'start' }}>

          {/* Left: image + actions */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{
              borderRadius: 16, overflow: 'hidden', height: 320,
              boxShadow: '0 8px 32px rgba(83,99,73,0.15)',
              backgroundColor: '#f0ede6',
            }}>
              {fragrance.image ? (
                <img src={fragrance.image} alt={fragrance.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <FamilyIcon size={80} color={familyColor} strokeWidth={1} />
                </div>
              )}
            </div>

            <button style={{
              backgroundColor: 'var(--verde-bosque)', color: 'white',
              padding: '12px', borderRadius: 10, fontWeight: 600, fontSize: '0.9rem',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            }}>
              <Heart size={16} /> Agregar a favoritos
            </button>
            <button style={{
              backgroundColor: 'transparent', color: '#777',
              padding: '10px', borderRadius: 10, fontSize: '0.85rem',
              border: '1px solid #e0e0e0',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            }}>
              <Share2 size={15} /> Compartir
            </button>
          </div>

          {/* Right: info */}
          <div>
            {/* Tags */}
            <div style={{ display: 'flex', gap: 8, marginBottom: 14, flexWrap: 'wrap' }}>
              <Tag color={familyColor}><FamilyIcon size={11} strokeWidth={2} /> {fragrance.family}</Tag>
              <Tag color="var(--cuero)">{fragrance.concentration}</Tag>
              {fragrance.season?.map(s => (
                <Tag key={s} color="#6b7c5e">{seasonLabel[s] || s}</Tag>
              ))}
            </div>

            <p style={{ fontSize: '0.78rem', color: '#aaa', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: 4 }}>
              {fragrance.brand}
            </p>
            <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.2rem', color: '#1a1a1a', lineHeight: 1.15, marginBottom: 8 }}>
              {fragrance.name}
            </h1>
            {perfumer && (
              <p style={{ fontSize: '0.85rem', color: '#888', marginBottom: 20 }}>
                por{' '}
                <button onClick={() => setCurrentPage('perfumers')}
                  style={{ background: 'none', color: 'var(--verde-bosque)', fontWeight: 600, textDecoration: 'underline' }}>
                  {perfumer.name}
                </button>
                {' '}· {fragrance.year}
              </p>
            )}

            {/* Rating summary */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: 20,
              backgroundColor: 'white', borderRadius: 14, padding: '18px 22px',
              marginBottom: 22, boxShadow: '0 2px 12px rgba(83,99,73,0.08)',
              border: '1px solid #f0f0f0',
            }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: 'var(--font-serif)', fontSize: '2.8rem', fontWeight: 700, color: '#1a1a1a', lineHeight: 1 }}>
                  {fragrance.rating.toFixed(1)}
                </div>
                <div style={{ display: 'flex', gap: 2, justifyContent: 'center', marginTop: 6 }}>
                  {[1,2,3,4,5].map(i => (
                    <Star key={i} size={14}
                      fill={i <= Math.round(fragrance.rating) ? 'var(--dorado)' : 'transparent'}
                      color={i <= Math.round(fragrance.rating) ? 'var(--dorado)' : '#ddd'}
                    />
                  ))}
                </div>
                <div style={{ fontSize: '0.72rem', color: '#bbb', marginTop: 3 }}>
                  {fragrance.reviewCount} reseñas
                </div>
              </div>
              <div style={{ width: 1, height: 60, backgroundColor: '#eee' }} />
              <div style={{ flex: 1, display: 'flex', gap: 16 }}>
                <StatMini label="Duración" value={4} />
                <StatMini label="Estela" value={3} />
                <StatMini label="Precio/Calidad" value={4} />
              </div>
            </div>

            <p style={{ fontSize: '0.95rem', color: '#555', lineHeight: 1.75, marginBottom: 24, fontStyle: 'italic', borderLeft: '3px solid var(--dorado)', paddingLeft: 14 }}>
              "{fragrance.description}"
            </p>

            {/* Olfactory Pyramid */}
            <div style={{
              backgroundColor: 'white', borderRadius: 14, padding: '22px 24px',
              boxShadow: '0 2px 12px rgba(83,99,73,0.08)', border: '1px solid #f0f0f0',
            }}>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.15rem', color: '#1a1a1a', marginBottom: 18 }}>
                Pirámide Olfativa
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <NoteRow label="Notas de Salida" notes={fragrance.notes.salida} labelColor="#c4871a" />
                <NoteRow label="Notas de Corazón" notes={fragrance.notes.corazon} labelColor="#9b4dab" />
                <NoteRow label="Notas de Fondo" notes={fragrance.notes.fondo} labelColor="#6b4f12" />
              </div>
            </div>
          </div>
        </div>

        {/* Matches */}
        {matches.length > 0 && (
          <section style={{ marginTop: 48 }}>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem', color: '#1a1a1a', marginBottom: 18 }}>
              Si te gusta <em>{fragrance.name}</em>, te gustará...
            </h2>
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              {matches.map(m => {
                const { Icon: MIcon, color: mc } = familyConfig[m.family] || familyConfig['Amaderada'];
                return (
                  <button key={m.id} onClick={() => onSelectFragrance(m)} style={{
                    backgroundColor: 'white', borderRadius: 14, padding: '0',
                    boxShadow: '0 2px 12px rgba(83,99,73,0.09)',
                    display: 'flex', overflow: 'hidden', cursor: 'pointer',
                    border: '1px solid #f0f0f0', transition: 'box-shadow 0.2s, transform 0.2s',
                    width: 260,
                  }}
                    onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 8px 24px rgba(83,99,73,0.16)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                    onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 2px 12px rgba(83,99,73,0.09)'; e.currentTarget.style.transform = 'translateY(0)'; }}
                  >
                    <div style={{ width: 80, height: 80, flexShrink: 0, overflow: 'hidden', backgroundColor: '#f5f2ec' }}>
                      {m.image
                        ? <img src={m.image} alt={m.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        : <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><MIcon size={28} color={mc} strokeWidth={1.2} /></div>
                      }
                    </div>
                    <div style={{ padding: '12px 14px', textAlign: 'left' }}>
                      <div style={{ fontFamily: 'var(--font-serif)', fontWeight: 600, fontSize: '0.9rem', color: '#1a1a1a' }}>{m.name}</div>
                      <div style={{ fontSize: '0.72rem', color: '#aaa', marginBottom: 4 }}>{m.brand}</div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                        <Star size={11} fill="var(--dorado)" color="var(--dorado)" />
                        <span style={{ fontSize: '0.75rem', fontWeight: 600 }}>{m.rating}</span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </section>
        )}

        <ReviewSection fragrance={fragrance} onOpenAuth={onOpenAuth} isLoggedIn={isLoggedIn} />
      </div>
    </div>
  );
}

function Tag({ children, color }) {
  return (
    <span style={{
      fontSize: '0.72rem', fontWeight: 600, padding: '4px 11px', borderRadius: 12,
      backgroundColor: color + '15', color: color, border: `1px solid ${color}35`,
      display: 'flex', alignItems: 'center', gap: 4,
    }}>{children}</span>
  );
}

function NoteRow({ label, notes, labelColor }) {
  return (
    <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
      <div style={{ minWidth: 130, fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.6px', color: labelColor, paddingTop: 3 }}>
        {label}
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
        {notes.map(note => {
          const { Icon, color } = getNoteIcon(note);
          return (
            <span key={note} style={{
              display: 'flex', alignItems: 'center', gap: 5,
              fontSize: '0.82rem', color: '#333',
              backgroundColor: '#fafaf7', border: '1px solid #e8e4de',
              padding: '4px 11px', borderRadius: 20,
            }}>
              <Icon size={13} color={color} strokeWidth={1.8} />
              {note}
            </span>
          );
        })}
      </div>
    </div>
  );
}

function StatMini({ label, value }) {
  return (
    <div style={{ flex: 1 }}>
      <div style={{ fontSize: '0.68rem', color: '#aaa', marginBottom: 5 }}>{label}</div>
      <div style={{ display: 'flex', gap: 2 }}>
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} style={{
            flex: 1, height: 5, borderRadius: 3,
            backgroundColor: i < value ? 'var(--dorado)' : '#eee',
          }} />
        ))}
      </div>
    </div>
  );
}
