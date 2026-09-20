import { urlFor } from '@/lib/sanity';

// Réplica de Frame.dc.html. Ahora, en vez de recibir una foto "de stock"
// hardcodeada, recibe la imagen real que tu cliente subió en Sanity para esa pieza.
export default function Frame({ image, tone = 'predominant', label, index, caption, credit, showCredit = true, showIndex = true, aspectRatio = '4/5' }) {
  const tints = {
    predominant: 'var(--predominant, #2647E8)',
    accent: 'var(--accent, #C9FF32)',
    ink: '#151515',
    paper: 'var(--paper,#E8E0D3)'
  };
  const imgUrl = image ? urlFor(image).width(1200).url() : null;

  return (
    <div className="frm-root" style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div className="frm-media" style={{ position: 'relative', width: '100%', flex: '1 1 auto', overflow: 'hidden', background: '#151515', aspectRatio }}>
        {imgUrl && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={imgUrl} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        )}
        <div className="frm-tint" aria-hidden="true" style={{ position: 'absolute', inset: 0, mixBlendMode: 'multiply', opacity: 0.6, background: tints[tone] || tints.predominant }}></div>
        <div className="frm-scrim" aria-hidden="true" style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: '58%', background: 'linear-gradient(to top, rgba(0,0,0,.55), rgba(0,0,0,0))', pointerEvents: 'none' }}></div>
        {showIndex && <span className="frm-index" style={{ position: 'absolute', top: 16, left: 16, fontSize: 11, fontWeight: 700, letterSpacing: '.09em', textTransform: 'uppercase', color: '#fff', zIndex: 2 }}>{index}</span>}
        <span className="frm-label" style={{ position: 'absolute', left: 16, bottom: 16, right: 16, fontSize: 13, fontWeight: 600, color: '#fff', zIndex: 2 }}>{label}</span>
      </div>
      {showCredit && (
        <p className="frm-credit" style={{ marginTop: 10, fontSize: 11, lineHeight: 1.4, display: 'flex', justifyContent: 'space-between', gap: 14 }}>
          <span style={{ color: 'rgba(21,21,21,0.62)' }}>{caption}</span>
          <span style={{ whiteSpace: 'nowrap', fontWeight: 600 }}>{credit}</span>
        </p>
      )}
    </div>
  );
}
