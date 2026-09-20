import '../styles/globals.css';

export const metadata = {
  title: 'LATAMesa — Revista editorial',
  description: 'Revista curatorial y editorial dedicada al arte latinoamericano y su diáspora en Londres.'
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
