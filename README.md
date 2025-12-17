# AskSorSU

## System Documentation

---

## 1. Project Overview

**AskSorSU** is a web-based campus information assistant designed for **Sorsogon State University (SorSU)**.  
The system provides structured answers to frequently asked questions related to admissions, registrar services, academic policies, and general university information.

Unlike AI-powered chatbots that generate responses dynamically, **AskSorSU uses a deterministic, knowledge-based approach**. All responses are retrieved from a curated database, ensuring consistency, transparency, and controlled information delivery.

---

## 2. Objectives

### 2.1 General Objective

To develop a centralized, accessible, and secure campus information system that assists students, applicants, alumni, and non-students in obtaining official SorSU-related information.

### 2.2 Specific Objectives

- Provide accurate answers to common registrar and admission inquiries
- Reduce repetitive manual inquiries to university staff
- Allow keyword-based question matching without AI hallucination
- Support authentication via email/password and Google OAuth
- Provide a modern dashboard-based chat interface
- Ensure data security and controlled access

---

## 3. Scope and Limitations

### 3.1 Scope

- Campus-related information retrieval
- Admission and registrar FAQs
- General university information
- Web-based access
- Keyword-based knowledge matching

### 3.2 Limitations

- No generative AI agent
- No natural language understanding beyond keyword matching
- Answers depend solely on stored knowledge
- No learning or adaptive behavior
- No automated data updates

The system explicitly informs users of these limitations to maintain transparency.

---

## 4. System Architecture

### 4.1 High-Level Architecture

User Interface (Next.JS) > Server Action (Next.JS) > Appwrite Database > Knowledge Response

### 4.2 Architecture Description

- The frontend is built using **Next.js App Router**
- Server-side actions handle knowledge retrieval securely
- Appwrite manages authentication, database, and permissions
- No third-party AI APIs are used

---

## 5. Technology Stack

### 5.1 Frontend

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- Lucide Icons

### 5.2 Backend / Services

- Appwrite Cloud
- node-appwrite SDK (server-side)
- appwrite SDK (client-side)
- CSV-based data import

---

## 6. User Roles

### 6.1 Guest User

- Can view public pages
- Cannot access dashboard

### 6.2 Authenticated User

- Access to dashboard
- Can ask questions
- Can use quick question buttons
- Can toggle dark mode
- Session-based authentication

---

## 7. Database Design

### 7.1 Database Overview

The system uses **one primary Appwrite database**:  
`db_asksorsu`

---

### 7.2 Users Collection (`users`)

Stores extended user information linked to Appwrite Authentication.

| Field  | Type   | Description         |
| ------ | ------ | ------------------- |
| name   | string | User full name      |
| email  | string | User email          |
| userId | string | Appwrite Auth `$id` |

Relationship:

- One-to-one with Appwrite Authentication User

---

### 7.3 Knowledge Collection (`tb_knowledge`)

This is the **core intelligence** of AskSorSU.

| Field    | Type   | Description                         |
| -------- | ------ | ----------------------------------- |
| title    | string | Topic title                         |
| category | string | Admission, Registrar, General, etc. |
| audience | string | Student, Applicant, Alumni          |
| question | string | Canonical question                  |
| answer   | string | Official answer                     |
| keywords | string | Search keywords                     |

---

## 8. Knowledge-Based Answering Logic

### 8.1 Query Processing

When a user submits a question:

1. Input is normalized (lowercase, trimmed)
2. Multiple search queries are generated:
   - Search by `keywords`
   - Search by `question`
   - Search by `title`
3. Appwrite performs full-text search
4. The first matching document is returned
5. If no match exists, a fallback message is shown

### 8.2 Deterministic Behavior

- Same question → same answer
- No randomness
- No AI hallucination
- Predictable results

---

## 9. Dashboard Interaction Flow

### 9.1 Initial Load

- System message displayed
- Disclaimer shown about system limitations

### 9.2 User Interaction

- User may:
  - Type a question
  - Click a quick question button
- Message is appended to chat history
- System retrieves answer from database
- Answer is displayed in chat format

---

## 10. Authentication Flow

### 10.1 Email & Password

1. User registers
2. Account created in Appwrite Auth
3. User session created
4. User record stored in `users` collection

### 10.2 Google OAuth

1. User selects Google sign-in
2. OAuth handled by Appwrite
3. Session created
4. User redirected to dashboard

---

## 11. Security Measures

- Server-side API key usage
- Role-based database permissions
- Environment variables secured
- OAuth redirect validation
- No API keys exposed to frontend

---

## 12. Data Import Process

### 12.1 CSV-Based Knowledge Import

Knowledge is prepared using CSV files:

```csv
title,category,audience,question,answer,keywords
Enrollment 2026,Admission,Student,"When is enrollment for 2026?","Enrollment starts Feb 26, 2026","enrollment,2026,registration"

```

### 12.2 Import Script

1. Located in scripts/importKnowledge.tsx
2. Uses node-appwrite with API key
3. Inserts records into tb_knowledge

using this importKnowledge.tsx, I can import easily the csv files from data to tb_knowledge (Appwrite).

### 13. Deployment

### 13.1 Local Development

1. npm install
2. npm run dev

### 13.2 Production Deployment

1. Hosted on Vercel
2. Environment variables configured in Vercel dashboard
3. OAuth redirect URLs registered in Appwrite

### 14. Known Issues

1. Keyword mismatch may result in no answer
2. Users may phrase questions outside stored knowledge scope
3. No fuzzy semantic understanding

I added contact email just incase the visitors are faced a bugs or errors to our system during their checking or exploring to our system.

### 15. Future Enhancements

1. Admin dashboard for managing knowledge
2. Persistent chat history
3. Advanced keyword ranking
4. AI agent integration
5. Analytics dashboard
6. Multi-language support
7. E-commerse for school needs only (e.g., uniforms, p.e, etc.)

PS: I can't add an online transaction (Money Involvement) to prevent errors or malfuntion between users and the system.
Solution: For future enhancement, I will add Receipt for our E-commerse system where they can provide this receipt to cashier, just proving they check-out their order via system.

### 16. Disclaimer

1. AskSorSU provides informational assistance only.
2. Accuracy depends on the completeness and correctness of the stored knowledge base.
3. Users are advised to verify critical information with official SorSU offices.

### 17. Author

Mark Julius P. Bongalbal
Bachelor of Science in Information Technology 3-3
Sorsogon State University

Email: send2hire.mark@gmail.com

### 17.1 Partnered by

Lorelyn Habal & Michaela Deticio
Bachelor of Science in Information Technology 3-3
Sorsogon State University

### 18. License

This project is developed for academic and educational purposes.
