import { Star, Heart, Citrus, Flower2, TreePine, Leaf, Sparkles, Wind } from 'lucide-react';

const familyConfig = {
  'Cítrica':   { Icon: Citrus,   color: '#c4871a', bg: '#fdf3e3' },
  'Floral':    { Icon: Flower2,  color: '#9b4dab', bg: '#f9f0fb' },
  'Amaderada': { Icon: TreePine, color: '#6b4f12', bg: '#f5f0e8' },
  'Oriental':  { Icon: Sparkles, color: '#8b2020', bg: '#fdf0f0' },
  'Fougère':   { Icon: Leaf,     color: '#2d6a4f', bg: '#edf4f0' },
};

const genderLabel = { hombre: 'H', mujer: 'M', unisex: 'U' };
const genderColor = { hombre: '#2563eb', mujer: '#be185d', unisex: '#536349' };

const concentrationShort = {
  'Eau de Toilette': 'EdT', 'Eau de Parfum': 'EdP',
  'Eau de Cologne': 'EdC', 'Extrait de Parfum': 'Extrait',
};

export default function FragranceCard({ fragrance, onClick }) {
  const { Icon, color, bg } = familyConfig[fragrance.family] || familyConfig['Amaderada'];

  return (
    <article
      onClick={onClick}
      style={{
        backgroundColor: 'white',
        borderRadius: 14,
        overflow: 'hidden',
        cursor: 'pointer',
        boxShadow: '0 2px 12px rgba(83,99,73,0.09)',
        transition: 'transform 0.2s, box-shadow 0.2s',
        display: 'flex',
        flexDirection: 'column',
        border: '1px solid rgba(0,0,0,0.05)',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.boxShadow = '0 12px 32px rgba(83,99,73,0.16)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 2px 12px rgba(83,99,73,0.09)';
      }}
    >
      {/* Image */}
      <div style={{ height: 180, position: 'relative', overflow: 'hidden', backgroundColor: bg }}>
        {fragrance.image ? (
          <img
            src={fragrance.image}
            alt={fragrance.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            loading="lazy"
          />
        ) : (
          <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Icon size={52} color={color} strokeWidth={1.2} />
          </div>
        )}

        {/* Overlay badges */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.0) 55%, rgba(0,0,0,0.38) 100%)' }} />

        <span style={{
          position: 'absolute', top: 10, left: 10,
          backgroundColor: 'white',
          color: color,
          fontSize: '0.68rem', fontWeight: 700,
          padding: '3px 9px', borderRadius: 10,
          display: 'flex', alignItems: 'center', gap: 4,
          boxShadow: '0 1px 4px rgba(0,0,0,0.12)',
        }}>
          <Icon size={11} strokeWidth={2} />
          {fragrance.family}
        </span>

        <span style={{
          position: 'absolute', top: 10, right: 10,
          backgroundColor: genderColor[fragrance.gender],
          color: 'white', fontSize: '0.7rem', fontWeight: 700,
          width: 22, height: 22, borderRadius: '50%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          {genderLabel[fragrance.gender]}
        </span>

        <button
          onClick={e => e.stopPropagation()}
          style={{
            position: 'absolute', bottom: 10, right: 10,
            backgroundColor: 'white', color: '#8B4513',
            borderRadius: '50%', width: 30, height: 30,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
          }}
        >
          <Heart size={14} />
        </button>
      </div>

      {/* Content */}
      <div style={{ padding: '14px 16px', flex: 1, display: 'flex', flexDirection: 'column', gap: 3 }}>
        <div style={{ fontSize: '0.68rem', color: '#999', textTransform: 'uppercase', letterSpacing: '0.9px', fontWeight: 500 }}>
          {fragrance.brand}
        </div>
        <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1rem', fontWeight: 600, color: '#2c2c2c', lineHeight: 1.3 }}>
          {fragrance.name}
        </h3>
        <div style={{ fontSize: '0.73rem', color: '#aaa' }}>
          {concentrationShort[fragrance.concentration]} · {fragrance.year}
        </div>

        <div style={{ marginTop: 8, display: 'flex', gap: 4, flexWrap: 'wrap' }}>
          {fragrance.notes.fondo.slice(0, 2).map(note => (
            <span key={note} style={{
              fontSize: '0.67rem', color: 'var(--verde-bosque)',
              backgroundColor: '#53634910', border: '1px solid #53634928',
              padding: '2px 8px', borderRadius: 8,
            }}>
              {note}
            </span>
          ))}
        </div>

        <div style={{ marginTop: 'auto', paddingTop: 10, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <Star size={13} fill="var(--dorado)" color="var(--dorado)" />
            <span style={{ fontWeight: 700, fontSize: '0.88rem', color: '#2c2c2c' }}>{fragrance.rating.toFixed(1)}</span>
            <span style={{ fontSize: '0.7rem', color: '#bbb' }}>({fragrance.reviewCount})</span>
          </div>
          <span style={{ fontSize: '0.72rem', color: 'var(--verde-bosque)', fontWeight: 600 }}>Ver más →</span>
        </div>
      </div>
    </article>
  );
}
