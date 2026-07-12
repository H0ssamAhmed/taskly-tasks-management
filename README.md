# Overview

## 📌 Introduction

This project is a **modern Project Management System** designed to help teams organize, track, and collaborate on work efficiently. It provides a structured workflow using **Projects → Epics → Tasks**.

---

## 🎯 Objective

To build a scalable and user-friendly platform where teams can:

- Manage multiple projects
- Break down work into epics and tasks
- Assign responsibilities
- Track progress visually (board view)
- Collaborate with team members

---

## 🧩 Core Features

### 🔐 Authentication

- User signup & login
- Secure session handling
- Forgot password & reset flow

---

### 📁 Project Management

- Create, edit, and list projects
- Each project contains:
  - Title
  - Description
  - Members

---

### 👥 Team Collaboration

- Invite members via email
- Token-based invitation system
- Auto-join after accepting invitation
- Role-based membership (extensible)

---

### 🧱 Epics Management

- Create and manage epics per project
- Assign users to epics
- Add deadlines

---

### ✅ Task Management

- Create tasks inside epics or directly under project
- Assign users
- Set due dates
- Track task status

### Task Status Workflow:

- TO_DO
- IN_PROGRESS
- BLOCKED
- IN_REVIEW
- READY_FOR_QA
- REOPENED
- READY_FOR_PRODUCTION
- DONE

---

### 📊 Board View

- Tasks displayed by status
- Drag & drop between columns
- Quick task creation per status

---

### 🔍 Search & Filtering

- Search tasks by:
  - Title
  - Task ID
- Filter by project or status

---

### 📄 Detailed Views

- Epic details popup
- Task creation & editing pages
- Project members page
