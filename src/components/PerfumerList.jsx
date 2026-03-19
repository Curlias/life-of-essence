import { perfumers } from '../data/perfumers';
import { fragrances } from '../data/fragrances';
import { Award, ChevronRight } from 'lucide-react';
import { useState } from 'react';

export default function PerfumerList({ onSelectFragrance, setCurrentPage }) {
  const [selected, setSelected] = useState(null);
  const sorted = [...perfumers].sort((a, b) => a.name.localeCompare(b.name));

  // Group alphabetically
  const grouped = sorted.reduce((acc, p) => {
    const letter = p.name[0].toUpperCase();
    if (!acc[letter]) acc[letter] = [];
    acc[letter].push(p);
    return acc;
  }, {});

  return (
    <div style={{ paddingTop: 64, minHeight: '100vh', backgroundColor: 'var(--crema)' }}>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, var(--verde-oscuro) 0%, var(--verde-bosque) 100%)',
        padding: '48px 24px 40px',
        textAlign: 'center',
      }}>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.2rem', color: 'var(--dorado)', marginBottom: 8 }}>
          Los Narices
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.72)', fontSize: '0.95rem', fontStyle: 'italic' }}>
          Los artistas detrás de las fragancias que amamos
        </p>
      </div>

      <div className="container" style={{ paddingTop: 36, paddingBottom: 64, display: 'grid', gridTemplateColumns: '1fr 340px', gap: 32, alignItems: 'start' }}>
        {/* Left: alphabetical list + portrait gallery */}
        <div>
          {selected && (
            <PerfumerDetail perfumer={selected} onSelectFragrance={onSelectFragrance} setCurrentPage={setCurrentPage} onClose={() => setSelected(null)} />
          )}

          {!selected && (
            <>
              {/* Portrait gallery */}
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', color: 'var(--verde-oscuro)', marginBottom: 18 }}>
                Galería de Perfumistas
              </h2>
              <div style={{
                display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))',
                gap: 16, marginBottom: 40,
              }}>
                {sorted.map(p => (
                  <button
                    key={p.id}
                    onClick={() => setSelected(p)}
                    style={{
                      backgroundColor: 'white', borderRadius: 12, padding: '16px 12px',
                      boxShadow: '0 2px 10px var(--sombra)', cursor: 'pointer',
                      border: '2px solid transparent', transition: 'all 0.2s',
                      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10,
                    }}
                    onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--verde-bosque)'}
                    onMouseLeave={e => e.currentTarget.style.borderColor = 'transparent'}
                  >
                    {/* B&W avatar */}
                    <div style={{
                      width: 70, height: 70, borderRadius: '50%',
                      background: `linear-gradient(135deg, #666 0%, #333 100%)`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      filter: 'grayscale(1)',
                      fontSize: '1.8rem', fontFamily: 'var(--font-serif)',
                      color: 'white', fontWeight: 700,
                    }}>
                      {p.initial}
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontFamily: 'var(--font-serif)', fontWeight: 600, fontSize: '0.82rem', color: 'var(--verde-oscuro)', lineHeight: 1.25 }}>
                        {p.name}
                      </div>
                      <div style={{ fontSize: '0.68rem', color: 'var(--gris-claro)', marginTop: 3 }}>
                        {p.specialty}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Right: alphabetical index */}
        <aside style={{
          backgroundColor: 'white', borderRadius: 12, padding: '20px',
          boxShadow: '0 2px 12px var(--sombra)', position: 'sticky', top: 84,
        }}>
          <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1rem', color: 'var(--verde-oscuro)', marginBottom: 16 }}>
            Índice Alfabético
          </h3>
          {Object.entries(grouped).sort().map(([letter, list]) => (
            <div key={letter} style={{ marginBottom: 16 }}>
              <div style={{
                fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase',
                letterSpacing: '1px', color: 'var(--dorado)', marginBottom: 6,
                borderBottom: '1px solid var(--crema-oscura)', paddingBottom: 4,
              }}>
                {letter}
              </div>
              {list.map(p => (
                <button
                  key={p.id}
                  onClick={() => setSelected(p)}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    width: '100%', padding: '7px 6px',
                    background: selected?.id === p.id ? '#53634912' : 'none',
                    borderRadius: 6, textAlign: 'left',
                    color: selected?.id === p.id ? 'var(--verde-oscuro)' : 'var(--gris-texto)',
                    fontSize: '0.85rem', fontWeight: selected?.id === p.id ? 600 : 400,
                  }}
                >
                  {p.name}
                  <ChevronRight size={14} color="var(--gris-claro)" />
                </button>
              ))}
            </div>
          ))}
        </aside>
      </div>
    </div>
  );
}

function PerfumerDetail({ perfumer, onSelectFragrance, setCurrentPage, onClose }) {
  const perfumerFragrances = fragrances.filter(f => perfumer.fragranceIds.includes(f.id));

  return (
    <div>
      <button onClick={onClose} style={{
        display: 'flex', alignItems: 'center', gap: 6, marginBottom: 20,
        color: 'var(--verde-bosque)', background: 'none', fontSize: '0.85rem', fontWeight: 500,
      }}>
        ← Todos los perfumistas
      </button>

      <div style={{
        backgroundColor: 'white', borderRadius: 16, padding: '28px',
        boxShadow: '0 4px 20px var(--sombra)', marginBottom: 24,
      }}>
        <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start', marginBottom: 20 }}>
          {/* B&W portrait */}
          <div style={{
            width: 100, height: 100, borderRadius: '50%', flexShrink: 0,
            background: 'linear-gradient(135deg, #777 0%, #333 100%)',
            filter: 'grayscale(1)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '2.4rem', fontFamily: 'var(--font-serif)', color: 'white', fontWeight: 700,
          }}>
            {perfumer.initial}
          </div>
          <div>
            <p style={{ fontSize: '0.75rem', color: 'var(--gris-claro)', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: 4 }}>
              Perfumista
            </p>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', color: 'var(--verde-oscuro)', lineHeight: 1.15, marginBottom: 6 }}>
              {perfumer.name}
            </h2>
            <span style={{
              fontSize: '0.75rem', fontWeight: 600, padding: '3px 10px', borderRadius: 12,
              backgroundColor: 'var(--verde-bosque)20', color: 'var(--verde-bosque)',
              border: '1px solid var(--verde-bosque)40',
            }}>
              {perfumer.specialty}
            </span>
          </div>
        </div>

        <p style={{ fontSize: '0.9rem', color: 'var(--gris-texto)', lineHeight: 1.7, marginBottom: 20 }}>
          {perfumer.bio}
        </p>

        {/* Awards */}
        {perfumer.awards?.length > 0 && (
          <div>
            <h4 style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.6px', color: 'var(--gris-claro)', marginBottom: 10 }}>
              Reconocimientos
            </h4>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {perfumer.awards.map(award => (
                <span key={award} style={{
                  display: 'flex', alignItems: 'center', gap: 5,
                  fontSize: '0.75rem', padding: '4px 12px', borderRadius: 12,
                  backgroundColor: 'var(--dorado)18', color: 'var(--cuero)',
                  border: '1px solid var(--dorado)50',
                }}>
                  <Award size={12} /> {award}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Fragrances */}
      {perfumerFragrances.length > 0 && (
        <div style={{ backgroundColor: 'white', borderRadius: 12, padding: '20px', boxShadow: '0 2px 10px var(--sombra)' }}>
          <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', color: 'var(--verde-oscuro)', marginBottom: 14 }}>
            Creaciones Icónicas
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {perfumerFragrances.map(f => (
              <button
                key={f.id}
                onClick={() => { onSelectFragrance(f); setCurrentPage('detail'); }}
                style={{
                  display: 'flex', alignItems: 'center', gap: 14,
                  padding: '12px 14px', borderRadius: 8,
                  border: '1px solid #eee', background: 'none', textAlign: 'left',
                  cursor: 'pointer', transition: 'background 0.15s',
                }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = 'var(--crema)'}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                <span style={{ fontSize: '1.8rem' }}>
                  {f.family === 'Floral' ? '🌹' : f.family === 'Oriental' ? '🕌' : f.family === 'Cítrica' ? '🍋' : '🪵'}
                </span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: 'var(--font-serif)', fontWeight: 600, fontSize: '0.95rem', color: 'var(--verde-oscuro)' }}>{f.name}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--gris-claro)' }}>{f.brand} · {f.year}</div>
                </div>
                <ChevronRight size={16} color="var(--gris-claro)" />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
