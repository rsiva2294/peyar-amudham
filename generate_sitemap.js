import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = 'https://peyar-amudham.web.app';
const NAMES_DATA_PATH = path.join(__dirname, 'public', 'data', 'names.json');
const SITEMAP_PATH = path.join(__dirname, 'public', 'sitemap.xml');

async function generateSitemap() {
  console.log('🏺 Starting Sitemap Generation for Peyar Amudham...');

  try {
    const rawData = fs.readFileSync(NAMES_DATA_PATH, 'utf8');
    const names = JSON.parse(rawData);

    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

    // 1. Add Main Page
    xml += `  <url>\n`;
    xml += `    <loc>${BASE_URL}/</loc>\n`;
    xml += `    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>\n`;
    xml += `    <changefreq>weekly</changefreq>\n`;
    xml += `    <priority>1.0</priority>\n`;
    xml += `  </url>\n`;

    // 2. Add all 31,000+ Name Detail Pages (as query params)
    console.log(`🕯️  Indexing ${names.length} classic artifacts...`);
    names.forEach((name) => {
      const url = `${BASE_URL}/?name=${encodeURIComponent(name.name_english)}`;
      xml += `  <url>\n`;
      xml += `    <loc>${url}</loc>\n`;
      xml += `    <changefreq>monthly</changefreq>\n`;
      xml += `    <priority>0.8</priority>\n`;
      xml += `  </url>\n`;
    });

    xml += `</urlset>`;

    fs.writeFileSync(SITEMAP_PATH, xml);
    console.log(`✨ Success! Sitemap generated at ${SITEMAP_PATH}`);
  } catch (error) {
    console.error('❌ Failed to generate sitemap:', error);
  }
}

generateSitemap();
