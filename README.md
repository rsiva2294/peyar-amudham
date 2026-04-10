# 🏺 PEYAR AMUDHAM (பெயர் அமுதம்)
> **Pure Linguistic Nectar** — A premium, high-performance digital archive of 31,000+ pure, classical Tamil names.

**PEYAR AMUDHAM** is a state-of-the-art web platform designed for the Tamil community to rediscover names that are phonetically beautiful, linguistically pure, and culturally authentic. Built as a "Digital Heritage Museum," this archive is free from modern non-Tamil influences, offering an unfiltered connection to Sangam-era roots.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![Vite](https://img.shields.io/badge/Vite-8.0-646CFF?logo=vite)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript)
![PWA](https://img.shields.io/badge/PWA-Ready-orange?logo=pwa)
![Android](https://img.shields.io/badge/Android-Ready-3DDC84?logo=android)

---

## ✨ Key Features

- **📖 31,000+ Pure Names**: A massive, curated archive of traditional names categorized by gender, meaning, and origin.
- **📱 Android & PWA Experience**: Official Android App available (via TWA). Fully installable on iOS and Desktop. Works offline with advanced service worker caching.
- **🪄 Vibe Search (AI)**: Powered by **Gemini 2.5 Flash**, users can describe a "vibe" (e.g., *"A brave warrior from the sea"*) to find semantically matching names.
- **🔍 Granular Search**:
    - **Predicates**: Search by "Starts with", "Contains", or "Ends with".
    - **Language**: Toggle between English and Tamil (அ-வ) starting letters.
    - **Length**: Filter by Short, Medium, or Long names.
- **💖 Favorites System**: Persistent local storage for shortlisting names without needing an account.
- **🎲 Surprise Me**: An immersive discovery tool that pulls unique names from the archive with a single click.
- **🤝 Contribution Portal**: A built-in system for the community to suggest new names for curation.
- **🌓 Light-First Design**: A premium, accessible interface featuring heritage-inspired gold, sapphire, and ruby gradients (Dark mode available).

---

## 🛠️ Tech Stack

- **Frontend**: [React 19](https://react.dev/) + [Vite 8](https://vite.dev/)
- **Logic**: [TypeScript 5.9](https://www.typescriptlang.org/)
- **Styling**: Vanilla CSS (Modern CSS Variables, Container Queries, and Glassmorphism)
- **AI Integration**: [Google Generative AI](https://ai.google.dev/) (Gemini 2.5 Flash)
- **Offline Capabilities**: [Vite PWA Plugin](https://vite-pwa-org.netlify.app/) (Workbox)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Android Wrapper**: [Google Bubblewrap](https://github.com/GoogleChromeLabs/bubblewrap)
- **Deployment**: [Firebase Hosting](https://firebase.google.com/docs/hosting)

---

## 🚀 Getting Started

### 1. Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### 2. Installation
```bash
# Clone the repository
git clone https://github.com/rsiva2294/peyar-amudham.git

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

## 📱 Android App

3. The generated artifacts will be in the root directory as `app-release-bundle.aab`.

### Digital Asset Links (TWA)
For a seamless full-screen experience, the app verifies ownership via:
- **Location**: `public/.well-known/assetlinks.json`
- **SHA-256 Fingerprint**: `DF:21...69:7E` (See `STORE_LISTING.md` for full hash).

---

## 📂 Data Structure

The name data is stored in `public/data/names.json`. The application uses a high-performance filtering engine to search through over 31,000 records in real-time.

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

Contributions are welcome! If you'd like to improve the code or the dataset, please read our **[Contributing Guide](CONTRIBUTING.md)** and our **[Code of Conduct](CODE_OF_CONDUCT.md)** for more information.

---

## 📄 License

Distributed under the **MIT License**. See **[LICENSE](LICENSE)** for more information.

---

Built with ❤️ for the Tamil Community by rsiva2294.
For Play Store metadata, see [STORE_LISTING.md](STORE_LISTING.md).
