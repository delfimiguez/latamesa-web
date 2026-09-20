// Este es el documento que tu cliente completa una vez al mes.
// Cada campo de acá corresponde directamente a algo visible en el sitio:
// número de issue, tema, colores, foto de portada, colaboradores y las piezas del índice.
export default {
  name: 'issue',
  title: 'Issue',
  type: 'document',
  fields: [
    {
      name: 'number',
      title: 'Número de issue (ej: "01")',
      type: 'string',
      validation: (Rule) => Rule.required()
    },
    {
      name: 'slug',
      title: 'Slug (para la URL, ej: "correspondencias")',
      type: 'slug',
      options: { source: 'theme', maxLength: 60 },
      validation: (Rule) => Rule.required()
    },
    { name: 'theme', title: 'Tema del issue (ej: "Correspondencias")', type: 'string' },
    { name: 'season', title: 'Temporada (ej: "Otoño 2026 · Sept–Nov")', type: 'string' },
    { name: 'description', title: 'Descripción / bajada editorial', type: 'text', rows: 4 },
    { name: 'editorialQuote', title: 'Cita editorial destacada', type: 'text', rows: 2 },
    { name: 'editorialNote', title: 'Nota editorial completa', type: 'text', rows: 6 },
    { name: 'editorName', title: 'Nombre de quien firma la nota editorial', type: 'string' },
    { name: 'editorRole', title: 'Cargo (ej: "Directora editorial, LATAMesa")', type: 'string' },

    {
      name: 'heroImage',
      title: 'Imagen de portada (hero)',
      type: 'image',
      options: { hotspot: true }
    },

    {
      name: 'predominantColor',
      title: 'Color predominante del issue',
      type: 'string',
      description: 'Código hex, ej: #2647E8',
      initialValue: '#2647E8'
    },
    {
      name: 'accentColor',
      title: 'Color de acento',
      type: 'string',
      description: 'Código hex, ej: #C9FF32',
      initialValue: '#C9FF32'
    },

    {
      name: 'collaborators',
      title: 'Colaboradores (nombres)',
      type: 'array',
      of: [{ type: 'string' }]
    },

    {
      name: 'pieces',
      title: 'Piezas del issue (índice de contenido)',
      type: 'array',
      of: [{ type: 'piece' }]
    },

    {
      name: 'isCurrent',
      title: '¿Es el issue actual? (se muestra en la home)',
      type: 'boolean',
      initialValue: false
    },

    {
      name: 'publishedAt',
      title: 'Fecha de publicación',
      type: 'datetime'
    }
  ],
  preview: {
    select: { title: 'theme', subtitle: 'number' },
    prepare({ title, subtitle }) {
      return { title, subtitle: `Issue ${subtitle}` };
    }
  }
};
