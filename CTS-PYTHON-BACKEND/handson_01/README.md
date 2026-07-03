# Hands-On 1: Web Framework Foundations & Django Project Setup

## Overview

This hands-on exercise covers the foundational concepts of web frameworks and sets up a Django project for the **Course Management API**. It consists of two tasks:

| Task | Title | Description |
|------|-------|-------------|
| **Task 1** | Understand the Request-Response Cycle | Conceptual annotations in `notes.py` covering the request lifecycle, middleware, WSGI vs ASGI, and MVC vs MVT |
| **Task 2** | Scaffold and Explore the Django Project | Create a Django project & app, register it, create a view, and set up URL routing |

---

## Project Structure

```
handson_01/
├── coursemanager/              # Django project configuration
│   ├── __init__.py
│   ├── settings.py            # Central configuration (database, apps, middleware, etc.)
│   ├── urls.py                # Main URL router — delegates /api/ to courses app
│   ├── wsgi.py                # WSGI entry point (synchronous server interface)
│   └── asgi.py                # ASGI entry point (asynchronous server interface)
├── courses/                   # Django app for course management
│   ├── __init__.py
│   ├── admin.py               # Admin site registration
│   ├── apps.py                # App configuration
│   ├── models.py              # Database models (to be expanded in later hands-ons)
│   ├── views.py               # View functions — contains hello_view
│   ├── urls.py                # App-level URL patterns
│   ├── tests.py               # Unit tests
│   └── migrations/            # Database migration files
├── notes.py                   # Task 1 — Conceptual notes & annotations
├── manage.py                  # Django CLI utility for management commands
├── requirements.txt           # Python package dependencies
└── README.md                  # This file
```

---

## How It Works

### Task 1 — `notes.py`

The `notes.py` file contains **detailed comments** (not executable logic) explaining:

1. **Request-Response Cycle**: Step-by-step journey of a `GET /api/courses/` request through Django — from the client through middleware, URL router, view, model (ORM), and back.
2. **Middleware**: Where middleware sits in the cycle, plus descriptions of two built-in classes:
   - `SecurityMiddleware` — Adds HSTS headers, enforces HTTPS, prevents MIME sniffing.
   - `SessionMiddleware` — Manages user sessions across stateless HTTP requests.
3. **WSGI vs ASGI**: Differences between synchronous (WSGI) and asynchronous (ASGI) interfaces, Django's default (WSGI), and when to switch to ASGI (WebSockets, async views, real-time features).
4. **MVC vs MVT**: Maps the traditional MVC pattern to Django's MVT — Model=Model, View=Controller, Template=View.

### Task 2 — Django Project & App

- **Django Project** (`coursemanager/`): The overall configuration container — settings, URL routing, and server interfaces.
- **Django App** (`courses/`): A self-contained module with its own models, views, and URLs. One project can contain many apps.
- **`hello_view`**: A function-based view that returns `HttpResponse('Course Management API is running')`.
- **URL Routing**: Main `urls.py` uses `include()` to delegate `/api/` routes to `courses/urls.py`, which maps `/api/hello/` to `hello_view`.

---

## Prerequisites

- **Python 3.10+** installed and available on PATH
- **pip** (Python package manager)

---

## How to Execute / Run the Demonstration

### Step 1: Install Dependencies

```bash
cd handson_01
pip install -r requirements.txt
```

### Step 2: Run Task 1 — View Conceptual Notes

```bash
python notes.py
```

This prints a summary of the topics covered. Open `notes.py` in your editor to read the full annotations.

### Step 3: Run Database Migrations (optional but recommended)

```bash
python manage.py migrate
```

This creates the default SQLite database and applies Django's built-in migrations.

### Step 4: Start the Django Development Server

```bash
python manage.py runserver
```

The server will start at `http://127.0.0.1:8000/`.

### Step 5: Verify the Endpoint

Open your browser or use `curl` / Postman to visit:

```
http://127.0.0.1:8000/api/hello/
```

**Expected Response:**

```
Course Management API is running
```

### Step 6: Stop the Server

Press `Ctrl + C` in the terminal to stop the development server.

---

## Verification Checklist

| # | Check | Expected Result |
|---|-------|-----------------|
| 1 | `python notes.py` runs without errors | Prints summary of covered topics |
| 2 | `courses` is listed in `INSTALLED_APPS` in `settings.py` | ✅ Present |
| 3 | `python manage.py runserver` starts without errors | Server runs on port 8000 |
| 4 | `GET /api/hello/` returns 200 | Body: `Course Management API is running` |
| 5 | Each config file has a one-line role comment | `settings.py`, `urls.py`, `wsgi.py`, `asgi.py` |

---

## Key Concepts Learned

- What a **web framework** does and how the **request-response cycle** works
- The role of **middleware** in Django's architecture
- Difference between **WSGI** (synchronous) and **ASGI** (asynchronous)
- **MVC** pattern and how it maps to Django's **MVT**
- Difference between a Django **project** and a Django **app**
- How Django's **URL routing** works with `path()` and `include()`
- Creating **function-based views** and returning `HttpResponse`
