import { Star, Heart } from 'lucide-react';

const familyColors = {
  'Cítrica': '#e8b84b',
  'Floral': '#c77dbd',
  'Amaderada': '#8B6914',
  'Oriental': '#9b3a3a',
  'Fougère': '#2d7a4f',
};

const genderLabel = { hombre: 'H', mujer: 'M', unisex: 'U' };
const genderColor = { hombre: '#3a7ab5', mujer: '#b5507a', unisex: '#536349' };

const concentrationShort = {
  'Eau de Toilette': 'EdT',
  'Eau de Parfum': 'EdP',
  'Eau de Cologne': 'EdC',
  'Extrait de Parfum': 'Extrait',
};

export default function FragranceCard({ fragrance, onClick }) {
  const familyColor = familyColors[fragrance.family] || '#536349';

  return (
    <article
      onClick={onClick}
      style={{
        backgroundColor: 'white',
        borderRadius: 12,
        overflow: 'hidden',
        cursor: 'pointer',
        boxShadow: '0 2px 12px var(--sombra)',
        transition: 'transform 0.2s, box-shadow 0.2s',
        display: 'flex',
        flexDirection: 'column',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.boxShadow = '0 8px 28px rgba(83,99,73,0.18)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 2px 12px var(--sombra)';
      }}
    >
      {/* Image placeholder */}
      <div style={{
        height: 160,
        background: `linear-gradient(135deg, ${familyColor}22 0%, ${familyColor}44 100%)`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
      }}>
        <span style={{ fontSize: '3.5rem' }}>
          {fragrance.family === 'Cítrica' ? '🍋' :
           fragrance.family === 'Floral' ? '🌹' :
           fragrance.family === 'Amaderada' ? '🪵' :
           fragrance.family === 'Oriental' ? '🕌' : '🌿'}
        </span>
        {/* Family badge */}
        <span style={{
          position: 'absolute', top: 10, left: 10,
          backgroundColor: familyColor,
          color: 'white',
          fontSize: '0.7rem',
          fontWeight: 600,
          padding: '2px 8px',
          borderRadius: 10,
          letterSpacing: '0.3px',
        }}>
          {fragrance.family}
        </span>
        {/* Gender badge */}
        <span style={{
          position: 'absolute', top: 10, right: 10,
          backgroundColor: genderColor[fragrance.gender],
          color: 'white',
          fontSize: '0.72rem',
          fontWeight: 700,
          width: 24, height: 24,
          borderRadius: '50%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          {genderLabel[fragrance.gender]}
        </span>
        {/* Wishlist */}
        <button
          onClick={e => e.stopPropagation()}
          style={{
            position: 'absolute', bottom: 10, right: 10,
            backgroundColor: 'rgba(255,255,255,0.85)',
            color: 'var(--cuero)',
            borderRadius: '50%',
            width: 30, height: 30,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 1px 6px rgba(0,0,0,0.12)',
          }}
        >
          <Heart size={14} />
        </button>
      </div>

      {/* Content */}
      <div style={{ padding: '14px 16px', flex: 1, display: 'flex', flexDirection: 'column', gap: 4 }}>
        <div style={{ fontSize: '0.72rem', color: 'var(--gris-claro)', textTransform: 'uppercase', letterSpacing: '0.8px' }}>
          {fragrance.brand}
        </div>
        <h3 style={{
          fontFamily: 'var(--font-serif)',
          fontSize: '1rem',
          fontWeight: 600,
          color: 'var(--gris-texto)',
          lineHeight: 1.3,
        }}>
          {fragrance.name}
        </h3>
        <div style={{ fontSize: '0.75rem', color: 'var(--gris-claro)' }}>
          {concentrationShort[fragrance.concentration] || fragrance.concentration} · {fragrance.year}
        </div>

        {/* Notes preview */}
        <div style={{ marginTop: 6, display: 'flex', gap: 4, flexWrap: 'wrap' }}>
          {fragrance.notes.fondo.slice(0, 2).map(note => (
            <span key={note} style={{
              fontSize: '0.68rem',
              color: 'var(--verde-bosque)',
              backgroundColor: '#53634910',
              border: '1px solid #53634930',
              padding: '2px 7px',
              borderRadius: 8,
            }}>
              {note}
            </span>
          ))}
        </div>

        {/* Rating */}
        <div style={{ marginTop: 'auto', paddingTop: 10, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <Star size={14} fill="var(--dorado)" color="var(--dorado)" />
            <span style={{ fontWeight: 600, fontSize: '0.88rem', color: 'var(--gris-texto)' }}>
              {fragrance.rating.toFixed(1)}
            </span>
            <span style={{ fontSize: '0.72rem', color: 'var(--gris-claro)' }}>
              ({fragrance.reviewCount})
            </span>
          </div>
          <button
            onClick={e => { e.stopPropagation(); onClick(); }}
            style={{
              fontSize: '0.75rem',
              color: 'var(--verde-bosque)',
              fontWeight: 600,
              background: 'none',
              textDecoration: 'underline',
            }}
          >
            Ver más →
          </button>
        </div>
      </div>
    </article>
  );
}
