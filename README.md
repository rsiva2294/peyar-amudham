# 🏺 PEYAR AMUDHAM (பெயர் அமுதம்)
> **Pure Linguistic Nectar** — A modern digital archive of 30k+ pure, classical Tamil names.

**PEYAR AMUDHAM** is a premium, high-performance web platform designed to help the Tamil community rediscover names that are phonetically beautiful, linguistically pure, and culturally authentic. Built as a "Digital Heritage Museum," this archive is free from modern non-Tamil influences, offering an unfiltered connection to Sangam-era roots.

Unlike generic name generators, this project focuses exclusively on linguistically pure roots, curated from the **Tamil Virtual Academy (TVA)** public records. It features an advanced AI-powered semantic search, allowing users to find names based on complex "vibes" and deep meanings.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![Vite](https://img.shields.io/badge/Vite-8.0-646CFF?logo=vite)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript)

---

## ✨ Key Features

- **📖 31,000+ Pure Names**: A massive, curated archive of traditional names categorized by gender, meaning, and origin.
- **🪄 Magic AI Search**: Powered by **Gemini 2.5 Flash**, users can describe a "vibe" (e.g., *"A brave warrior from the sea"*) to find semantically matching names.
- **🔡 Bi-Lingual Filtering**: Filter names using both English and Tamil (அ-வ) starting letters.
- **💖 Favorites System**: Persistent local storage for shortlisting names without needing an account.
- **🎲 Surprise Me**: An immersive, full-screen "random name" discovery tool with smart text-scaling for responsiveness.
- **🤝 Contribution Portal**: A serverless way for the public to suggest new names directly to the curators.
- **🌓 Dark Mode**: A premium, state-of-the-art interface that supports system-wide theme switching.

---

## 🛠️ Tech Stack

- **Frontend**: React 19 + Vite
- **Language**: TypeScript
- **Styling**: Vanilla CSS (Modern CSS Variables + Container Queries)
- **AI Integration**: Google Generative AI (@google/generative-ai)
- **Icons**: Lucide React
- **Hosting Ready**: Optimized for Vercel or Netlify (SPA routing).

---

## 🚀 Getting Started

### 1. Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### 2. Installation
```bash
# Clone the repository
git clone https://github.com/your-username/tamil-baby-names.git

# Navigate into the directory
cd tamil-baby-names

# Install dependencies
npm install
```

### 3. Environment Setup
Create a `.env.local` file in the root directory and add your Gemini API Key:
```env
VITE_GEMINI_API_KEY=your_google_gemini_api_key_here
```
*You can get a free API key at [Google AI Studio](https://aistudio.google.com/).*

### 4. Run Development Server
```bash
npm run dev
```
The app will be available at `http://localhost:5173`.

---

## 📂 Data Structure

The name data is stored in `public/data/names.json`. Each name follows this schema:

```json
{
  "id": 123,
  "name_tamil": "அழகன்",
  "name_english": "Azhagan",
  "gender": "Boy",
  "length": 6,
  "meaning_english": "The one who is beautiful and handsome.",
  "meaning_tamil": "அழகானவன்",
  "tags": ["beauty", "handsome", "grace"],
  "search_slug": "azhaganஅழகன்"
}
```

---

## 📜 Credits & Disclaimer

- **Data Source**: This project uses data curated and verified against the **Tamil Virtual Academy (TVA)** public records.
- **Curation**: Special effort has been put into translating, tagging, and categorizing these traditional records for a modern digital experience.
- **Disclaimer**: This app is an independent project and is not officially affiliated with the Government of Tamil Nadu.

---

## 🤝 Contributing

Contributions are welcome! If you'd like to improve the code or the dataset:
1. Fork the Project.
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`).
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the Branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

Built with ❤️ for the Tamil Community.
