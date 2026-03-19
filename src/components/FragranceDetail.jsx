import { Star, ArrowLeft, Heart, Share2, CheckCircle } from 'lucide-react';
import { fragrances } from '../data/fragrances';
import { perfumers } from '../data/perfumers';
import ReviewSection from './ReviewSection';

const noteIcons = {
  Bergamota: '🍋', Limón: '🍋', Naranja: '🍊', Pomelo: '🍋', Mandarina: '🍊', Piña: '🍍',
  Rosa: '🌹', Jazmín: '🌸', Iris: '🌷', Violeta: '💜', Magnolia: '🌸', Lavanda: '💜',
  'Ylang-Ylang': '🌼', Geranio: '🌿', Jacinto: '🌸',
  Sándalo: '🪵', Cedro: '🌲', Vetiver: '🌿', Pachulí: '🌿', Oud: '🪵', 'Musgo de roble': '🌿',
  Vainilla: '🍦', Ámbar: '✨', Benjuí: '🍬', 'Haba tonka': '🌰', Coumarin: '🌾',
  Cardamomo: '🫛', Pimienta: '🌶️', Canela: '🪵', Trufa: '🍄',
  Incienso: '🕯️', Mar: '🌊', Ambroxan: '✨',
};

function getIcon(note) {
  return Object.entries(noteIcons).find(([k]) => note.toLowerCase().includes(k.toLowerCase()))?.[1] || '·';
}

const concentrationFull = {
  'EdT': 'Eau de Toilette', 'EdP': 'Eau de Parfum',
  'EdC': 'Eau de Cologne', 'Extrait': 'Extrait de Parfum',
};

export default function FragranceDetail({ fragrance, onBack, onOpenAuth, isLoggedIn, setCurrentPage, onSelectFragrance }) {
  const perfumer = perfumers.find(p => p.id === fragrance.perfumerId);
  const matches = fragrance.matches
    ?.map(id => fragrances.find(f => f.id === id))
    .filter(Boolean) || [];

  const seasonIcons = { primavera: '🌸', verano: '☀️', otono: '🍂', invierno: '❄️', dia: '🌤️', noche: '🌙', calor: '🔥', frio: '❄️' };

  return (
    <div style={{ paddingTop: 64, minHeight: '100vh', backgroundColor: 'var(--crema)' }}>
      {/* Back */}
      <div style={{ backgroundColor: 'white', borderBottom: '1px solid var(--crema-oscura)', padding: '12px 24px' }}>
        <div className="container">
          <button onClick={onBack} style={{
            display: 'flex', alignItems: 'center', gap: 6,
            color: 'var(--verde-bosque)', background: 'none', fontSize: '0.85rem', fontWeight: 500,
          }}>
            <ArrowLeft size={16} /> Volver al catálogo
          </button>
        </div>
      </div>

      <div className="container" style={{ paddingTop: 32, paddingBottom: 64 }}>
        {/* Main grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: 36, alignItems: 'start' }}>
          {/* Left: image + actions */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{
              backgroundColor: 'white',
              borderRadius: 16,
              height: 280,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '6rem',
              boxShadow: '0 4px 20px var(--sombra)',
            }}>
              {fragrance.family === 'Cítrica' ? '🍋' :
               fragrance.family === 'Floral' ? '🌹' :
               fragrance.family === 'Amaderada' ? '🪵' :
               fragrance.family === 'Oriental' ? '🕌' : '🌿'}
            </div>
            <button style={{
              backgroundColor: 'var(--verde-bosque)', color: 'white',
              padding: '11px', borderRadius: 10, fontWeight: 600, fontSize: '0.9rem',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            }}>
              <Heart size={16} /> Agregar a favoritos
            </button>
            <button style={{
              backgroundColor: 'transparent', color: 'var(--gris-claro)',
              padding: '9px', borderRadius: 10, fontSize: '0.85rem',
              border: '1px solid #ddd',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            }}>
              <Share2 size={15} /> Compartir
            </button>
          </div>

          {/* Right: info */}
          <div>
            <div style={{ display: 'flex', gap: 8, marginBottom: 10, flexWrap: 'wrap' }}>
              <Tag color="var(--verde-bosque)">{fragrance.family}</Tag>
              <Tag color="var(--cuero)">{fragrance.concentration}</Tag>
              {fragrance.season?.map(s => (
                <Tag key={s} color="#6b7c5e">{seasonIcons[s]} {s.charAt(0).toUpperCase() + s.slice(1)}</Tag>
              ))}
            </div>

            <p style={{ fontSize: '0.8rem', color: 'var(--gris-claro)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: 4 }}>
              {fragrance.brand}
            </p>
            <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', color: 'var(--verde-oscuro)', lineHeight: 1.2, marginBottom: 8 }}>
              {fragrance.name}
            </h1>
            {perfumer && (
              <p style={{ fontSize: '0.85rem', color: 'var(--gris-claro)', marginBottom: 16 }}>
                por <button onClick={() => setCurrentPage('perfumers')} style={{ background: 'none', color: 'var(--verde-bosque)', fontWeight: 600, textDecoration: 'underline' }}>{perfumer.name}</button>
                {' '}· {fragrance.year}
              </p>
            )}

            {/* Rating summary */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: 16,
              backgroundColor: 'white', borderRadius: 12, padding: '14px 18px',
              marginBottom: 20, boxShadow: '0 2px 10px var(--sombra)',
            }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: 'var(--font-serif)', fontSize: '2.4rem', fontWeight: 700, color: 'var(--verde-oscuro)', lineHeight: 1 }}>
                  {fragrance.rating.toFixed(1)}
                </div>
                <div style={{ display: 'flex', gap: 2, justifyContent: 'center', marginTop: 4 }}>
                  {[1,2,3,4,5].map(i => (
                    <Star key={i} size={14}
                      fill={i <= Math.round(fragrance.rating) ? 'var(--dorado)' : 'transparent'}
                      color={i <= Math.round(fragrance.rating) ? 'var(--dorado)' : '#ccc'}
                    />
                  ))}
                </div>
                <div style={{ fontSize: '0.72rem', color: 'var(--gris-claro)', marginTop: 2 }}>
                  {fragrance.reviewCount} reseñas
                </div>
              </div>
              <div style={{ width: 1, height: 56, backgroundColor: '#eee' }} />
              <div style={{ flex: 1, display: 'flex', gap: 12 }}>
                <StatMini label="Duración" value={4} max={5} />
                <StatMini label="Estela" value={3} max={5} />
                <StatMini label="Precio/Calidad" value={4} max={5} />
              </div>
            </div>

            <p style={{ fontSize: '0.92rem', color: 'var(--gris-texto)', lineHeight: 1.7, marginBottom: 24, fontStyle: 'italic' }}>
              "{fragrance.description}"
            </p>

            {/* Olfactory Pyramid */}
            <div style={{
              backgroundColor: 'white', borderRadius: 12, padding: '20px 22px',
              boxShadow: '0 2px 10px var(--sombra)', marginBottom: 24,
            }}>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', color: 'var(--verde-oscuro)', marginBottom: 16 }}>
                Pirámide Olfativa
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <NoteRow label="Salida" notes={fragrance.notes.salida} color="#e8b84b" />
                <NoteRow label="Corazón" notes={fragrance.notes.corazon} color="#c77dbd" />
                <NoteRow label="Fondo" notes={fragrance.notes.fondo} color="#8B6914" />
              </div>
            </div>
          </div>
        </div>

        {/* Matches */}
        {matches.length > 0 && (
          <section style={{ marginTop: 40 }}>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem', color: 'var(--verde-oscuro)', marginBottom: 16 }}>
              Si te gusta {fragrance.name}, te gustará...
            </h2>
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              {matches.map(m => (
                <button
                  key={m.id}
                  onClick={() => onSelectFragrance(m)}
                  style={{
                    backgroundColor: 'white', borderRadius: 12, padding: '14px 18px',
                    boxShadow: '0 2px 12px var(--sombra)',
                    display: 'flex', gap: 12, alignItems: 'center',
                    cursor: 'pointer', border: '1px solid transparent',
                    transition: 'border-color 0.2s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--verde-bosque)'}
                  onMouseLeave={e => e.currentTarget.style.borderColor = 'transparent'}
                >
                  <span style={{ fontSize: '2rem' }}>
                    {m.family === 'Floral' ? '🌹' : m.family === 'Oriental' ? '🕌' : m.family === 'Cítrica' ? '🍋' : '🪵'}
                  </span>
                  <div style={{ textAlign: 'left' }}>
                    <div style={{ fontFamily: 'var(--font-serif)', fontWeight: 600, fontSize: '0.95rem', color: 'var(--verde-oscuro)' }}>{m.name}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--gris-claro)' }}>{m.brand}</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 3, marginTop: 3 }}>
                      <Star size={11} fill="var(--dorado)" color="var(--dorado)" />
                      <span style={{ fontSize: '0.75rem', fontWeight: 600 }}>{m.rating}</span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </section>
        )}

        {/* Reviews */}
        <ReviewSection fragrance={fragrance} onOpenAuth={onOpenAuth} isLoggedIn={isLoggedIn} />
      </div>
    </div>
  );
}

function Tag({ children, color }) {
  return (
    <span style={{
      fontSize: '0.72rem', fontWeight: 600, padding: '3px 10px', borderRadius: 12,
      backgroundColor: color + '18', color: color, border: `1px solid ${color}40`,
    }}>{children}</span>
  );
}

function NoteRow({ label, notes, color }) {
  return (
    <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
      <div style={{
        minWidth: 70, fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase',
        letterSpacing: '0.6px', color: color, paddingTop: 2,
      }}>{label}</div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
        {notes.map(note => (
          <span key={note} style={{
            display: 'flex', alignItems: 'center', gap: 4,
            fontSize: '0.8rem', color: 'var(--gris-texto)',
            backgroundColor: color + '12', border: `1px solid ${color}30`,
            padding: '3px 10px', borderRadius: 10,
          }}>
            <span style={{ fontSize: '0.85rem' }}>{getIcon(note)}</span>
            {note}
          </span>
        ))}
      </div>
    </div>
  );
}

function StatMini({ label, value, max }) {
  return (
    <div style={{ flex: 1 }}>
      <div style={{ fontSize: '0.68rem', color: 'var(--gris-claro)', marginBottom: 4 }}>{label}</div>
      <div style={{ display: 'flex', gap: 2 }}>
        {Array.from({ length: max }).map((_, i) => (
          <div key={i} style={{
            flex: 1, height: 6, borderRadius: 3,
            backgroundColor: i < value ? 'var(--dorado)' : '#eee',
          }} />
        ))}
      </div>
    </div>
  );
}
