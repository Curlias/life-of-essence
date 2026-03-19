import { families, genders, concentrations, seasons, allNotes } from '../data/fragrances';
import { X } from 'lucide-react';

const seasonLabels = {
  primavera: 'Primavera', verano: 'Verano', otono: 'Otoño',
  invierno: 'Invierno', dia: 'Día', noche: 'Noche', calor: 'Calor', frio: 'Frío',
};
const genderLabels = { hombre: 'Hombre', mujer: 'Mujer', unisex: 'Unisex' };

export default function FilterSidebar({ filters, setFilters }) {
  const toggle = (key, val) => {
    setFilters(prev => {
      const arr = prev[key] || [];
      return {
        ...prev,
        [key]: arr.includes(val) ? arr.filter(v => v !== val) : [...arr, val],
      };
    });
  };

  const hasActive = Object.values(filters).some(v => Array.isArray(v) ? v.length > 0 : !!v);

  const clearAll = () => setFilters({ families: [], genders: [], concentrations: [], seasons: [], notes: [] });

  return (
    <aside style={{
      width: 220,
      flexShrink: 0,
      backgroundColor: 'white',
      borderRadius: 12,
      padding: '20px 18px',
      boxShadow: '0 2px 12px var(--sombra)',
      height: 'fit-content',
      position: 'sticky',
      top: 84,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
        <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1rem', color: 'var(--verde-oscuro)' }}>Filtros</h3>
        {hasActive && (
          <button onClick={clearAll} style={{
            fontSize: '0.72rem', color: 'var(--cuero)', background: 'none', fontWeight: 500,
            display: 'flex', alignItems: 'center', gap: 3,
          }}>
            <X size={12} /> Limpiar
          </button>
        )}
      </div>

      <FilterGroup title="Género">
        {genders.map(g => (
          <CheckPill key={g} label={genderLabels[g]} active={filters.genders?.includes(g)}
            onClick={() => toggle('genders', g)} />
        ))}
      </FilterGroup>

      <FilterGroup title="Familia Olfativa">
        {families.map(f => (
          <CheckPill key={f} label={f} active={filters.families?.includes(f)}
            onClick={() => toggle('families', f)} />
        ))}
      </FilterGroup>

      <FilterGroup title="Concentración">
        {concentrations.map(c => (
          <CheckPill key={c} label={c} active={filters.concentrations?.includes(c)}
            onClick={() => toggle('concentrations', c)} />
        ))}
      </FilterGroup>

      <FilterGroup title="Temporada / Momento">
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
          {seasons.map(s => (
            <button
              key={s}
              onClick={() => toggle('seasons', s)}
              style={{
                fontSize: '0.7rem',
                padding: '3px 9px',
                borderRadius: 12,
                border: `1px solid ${filters.seasons?.includes(s) ? 'var(--verde-bosque)' : '#ddd'}`,
                backgroundColor: filters.seasons?.includes(s) ? 'var(--verde-bosque)' : 'transparent',
                color: filters.seasons?.includes(s) ? 'white' : 'var(--gris-claro)',
                fontWeight: filters.seasons?.includes(s) ? 600 : 400,
                cursor: 'pointer',
              }}
            >
              {seasonLabels[s]}
            </button>
          ))}
        </div>
      </FilterGroup>

      <FilterGroup title="Notas" last>
        <select
          onChange={e => { if (e.target.value) toggle('notes', e.target.value); e.target.value = ''; }}
          style={{
            width: '100%', padding: '6px 8px', borderRadius: 6,
            border: '1px solid #ddd', fontSize: '0.8rem', color: 'var(--gris-texto)',
            backgroundColor: 'white', cursor: 'pointer',
          }}
          defaultValue=""
        >
          <option value="" disabled>Selecciona una nota...</option>
          {allNotes.map(n => (
            <option key={n} value={n}>{n}</option>
          ))}
        </select>
        {(filters.notes || []).length > 0 && (
          <div style={{ marginTop: 8, display: 'flex', flexWrap: 'wrap', gap: 4 }}>
            {filters.notes.map(n => (
              <span key={n} style={{
                fontSize: '0.68rem', padding: '2px 8px', borderRadius: 10,
                backgroundColor: 'var(--verde-bosque)', color: 'white',
                display: 'flex', alignItems: 'center', gap: 4,
              }}>
                {n}
                <button onClick={() => toggle('notes', n)} style={{ background: 'none', color: 'white', lineHeight: 1 }}>×</button>
              </span>
            ))}
          </div>
        )}
      </FilterGroup>
    </aside>
  );
}

function FilterGroup({ title, children, last }) {
  return (
    <div style={{ marginBottom: last ? 0 : 20 }}>
      <p style={{
        fontSize: '0.72rem', fontWeight: 600, textTransform: 'uppercase',
        letterSpacing: '0.8px', color: 'var(--gris-claro)', marginBottom: 8,
      }}>{title}</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        {children}
      </div>
    </div>
  );
}

function CheckPill({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        display: 'flex', alignItems: 'center', gap: 8,
        padding: '4px 2px',
        background: 'none',
        fontSize: '0.82rem',
        color: active ? 'var(--verde-oscuro)' : 'var(--gris-texto)',
        fontWeight: active ? 600 : 400,
        textAlign: 'left',
      }}
    >
      <span style={{
        width: 16, height: 16, borderRadius: 4, flexShrink: 0,
        border: `2px solid ${active ? 'var(--verde-bosque)' : '#ccc'}`,
        backgroundColor: active ? 'var(--verde-bosque)' : 'transparent',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        {active && <span style={{ color: 'white', fontSize: '0.6rem', fontWeight: 700 }}>✓</span>}
      </span>
      {label}
    </button>
  );
}
