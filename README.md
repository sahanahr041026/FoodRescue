# 🍲 FoodRescue — Full-Stack Surplus Food Redistribution Platform

> A real-world, portfolio-quality platform connecting businesses with surplus edible food to local NGOs and community organizations for timely redistribution.

---

## 📌 Problem Statement

Every day, restaurants, bakeries, hostels, college canteens, and event organizers dispose of wholesome, edible food simply because they lack a streamlined channel to alert nearby charitable organizations before the food expires. Meanwhile, community food banks and NGOs constantly look for food supplies to support underserved communities.

**FoodRescue** bridges this gap through a clean, verifiable 5-step lifecycle:
$$\text{Post Surplus Food} \longrightarrow \text{Discover Nearby} \longrightarrow \text{Request Pickup} \longrightarrow \text{Confirm Handover} \longrightarrow \text{Track Completed Donations}$$

> ⚠️ **Food Safety & Responsibility Notice**: FoodRescue is an educational platform facilitating communication. Food providers are responsible for supplying safe and suitable food in accordance with applicable local health regulations.

---

## 🏗️ Architecture & Technology Stack

```
[ Frontend (React + Vite) ]  <--- HTTP / REST (JSON) --->  [ Backend (FastAPI) ]  <--->  [ PostgreSQL DB ]
   Port: 5173 (Dev)                                            Port: 8000 (Uvicorn)           Port: 5432
```

- **Frontend**: React 18, Vite, JavaScript, React Router, CSS3 (Modern Flexbox/Grid).
- **Backend**: Python 3.13, FastAPI, Pydantic v2, Uvicorn, Python-Jose (JWT), Passlib (Bcrypt).
- **Database**: PostgreSQL with SQLAlchemy 2.0 ORM.
- **Mapping / Geolocation**: External Geocoding & Distance API (pluggable abstraction).
- **Version Control**: Git & GitHub.

---

## 👥 User Roles

1. **Food Provider**: Restaurants, bakeries, canteens, hostels, caterers. Can list surplus items, set pickup windows, review pickup requests, accept/reject, and mark handovers complete.
2. **NGO / Receiver**: Food banks, shelters, volunteer groups. Can discover active listings nearby, filter by category/distance, request pickups, and confirm collections.
3. **Admin**: Platform moderator. Can monitor users, listings, requests, and remove inappropriate content.

---

## 📂 Project Structure

```text
foodrescue/
├── .gitignore              # Ignores venv, node_modules, .env, secrets
├── .env.example            # Environment variables blueprint
├── README.md               # Project documentation
├── backend/
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py         # FastAPI application entrypoint & healthcheck
│   │   ├── database.py     # SQLAlchemy DB connection setup (Phase 4)
│   │   ├── models/         # SQLAlchemy DB tables (Phase 4)
│   │   ├── schemas/        # Pydantic validation schemas (Phase 5+)
│   │   ├── routers/        # API route handlers (Phase 5+)
│   │   ├── services/       # Business logic layer
│   │   ├── auth/           # JWT & password hashing (Phase 6)
│   │   └── utils/          # Helpers & geocoding adapters
│   ├── requirements.txt    # Python backend dependencies
│   └── .env.example        # Backend-specific environment variables
└── frontend/
    ├── package.json        # Frontend dependencies & scripts
    ├── vite.config.js      # Vite build & proxy configuration
    ├── index.html          # HTML5 application shell
    ├── .env.example        # Frontend-specific environment variables
    └── src/
        ├── App.jsx         # Main UI component & health monitor
        ├── App.css         # Main application styles
        ├── index.css       # Global styles & responsive theme
        ├── main.jsx        # React root mounter
        ├── components/     # Reusable UI components (Phase 2+)
        ├── pages/          # Route page views (Phase 2+)
        ├── services/       # API call handlers (fetch/axios)
        ├── hooks/          # Custom React hooks
        └── context/        # Auth & global state context (Phase 5+)
```

---

## 🚀 Quickstart: Running Locally

### 1. Prerequisites
- **Python 3.10+** (with `pip`)
- **Node.js 18+** (with `npm`)
- **Git**

### 2. Backend Setup
```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows (PowerShell):
.\venv\Scripts\Activate.ps1
# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run the FastAPI server
uvicorn app.main:app --reload --port 8000
```
- Interactive Swagger API docs: [http://localhost:8000/docs](http://localhost:8000/docs)
- Health check: [http://localhost:8000/api/health](http://localhost:8000/api/health)

### 3. Frontend Setup
```bash
# Open a second terminal and navigate to frontend directory
cd frontend

# Install Node packages
npm install

# Run the Vite development server
npm run dev
```
- Open your browser at: [http://localhost:5173](http://localhost:5173)

---

## 🗺️ Roadmap: Incremental Development Phases

- [x] **Phase 1**: Project Setup, Git Architecture, FastAPI Healthcheck & React Homepage
- [x] **Phase 2**: React Frontend Structure & Routing
- [ ] **Phase 3**: FastAPI Backend Core Setup
- [ ] **Phase 4**: PostgreSQL Database & SQLAlchemy Models
- [ ] **Phase 5**: User Registration & Login
- [ ] **Phase 6**: JWT Authentication & Security
- [ ] **Phase 7**: Role-Based Access Control (Provider, NGO, Admin)
- [ ] **Phase 8**: Food Listing CRUD API & UI
- [ ] **Phase 9**: NGO Search, Filtering & Discovery
- [ ] **Phase 10**: Pickup Request & Handover Workflow
- [ ] **Phase 11**: Location & Map Integration
- [ ] **Phase 12**: Role-Specific Dashboards
- [ ] **Phase 13**: Error Handling & Edge Cases
- [ ] **Phase 14**: Automated Testing
- [ ] **Phase 15**: Documentation & Polish
- [ ] **Phase 16**: Cloud Deployment
- [ ] **Phase 17**: Portfolio & Presentation Preparation
