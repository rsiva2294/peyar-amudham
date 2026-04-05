import fs from 'fs';

const envFile = fs.readFileSync('.env.local', 'utf-8');
const keyMatch = envFile.match(/VITE_GEMINI_API_KEY=(.*)/);
if(keyMatch) {
  const key = keyMatch[1].trim();
  fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${key}`)
    .then(res => res.json())
    .then(data => {
        if(data.models) {
            console.log(data.models.map(m => m.name));
        } else {
            console.log(data);
        }
    })
    .catch(console.error);
} else {
    console.log("No key found");
}
