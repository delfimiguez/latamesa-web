import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { client, urlFor } from '@/lib/sanity';
import { CURRENT_ISSUE_QUERY } from '@/lib/queries';

export const revalidate = 60; // vuelve a pedir datos a Sanity cada 60s como máximo

const FALLBACK = {
  number: '01',
  theme: 'Correspondencias',
  season: 'Otoño 2026',
  slug: 'correspondencias',
  predominantColor: '#2647E8',
  collaborators: ['Renata Ibarra', 'Mateo Solano', 'Camila Duarte', 'Andrés Bello', 'Julia Restrepo', 'Sofía Nakashima'],
  pieces: [
    { kind: 'editorial', title: 'Editorial Note — Valentina Ríos' },
    { kind: 'essay', title: 'Artist Essay — Tejer la distancia' },
    { kind: 'curator-essay', title: 'Curator Essay — Cartografías provisionales' },
    { kind: 'interview', title: 'Interview — Habitar el archivo' },
    { kind: 'visual', title: 'Visual Feature — Estudios de taller' },
    { kind: 'event', title: 'News / Event — Apertura en Tributary Space' }
  ]
};

export default async function HomePage() {
  let issue = FALLBACK;
  let usingFallback = true;
  try {
    const data = await client.fetch(CURRENT_ISSUE_QUERY);
    if (data) {
      issue = data;
      usingFallback = false;
    }
  } catch (e) {
    // Sin Sanity conectado todavía (o sin datos cargados) -> se muestra contenido de ejemplo.
  }

  const heroUrl = issue.heroImage ? urlFor(issue.heroImage).width(1920).url() : null;

  return (
    <div className="hm-root" style={{ '--predominant': issue.predominantColor || '#2647E8' }}>
      <Nav active="home" issueLabel={`Issue ${issue.number} — ${issue.theme}`} onImage />

      {usingFallback && (
        <div style={{ background: '#151515', color: '#fff', fontSize: 12, padding: '8px 16px', textAlign: 'center' }}>
          Mostrando contenido de ejemplo — conectá tu proyecto Sanity y cargá un issue con &quot;Issue actual&quot; activado para ver datos reales.
        </div>
      )}

      <section className="hm-hero" id="hm-main" style={{ position: 'relative', marginTop: usingFallback ? 0 : -96, height: '100vh', minHeight: 640, maxHeight: 980, overflow: 'hidden', background: '#0c1220' }}>
        {heroUrl && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={heroUrl} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
        )}
        <div className="tint" aria-hidden="true" style={{ position: 'absolute', inset: 0, background: 'var(--predominant)', mixBlendMode: 'multiply', opacity: 0.5 }}></div>
        <div className="scrim" aria-hidden="true" style={{ position: 'absolute', inset: 0, background: 'rgba(10,12,20,.28)' }}></div>
        <div className="hm-hero-copy lt-reveal">
          <span className="brand">LATAMesa — Revista editorial</span>
          <span className="theme">Issue {issue.number}</span>
          <span className="theme serif-ish">{issue.theme}</span>
          <div className="names">
            {(issue.collaborators || []).map((name) => <div key={name}>{name}</div>)}
          </div>
          <Link className="more lt-focus" href={`/issue/${issue.slug}`}>Ver issue completo →</Link>
        </div>
      </section>

      <section className="hm-panel">
        <div className="lt-wrap strip">
          <div className="lt-tiny-strip on-dark">
            <span>Contenido — Issue {issue.number}</span>
            <span>{issue.theme}</span>
            <span>{issue.season}</span>
            <span>I–{toRoman((issue.pieces || []).length)}</span>
          </div>
        </div>

        <div className="lt-wrap hm-panel-grid">
          <div className="hm-panel-meta">
            <p>Issue<b>{issue.number}</b></p>
          </div>
          <div className="hm-panel-list">
            <div className="lt-index-list">
              {(issue.pieces || []).map((p, i) => (
                <Link key={i} className="lt-focus lt-index-item" href={`/issue/${issue.slug}`}>
                  <span className="num">{toRoman(i + 1)}.</span>
                  <span className="lbl">{p.title}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function toRoman(num) {
  const map = [[10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I']];
  let n = num, out = '';
  for (const [v, s] of map) { while (n >= v) { out += s; n -= v; } }
  return out || String(num);
}
