# \# 🧠 AI Career Counselor – Auth System

An authentication system built using **Next.js App Router**, **PostgreSQL (Neon)**, and **TypeScript**, designed as a secure entry point for the AI Career Counselor web app.

---

## 🚀 Features

- ✨ User Signup with:
    - Name
    - Mobile Number
    - Email
    - Password
- 🔐 Password Hashing with **bcrypt**
- 🍪 Session Management via **Cookies API**
- 🗃️ Neon/PostgreSQL database integration
- 📦 Modular Auth Utility (`lib/auth.ts`)
- 📄 FormData API for seamless submissions
- ✅ Validation \& Error handling

---

## 🛠️ Tech Stack

| Technology | Purpose |
| :-- | :-- |
| Next.js (App Router) | Full-stack React framework |
| TypeScript | Type safety |
| Neon (PostgreSQL) | Database for user storage |
| bcryptjs | Secure password hashing |
| Tailwind CSS | Modern, responsive UI |

---

## 📂 Folder Structure

.
├── app/
│   ├── signup/              \# Signup page UI
│   ├── login/               \# Login page (if present)
│   ├── page.tsx             \# Homepage (uses session)
├── lib/
│   ├── auth.ts              \# Auth logic (register, session, etc.)
│   └── db.ts                \# Neon DB connection
├── actions/
│   ├── auth-actions.ts      \# Server actions (signup handler)

---

## ⚙️ Environment Variables (`.env.local`)

```env
DATABASE_URL=your_neon_postgres_url
```

---

## 🧪 Setup \& Run

1. **Clone the repo**

```bash
git clone https://github.com/your-username/ai-career-counselor-auth.git
cd ai-career-counselor-auth
```

2. **Install dependencies**

```bash
npm install
```

3. **Configure the database**
    - Create a Neon Postgres DB
    - Create a `users` table:

```sql
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name TEXT,
  mobile TEXT,
  email TEXT UNIQUE,
  password_hash TEXT
);
```

4. **Run the dev server**

```bash
npm run dev
```


---

## 🔐 Auth Flow

1. **Sign Up** – `/signup`
    - Accepts Name, Mobile, Email, Password
    - Password is hashed
    - User is stored in PostgreSQL
    - Session cookie is set on success
2. **Session Check**
    - Session is validated using `cookies()` in `getUserSession()`
3. **Logout**
    - Session cookie is cleared with `clearUserSession()`

---

## 🧾 Sample Signup Payload (FormData)

```ts
FormData {
  name: "Jane Doe",
  mobile: "9876543210",
  email: "jane@example.com",
  password: "securePassword123"
}
```

---

## ✅ To Do

- [ ] Add Login page
- [ ] Add Forgot Password feature
- [ ] Rate-limit requests for security
- [ ] Switch to JWT-based auth (optional)

---

## 📄 License

MIT © 2025 Harish Aggarwal

```


CONVERT ALL THIS TO MARKDOWN

```markdown
# 🧠 AI Career Counselor – Auth System  
An authentication system built using **Next.js App Router**, **PostgreSQL (Neon)**, and **TypeScript**, designed as a secure entry point for the AI Career Counselor web app.

---

## 🚀 Features  
- **User Signup** with:  
  - Name  
  - Mobile Number  
  - Email  
  - Password  
- **Password Hashing** with bcrypt  
- **Session Management** via Cookies API  
- **Neon/PostgreSQL** database integration  
- Modular Auth Utility (`lib/auth.ts`)  
- FormData API for seamless submissions  
- Validation &amp; Error handling  

---

## 🛠️ Tech Stack  

| Technology          | Purpose                          |
|---------------------|----------------------------------|
| Next.js (App Router) | Full-stack React framework       |
| TypeScript          | Type safety                      |
| Neon (PostgreSQL)   | Database for user storage        |
| bcryptjs            | Secure password hashing          |
| Tailwind CSS        | Modern, responsive UI            |

---

## 📂 Folder Structure  
```

.
├── app/
│   ├── signup/              \# Signup page UI
│   ├── login/               \# Login page
│   ├── page.tsx             \# Homepage (uses session)
├── lib/
│   ├── auth.ts              \# Auth logic
│   └── db.ts                \# Neon DB connection
├── actions/
│   ├── auth-actions.ts      \# Server actions

```

---

## ⚙️ Environment Variables  
```

DATABASE_URL=your_neon_postgres_url

```

---

## 🧪 Setup &amp; Run  
1. Clone the repo:  
```

git clone https://github.com/your-username/ai-career-counselor-auth.git
cd ai-career-counselor-auth

```

2. Install dependencies:  
```

npm install

```

3. Configure database:  
```

CREATE TABLE IF NOT EXISTS users (
id SERIAL PRIMARY KEY,
name TEXT,
mobile TEXT,
email TEXT UNIQUE,
password_hash TEXT
);

```

4. Start dev server:  
```

npm run dev

```

---

## 🔐 Auth Flow  
1. **Sign Up** (`/signup`)  
- Accepts user credentials via FormData  
- Hashes password with bcrypt  
- Stores user in PostgreSQL  
- Sets session cookie  

2. **Session Validation**  
- Uses `cookies()` API for session checks  

3. **Logout**  
- Clears session cookie  

---

## 🧾 Sample Signup Payload  
```

FormData {
name: "Jane Doe",
mobile: "9876543210",
email: "jane@example.com",
password: "securePassword123"
}

```

---

## ✅ Roadmap  
- [ ] Implement login page  
- [ ] Add password reset flow  
- [ ] Integrate rate-limiting  
- [ ] Optional JWT auth  

--- 

MIT © 2025 Harish Aggarwal
```

