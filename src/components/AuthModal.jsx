import { useState } from 'react';
import { X, Eye, EyeOff, Mail, Lock, User } from 'lucide-react';

export default function AuthModal({ mode, onClose, onSuccess }) {
  const [view, setView] = useState(mode); // 'login' | 'register'
  const [showPass, setShowPass] = useState(false);
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.email || !form.password) { setError('Completa todos los campos.'); return; }
    if (view === 'register' && !form.username) { setError('El nombre de usuario es requerido.'); return; }
    onSuccess(form.email);
    onClose();
  };

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 1000,
        backgroundColor: 'rgba(0,0,0,0.55)',
        backdropFilter: 'blur(4px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 24,
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          backgroundColor: 'white',
          borderRadius: 16,
          width: '100%',
          maxWidth: 400,
          overflow: 'hidden',
          boxShadow: '0 20px 60px rgba(0,0,0,0.25)',
        }}
      >
        {/* Header */}
        <div style={{
          background: 'linear-gradient(135deg, var(--verde-oscuro) 0%, var(--verde-bosque) 100%)',
          padding: '28px 28px 24px',
          position: 'relative',
        }}>
          <button
            onClick={onClose}
            style={{
              position: 'absolute', top: 14, right: 14,
              background: 'rgba(255,255,255,0.15)', color: 'white',
              width: 30, height: 30, borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >
            <X size={15} />
          </button>
          <h2 style={{ fontFamily: 'var(--font-serif)', color: 'var(--dorado)', fontSize: '1.6rem', marginBottom: 4 }}>
            Life of Essence
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem' }}>
            {view === 'login' ? 'Bienvenido de vuelta.' : 'Únete a nuestra comunidad de amantes de las fragancias.'}
          </p>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', borderBottom: '1px solid #eee' }}>
          {['login', 'register'].map(tab => (
            <button
              key={tab}
              onClick={() => { setView(tab); setError(''); }}
              style={{
                flex: 1, padding: '13px',
                fontWeight: view === tab ? 600 : 400,
                fontSize: '0.88rem',
                color: view === tab ? 'var(--verde-bosque)' : 'var(--gris-claro)',
                borderBottom: `2px solid ${view === tab ? 'var(--verde-bosque)' : 'transparent'}`,
                background: 'none', marginBottom: -1,
              }}
            >
              {tab === 'login' ? 'Iniciar sesión' : 'Registrarse'}
            </button>
          ))}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ padding: '24px 28px 28px', display: 'flex', flexDirection: 'column', gap: 14 }}>
          {view === 'register' && (
            <InputField
              icon={<User size={15} />}
              placeholder="Nombre de usuario"
              value={form.username}
              onChange={v => setForm(f => ({ ...f, username: v }))}
            />
          )}
          <InputField
            icon={<Mail size={15} />}
            type="email"
            placeholder="Correo electrónico"
            value={form.email}
            onChange={v => setForm(f => ({ ...f, email: v }))}
          />
          <InputField
            icon={<Lock size={15} />}
            type={showPass ? 'text' : 'password'}
            placeholder="Contraseña"
            value={form.password}
            onChange={v => setForm(f => ({ ...f, password: v }))}
            suffix={
              <button type="button" onClick={() => setShowPass(v => !v)} style={{ background: 'none', color: 'var(--gris-claro)' }}>
                {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            }
          />

          {error && (
            <p style={{ fontSize: '0.8rem', color: '#c0392b', backgroundColor: '#fdf2f2', padding: '8px 12px', borderRadius: 6 }}>
              {error}
            </p>
          )}

          <button
            type="submit"
            style={{
              backgroundColor: 'var(--verde-bosque)', color: 'white',
              padding: '12px', borderRadius: 10, fontWeight: 600, fontSize: '0.92rem',
              marginTop: 4,
            }}
          >
            {view === 'login' ? 'Iniciar sesión' : 'Crear cuenta'}
          </button>

          {view === 'login' && (
            <p style={{ textAlign: 'center', fontSize: '0.78rem', color: 'var(--gris-claro)' }}>
              ¿Olvidaste tu contraseña?{' '}
              <button type="button" style={{ background: 'none', color: 'var(--verde-bosque)', fontWeight: 500 }}>
                Recupérala aquí
              </button>
            </p>
          )}

          <p style={{ textAlign: 'center', fontSize: '0.8rem', color: 'var(--gris-claro)', marginTop: 4 }}>
            {view === 'login' ? '¿No tienes cuenta?' : '¿Ya tienes cuenta?'}{' '}
            <button
              type="button"
              onClick={() => { setView(view === 'login' ? 'register' : 'login'); setError(''); }}
              style={{ background: 'none', color: 'var(--verde-bosque)', fontWeight: 600 }}
            >
              {view === 'login' ? 'Regístrate' : 'Inicia sesión'}
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}

function InputField({ icon, type = 'text', placeholder, value, onChange, suffix }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 10,
      border: '1px solid #ddd', borderRadius: 8, padding: '10px 14px',
      backgroundColor: 'white',
      transition: 'border-color 0.2s',
    }}
      onFocus={e => e.currentTarget.style.borderColor = 'var(--verde-bosque)'}
      onBlur={e => e.currentTarget.style.borderColor = '#ddd'}
    >
      <span style={{ color: 'var(--gris-claro)', flexShrink: 0 }}>{icon}</span>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={e => onChange(e.target.value)}
        style={{
          flex: 1, border: 'none', outline: 'none',
          fontSize: '0.88rem', color: 'var(--gris-texto)',
          backgroundColor: 'transparent',
        }}
      />
      {suffix}
    </div>
  );
}
