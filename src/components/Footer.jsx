import { Citrus, Flower2, TreePine, Sparkles, Leaf, Instagram, Twitter, Mail } from 'lucide-react';

const families = [
  { label: 'Cítricas', Icon: Citrus, family: 'Cítrica' },
  { label: 'Florales', Icon: Flower2, family: 'Floral' },
  { label: 'Amaderadas', Icon: TreePine, family: 'Amaderada' },
  { label: 'Orientales', Icon: Sparkles, family: 'Oriental' },
  { label: 'Fougères', Icon: Leaf, family: 'Fougère' },
];

export default function Footer({ onNavigate, onOpenAuth, isLoggedIn }) {
  return (
    <footer style={{
      backgroundColor: 'var(--verde-oscuro)',
      color: 'rgba(255,255,255,0.65)',
      paddingTop: 52,
    }}>
      <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: 36, paddingBottom: 40 }}>

        {/* Brand */}
        <div>
          <button onClick={() => onNavigate('home')} style={{ background: 'none', textAlign: 'left' }}>
            <h3 style={{ fontFamily: 'var(--font-serif)', color: 'var(--dorado)', fontSize: '1.4rem', marginBottom: 10 }}>
              Life of Essence
            </h3>
          </button>
          <p style={{ fontSize: '0.82rem', lineHeight: 1.65, fontStyle: 'italic', marginBottom: 20 }}>
            "Donde la fragancia cuenta su historia."
          </p>
          <div style={{ display: 'flex', gap: 12 }}>
            {[Instagram, Twitter, Mail].map((Icon, i) => (
              <button key={i} style={{
                width: 34, height: 34, borderRadius: '50%',
                backgroundColor: 'rgba(255,255,255,0.08)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'rgba(255,255,255,0.6)',
                border: '1px solid rgba(255,255,255,0.12)',
                transition: 'all 0.2s',
              }}
                onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'rgba(197,179,88,0.2)'; e.currentTarget.style.color = 'var(--dorado)'; }}
                onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.color = 'rgba(255,255,255,0.6)'; }}
              >
                <Icon size={15} />
              </button>
            ))}
          </div>
        </div>

        {/* Explore */}
        <div>
          <h4 style={{ color: 'rgba(255,255,255,0.9)', fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.9px', marginBottom: 14 }}>
            Explorar
          </h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              { label: 'Catálogo', action: () => onNavigate('catalog') },
              { label: 'Perfumistas', action: () => onNavigate('perfumers') },
              { label: 'Las más reseñadas', action: () => onNavigate('catalog', { sort: 'reviews' }) },
              { label: 'Novedades', action: () => onNavigate('catalog', { sort: 'year' }) },
            ].map(({ label, action }) => (
              <li key={label}>
                <button onClick={action} style={{
                  background: 'none', fontSize: '0.84rem',
                  color: 'rgba(255,255,255,0.6)',
                  transition: 'color 0.2s',
                }}
                  onMouseEnter={e => e.currentTarget.style.color = 'var(--dorado)'}
                  onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.6)'}
                >
                  {label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Community */}
        <div>
          <h4 style={{ color: 'rgba(255,255,255,0.9)', fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.9px', marginBottom: 14 }}>
            Comunidad
          </h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              {
                label: 'Escribir una reseña',
                action: () => isLoggedIn ? onNavigate('catalog') : onOpenAuth('register'),
              },
              {
                label: 'Mi lista de deseos',
                action: () => isLoggedIn ? onNavigate('catalog') : onOpenAuth('login'),
              },
              { label: 'Crear cuenta gratis', action: () => onOpenAuth('register') },
              { label: 'Iniciar sesión', action: () => onOpenAuth('login') },
            ].map(({ label, action }) => (
              <li key={label}>
                <button onClick={action} style={{
                  background: 'none', fontSize: '0.84rem',
                  color: 'rgba(255,255,255,0.6)',
                  transition: 'color 0.2s',
                }}
                  onMouseEnter={e => e.currentTarget.style.color = 'var(--dorado)'}
                  onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.6)'}
                >
                  {label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Families */}
        <div>
          <h4 style={{ color: 'rgba(255,255,255,0.9)', fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.9px', marginBottom: 14 }}>
            Familias Olfativas
          </h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
            {families.map(({ label, Icon, family }) => (
              <li key={label}>
                <button
                  onClick={() => onNavigate('catalog', { family })}
                  style={{
                    background: 'none', fontSize: '0.84rem',
                    color: 'rgba(255,255,255,0.6)',
                    display: 'flex', alignItems: 'center', gap: 7,
                    transition: 'color 0.2s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.color = 'var(--dorado)'}
                  onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.6)'}
                >
                  <Icon size={14} strokeWidth={1.8} />
                  {label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', padding: '18px 24px', textAlign: 'center', fontSize: '0.74rem', color: 'rgba(255,255,255,0.35)' }}>
        © 2025 Life of Essence · Proyecto Académico · Sistema de Reseñas de Productos
      </div>
    </footer>
  );
}
