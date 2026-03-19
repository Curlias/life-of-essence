import { useState } from 'react';
import { Search, Star, Citrus, Flower2, TreePine, Sparkles, Leaf, ArrowRight, ChevronRight, Users, BookOpen, Award } from 'lucide-react';
import { fragrances } from '../data/fragrances';
import { perfumers } from '../data/perfumers';

const familyCards = [
  { label: 'Cítricas', desc: 'Bergamota, limón, pomelo', Icon: Citrus, color: '#c4871a', bg: '#fef9ee', family: 'Cítrica', img: 'https://images.unsplash.com/photo-1616512992927-9e9b29fa6c35?w=500&q=80' },
  { label: 'Florales', desc: 'Rosa, jazmín, iris', Icon: Flower2, color: '#9b4dab', bg: '#fdf5fe', family: 'Floral', img: 'https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?w=500&q=80' },
  { label: 'Amaderadas', desc: 'Sándalo, cedro, vetiver', Icon: TreePine, color: '#5a3e0c', bg: '#f7f3ec', family: 'Amaderada', img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&q=80' },
  { label: 'Orientales', desc: 'Oud, ámbar, vainilla', Icon: Sparkles, color: '#8b2020', bg: '#fdf2f2', family: 'Oriental', img: 'https://images.unsplash.com/photo-1541643600914-78b084683702?w=500&q=80' },
  { label: 'Fougères', desc: 'Lavanda, musgo, heno', Icon: Leaf, color: '#2d6a4f', bg: '#eef6f2', family: 'Fougère', img: 'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=500&q=80' },
];

const topFragrances = [...fragrances].sort((a, b) => b.rating - a.rating).slice(0, 4);
const featuredPerfumers = [...perfumers].sort((a, b) => b.awards.length - a.awards.length).slice(0, 3);

const testimonials = [
  { text: "La pirámide olfativa me ayudó a entender por qué el Shalimar me parece tan diferente al pasar las horas. Increíble recurso.", user: "AnaLuz_M", rating: 5 },
  { text: "Encontré mi fragancia perfecta gracias al sistema de filtros. Nunca había probado Bois de Balincourt y ahora es mi favorito.", user: "El_Nariz", rating: 5 },
  { text: "Las reseñas son muy honestas. Me ayudaron a no gastar en una fragancia que no era para mí.", user: "FragranceHunter", rating: 4 },
];

export default function HomePage({ onSearch, setCurrentPage, onNavigate }) {
  const [query, setQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(query);
    setCurrentPage('catalog');
  };

  return (
    <div style={{ paddingTop: 64 }}>

      {/* ===== HERO ===== */}
      <section style={{
        backgroundColor: 'white',
        padding: '72px 24px 60px',
        borderBottom: '1px solid #f0ece4',
      }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>

          {/* Left text */}
          <div>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              backgroundColor: '#f0f4ed', color: 'var(--verde-bosque)',
              fontSize: '0.78rem', fontWeight: 600, padding: '5px 14px',
              borderRadius: 20, marginBottom: 24, letterSpacing: '0.5px',
            }}>
              <Leaf size={13} strokeWidth={2} />
              Plataforma de reseñas de fragancias
            </div>

            <h1 style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2rem, 4vw, 3.2rem)',
              color: '#1a1a1a', lineHeight: 1.15,
              marginBottom: 18,
            }}>
              Descubre la fragancia<br />
              <span style={{ color: 'var(--verde-bosque)' }}>que cuenta tu historia</span>
            </h1>

            <p style={{ fontSize: '1rem', color: '#666', lineHeight: 1.7, marginBottom: 36, maxWidth: 440 }}>
              Explora cientos de fragancias, lee reseñas de la comunidad, conoce a los maestros perfumistas y encuentra tu aroma perfecto.
            </p>

            {/* Search */}
            <form onSubmit={handleSearch} style={{ marginBottom: 28 }}>
              <div style={{
                display: 'flex', maxWidth: 480,
                backgroundColor: '#f5f5f0', borderRadius: 50,
                border: '2px solid #e8e4da',
                overflow: 'hidden', transition: 'border-color 0.2s',
              }}
                onFocus={e => e.currentTarget.style.borderColor = 'var(--verde-bosque)'}
                onBlur={e => e.currentTarget.style.borderColor = '#e8e4da'}
              >
                <Search size={18} color="#aaa" style={{ margin: '0 0 0 18px', flexShrink: 0, alignSelf: 'center' }} />
                <input
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  placeholder="Perfume, nota, marca o perfumista..."
                  style={{
                    flex: 1, padding: '13px 12px', border: 'none',
                    outline: 'none', fontSize: '0.9rem', color: '#333',
                    backgroundColor: 'transparent',
                  }}
                />
                <button type="submit" style={{
                  backgroundColor: 'var(--verde-bosque)', color: 'white',
                  padding: '0 22px', fontWeight: 600, fontSize: '0.88rem', flexShrink: 0,
                }}>
                  Buscar
                </button>
              </div>
            </form>

            {/* Note pills */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              <span style={{ fontSize: '0.78rem', color: '#aaa', alignSelf: 'center' }}>Búsquedas populares:</span>
              {['Sándalo', 'Bergamota', 'Rosa', 'Vainilla', 'Vetiver'].map(note => (
                <button key={note} onClick={() => { onSearch(note); setCurrentPage('catalog'); }}
                  style={{
                    fontSize: '0.78rem', padding: '4px 13px', borderRadius: 16,
                    border: '1px solid #ddd', background: 'white', color: '#555',
                    transition: 'all 0.15s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--verde-bosque)'; e.currentTarget.style.color = 'var(--verde-bosque)'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = '#ddd'; e.currentTarget.style.color = '#555'; }}
                >
                  {note}
                </button>
              ))}
            </div>
          </div>

          {/* Right: perfume image collage */}
          <div style={{ position: 'relative', height: 420 }}>
            <div style={{
              position: 'absolute', top: 0, left: 40, width: 220, height: 280,
              borderRadius: 16, overflow: 'hidden',
              boxShadow: '0 16px 48px rgba(83,99,73,0.2)',
            }}>
              <img src="https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=500&q=80" alt="Fragancia"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div style={{
              position: 'absolute', top: 60, right: 0, width: 200, height: 240,
              borderRadius: 16, overflow: 'hidden',
              boxShadow: '0 16px 48px rgba(83,99,73,0.18)',
              border: '4px solid white',
            }}>
              <img src="https://images.unsplash.com/photo-1541643600914-78b084683702?w=500&q=80" alt="Fragancia"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div style={{
              position: 'absolute', bottom: 0, left: 20, width: 170, height: 200,
              borderRadius: 16, overflow: 'hidden',
              boxShadow: '0 16px 48px rgba(83,99,73,0.16)',
              border: '4px solid white',
            }}>
              <img src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&q=80" alt="Fragancia"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>

            {/* Floating rating card */}
            <div style={{
              position: 'absolute', bottom: 30, right: 10,
              backgroundColor: 'white', borderRadius: 12, padding: '12px 16px',
              boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
              display: 'flex', alignItems: 'center', gap: 10,
            }}>
              <div style={{ width: 38, height: 38, borderRadius: 8, overflow: 'hidden' }}>
                <img src="https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=100&q=80" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div>
                <div style={{ fontFamily: 'var(--font-serif)', fontSize: '0.82rem', fontWeight: 600, color: '#1a1a1a' }}>Shalimar</div>
                <div style={{ display: 'flex', gap: 2, marginTop: 2 }}>
                  {[1,2,3,4,5].map(i => <Star key={i} size={10} fill="var(--dorado)" color="var(--dorado)" />)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== STATS ===== */}
      <section style={{ backgroundColor: 'var(--verde-bosque)', padding: '28px 24px' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'center', gap: 'clamp(32px, 8vw, 96px)' }}>
          {[
            { value: '10+', label: 'Fragancias' },
            { value: '9', label: 'Perfumistas' },
            { value: '5', label: 'Familias Olfativas' },
            { value: '500+', label: 'Reseñas' },
          ].map(stat => (
            <div key={stat.label} style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.7rem', fontWeight: 700, color: 'var(--dorado)' }}>{stat.value}</div>
              <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.65)', marginTop: 2 }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== FAMILIAS OLFATIVAS ===== */}
      <section style={{ backgroundColor: '#fafaf7', padding: '72px 24px' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 44 }}>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', color: '#1a1a1a', marginBottom: 10 }}>
              Explora por Familia Olfativa
            </h2>
            <p style={{ color: '#888', fontSize: '0.95rem' }}>
              Cada fragancia pertenece a una familia. Encuentra la tuya.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 18 }}>
            {familyCards.map(({ label, desc, Icon, color, bg, family, img }) => (
              <button key={label} onClick={() => onNavigate('catalog', { family })}
                style={{
                  borderRadius: 14, overflow: 'hidden', cursor: 'pointer',
                  boxShadow: '0 2px 12px rgba(83,99,73,0.09)',
                  border: '1px solid rgba(0,0,0,0.05)',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  textAlign: 'left', background: 'white',
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 12px 32px rgba(83,99,73,0.16)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 12px rgba(83,99,73,0.09)'; }}
              >
                <div style={{ height: 120, overflow: 'hidden', position: 'relative' }}>
                  <img src={img} alt={label} style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
                  <div style={{ position: 'absolute', inset: 0, backgroundColor: color + '55' }} />
                  <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                    <Icon size={32} color="white" strokeWidth={1.5} />
                  </div>
                </div>
                <div style={{ padding: '14px 16px' }}>
                  <div style={{ fontFamily: 'var(--font-serif)', fontWeight: 600, fontSize: '0.95rem', color: '#1a1a1a', marginBottom: 3 }}>{label}</div>
                  <div style={{ fontSize: '0.75rem', color: '#aaa' }}>{desc}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TOP FRAGANCIAS ===== */}
      <section style={{ backgroundColor: 'white', padding: '72px 24px' }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 36 }}>
            <div>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', color: '#1a1a1a', marginBottom: 6 }}>
                Mejor Valoradas
              </h2>
              <p style={{ color: '#888', fontSize: '0.92rem' }}>Las fragancias más apreciadas por nuestra comunidad</p>
            </div>
            <button onClick={() => onNavigate('catalog', { sort: 'rating' })}
              style={{
                display: 'flex', alignItems: 'center', gap: 6,
                color: 'var(--verde-bosque)', background: 'none',
                fontWeight: 600, fontSize: '0.88rem',
              }}>
              Ver todas <ArrowRight size={16} />
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 22 }}>
            {topFragrances.map(f => (
              <button key={f.id} onClick={() => onNavigate('detail', { fragrance: f })}
                style={{
                  backgroundColor: '#fafaf7', borderRadius: 14, overflow: 'hidden',
                  cursor: 'pointer', border: '1px solid #eee', textAlign: 'left',
                  transition: 'all 0.2s', boxShadow: '0 2px 8px rgba(83,99,73,0.07)',
                }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 8px 28px rgba(83,99,73,0.14)'; e.currentTarget.style.transform = 'translateY(-3px)'; }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 2px 8px rgba(83,99,73,0.07)'; e.currentTarget.style.transform = 'translateY(0)'; }}
              >
                <div style={{ height: 160, overflow: 'hidden' }}>
                  <img src={f.image} alt={f.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
                </div>
                <div style={{ padding: '14px 16px' }}>
                  <div style={{ fontSize: '0.7rem', color: '#aaa', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: 3 }}>{f.brand}</div>
                  <div style={{ fontFamily: 'var(--font-serif)', fontWeight: 600, fontSize: '0.95rem', color: '#1a1a1a', marginBottom: 8 }}>{f.name}</div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                      <Star size={13} fill="var(--dorado)" color="var(--dorado)" />
                      <span style={{ fontWeight: 700, fontSize: '0.88rem', color: '#1a1a1a' }}>{f.rating.toFixed(1)}</span>
                      <span style={{ fontSize: '0.7rem', color: '#bbb' }}>({f.reviewCount})</span>
                    </div>
                    <ChevronRight size={15} color="#ccc" />
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PERFUMISTAS ===== */}
      <section style={{ backgroundColor: '#1a2417', padding: '72px 24px' }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 36 }}>
            <div>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', color: 'var(--dorado)', marginBottom: 6 }}>
                Los Narices
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.92rem' }}>Los artistas detrás de las fragancias más icónicas</p>
            </div>
            <button onClick={() => setCurrentPage('perfumers')}
              style={{
                display: 'flex', alignItems: 'center', gap: 6,
                color: 'var(--dorado)', background: 'none',
                fontWeight: 600, fontSize: '0.88rem',
              }}>
              Ver todos <ArrowRight size={16} />
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 20 }}>
            {featuredPerfumers.map(p => (
              <button key={p.id} onClick={() => setCurrentPage('perfumers')}
                style={{
                  borderRadius: 14, overflow: 'hidden', cursor: 'pointer',
                  border: '1px solid rgba(255,255,255,0.08)',
                  transition: 'all 0.2s', textAlign: 'left',
                  backgroundColor: 'rgba(255,255,255,0.04)',
                }}
                onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.transform = 'translateY(-3px)'; }}
                onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.04)'; e.currentTarget.style.transform = 'translateY(0)'; }}
              >
                <div style={{ height: 180, overflow: 'hidden' }}>
                  <img src={p.photo} alt={p.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(1)' }}
                    loading="lazy" />
                </div>
                <div style={{ padding: '16px 18px' }}>
                  <div style={{ fontFamily: 'var(--font-serif)', fontWeight: 600, fontSize: '1rem', color: 'rgba(255,255,255,0.92)', marginBottom: 3 }}>{p.name}</div>
                  <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', marginBottom: 10 }}>{p.specialty}</div>
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                    {p.awards.slice(0, 2).map(a => (
                      <span key={a} style={{
                        fontSize: '0.65rem', padding: '2px 8px', borderRadius: 8,
                        backgroundColor: 'rgba(197,179,88,0.15)', color: 'var(--dorado)',
                        border: '1px solid rgba(197,179,88,0.25)',
                      }}>{a}</span>
                    ))}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CÓMO FUNCIONA ===== */}
      <section style={{ backgroundColor: '#fafaf7', padding: '72px 24px' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 52 }}>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', color: '#1a1a1a', marginBottom: 10 }}>
              ¿Cómo funciona?
            </h2>
            <p style={{ color: '#888', fontSize: '0.95rem' }}>Tres pasos para encontrar tu fragancia perfecta</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 32 }}>
            {[
              { step: '01', Icon: Search, title: 'Explora el catálogo', desc: 'Filtra por familia olfativa, género, temporada, concentración o búsqueda libre por notas.' },
              { step: '02', Icon: BookOpen, title: 'Lee las reseñas', desc: 'La comunidad califica duración, estela y relación calidad/precio. Opiniones reales.' },
              { step: '03', Icon: Award, title: 'Comparte tu experiencia', desc: 'Regístrate y añade tu propia reseña. Tu voz ayuda a otros a encontrar su fragancia.' },
            ].map(({ step, Icon, title, desc }) => (
              <div key={step} style={{ textAlign: 'center', padding: '32px 24px', backgroundColor: 'white', borderRadius: 16, boxShadow: '0 2px 12px rgba(83,99,73,0.08)', border: '1px solid #f0f0f0' }}>
                <div style={{ fontFamily: 'var(--font-serif)', fontSize: '2.4rem', color: '#f0ece4', fontWeight: 700, lineHeight: 1, marginBottom: 20 }}>{step}</div>
                <div style={{
                  width: 52, height: 52, borderRadius: 14, margin: '0 auto 18px',
                  backgroundColor: '#f0f4ed', display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <Icon size={24} color="var(--verde-bosque)" strokeWidth={1.8} />
                </div>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', color: '#1a1a1a', marginBottom: 10 }}>{title}</h3>
                <p style={{ fontSize: '0.87rem', color: '#888', lineHeight: 1.65 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIOS ===== */}
      <section style={{ backgroundColor: 'white', padding: '72px 24px' }}>
        <div className="container">
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', color: '#1a1a1a', textAlign: 'center', marginBottom: 44 }}>
            Lo que dice la comunidad
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 24 }}>
            {testimonials.map((t, i) => (
              <div key={i} style={{
                backgroundColor: '#fafaf7', borderRadius: 14, padding: '24px 26px',
                border: '1px solid #eee',
              }}>
                <div style={{ display: 'flex', gap: 3, marginBottom: 14 }}>
                  {[1,2,3,4,5].map(s => (
                    <Star key={s} size={14} fill={s <= t.rating ? 'var(--dorado)' : 'transparent'} color={s <= t.rating ? 'var(--dorado)' : '#ddd'} />
                  ))}
                </div>
                <p style={{ fontSize: '0.9rem', color: '#444', lineHeight: 1.7, marginBottom: 16, fontStyle: 'italic' }}>
                  "{t.text}"
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{
                    width: 32, height: 32, borderRadius: '50%',
                    backgroundColor: 'var(--verde-bosque)', color: 'var(--dorado)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: 'var(--font-serif)', fontWeight: 700, fontSize: '0.85rem',
                  }}>
                    {t.user[0].toUpperCase()}
                  </div>
                  <span style={{ fontWeight: 600, fontSize: '0.85rem', color: '#333' }}>{t.user}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA FINAL ===== */}
      <section style={{
        background: 'linear-gradient(135deg, var(--verde-oscuro) 0%, var(--verde-bosque) 100%)',
        padding: '72px 24px', textAlign: 'center',
      }}>
        <div className="container" style={{ maxWidth: 580, margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', color: 'var(--dorado)', marginBottom: 14 }}>
            Únete a la comunidad
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.72)', fontSize: '0.95rem', lineHeight: 1.7, marginBottom: 32 }}>
            Crea tu cuenta gratis, guarda tus fragancias favoritas y comparte tus reseñas con miles de amantes del perfume.
          </p>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button onClick={() => onNavigate('register')}
              style={{
                backgroundColor: 'var(--dorado)', color: 'var(--verde-oscuro)',
                fontWeight: 700, padding: '13px 32px', borderRadius: 28,
                fontSize: '0.95rem', boxShadow: '0 4px 16px rgba(197,179,88,0.35)',
              }}>
              Crear cuenta gratis
            </button>
            <button onClick={() => setCurrentPage('catalog')}
              style={{
                backgroundColor: 'transparent', color: 'rgba(255,255,255,0.88)',
                border: '1px solid rgba(255,255,255,0.3)',
                fontWeight: 500, padding: '13px 32px', borderRadius: 28, fontSize: '0.95rem',
              }}>
              Explorar sin registrarse
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
