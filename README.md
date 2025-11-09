# 🏥 CMED Health LTD

A modern, full-stack management application for managing patient prescriptions, drug interactions, and medical reports.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Screenshots](#screenshots)
- [Contributing](#contributing)
- [License](#license)

## 🎯 Overview

CMED Health LTD is a comprehensive web application designed to streamline clinic operations. It provides healthcare professionals with tools to manage patient prescriptions, check drug interactions, generate reports, and maintain patient records efficiently.

## ✨ Features

### 👨‍⚕️ User Management
- Secure user registration and authentication
- JWT-based session management
- Role-based access control
- User profile management

### 💊 Prescription Management
- Create, read, update, and delete prescriptions
- Detailed patient information tracking
- Medication dosage and frequency management
- Next visit scheduling
- Search and filter prescriptions by date range and patient name

### 🔬 Drug Interaction Checker
- Real-time drug interaction detection
- Comprehensive drug information database
- Interaction severity levels (Minor, Moderate, Major)
- Detailed interaction descriptions and recommendations

### 📊 Reports & Analytics
- Prescription statistics dashboard
- Monthly prescription trends
- Most prescribed medications analysis
- Patient demographics visualization
- Interactive charts and graphs

### 🎨 User Interface
- Modern, responsive design
- Mobile-friendly interface
- Intuitive navigation
- Real-time data updates
- Loading states and error handling

## 🛠 Technology Stack

### Frontend
- **Framework:** React 18
- **Routing:** React Router v6
- **Styling:** Tailwind CSS
- **Build Tool:** Vite
- **HTTP Client:** Axios
- **Charts:** Recharts
- **Date Handling:** date-fns

### Backend
- **Framework:** Spring Boot 3.x
- **Language:** Java 17+
- **Security:** Spring Security with JWT
- **Database:** H2 (development) / PostgreSQL (production)
- **ORM:** Spring Data JPA
- **Build Tool:** Maven
- **API Documentation:** REST API

### Development Tools
- **Version Control:** Git
- **Package Manager:** npm (frontend), Maven (backend)
- **Code Quality:** ESLint (frontend)

## 📁 Project Structure

```
cmed-health/
├── frontend/                 # React frontend application
│   ├── src/
│   │   ├── assets/          # Images, logos, static files
│   │   ├── components/      # Reusable React components
│   │   ├── context/         # React Context for state management
│   │   ├── pages/           # Page components
│   │   ├── services/        # API service layer
│   │   └── utils/           # Utility functions
│   ├── public/              # Public static files
│   └── package.json         # Frontend dependencies
│
├── backend/                 # Spring Boot backend application
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/main/utin/
│   │   │   │   ├── config/        # Configuration classes
│   │   │   │   ├── controller/    # REST controllers
│   │   │   │   ├── dto/           # Data Transfer Objects
│   │   │   │   ├── entity/        # JPA entities
│   │   │   │   ├── exception/     # Exception handlers
│   │   │   │   ├── repository/    # Data repositories
│   │   │   │   ├── security/      # Security configuration
│   │   │   │   └── service/       # Business logic
│   │   │   └── resources/
│   │   │       └── application.properties
│   │   └── test/            # Test files
│   └── pom.xml             # Backend dependencies
│
├── start.sh                # Quick start script
├── stop.sh                 # Stop all services
└── README.md              # This file
```

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **npm** (v9 or higher) - Comes with Node.js
- **Java** (JDK 17 or higher) - [Download](https://www.oracle.com/java/technologies/downloads/)
- **Maven** (v3.8 or higher) - [Download](https://maven.apache.org/download.cgi)
- **Git** - [Download](https://git-scm.com/downloads)

### Verify Installation

```bash
node --version    # Should show v18+
npm --version     # Should show v9+
java --version    # Should show 17+
mvn --version     # Should show 3.8+
```

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd cmed-health
```

### 2. Backend Setup

```bash
cd backend
mvn clean install
```

This will:
- Download all required dependencies
- Compile the Java code
- Run tests
- Package the application

### 3. Frontend Setup

```bash
cd frontend
npm install
```

This will:
- Download all npm dependencies
- Set up the development environment

## 🎮 Running the Application

### Option 1: Quick Start (Recommended)

Use the provided start script to launch both frontend and backend:

```bash
chmod +x start.sh
./start.sh
```

This will:
- Start the backend on `http://localhost:8089`
- Start the frontend on `http://localhost:3000`
- Open your browser automatically

### Option 2: Manual Start

#### Start Backend

```bash
cd backend
mvn spring-boot:run
```

The backend will be available at: `http://localhost:8089`

#### Start Frontend

```bash
cd frontend
npm run dev
```

The frontend will be available at: `http://localhost:3000`

### Stopping the Application

To stop all services:

```bash
./stop.sh
```

Or manually press `Ctrl+C` in each terminal.

## 🔐 Default Credentials

### Test User Account

After the application starts, you can register a new account or use these test credentials (if available):

```
Username: admin
Password: admin123
```

**Note:** For production, ensure to change default credentials and implement proper security measures.

## 🌐 API Documentation

### Base URL

```
http://localhost:8089/api/v1
```

### Authentication Endpoints

#### Register User
```http
POST /api/v1/auth/register
Content-Type: application/json

{
  "username": "string",
  "password": "string",
  "fullName": "string",
  "email": "string",
  "specialty": "string",
  "licenseNumber": "string"
}
```

#### Login
```http
POST /api/v1/auth/login
Content-Type: application/json

{
  "username": "string",
  "password": "string"
}

Response:
{
  "token": "jwt-token",
  "user": { ... }
}
```

### Prescription Endpoints

#### Get All Prescriptions
```http
GET /api/v1/prescriptions?startDate=YYYY-MM-DD&endDate=YYYY-MM-DD
Authorization: Bearer {token}
```

#### Create Prescription
```http
POST /api/v1/prescriptions
Authorization: Bearer {token}
Content-Type: application/json

{
  "patientName": "string",
  "patientAge": number,
  "patientGender": "string",
  "diagnosis": "string",
  "medications": [...],
  "prescriptionDate": "YYYY-MM-DD",
  "nextVisitDate": "YYYY-MM-DD"
}
```

#### Update Prescription
```http
PUT /api/v1/prescriptions/{id}
Authorization: Bearer {token}
```

#### Delete Prescription
```http
DELETE /api/v1/prescriptions/{id}
Authorization: Bearer {token}
```

### Drug Interaction Endpoints

#### Check Drug Interactions
```http
POST /api/v1/drug-interactions/check
Authorization: Bearer {token}
Content-Type: application/json

{
  "drugNames": ["Drug1", "Drug2", ...]
}
```

#### Get Drug Information
```http
GET /api/v1/drug-interactions/drug/{drugName}
Authorization: Bearer {token}
```

## 📱 Application Features

### Dashboard
- Overview of prescription statistics
- Today's prescriptions count
- Monthly prescription trends
- Recent prescriptions list
- Quick action buttons

### Prescription Management
- Create new prescriptions with patient details
- Edit existing prescriptions
- Delete prescriptions with confirmation
- Search by patient name or diagnosis
- Filter by date range
- View detailed prescription information

### Drug Information
- Search for drug information
- Check interactions between multiple drugs
- View interaction severity and descriptions
- Get recommendations for drug combinations

### Reports
- Visual analytics with charts
- Prescription trends over time
- Most prescribed medications
- Gender distribution analysis
- Monthly statistics

## 🔧 Configuration

### Backend Configuration

Edit `backend/src/main/resources/application.properties`:

```properties
# Server Port
server.port=8089

# Database Configuration
spring.datasource.url=jdbc:h2:mem:cmeddb
spring.datasource.driverClassName=org.h2.Driver

# JWT Configuration
jwt.secret=your-secret-key
jwt.expiration=86400000

# CORS Configuration
cors.allowed.origins=http://localhost:3000
```

### Frontend Configuration

Edit `frontend/src/services/api.js`:

```javascript
const API_URL = 'http://localhost:8089/api/v1';
```

## 🧪 Testing

### Backend Tests

```bash
cd backend
mvn test
```

### Frontend Tests

```bash
cd frontend
npm test
```

## 🐛 Troubleshooting

### Port Already in Use

If port 8089 or 3000 is already in use:

**Backend:**
```bash
# Change port in application.properties
server.port=8090
```

**Frontend:**
```bash
# Change port in vite.config.js
server: { port: 3001 }
```

### Database Connection Issues

- Verify H2 database configuration
- Check `application.properties` for correct database settings
- Ensure database file permissions

### CORS Issues

- Verify frontend URL in backend CORS configuration
- Check `SecurityConfig.java` for proper CORS setup

### Build Failures

**Backend:**
```bash
mvn clean install -U
```

**Frontend:**
```bash
rm -rf node_modules package-lock.json
npm install
```

## 📚 Additional Resources

- [Spring Boot Documentation](https://spring.io/projects/spring-boot)
- [React Documentation](https://react.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [Vite Documentation](https://vitejs.dev/)

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Authors

- Your Name - Initial work

## 🙏 Acknowledgments

- Thanks to all contributors
- Inspired by modern clinic management needs
- Built with open-source technologies

---

**For detailed frontend documentation, see:** [Frontend README](./frontend/README.md)

**For detailed backend documentation, see:** [Backend README](./backend/README.md)

