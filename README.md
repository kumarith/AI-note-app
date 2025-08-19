# 📝 AI Note App

An AI-powered note-taking application built with **Next.js, TypeScript, Redux, and OpenAI**.  
This project demonstrates scalable frontend architecture, authentication, AI integration, state management, and production-quality practices.

---

## 🛠️ Tech Stack

- [Next.js](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [TailwindCSS](https://tailwindcss.com/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [NextAuth.js](https://next-auth.js.org/)
- [OpenAI API](https://platform.openai.com/)
- [Playwright](https://playwright.dev/)
- [GitHub Actions](https://github.com/features/actions)
- **Database**: Prisma + PostgreSQL (or MongoDB)

---

## 📐 Architecture (High-Level)

Flow: **User → Next.js UI → Redux → API Routes (Auth / DB / AI) → OpenAI → Back to UI**

---

## 🧑‍💻 Features (Planned)

- ✅ Authentication (Google & Credentials via NextAuth)  
- ✅ Create, edit, and persist notes  
- ✅ AI-powered note generation with OpenAI  
- ✅ State management with Redux Toolkit  
- ✅ Responsive UI with Tailwind  
- ✅ Deployment on Vercel

---

## 📦 Installation & Local Setup

```bash
# 1. Clone the repository
git clone https://github.com/kumarith/AI-note-app
cd ai-note-app

# 2. Install dependencies
npm install

# 3. Run the dev server
npm run dev

# 4. Build for production
npm run build

# 5. Preview production build
npm run preview

- App will be available at http://localhost:3000 by default.