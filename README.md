## 🚀 SimpleTodo – Smart Todo App with AI Assist

SimpleTodo is a modern Next.js Todo application with a premium glassmorphism UI and AI-powered features. It helps users manage tasks efficiently and improves productivity using AI assistance like task correction and smart suggestions.

## ✨ Features

### 📝 Core Todo Features

- ➕ Add new tasks

- ✏️ Edit existing tasks

- 🗑️ Delete tasks

- ✅ Mark tasks as completed / pending

- 🔍 Search tasks

- 🎯 Filter tasks (All / Pending / Completed)

- 💎 Modern glassmorphism UI

- ⚡ Optimistic UI updates

### 🤖 AI-Powered Features (Groq AI)

- ✨ AI Assist – Improve/correct task text (grammar & spelling)

- 🧠 Smart AI response using LLaMA 3.1 model

- ⚡ Super-fast & free AI inference via Groq

### 🎨 UI/UX

- Glassmorphism design

- Smooth hover & transition effects

- Skeleton loaders while data loads

- Responsive layout

- Premium AI button with icon & loading state

state

## 🛠 Tech Stack

### Frontend

- Next.js (App Router)

- React

- TypeScript

- Tailwind CSS

- React Icons

### Backend

- Next.js API Routes

- Groq AI SDK

### Database

- MongoDB

- Mongoose

## 📂 Project Structure

```bash

eduflow-ai/
│── app/
│ ├── api/
│ │ ├── ai/
│ │ │ └── correct/route.ts # AI correction API (Groq)
│ │ └── todos/route.ts # Todo CRUD APIs
│ ├── dashboard/ # Todo dashboard UI
│ └── page.tsx # Home page
│
│── components/ # Reusable UI components
│── public/
│── styles/
│── .env.local
│── README.md
│── package.json

```

### 🔐 Environment Variables

Create a .env.local file in the root directory:

```bash

MONGODB_URI =
NEXTAUTH_SECRET =
NEXTAUTH_URL =
GROQ_API_KEY =

```

### 🔑 Getting Groq API Key (FREE)

- Go to 👉 https://console.groq.com

- Login using Google/GitHub

- Navigate to API Keys

- Create a new API key

- Copy and paste it into .env.local

## ▶️ Getting Started

### 1️⃣ Install Dependencies

```bash
npm install
```

### 2️⃣ Run Development Server

```bash
npm run dev
```

App will run on:

```bash
http://localhost:3000
```

## 🤖 AI Assist – How It Works

### Backend Logic

- Uses Groq LLaMA 3.1 model

- Corrects grammar and spelling

- Returns only the corrected sentence

- Example API Request
  {
  "text": "i am lerning next js from 1 year"
  }
- Example Response
  {
  "corrected": "I have been learning Next.js for one year."
  }

### UX Flow

- User types a task

- Clicks ✨ AI Assist

- AI corrects the text

- Input is auto-updated
