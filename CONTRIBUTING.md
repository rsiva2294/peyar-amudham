# Contributing to PEYAR AMUDHAM

Thank you for your interest in contributing to PEYAR AMUDHAM! We welcome all contributions that help preserve and celebrate the pure Tamil linguistic heritage.

## 🏺 How to Contribute

### 1. Reporting Bugs
- Check the [existing issues](https://github.com/rsiva2294/peyar-amudham/issues) to see if the bug has already been reported.
- If not, open a new issue with a clear description, steps to reproduce, and screenshots if applicable.

### 2. Suggesting Features
- We value new ideas! Open an issue with the tag `enhancement` to discuss your proposed feature before starting work.

### 3. Data Contributions
- If you find a pure Tamil name that is missing or has an incorrect meaning, please open an issue or a Pull Request targeting `public/data/names.json`.
- **Note**: This project focuses on **pure, classical Tamil** names (as used in Sangam era roots). Modern Sanskrit-influenced names or loanwords will not be accepted.

### 4. Code Contributions
1. Fork the repository.
2. Create a new branch: `git checkout -b feature/your-feature-name`.
3. Make your changes.
4. Ensure your code follows the existing style and passes linting:
   ```bash
   npm run lint
   ```
5. Commit your changes: `git commit -m 'Add some feature'`.
6. Push to your fork: `git push origin feature/your-feature-name`.
7. Submit a Pull Request.

### 5. Android Wrapper Contributions
- The Android app is powered by **Bubblewrap**. 
- To update Android-specific settings, modify `twa-manifest.json` and run `npx @bubblewrap/cli build` to regenerate the native project.

## 🛠️ Local Development

1. **Clone your fork**:
   ```bash
   git clone https://github.com/your-username/peyar-amudham.git
   cd peyar-amudham
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment**:
   - Copy `.env.example` to `.env.local`.
   - Add your [Google Gemini API Key](https://aistudio.google.com/).

4. **Start the development server**:
   ```bash
   npm run dev
   ```

## 📜 Code of Conduct
By participating in this project, you agree to abide by our [Code of Conduct](CODE_OF_CONDUCT.md).

## ⚖️ License
By contributing, you agree that your contributions will be licensed under its [MIT License](LICENSE).
