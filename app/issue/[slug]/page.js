import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import Frame from '@/components/Frame';
import { client } from '@/lib/sanity';
import { ISSUE_BY_SLUG_QUERY } from '@/lib/queries';
import { notFound } from 'next/navigation';

export const revalidate = 60;

const KIND_LABEL = {
  editorial: 'Editorial Note',
  essay: 'Artist Essay',
  'curator-essay': 'Curator Essay',
  interview: 'Interview',
  visual: 'Visual Feature',
  event: 'News / Event'
};

const FALLBACK = {
  number: '01',
  theme: 'Correspondencias',
  season: 'Otoño 2026 · Sept–Nov',
  description: 'Un número dedicado a la carta como forma: lo que se escribe para llegar tarde, lo que viaja entre Londres y Latinoamérica sin encontrar destinatario fijo.',
  editorialQuote: '"Este issue nació de una caja de cartas sin abrir, encontrada en un archivo familiar en Streatham."',
  editorialNote: 'Correspondencias reúne diez voces que piensan la distancia no como pérdida sino como forma de trabajo.',
  editorName: 'Valentina Ríos',
  editorRole: 'Directora editorial, LATAMesa',
  predominantColor: '#2647E8',
  accentColor: '#C9FF32',
  pieces: [
    { kind: 'essay', title: 'Tejer la distancia', author: 'Renata Ibarra', intro: 'El bordado como archivo: coser cartas que no llegaron.', readTime: '9 min', isLead: true, imageCaption: 'Detalle de bordado sobre carta postal', imageCredit: 'R. Ibarra, 2026' },
    { kind: 'curator-essay', title: 'Cartografías provisionales', author: 'Mateo Solano', intro: 'Leer la diáspora latinoamericana en Londres como un archivo en constante reordenamiento.', readTime: '7 min' },
    { kind: 'interview', title: 'Habitar el archivo', author: 'Camila Duarte', intro: 'Conversación sobre migración, memoria familiar y el archivo como material de trabajo.', readTime: '11 min' },
    { kind: 'visual', title: 'Estudios de taller', author: 'Andrés Bello', intro: 'Ocho estudios de artistas latinoamericanos activos entre Londres y Sudamérica.', readTime: '4 min' }
  ]
};

export default async function IssuePage({ params }) {
  let issue = FALLBACK;
  let usingFallback = true;
  try {
    const data = await client.fetch(ISSUE_BY_SLUG_QUERY, { slug: params.slug });
    if (data) { issue = data; usingFallback = false; }
  } catch (e) {
    // sin conexión a Sanity todavía -> fallback
  }

  if (!issue) return notFound();

  const pieces = issue.pieces || [];
  const lead = pieces.find((p) => p.isLead) || pieces[0];
  const rest = pieces.filter((p) => p !== lead);

  return (
    <div className="is-root" style={{ '--predominant': issue.predominantColor || '#2647E8', '--accent': issue.accentColor || '#C9FF32' }}>
      <Nav active="issue" issueLabel={`Issue ${issue.number} — ${issue.theme}`} />

      {usingFallback && (
        <div style={{ background: '#151515', color: '#fff', fontSize: 12, padding: '8px 16px', textAlign: 'center' }}>
          Mostrando contenido de ejemplo para el slug &quot;{params.slug}&quot; — cargá un issue en Sanity con ese mismo slug para reemplazarlo.
        </div>
      )}

      <header className="is-head">
        <div className="lt-wrap">
          <div className="is-head-grid">
            <div className="meta">
              <p className="is-num">Issue<b>{issue.number}</b></p>
              <p className="is-season">{issue.season}</p>
            </div>
            <div className="body">
              <h1 className="is-theme">{issue.theme}</h1>
              <p className="is-desc">{issue.description}</p>
            </div>
            <div className="aside">
              <div className="is-swatches" aria-hidden="true">
                <span style={{ background: issue.predominantColor }}></span>
                <span style={{ background: issue.accentColor }}></span>
                <span style={{ background: '#151515' }}></span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {issue.editorialQuote && (
        <section className="is-editorial">
          <div className="lt-wrap is-editorial-grid">
            <div className="label"><p className="lt-folio">Editorial note</p></div>
            <div className="text">
              <p className="lt-quote" style={{ fontSize: 26, color: 'var(--predominant)' }}>{issue.editorialQuote}</p>
              <p>{issue.editorialNote}</p>
              {issue.editorName && (
                <p className="by">{issue.editorName}<span>{issue.editorRole}</span></p>
              )}
            </div>
          </div>
        </section>
      )}

      <section className="is-pieces">
        <div className="lt-wrap">
          <div className="is-pieces-head"><h2>Contenido del issue</h2></div>

          {lead && (
            <div className="is-lead">
              <div className="media">
                <div className="frame-wrap">
                  <Frame
                    image={lead.image}
                    tone="predominant"
                    label={lead.author || ''}
                    index="Fig. 01"
                    caption={lead.imageCaption}
                    credit={lead.imageCredit}
                    aspectRatio="16/10"
                  />
                </div>
              </div>
              <div className="copy">
                <p className="lt-eyebrow cat">{KIND_LABEL[lead.kind]} · {lead.readTime} de lectura</p>
                <h3>{lead.title}</h3>
                <p className="intro">{lead.intro}</p>
              </div>
            </div>
          )}

          <div className="is-list">
            {rest.map((p, i) => (
              <div className="is-piece" key={i}>
                <div className="thumb frame-wrap">
                  <Frame image={p.image} tone="ink" label={p.author || ''} index={String(i + 2).padStart(2, '0')} showCredit={false} />
                </div>
                <div className="body">
                  <p className="lt-eyebrow cat">{KIND_LABEL[p.kind]}</p>
                  <h3>{p.title}</h3>
                  <p className="intro">{p.intro}</p>
                </div>
                <span className="rt">{p.readTime}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
