import fs from 'fs';

const data = JSON.parse(fs.readFileSync('public/data/names.json', 'utf-8'));
const keys = data.map(n => `${n.name_english}_${n.gender}_${n.name_tamil}`);
const uniqueKeys = new Set(keys);

console.log('Total names:', data.length);
console.log('Unique composite keys:', uniqueKeys.size);

if (data.length !== uniqueKeys.size) {
     const counts = {};
    for (const key of keys) {
        counts[key] = (counts[key] || 0) + 1;
    }
    const duplicates = Object.keys(counts).filter(k => counts[k] > 1);
    console.log('Duplicate composite keys found:', duplicates.slice(0, 5));
} else {
    console.log('Composite keys are unique.');
}
