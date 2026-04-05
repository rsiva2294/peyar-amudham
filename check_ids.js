import fs from 'fs';

const data = JSON.parse(fs.readFileSync('public/data/names.json', 'utf-8'));
const ids = data.map(n => n.id);
const uniqueIds = new Set(ids);

console.log('Total names:', data.length);
console.log('Unique IDs:', uniqueIds.size);

if (data.length !== uniqueIds.size) {
    const counts = {};
    for (const id of ids) {
        counts[id] = (counts[id] || 0) + 1;
    }
    const duplicates = Object.keys(counts).filter(id => counts[id] > 1);
    console.log('Duplicate IDs found:', duplicates.slice(0, 10));
} else {
    console.log('All IDs semi-unique.');
}
