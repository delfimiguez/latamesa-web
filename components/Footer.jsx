'use client';
import Link from 'next/link';

// Réplica de Footer.dc.html. Estático a propósito: el pie de página no
// cambia todos los meses, así que no hace falta traerlo desde Sanity.
export default function Footer() {
  return (
    <footer className="lt-footer">
      <div className="lt-grid">
        <div style={{ gridColumn: 'span 4' }}>
          <p className="lt-logo" style={{ fontSize: 22 }}>LATAMesa</p>
          <p style={{ marginTop: 14, maxWidth: '32ch', fontSize: 14, color: 'rgba(244,241,234,0.75)' }}>
            Revista curatorial y editorial dedicada al arte latinoamericano y su diáspora en Londres.
          </p>
        </div>
        <div style={{ gridColumn: 'span 2' }}>
          <h4>Revista</h4>
          <ul className="lt-flist">
            <li><Link className="lt-focus" href="/issue/correspondencias">Issue actual</Link></li>
            <li><Link className="lt-focus" href="/archive">Archivo</Link></li>
            <li><Link className="lt-focus" href="/about">Sobre LATAMesa</Link></li>
          </ul>
        </div>
        <div style={{ gridColumn: 'span 2' }}>
          <h4>Agenda</h4>
          <ul className="lt-flist">
            <li><Link className="lt-focus" href="/exhibitions">Exhibiciones</Link></li>
            <li><Link className="lt-focus" href="/events">Eventos</Link></li>
            <li><Link className="lt-focus" href="/contact">Contacto</Link></li>
          </ul>
        </div>
        <div style={{ gridColumn: 'span 4' }}>
          <h4>Newsletter</h4>
          <p style={{ fontSize: 14, color: 'rgba(244,241,234,0.75)', marginBottom: 14 }}>
            Notas de issue, exhibiciones y eventos, una vez al mes.
          </p>
          <form
            style={{ display: 'flex', gap: 0, borderBottom: '1px solid rgba(244,241,234,0.4)' }}
            onSubmit={(e) => e.preventDefault()}
          >
            <label htmlFor="ft-email" className="lt-visually-hidden">Correo electrónico</label>
            <input
              id="ft-email"
              type="email"
              required
              placeholder="tu@email.com"
              style={{ flex: 1, background: 'transparent', border: 0, padding: '10px 0', color: '#F4F1EA' }}
            />
            <button className="lt-focus" type="submit" style={{ fontSize: 12, fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', padding: '10px 4px' }}>
              Unirme
            </button>
          </form>
        </div>
      </div>
      <div className="lt-foot-bottom">
        <span>© 2026 LATAMesa. Todos los derechos reservados.</span>
        <div style={{ display: 'flex', gap: 20 }}>
          <Link className="lt-focus" href="/contact">Instagram</Link>
          <Link className="lt-focus" href="/contact">hola@latamesa.co.uk</Link>
          <Link className="lt-focus" href="/contact">London, UK</Link>
        </div>
      </div>
    </footer>
  );
}
