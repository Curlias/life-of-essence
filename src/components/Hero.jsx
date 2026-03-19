import { Search } from 'lucide-react';
import { useState } from 'react';

export default function Hero({ onSearch, setCurrentPage }) {
  const [query, setQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(query);
    setCurrentPage('catalog');
  };

  const noteHighlights = ['🍋 Bergamota', '🌹 Rosa', '🪵 Sándalo', '🌿 Vetiver', '✨ Ámbar', '🍦 Vainilla'];

  return (
    <section style={{
      minHeight: '100vh',
      background: `linear-gradient(160deg, var(--verde-oscuro) 0%, var(--verde-bosque) 45%, #6b7c5e 100%)`,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      padding: '100px 24px 80px',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Decorative circles */}
      <div style={{
        position: 'absolute', top: -80, right: -80,
        width: 400, height: 400, borderRadius: '50%',
        background: 'rgba(197,179,88,0.06)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: -60, left: -60,
        width: 300, height: 300, borderRadius: '50%',
        background: 'rgba(139,69,19,0.08)',
        pointerEvents: 'none',
      }} />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 700 }}>
        {/* Logo large */}
        <h1 style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 'clamp(2.2rem, 6vw, 4rem)',
          fontWeight: 700,
          color: 'var(--dorado)',
          letterSpacing: '1px',
          lineHeight: 1.15,
          marginBottom: 16,
        }}>
          Life of Essence
        </h1>
        <p style={{
          fontFamily: 'var(--font-serif)',
          fontStyle: 'italic',
          fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
          color: 'rgba(255,255,255,0.72)',
          marginBottom: 48,
          letterSpacing: '0.5px',
        }}>
          "Donde la fragancia cuenta su historia."
        </p>

        {/* Search */}
        <form onSubmit={handleSearch} style={{ marginBottom: 40 }}>
          <div style={{
            display: 'flex',
            maxWidth: 540,
            margin: '0 auto',
            backgroundColor: 'white',
            borderRadius: 32,
            overflow: 'hidden',
            boxShadow: '0 4px 24px rgba(0,0,0,0.2)',
          }}>
            <input
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Busca un perfume, nota o marca..."
              style={{
                flex: 1,
                padding: '14px 20px',
                border: 'none',
                outline: 'none',
                fontSize: '0.95rem',
                color: 'var(--gris-texto)',
                backgroundColor: 'transparent',
              }}
            />
            <button type="submit" style={{
              backgroundColor: 'var(--verde-bosque)',
              color: 'white',
              padding: '0 24px',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              fontSize: '0.9rem',
              fontWeight: 500,
              flexShrink: 0,
            }}>
              <Search size={17} />
              Buscar
            </button>
          </div>
        </form>

        {/* Note pills */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, justifyContent: 'center', marginBottom: 48 }}>
          {noteHighlights.map(note => (
            <button
              key={note}
              onClick={() => { onSearch(note.split(' ')[1]); setCurrentPage('catalog'); }}
              style={{
                backgroundColor: 'rgba(255,255,255,0.1)',
                color: 'rgba(255,255,255,0.85)',
                border: '1px solid rgba(197,179,88,0.35)',
                padding: '6px 16px',
                borderRadius: 20,
                fontSize: '0.82rem',
                transition: 'all 0.2s',
              }}
            >
              {note}
            </button>
          ))}
        </div>

        {/* CTA buttons */}
        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
          <button
            onClick={() => setCurrentPage('catalog')}
            style={{
              backgroundColor: 'var(--dorado)',
              color: 'var(--verde-oscuro)',
              fontWeight: 700,
              padding: '13px 32px',
              borderRadius: 28,
              fontSize: '0.95rem',
              letterSpacing: '0.3px',
              boxShadow: '0 4px 16px rgba(197,179,88,0.35)',
            }}
          >
            Explorar Catálogo
          </button>
          <button
            onClick={() => setCurrentPage('perfumers')}
            style={{
              backgroundColor: 'transparent',
              color: 'rgba(255,255,255,0.88)',
              border: '1px solid rgba(255,255,255,0.35)',
              fontWeight: 500,
              padding: '13px 32px',
              borderRadius: 28,
              fontSize: '0.95rem',
            }}
          >
            Conoce los Narices
          </button>
        </div>
      </div>

      {/* Stats bar */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        backgroundColor: 'rgba(0,0,0,0.2)',
        backdropFilter: 'blur(4px)',
        padding: '18px 24px',
        display: 'flex',
        justifyContent: 'center',
        gap: 'clamp(24px, 6vw, 72px)',
      }}>
        {[
          { value: '10+', label: 'Fragancias' },
          { value: '9', label: 'Perfumistas' },
          { value: '6', label: 'Familias Olfativas' },
          { value: '∞', label: 'Historias' },
        ].map(stat => (
          <div key={stat.label} style={{ textAlign: 'center' }}>
            <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', fontWeight: 700, color: 'var(--dorado)' }}>{stat.value}</div>
            <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.65)', marginTop: 2 }}>{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
