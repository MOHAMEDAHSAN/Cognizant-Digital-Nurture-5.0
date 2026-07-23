# Cognizant Digital Nurture 5.0 - Training Repository

Comprehensive full-stack development training covering Frontend, Python Backend, Database Integration, and Selenium Automation Testing.

## 📚 Quick Links
- [Frontend](#frontend-development) | [Backend](#backend-development) | [Database](#database-management) | [Testing](#selenium-testing)

## 📁 Repository Structure

```
├── CTS-FRONTEND/              # React + TypeScript + Vite
│   ├── handson_01/           # React project setup
│   └── Live tests/           # Live testing
├── CTS-PYTHON-BACKEND/        # Django, Flask, FastAPI
│   ├── handson_01-03/        # Django fundamentals → REST Framework
│   ├── handson_04-05/        # Flask basics → advanced
│   ├── handson_06-09/        # FastAPI → authentication
│   └── handson_10/           # Microservices architecture
├── CTS-SQL-DATABASE/          # SQL & NoSQL training
│   ├── hands_on_1-3/         # SQL fundamentals
│   ├── hands_on_4/           # Query optimization (N+1 problem)
│   ├── hands_on_5/           # MongoDB queries
│   ├── hands_on_6/           # SQLAlchemy ORM
│   └── hands_on_7/           # Alembic migrations
└── CTS-SELENIUM/              # Web automation testing
```

## 🚀 Quick Start

### Prerequisites
- **Node.js** v16+
- **Python** v3.8+
- **MySQL** & **MongoDB**
- **Git**

### Clone & Setup
```bash
git clone https://github.com/MOHAMEDAHSAN/Cognizant-Digital-Nurture-5.0.git
cd Cognizant-Digital-Nurture-5.0
```

### Frontend Development
```bash
cd CTS-FRONTEND/handson_01
npm install && npm run dev
```

### Python Backend
```bash
cd CTS-PYTHON-BACKEND/handson_06  # Example: FastAPI

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install and run
pip install -r requirements.txt
python main.py
```

### Database Setup
```bash
# MySQL
mysql -u root -p < CTS-SQL-DATABASE/hands_on_1/hands_on_1.sql

# MongoDB
mongoimport --jsonArray --db college_db --collection courses --file data.json
```

### Selenium Testing
```bash
cd CTS-SELENIUM
pip install selenium
# Download ChromeDriver and place in project root
```

## 🎓 Learning Modules

### Frontend Development
- React fundamentals & TypeScript
- Component-based architecture
- State management (Redux)
- Vite build tool
- API integration

### Backend Development
**Django** (handson_01-03): Models, Views, REST Framework  
**Flask** (handson_04-05): Routing, Templates, Extensions  
**FastAPI** (handson_06-09): Endpoints, SQLAlchemy, JWT Authentication  
**Microservices** (handson_10): Service architecture, API Gateway

### Database Management
- SQL query optimization
- NoSQL with MongoDB
- ORM patterns with SQLAlchemy
- Database migrations with Alembic
- **Key focus:** N+1 query problem (hands_on_4)

### Selenium Testing
- WebDriver setup & element locators
- User interactions & waits
- Test frameworks & CI/CD integration

## 🛠️ Tech Stack

| Layer | Technologies |
|-------|---|
| **Frontend** | React, TypeScript, Vite |
| **Backend** | Django, FastAPI, Flask |
| **Database** | MySQL, MongoDB, SQLAlchemy |
| **Testing** | Selenium, pytest |
| **Runtime** | Node.js 16+, Python 3.8+ |

Happy Learning! 🚀
