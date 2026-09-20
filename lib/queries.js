// Queries en GROQ (el lenguaje de consultas de Sanity).
// No hace falta que las entiendas para usar el sitio, pero si en algún
// momento agregás campos nuevos al schema, estos son los lugares donde
// también hay que pedirlos.

export const CURRENT_ISSUE_QUERY = `*[_type == "issue" && isCurrent == true] | order(publishedAt desc)[0]{
  ...,
  "slug": slug.current
}`;

export const ISSUE_BY_SLUG_QUERY = `*[_type == "issue" && slug.current == $slug][0]{
  ...,
  "slug": slug.current
}`;

export const ALL_ISSUES_QUERY = `*[_type == "issue"] | order(publishedAt desc){
  number,
  theme,
  season,
  predominantColor,
  "slug": slug.current,
  heroImage
}`;
