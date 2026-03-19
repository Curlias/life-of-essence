import { perfumers } from '../data/perfumers';
import { fragrances } from '../data/fragrances';
import { Award, ChevronRight, ArrowLeft } from 'lucide-react';
import { useState } from 'react';

export default function PerfumerList({ onSelectFragrance, setCurrentPage }) {
  const [selected, setSelected] = useState(null);
  const sorted = [...perfumers].sort((a, b) => a.name.localeCompare(b.name));

  const grouped = sorted.reduce((acc, p) => {
    const letter = p.name[0].toUpperCase();
    if (!acc[letter]) acc[letter] = [];
    acc[letter].push(p);
    return acc;
  }, {});

  return (
    <div style={{ paddingTop: 64, minHeight: '100vh', backgroundColor: '#fafaf7' }}>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, var(--verde-oscuro) 0%, var(--verde-bosque) 100%)',
        padding: '52px 24px 44px',
        textAlign: 'center',
      }}>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.4rem', color: 'var(--dorado)', marginBottom: 10 }}>
          Los Narices
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1rem', fontStyle: 'italic' }}>
          Los artistas detrás de las fragancias que amamos
        </p>
      </div>

      <div className="container" style={{ paddingTop: 36, paddingBottom: 64, display: 'grid', gridTemplateColumns: '1fr 300px', gap: 32, alignItems: 'start' }}>

        {/* Left: gallery or detail */}
        <div>
          {selected ? (
            <PerfumerDetail
              perfumer={selected}
              onSelectFragrance={onSelectFragrance}
              setCurrentPage={setCurrentPage}
              onClose={() => setSelected(null)}
            />
          ) : (
            <>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', color: '#1a1a1a', marginBottom: 20 }}>
                Galería de Perfumistas
              </h2>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
                gap: 20,
              }}>
                {sorted.map(p => (
                  <button key={p.id} onClick={() => setSelected(p)} style={{
                    backgroundColor: 'white', borderRadius: 14, padding: '0 0 16px',
                    boxShadow: '0 2px 12px rgba(83,99,73,0.09)',
                    cursor: 'pointer', border: '2px solid transparent',
                    transition: 'all 0.2s', overflow: 'hidden',
                    display: 'flex', flexDirection: 'column', alignItems: 'center',
                  }}
                    onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--verde-bosque)'}
                    onMouseLeave={e => e.currentTarget.style.borderColor = 'transparent'}
                  >
                    {/* B&W portrait */}
                    <div style={{ width: '100%', height: 140, overflow: 'hidden', marginBottom: 12 }}>
                      <img
                        src={p.photo}
                        alt={p.name}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(1)' }}
                        loading="lazy"
                      />
                    </div>
                    <div style={{ textAlign: 'center', padding: '0 10px' }}>
                      <div style={{ fontFamily: 'var(--font-serif)', fontWeight: 600, fontSize: '0.85rem', color: '#1a1a1a', lineHeight: 1.3 }}>
                        {p.name}
                      </div>
                      <div style={{ fontSize: '0.68rem', color: '#aaa', marginTop: 4 }}>
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
          backgroundColor: 'white', borderRadius: 14, padding: '22px',
          boxShadow: '0 2px 12px rgba(83,99,73,0.09)', position: 'sticky', top: 84,
          border: '1px solid #f0f0f0',
        }}>
          <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1rem', color: '#1a1a1a', marginBottom: 16 }}>
            Índice Alfabético
          </h3>
          {Object.entries(grouped).sort().map(([letter, list]) => (
            <div key={letter} style={{ marginBottom: 14 }}>
              <div style={{
                fontSize: '0.68rem', fontWeight: 700, textTransform: 'uppercase',
                letterSpacing: '1px', color: 'var(--dorado)', marginBottom: 6,
                borderBottom: '1px solid #f0ece0', paddingBottom: 4,
              }}>
                {letter}
              </div>
              {list.map(p => (
                <button key={p.id} onClick={() => setSelected(p)} style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  width: '100%', padding: '7px 6px',
                  backgroundColor: selected?.id === p.id ? '#53634912' : 'transparent',
                  borderRadius: 6, textAlign: 'left',
                  color: selected?.id === p.id ? 'var(--verde-oscuro)' : '#444',
                  fontSize: '0.85rem', fontWeight: selected?.id === p.id ? 600 : 400,
                }}>
                  <img src={p.photo} alt={p.name} style={{
                    width: 28, height: 28, borderRadius: '50%', objectFit: 'cover',
                    filter: 'grayscale(1)', flexShrink: 0,
                  }} />
                  <span style={{ flex: 1 }}>{p.name}</span>
                  <ChevronRight size={14} color="#ccc" />
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
        display: 'flex', alignItems: 'center', gap: 6, marginBottom: 22,
        color: 'var(--verde-bosque)', background: 'none', fontSize: '0.85rem', fontWeight: 500,
      }}>
        <ArrowLeft size={15} /> Todos los perfumistas
      </button>

      <div style={{
        backgroundColor: 'white', borderRadius: 16, overflow: 'hidden',
        boxShadow: '0 4px 20px rgba(83,99,73,0.12)', marginBottom: 24, border: '1px solid #f0f0f0',
      }}>
        {/* Cover photo */}
        <div style={{ height: 220, overflow: 'hidden', position: 'relative' }}>
          <img src={perfumer.photo} alt={perfumer.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(1)' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 60%)' }} />
          <div style={{ position: 'absolute', bottom: 20, left: 24 }}>
            <span style={{
              fontSize: '0.72rem', fontWeight: 600, padding: '3px 10px', borderRadius: 10,
              backgroundColor: 'var(--dorado)', color: 'var(--verde-oscuro)',
            }}>
              {perfumer.specialty}
            </span>
          </div>
        </div>

        <div style={{ padding: '24px 28px' }}>
          <p style={{ fontSize: '0.75rem', color: '#aaa', textTransform: 'uppercase', letterSpacing: '0.9px', marginBottom: 4 }}>
            Perfumista
          </p>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.9rem', color: '#1a1a1a', lineHeight: 1.15, marginBottom: 16 }}>
            {perfumer.name}
          </h2>

          <p style={{ fontSize: '0.92rem', color: '#555', lineHeight: 1.75, marginBottom: 22 }}>
            {perfumer.bio}
          </p>

          {perfumer.awards?.length > 0 && (
            <div>
              <h4 style={{ fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.7px', color: '#aaa', marginBottom: 10 }}>
                Reconocimientos
              </h4>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {perfumer.awards.map(award => (
                  <span key={award} style={{
                    display: 'flex', alignItems: 'center', gap: 5,
                    fontSize: '0.75rem', padding: '4px 12px', borderRadius: 12,
                    backgroundColor: '#fdf8e8', color: '#8a6c00',
                    border: '1px solid #e8d97050',
                  }}>
                    <Award size={12} /> {award}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {perfumerFragrances.length > 0 && (
        <div style={{ backgroundColor: 'white', borderRadius: 14, overflow: 'hidden', boxShadow: '0 2px 12px rgba(83,99,73,0.09)', border: '1px solid #f0f0f0' }}>
          <div style={{ padding: '18px 22px', borderBottom: '1px solid #f5f5f5' }}>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', color: '#1a1a1a' }}>
              Creaciones Icónicas
            </h3>
          </div>
          {perfumerFragrances.map(f => (
            <button key={f.id} onClick={() => { onSelectFragrance(f); setCurrentPage('detail'); }}
              style={{
                display: 'flex', alignItems: 'center', gap: 0,
                width: '100%', background: 'none', cursor: 'pointer',
                borderBottom: '1px solid #f8f8f8', textAlign: 'left',
                transition: 'background 0.15s',
              }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = '#fafaf7'}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              <div style={{ width: 72, height: 72, flexShrink: 0, overflow: 'hidden' }}>
                {f.image
                  ? <img src={f.image} alt={f.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  : <div style={{ width: '100%', height: '100%', backgroundColor: '#f0ede6' }} />
                }
              </div>
              <div style={{ flex: 1, padding: '14px 16px' }}>
                <div style={{ fontFamily: 'var(--font-serif)', fontWeight: 600, fontSize: '0.95rem', color: '#1a1a1a' }}>{f.name}</div>
                <div style={{ fontSize: '0.75rem', color: '#aaa' }}>{f.brand} · {f.year}</div>
              </div>
              <ChevronRight size={15} color="#ccc" style={{ marginRight: 16 }} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
