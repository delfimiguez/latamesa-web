'use client';
import { useState } from 'react';
import Link from 'next/link';

// Réplica de Nav.dc.html: mismo checkbox-toggle + overlay con blur, pero como
// componente de React con estado normal en vez del truco de CSS ":checked ~".
export default function Nav({ active = 'home', issueLabel = 'Issue 01 — Correspondencias', onImage = false }) {
  const [open, setOpen] = useState(false);
  const [lang, setLang] = useState('es');
  const isEs = lang !== 'en';

  const items = [
    { key: 'issue', es: 'Issue actual', en: 'Current issue', href: '/issue/correspondencias' },
    { key: 'archive', es: 'Archivo', en: 'Archive', href: '/archive' },
    { key: 'exhibitions', es: 'Exhibiciones', en: 'Exhibitions', href: '/exhibitions' },
    { key: 'events', es: 'Eventos', en: 'Events', href: '/events' },
    { key: 'about', es: 'Sobre LATAMesa', en: 'About', href: '/about' },
    { key: 'contact', es: 'Contacto', en: 'Contact', href: '/contact' }
  ];

  return (
    <nav className="lt-nav" aria-label="Principal">
      <div className={`lt-nav-row ${onImage ? 'on-image' : ''}`}>
        <Link href="/" className="lt-logo lt-focus">
          LATAMesa<small>Revista editorial</small>
        </Link>
        <div className="lt-nav-right">
          <Link className="lt-issue-pill lt-focus" href="/issue/correspondencias">
            <i aria-hidden="true"></i>{issueLabel}
          </Link>
          <button type="button" className="lt-menu-btn lt-focus" onClick={() => setOpen(true)} aria-expanded={open}>
            <span className="lt-burger" aria-hidden="true" style={open ? burgerOpenStyle : undefined}>
              <span style={open ? { transform: 'translateY(7px) rotate(45deg)' } : undefined}></span>
              <span style={open ? { opacity: 0 } : undefined}></span>
              <span style={open ? { transform: 'translateY(-7px) rotate(-45deg)' } : undefined}></span>
            </span>
            <span>{isEs ? 'Menú' : 'Menu'}</span>
          </button>
        </div>
      </div>

      <div className="lt-overlay" style={open ? { opacity: 1, visibility: 'visible' } : undefined} aria-hidden={!open}>
        <button
          type="button"
          className="lt-overlay-close lt-focus"
          onClick={() => setOpen(false)}
          aria-label="Cerrar menú"
          style={{ position: 'absolute', top: 22, right: 'var(--margin)', fontSize: 28, fontWeight: 300, color: 'var(--ink)', background: 'none', border: 0 }}
        >
          ×
        </button>
        <nav className="lt-overlay-links" aria-label="Secciones">
          {items.map((l) => (
            <Link
              key={l.key}
              className="lt-focus"
              href={l.href}
              aria-current={l.key === active ? 'page' : undefined}
              onClick={() => setOpen(false)}
            >
              {isEs ? l.es : l.en}
            </Link>
          ))}
        </nav>
        <div className="lt-overlay-foot">
          <div className="lt-lang" role="group" aria-label="Idioma">
            <button type="button" className="lt-focus" aria-pressed={isEs} onClick={() => setLang('es')}>ES</button>
            <span aria-hidden="true">/</span>
            <button type="button" className="lt-focus" aria-pressed={!isEs} onClick={() => setLang('en')}>EN</button>
          </div>
          <Link className="lt-focus" href="/issue/correspondencias">{issueLabel}</Link>
          <span>London, UK</span>
        </div>
      </div>
    </nav>
  );
}

const burgerOpenStyle = {};
