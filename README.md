# 🧩 ModMingle

ModMingle is a clean and modern Next.js web app that allows users to explore, search, and download the most popular Minecraft mods from the Modrinth API.  
It features smooth animations, elegant UI, and lightning-fast performance.

---

## 🚀 Features

- ✨ **Fade-in Animations** — Smooth and lightweight transitions using GSAP and Framer Motion.  
- 🎨 **Minimal & Pure Design** — Simple, responsive, and distraction-free interface built with Tailwind CSS.  
- 📈 **Top Mods Display** — Shows trending and most downloaded mods dynamically from the Modrinth API.  
- 🖱️ **Hover Effects** — Interactive hover transitions on mod cards for better UX.  
- 🔍 **Mods Search** — Search through thousands of mods in real time.  
- 📥 **Direct Download** — One-click access to mod downloads.  
- 🔗 **Related Mods** — Discover similar or related mods easily.  
- 🌗 **Theme Toggle** — Switch between light and dark modes (stored in localStorage).

---

## 🛠️ Tech Stack

- **Framework:** Next.js 14  
- **Styling:** Tailwind CSS + Custom CSS  
- **Animations:** GSAP + Framer Motion  
- **API:** [Modrinth API](https://docs.modrinth.com/api-spec/)  
- **UI Components:** MUI (Icons)  

---

## 📂 Project Structure

.
├── components/
│ ├── Navbar.jsx
│ ├── Hero.jsx
│ ├── ModCard.jsx
├── pages/
│ ├── index.jsx
│ ├── popular.jsx
│ ├── about.jsx
│ └── 404.jsx
├── styles/
│ ├── globals.css
│ └── navbar.css
├── public/
│ └── favicon.ico
└── README.md

yaml
Copy code

---

## ⚙️ Setup & Run Locally

```bash
# Clone the repository
git clone https://github.com/<your-username>/modmingle.git

# Navigate to project folder
cd modmingle

# Install dependencies
npm install

# Run the development server
npm run dev
Open your browser at http://localhost:3000 🚀

🧠 Future Improvements
Add filtering by game version or category.

Add pagination or infinite scroll.

Create user favorites and collections.

Add authentication (login with Modrinth or GitHub).

📜 License
This project is licensed under the MIT License — feel free to modify and share!

Created with ❤️ by Mohamed Ayman