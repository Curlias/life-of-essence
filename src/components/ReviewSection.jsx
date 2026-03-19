import { useState } from 'react';
import { Star, MessageSquare, ThumbsUp, Lock } from 'lucide-react';

const mockReviews = [
  {
    id: 1,
    user: 'AnaLuz_M',
    date: '12 Feb 2025',
    text: 'Una fragancia que te envuelve desde el primer spray. La madera y el ámbar crean una base perfecta para cualquier ocasión nocturna. Durabilidad increíble en mi piel.',
    rating: 5,
    duration: 5,
    sillage: 4,
    value: 3,
    likes: 14,
  },
  {
    id: 2,
    user: 'El_Nariz',
    date: '3 Ene 2025',
    text: 'Interesante desarrollo. La salida es brillante y cítrica, pero el corazón es donde realmente vive esta fragancia. Quizás un poco caro para lo que ofrece.',
    rating: 4,
    duration: 4,
    sillage: 3,
    value: 2,
    likes: 7,
  },
  {
    id: 3,
    user: 'FragranceHunter',
    date: '18 Nov 2024',
    text: 'Un clásico moderno. Lo uso desde hace 3 años y sigo recibiendo cumplidos. La estela es perfecta: presente pero no invasiva.',
    rating: 4,
    duration: 5,
    sillage: 4,
    value: 4,
    likes: 21,
  },
];

export default function ReviewSection({ fragrance, onOpenAuth, isLoggedIn }) {
  const [reviews] = useState(mockReviews);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ text: '', rating: 0, duration: 3, sillage: 3, value: 3 });
  const [submitted, setSubmitted] = useState(false);

  const handleWriteReview = () => {
    if (!isLoggedIn) { onOpenAuth('register'); return; }
    setShowForm(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowForm(false);
    setSubmitted(true);
  };

  return (
    <section style={{ marginTop: 48 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
        <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem', color: 'var(--verde-oscuro)' }}>
          <MessageSquare size={20} style={{ display: 'inline', marginRight: 8 }} />
          Reseñas de la comunidad
        </h2>
        <button
          onClick={handleWriteReview}
          style={{
            backgroundColor: 'var(--verde-bosque)', color: 'white',
            padding: '9px 20px', borderRadius: 20, fontSize: '0.85rem', fontWeight: 600,
            display: 'flex', alignItems: 'center', gap: 6,
          }}
        >
          {!isLoggedIn && <Lock size={13} />}
          Escribir reseña
        </button>
      </div>

      {/* Write form */}
      {showForm && (
        <form onSubmit={handleSubmit} style={{
          backgroundColor: 'white', borderRadius: 12, padding: '22px',
          boxShadow: '0 2px 12px var(--sombra)', marginBottom: 24,
          border: '2px solid var(--verde-bosque)',
        }}>
          <h4 style={{ fontFamily: 'var(--font-serif)', color: 'var(--verde-oscuro)', marginBottom: 16 }}>
            Tu reseña de {fragrance.name}
          </h4>

          {/* Overall rating */}
          <div style={{ marginBottom: 14 }}>
            <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--gris-texto)', display: 'block', marginBottom: 6 }}>
              Puntuación global
            </label>
            <div style={{ display: 'flex', gap: 6 }}>
              {[1,2,3,4,5].map(i => (
                <button key={i} type="button" onClick={() => setForm(f => ({ ...f, rating: i }))}>
                  <Star size={24}
                    fill={i <= form.rating ? 'var(--dorado)' : 'transparent'}
                    color={i <= form.rating ? 'var(--dorado)' : '#ccc'}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Scales */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, marginBottom: 14 }}>
            <ScaleInput label="Duración en piel" value={form.duration}
              onChange={v => setForm(f => ({ ...f, duration: v }))}
              labels={['Muy corta', '', '', '', 'Muy larga']}
            />
            <ScaleInput label="Estela (sillage)" value={form.sillage}
              onChange={v => setForm(f => ({ ...f, sillage: v }))}
              labels={['Solo piel', '', '', '', 'Llena la sala']}
            />
            <ScaleInput label="Precio / Calidad" value={form.value}
              onChange={v => setForm(f => ({ ...f, value: v }))}
              labels={['No vale', '', '', '', 'Excelente']}
            />
          </div>

          {/* Text */}
          <div style={{ marginBottom: 16 }}>
            <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--gris-texto)', display: 'block', marginBottom: 6 }}>
              Tu opinión
            </label>
            <textarea
              required
              value={form.text}
              onChange={e => setForm(f => ({ ...f, text: e.target.value }))}
              rows={4}
              placeholder="Describe tu experiencia con esta fragancia..."
              style={{
                width: '100%', padding: '10px 12px', borderRadius: 8,
                border: '1px solid #ddd', fontSize: '0.88rem', resize: 'vertical',
                color: 'var(--gris-texto)', outline: 'none',
              }}
            />
          </div>

          <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
            <button type="button" onClick={() => setShowForm(false)} style={{
              padding: '9px 18px', borderRadius: 8, border: '1px solid #ddd',
              background: 'none', color: 'var(--gris-claro)', fontSize: '0.85rem',
            }}>
              Cancelar
            </button>
            <button type="submit" style={{
              padding: '9px 22px', borderRadius: 8,
              backgroundColor: 'var(--verde-bosque)', color: 'white',
              fontWeight: 600, fontSize: '0.85rem',
            }}>
              Publicar reseña
            </button>
          </div>
        </form>
      )}

      {submitted && (
        <div style={{
          backgroundColor: '#f0f7ee', border: '1px solid var(--verde-bosque)',
          borderRadius: 10, padding: '12px 16px', marginBottom: 16, fontSize: '0.88rem',
          color: 'var(--verde-oscuro)', display: 'flex', alignItems: 'center', gap: 8,
        }}>
          ✓ Tu reseña fue enviada. ¡Gracias por tu aporte a la comunidad!
        </div>
      )}

      {/* Reviews list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {reviews.map(review => (
          <article key={review.id} style={{
            backgroundColor: 'white', borderRadius: 12, padding: '18px 20px',
            boxShadow: '0 2px 10px var(--sombra)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
              <div style={{ display: 'flex', align: 'center', gap: 10 }}>
                <div style={{
                  width: 36, height: 36, borderRadius: '50%', flexShrink: 0,
                  backgroundColor: 'var(--verde-bosque)', color: 'var(--dorado)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'var(--font-serif)', fontWeight: 700, fontSize: '0.9rem',
                }}>
                  {review.user[0].toUpperCase()}
                </div>
                <div style={{ marginLeft: 10 }}>
                  <span style={{ fontWeight: 600, fontSize: '0.88rem', color: 'var(--verde-oscuro)' }}>{review.user}</span>
                  <div style={{ display: 'flex', gap: 2, marginTop: 2 }}>
                    {[1,2,3,4,5].map(i => (
                      <Star key={i} size={11}
                        fill={i <= review.rating ? 'var(--dorado)' : 'transparent'}
                        color={i <= review.rating ? 'var(--dorado)' : '#ccc'}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <span style={{ fontSize: '0.75rem', color: 'var(--gris-claro)' }}>{review.date}</span>
            </div>

            <p style={{ fontSize: '0.88rem', color: 'var(--gris-texto)', lineHeight: 1.65, marginBottom: 12 }}>
              {review.text}
            </p>

            {/* Mini stats */}
            <div style={{ display: 'flex', gap: 16, marginBottom: 10, flexWrap: 'wrap' }}>
              <MiniStat label="Duración" value={review.duration} />
              <MiniStat label="Estela" value={review.sillage} />
              <MiniStat label="Precio/Calidad" value={review.value} />
            </div>

            <button style={{
              display: 'flex', alignItems: 'center', gap: 5,
              fontSize: '0.75rem', color: 'var(--gris-claro)', background: 'none',
            }}>
              <ThumbsUp size={13} /> Útil ({review.likes})
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}

function ScaleInput({ label, value, onChange, labels }) {
  return (
    <div>
      <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--gris-texto)', display: 'block', marginBottom: 6 }}>
        {label}
      </label>
      <div style={{ display: 'flex', gap: 3 }}>
        {[1,2,3,4,5].map(i => (
          <button key={i} type="button" onClick={() => onChange(i)} style={{
            flex: 1, height: 28, borderRadius: 4,
            border: `1px solid ${i <= value ? 'var(--verde-bosque)' : '#ddd'}`,
            backgroundColor: i <= value ? 'var(--verde-bosque)' : 'transparent',
            color: i <= value ? 'white' : 'var(--gris-claro)',
            fontSize: '0.75rem', fontWeight: 600,
          }}>
            {i}
          </button>
        ))}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 3 }}>
        <span style={{ fontSize: '0.6rem', color: 'var(--gris-claro)' }}>{labels[0]}</span>
        <span style={{ fontSize: '0.6rem', color: 'var(--gris-claro)' }}>{labels[4]}</span>
      </div>
    </div>
  );
}

function MiniStat({ label, value }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
      <span style={{ fontSize: '0.72rem', color: 'var(--gris-claro)' }}>{label}:</span>
      <div style={{ display: 'flex', gap: 2 }}>
        {[1,2,3,4,5].map(i => (
          <div key={i} style={{
            width: 10, height: 10, borderRadius: 2,
            backgroundColor: i <= value ? 'var(--dorado)' : '#eee',
          }} />
        ))}
      </div>
    </div>
  );
}
