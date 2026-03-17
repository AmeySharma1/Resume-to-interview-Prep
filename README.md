Website is hosted on: https://resume-to-interview.onrender.com
# 🚀 Resume to Interview Prepration

Welcome to **Resume to Interview Prepration website**, an intelligent web application designed to help job seekers land their dream roles! By leveraging cutting-edge Generative AI, this platform provides personalized interview coaching, generated technical and behavioral questions, skill gap analysis, and tailored ATS-friendly resumes.

---

## ✨ Features

### 🎙️ AI-Powered Interview Prep
Submit your resume, self-description, and target job description to receive a comprehensive **Interview Report**:
- **Match Score**: Evaluates how well your profile aligns with the job.
- **Technical & Behavioral Questions**: Specifically tailored questions predicting what interviewers will ask, including their intentions and the best ways to answer them.
- **Skill Gap Analysis**: Identifies lacking skills with severity levels so you know exactly what to improve.
- **Custom Preparation Plan**: A structured, day-by-day study and task plan to prepare for the role effectively.

### 🔐 Secure User Authentication
- Robust user sign-up and login utilizing **JSON Web Tokens (JWT)** and **bcrypt**.
- Secure session management to keep your documents and interview reports private.

---

## 🛠️ Tech Stack

### 🎨 Frontend
- **React 19 & Vite**: Lightning-fast UI development and fast bundling.
- **React Router**: Seamless client-side routing.
- **SCSS**: For responsive and dynamic styling.
- **Axios**: Promised-based HTTP client for API requests.

### ⚙️ Backend
- **Node.js & Express.js**: Fast and scalable web server.
- **MongoDB & Mongoose**: Flexible NoSQL database for managing users and reports.
- **Zod**: Robust runtime schema validation.
- **Puppeteer**: Headless browser automation for high-quality HTML-to-PDF conversion.
- **PDF-Parse**: Extracting and reading text from uploaded PDF resumes.

### 🧠 AI Integration
- **OpenRouter API**: Seamless routing to leading AI models.
- **Google Gemini 2.0 Flash**: The core language model driving the natural language processing, resume generation, and structured interview JSON outputs.

---

## 🚀 Getting Started

### Prerequisites
Make sure you have the following installed:
- [Node.js](https://nodejs.org/) (v18 or later recommended)
- [MongoDB](https://www.mongodb.com/) (Local or Atlas URI)
- An active API key from [OpenRouter](https://openrouter.ai/) 

### Installation

1. **Clone the repository:**
   ```bash
   git clone <your-repository-url>
   cd interview-ai-yt
   ```

2. **Setup the Backend:**
   ```bash
   cd Backend
   npm install
   ```
   *Create a `.env` file in the Backend folder and configure your variables (e.g., `PORT`, `MONGO_URI`, `JWT_SECRET`, `OPENROUTER_API_KEY`).*
   ```bash
   npm run dev
   ```

3. **Setup the Frontend:**
   ```bash
   cd ../Frontend
   npm install
   npm run dev
   ```

4. **Open your browser** and navigate to the local Vite dev server URL (usually `http://localhost:5173`).

---

## 🤝 Contributing
Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](#) if you want to contribute.

## 📝 License
This project is licensed under the **ISC License**.
