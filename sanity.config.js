import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './sanity/schemaTypes';

// Configuración del Studio embebido dentro de Next.js.
// Se sirve desde la ruta /studio (ver app/studio/[[...tool]]/page.jsx) —
// no hace falta "npx sanity dev" ni "npx sanity deploy": vive adentro del
// mismo sitio y se despliega junto con todo lo demás en Vercel.
export default defineConfig({
  name: 'latamesa',
  title: 'LATAMesa — Panel de contenido',
  basePath: '/studio',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01',
  plugins: [structureTool(), visionTool()],
  schema: { types: schemaTypes }
});
