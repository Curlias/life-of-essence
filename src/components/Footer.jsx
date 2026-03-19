export default function Footer() {
  return (
    <footer style={{
      backgroundColor: 'var(--verde-oscuro)',
      color: 'rgba(255,255,255,0.65)',
      padding: '40px 24px 28px',
    }}>
      <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 32, marginBottom: 32 }}>
        <div>
          <h3 style={{ fontFamily: 'var(--font-serif)', color: 'var(--dorado)', fontSize: '1.3rem', marginBottom: 10 }}>
            Life of Essence
          </h3>
          <p style={{ fontSize: '0.82rem', lineHeight: 1.65, fontStyle: 'italic' }}>
            "Donde la fragancia cuenta su historia."
          </p>
        </div>
        <div>
          <h4 style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: 12 }}>
            Explorar
          </h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 7 }}>
            {['Catálogo', 'Perfumistas', 'Familias Olfativas', 'Las Más Reseñadas'].map(l => (
              <li key={l} style={{ fontSize: '0.83rem' }}>{l}</li>
            ))}
          </ul>
        </div>
        <div>
          <h4 style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: 12 }}>
            Comunidad
          </h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 7 }}>
            {['Escribir Reseña', 'Mi Lista de Deseos', 'Foro', 'Eventos'].map(l => (
              <li key={l} style={{ fontSize: '0.83rem' }}>{l}</li>
            ))}
          </ul>
        </div>
        <div>
          <h4 style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: 12 }}>
            Familias Olfativas
          </h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 7 }}>
            {['🍋 Cítricas', '🌹 Florales', '🪵 Amaderadas', '🕌 Orientales', '🌿 Fougères'].map(l => (
              <li key={l} style={{ fontSize: '0.83rem' }}>{l}</li>
            ))}
          </ul>
        </div>
      </div>
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: 20, textAlign: 'center', fontSize: '0.75rem' }}>
        © 2025 Life of Essence · Proyecto Académico · Sistema de Reseñas de Productos
      </div>
    </footer>
  );
}
