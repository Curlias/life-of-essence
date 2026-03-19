import { useState } from 'react';
import { Search, User, Heart, Menu, X } from 'lucide-react';

export default function Navbar({ onSearch, onOpenAuth, isLoggedIn, currentPage, setCurrentPage }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchVal, setSearchVal] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchVal);
    setCurrentPage('catalog');
  };

  const navLinks = [
    { key: 'catalog', label: 'Catálogo' },
    { key: 'perfumers', label: 'Perfumistas' },
  ];

  return (
    <header style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, backgroundColor: 'var(--verde-bosque)', boxShadow: '0 2px 12px rgba(0,0,0,0.18)' }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', height: 64, gap: 24 }}>
        {/* Logo */}
        <button onClick={() => setCurrentPage('home')} style={{ background: 'none', border: 'none', padding: 0, flexShrink: 0 }}>
          <span style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '1.35rem',
            fontWeight: 700,
            color: 'var(--dorado)',
            letterSpacing: '0.5px',
            lineHeight: 1,
          }}>
            Life of Essence
          </span>
        </button>

        {/* Nav links — desktop */}
        <nav style={{ display: 'flex', gap: 8, marginLeft: 8 }}>
          {navLinks.map(link => (
            <button
              key={link.key}
              onClick={() => setCurrentPage(link.key)}
              style={{
                background: 'none',
                color: currentPage === link.key ? 'var(--dorado)' : 'rgba(255,255,255,0.82)',
                fontWeight: currentPage === link.key ? 600 : 400,
                fontSize: '0.88rem',
                padding: '4px 14px',
                borderRadius: 4,
                letterSpacing: '0.3px',
                borderBottom: currentPage === link.key ? '2px solid var(--dorado)' : '2px solid transparent',
                transition: 'color 0.2s',
              }}
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Search bar */}
        <form onSubmit={handleSearch} style={{ flex: 1, display: 'flex', maxWidth: 380 }}>
          <div style={{ position: 'relative', width: '100%' }}>
            <input
              value={searchVal}
              onChange={e => setSearchVal(e.target.value)}
              placeholder="Buscar perfume, nota, marca..."
              style={{
                width: '100%',
                padding: '7px 40px 7px 14px',
                borderRadius: 20,
                border: '1px solid rgba(197,179,88,0.4)',
                backgroundColor: 'rgba(255,255,255,0.1)',
                color: 'white',
                fontSize: '0.85rem',
                outline: 'none',
              }}
            />
            <button type="submit" style={{
              position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)',
              background: 'none', color: 'var(--dorado)',
            }}>
              <Search size={16} />
            </button>
          </div>
        </form>

        {/* Auth */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginLeft: 'auto', flexShrink: 0 }}>
          {isLoggedIn ? (
            <>
              <button style={{ background: 'none', color: 'rgba(255,255,255,0.75)', padding: 6 }}>
                <Heart size={20} />
              </button>
              <button style={{
                display: 'flex', alignItems: 'center', gap: 6,
                backgroundColor: 'rgba(197,179,88,0.18)',
                color: 'var(--dorado)',
                padding: '6px 14px',
                borderRadius: 20,
                fontSize: '0.82rem',
                fontWeight: 500,
              }}>
                <User size={15} /> Mi perfil
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => onOpenAuth('login')}
                style={{
                  color: 'rgba(255,255,255,0.82)',
                  background: 'none',
                  fontSize: '0.85rem',
                  padding: '6px 12px',
                }}
              >
                Iniciar sesión
              </button>
              <button
                onClick={() => onOpenAuth('register')}
                style={{
                  backgroundColor: 'var(--dorado)',
                  color: 'var(--verde-oscuro)',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  padding: '7px 16px',
                  borderRadius: 20,
                }}
              >
                Registrarse
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
