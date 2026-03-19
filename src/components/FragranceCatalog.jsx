import { useState, useMemo } from 'react';
import { fragrances } from '../data/fragrances';
import FragranceCard from './FragranceCard';
import FilterSidebar from './FilterSidebar';
import { SlidersHorizontal, LayoutGrid, List } from 'lucide-react';

export default function FragranceCatalog({ searchQuery, onSelectFragrance }) {
  const [filters, setFilters] = useState({
    families: [], genders: [], concentrations: [], seasons: [], notes: [],
  });
  const [sort, setSort] = useState('rating');
  const [showFilters, setShowFilters] = useState(true);

  const results = useMemo(() => {
    let list = [...fragrances];

    // Text search
    if (searchQuery?.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(f =>
        f.name.toLowerCase().includes(q) ||
        f.brand.toLowerCase().includes(q) ||
        f.description.toLowerCase().includes(q) ||
        [...f.notes.salida, ...f.notes.corazon, ...f.notes.fondo]
          .some(n => n.toLowerCase().includes(q))
      );
    }

    // Filters
    if (filters.families.length) list = list.filter(f => filters.families.includes(f.family));
    if (filters.genders.length) list = list.filter(f => filters.genders.includes(f.gender));
    if (filters.concentrations.length) list = list.filter(f => filters.concentrations.includes(f.concentration));
    if (filters.seasons.length) list = list.filter(f =>
      f.season?.some(s => filters.seasons.includes(s)) ||
      filters.seasons.includes(f.timeOfDay)
    );
    if (filters.notes.length) {
      list = list.filter(f => {
        const all = [...f.notes.salida, ...f.notes.corazon, ...f.notes.fondo];
        return filters.notes.every(n => all.some(note => note.toLowerCase().includes(n.toLowerCase())));
      });
    }

    // Sort
    if (sort === 'rating') list.sort((a, b) => b.rating - a.rating);
    else if (sort === 'reviews') list.sort((a, b) => b.reviewCount - a.reviewCount);
    else if (sort === 'name') list.sort((a, b) => a.name.localeCompare(b.name));
    else if (sort === 'year') list.sort((a, b) => b.year - a.year);

    return list;
  }, [searchQuery, filters, sort]);

  return (
    <div style={{ paddingTop: 80, minHeight: '100vh', backgroundColor: 'var(--crema)' }}>
      {/* Header bar */}
      <div style={{
        backgroundColor: 'white',
        borderBottom: '1px solid var(--crema-oscura)',
        padding: '16px 24px',
      }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
          <div>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', color: 'var(--verde-oscuro)' }}>
              Catálogo de Fragancias
            </h2>
            {searchQuery && (
              <p style={{ fontSize: '0.82rem', color: 'var(--gris-claro)', marginTop: 2 }}>
                Resultados para: <strong style={{ color: 'var(--verde-bosque)' }}>"{searchQuery}"</strong>
              </p>
            )}
          </div>
          <div style={{ marginLeft: 'auto', display: 'flex', gap: 12, alignItems: 'center' }}>
            <span style={{ fontSize: '0.82rem', color: 'var(--gris-claro)' }}>
              {results.length} fragancia{results.length !== 1 ? 's' : ''}
            </span>
            <select
              value={sort}
              onChange={e => setSort(e.target.value)}
              style={{
                padding: '6px 10px', borderRadius: 6,
                border: '1px solid #ddd', fontSize: '0.82rem',
                color: 'var(--gris-texto)', backgroundColor: 'white', cursor: 'pointer',
              }}
            >
              <option value="rating">Mejor valorados</option>
              <option value="reviews">Más reseñados</option>
              <option value="name">Nombre A–Z</option>
              <option value="year">Más recientes</option>
            </select>
            <button
              onClick={() => setShowFilters(v => !v)}
              style={{
                display: 'flex', alignItems: 'center', gap: 6,
                padding: '6px 12px', borderRadius: 6,
                border: '1px solid #ddd',
                backgroundColor: showFilters ? 'var(--verde-bosque)' : 'white',
                color: showFilters ? 'white' : 'var(--gris-texto)',
                fontSize: '0.82rem',
              }}
            >
              <SlidersHorizontal size={14} />
              Filtros
            </button>
          </div>
        </div>
      </div>

      <div className="container" style={{ paddingTop: 28, paddingBottom: 48, display: 'flex', gap: 24, alignItems: 'flex-start' }}>
        {showFilters && <FilterSidebar filters={filters} setFilters={setFilters} />}

        <main style={{ flex: 1 }}>
          {results.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--gris-claro)' }}>
              <p style={{ fontSize: '2rem', marginBottom: 12 }}>🔍</p>
              <p style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', marginBottom: 8 }}>Sin resultados</p>
              <p style={{ fontSize: '0.85rem' }}>Intenta ajustar los filtros o la búsqueda.</p>
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
              gap: 20,
            }}>
              {results.map(f => (
                <FragranceCard
                  key={f.id}
                  fragrance={f}
                  onClick={() => onSelectFragrance(f)}
                />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
