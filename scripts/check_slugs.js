import fs from 'fs';

const data = JSON.parse(fs.readFileSync('public/data/names.json', 'utf-8'));
const slugs = data.map(n => n.search_slug);
const uniqueSlugs = new Set(slugs);

console.log('Total names:', data.length);
console.log('Unique slugs:', uniqueSlugs.size);
