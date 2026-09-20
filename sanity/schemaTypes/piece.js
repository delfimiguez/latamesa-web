// Una "pieza" del issue: un ensayo, entrevista, feature visual o nota de evento.
// Esto es lo que arma cada fila del índice de contenidos del issue.
export default {
  name: 'piece',
  title: 'Pieza del issue',
  type: 'object',
  fields: [
    {
      name: 'kind',
      title: 'Tipo',
      type: 'string',
      options: {
        list: [
          { title: 'Editorial Note', value: 'editorial' },
          { title: 'Artist Essay', value: 'essay' },
          { title: 'Curator Essay', value: 'curator-essay' },
          { title: 'Interview', value: 'interview' },
          { title: 'Visual Feature', value: 'visual' },
          { title: 'News / Event', value: 'event' }
        ]
      }
    },
    { name: 'title', title: 'Título', type: 'string' },
    { name: 'author', title: 'Autor / entrevistado', type: 'string' },
    { name: 'intro', title: 'Bajada / resumen corto', type: 'text', rows: 2 },
    { name: 'readTime', title: 'Tiempo de lectura (ej: "9 min")', type: 'string' },
    { name: 'image', title: 'Imagen', type: 'image', options: { hotspot: true } },
    { name: 'imageCaption', title: 'Pie de imagen', type: 'string' },
    { name: 'imageCredit', title: 'Crédito de imagen', type: 'string' },
    { name: 'isLead', title: '¿Es la pieza destacada (la más grande)?', type: 'boolean', initialValue: false }
  ],
  preview: {
    select: { title: 'title', subtitle: 'kind' }
  }
};
