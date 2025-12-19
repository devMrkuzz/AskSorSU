-- ============================================
-- AskSorSU Database Schema (SQL Representation)
-- ============================================

-- 1. Create Database
CREATE DATABASE asksorsu_db;
USE asksorsu_db;

-- ============================================
-- 2. Users Table
-- Stores registered users (Email / Google OAuth)
-- ============================================
CREATE TABLE users (
    user_id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    auth_provider VARCHAR(50) NOT NULL, -- email | google
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- 3. Knowledge Base Table
-- Core "AI brain" of AskSorSU
-- ============================================
CREATE TABLE knowledge_base (
    knowledge_id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    category VARCHAR(100) NOT NULL,     
    audience VARCHAR(100) NOT NULL,       
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    keywords TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- 4. Chat History Table
-- Stores user interactions with AskSorSU
-- ============================================
CREATE TABLE chat_history (
    chat_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id VARCHAR(36),
    user_question TEXT NOT NULL,
    ai_response TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

-- ============================================
-- 5. Indexes (For Fast Searching)
-- ============================================
CREATE FULLTEXT INDEX idx_knowledge_title
ON knowledge_base(title);

CREATE FULLTEXT INDEX idx_knowledge_question
ON knowledge_base(question);

CREATE FULLTEXT INDEX idx_knowledge_keywords
ON knowledge_base(keywords);

-- ============================================
-- 6. Sample Data Insertion (Knowledge Base)
-- ============================================
INSERT INTO knowledge_base
(title, category, audience, question, answer, keywords)
VALUES
(
  'Enrollment 2026',
  'Admission',
  'Student, Applicant',
  'When is enrollment for 2026?',
  'The enrollment period for School Year 2026 starts on February 26, 2026.',
  'enrollment, registration, 2026, admission, schedule'
),
(
  'Entrance Exam 2026',
  'Admission',
  'Applicant, Student',
  'When is the entrance exam for 2026?',
  'The entrance examination for incoming students will be held from January 15 to January 30, 2026.',
  'exam, entrance, admission, 2026'
);

-- ============================================
-- 7. Query Used by AskSorSU (Answer Retrieval)
-- ============================================
SELECT *
FROM knowledge_base
WHERE
    MATCH(keywords) AGAINST ('enrollment 2026' IN NATURAL LANGUAGE MODE)
 OR MATCH(question) AGAINST ('enrollment 2026' IN NATURAL LANGUAGE MODE)
 OR MATCH(title) AGAINST ('enrollment 2026' IN NATURAL LANGUAGE MODE)
LIMIT 1;

-- ============================================
-- 8. Save Chat Interaction
-- ============================================
INSERT INTO chat_history (user_id, user_question, ai_response)
VALUES
(
  'user-uuid-123',
  'When is enrollment for 2026?',
  'The enrollment period for School Year 2026 starts on February 26, 2026.'
);
