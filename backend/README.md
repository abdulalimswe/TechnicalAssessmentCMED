# 🏥 CMED Health LTD - Backend

Spring Boot backend REST API for CMED Health LTD.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Database Schema](#database-schema)
- [Security](#security)
- [Testing](#testing)
- [Troubleshooting](#troubleshooting)

## 🎯 Overview

The backend is a RESTful API built with Spring Boot that handles all business logic, data persistence, and security for CMED Health LTD. It provides secure endpoints for user authentication, prescription management, drug interactions, and reporting.

## ✨ Features

- **RESTful API:** Clean, well-structured REST endpoints
- **JWT Authentication:** Secure token-based authentication
- **Spring Security:** Comprehensive security configuration
- **JPA/Hibernate:** Object-relational mapping
- **H2 Database:** In-memory database for development
- **Exception Handling:** Global exception handling with meaningful responses
- **CORS Support:** Configured for frontend integration
- **DTO Pattern:** Data Transfer Objects for clean API contracts
- **Service Layer:** Separation of concerns with business logic
- **Repository Pattern:** Data access abstraction

## 🛠 Technology Stack

### Core Framework
- **Spring Boot** 3.x - Application framework
- **Spring Web** - REST API support
- **Spring Data JPA** - Data persistence
- **Spring Security** - Authentication and authorization
- **Hibernate** - ORM implementation

### Security
- **JWT (JSON Web Tokens)** - Token-based authentication
- **BCrypt** - Password encryption

### Database
- **H2 Database** - In-memory database (development)
- **PostgreSQL** - Production database support

### Build & Development
- **Maven** - Build tool and dependency management
- **Lombok** - Reduce boilerplate code
- **Java 17+** - Programming language

### Additional Libraries
- **Jackson** - JSON serialization/deserialization
- **Validation API** - Request validation

## 📁 Project Structure

```
backend/
├── src/
│   ├── main/
│   │   ├── java/com/main/utin/
│   │   │   ├── UtinApplication.java        # Main application class
│   │   │   │
│   │   │   ├── config/                     # Configuration classes
│   │   │   │   ├── CorsConfig.java        # CORS configuration
│   │   │   │   └── WebConfig.java         # Web configuration
│   │   │   │
│   │   │   ├── controller/                 # REST Controllers
│   │   │   │   ├── AuthController.java    # Authentication endpoints
│   │   │   │   ├── DrugInteractionController.java
│   │   │   │   └── PrescriptionController.java
│   │   │   │
│   │   │   ├── dto/                        # Data Transfer Objects
│   │   │   │   ├── LoginRequest.java      # Login request DTO
│   │   │   │   ├── LoginResponse.java     # Login response DTO
│   │   │   │   ├── RegisterRequest.java   # Registration request DTO
│   │   │   │   ├── PrescriptionDTO.java   # Prescription DTO
│   │   │   │   ├── MedicationDTO.java     # Medication DTO
│   │   │   │   └── DrugInteractionDTO.java
│   │   │   │
│   │   │   ├── entity/                     # JPA Entities
│   │   │   │   ├── User.java              # User entity
│   │   │   │   ├── Prescription.java      # Prescription entity
│   │   │   │   ├── Medication.java        # Medication entity
│   │   │   │   └── DrugInteraction.java   # Drug interaction entity
│   │   │   │
│   │   │   ├── exception/                  # Exception handling
│   │   │   │   ├── GlobalExceptionHandler.java
│   │   │   │   ├── ResourceNotFoundException.java
│   │   │   │   └── UnauthorizedException.java
│   │   │   │
│   │   │   ├── repository/                 # Data repositories
│   │   │   │   ├── UserRepository.java
│   │   │   │   ├── PrescriptionRepository.java
│   │   │   │   ├── MedicationRepository.java
│   │   │   │   └── DrugInteractionRepository.java
│   │   │   │
│   │   │   ├── security/                   # Security configuration
│   │   │   │   ├── JwtAuthenticationFilter.java
│   │   │   │   ├── JwtTokenProvider.java  # JWT token generation/validation
│   │   │   │   ├── SecurityConfig.java    # Spring Security config
│   │   │   │   └── UserDetailsServiceImpl.java
│   │   │   │
│   │   │   └── service/                    # Business logic
│   │   │       ├── UserService.java
│   │   │       ├── PrescriptionService.java
│   │   │       ├── DrugInteractionService.java
│   │   │       └── impl/                   # Service implementations
│   │   │           ├── UserServiceImpl.java
│   │   │           ├── PrescriptionServiceImpl.java
│   │   │           └── DrugInteractionServiceImpl.java
│   │   │
│   │   └── resources/
│   │       ├── application.properties      # Application configuration
│   │       ├── application-dev.properties  # Development config
│   │       ├── application-prod.properties # Production config
│   │       └── data.sql                    # Initial data (optional)
│   │
│   └── test/
│       └── java/com/main/utin/
│           ├── UtinApplicationTests.java   # Application tests
│           ├── controller/                 # Controller tests
│           ├── service/                    # Service tests
│           └── repository/                 # Repository tests
│
├── target/                                  # Build output
├── pom.xml                                  # Maven configuration
└── README.md                               # This file
```

## 🚀 Installation

### Prerequisites

- **Java JDK** 17 or higher
- **Maven** 3.8 or higher
- **Git** for version control

### Clone and Build

```bash
# Clone the repository
git clone <repository-url>
cd backend

# Clean and install dependencies
mvn clean install

# Skip tests for faster build
mvn clean install -DskipTests
```

## ⚙️ Configuration

### Application Properties

The main configuration file is `src/main/resources/application.properties`:

```properties
# Application Name
spring.application.name=clinic-management-backend

# Server Configuration
server.port=8089
server.servlet.context-path=/

# Database Configuration (H2 - Development)
spring.datasource.url=jdbc:h2:mem:cmeddb
spring.datasource.driverClassName=org.h2.Driver
spring.datasource.username=sa
spring.datasource.password=

# H2 Console (Development Only)
spring.h2.console.enabled=true
spring.h2.console.path=/h2-console

# JPA/Hibernate Configuration
spring.jpa.database-platform=org.hibernate.dialect.H2Dialect
spring.jpa.hibernate.ddl-auto=create-drop
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true

# JWT Configuration
jwt.secret=YourSecretKeyHere-ChangeThisInProduction-MustBeLongEnough
jwt.expiration=86400000
# 86400000 ms = 24 hours

# CORS Configuration
cors.allowed.origins=http://localhost:3000
cors.allowed.methods=GET,POST,PUT,DELETE,OPTIONS
cors.allowed.headers=*
cors.allow.credentials=true

# Logging Configuration
logging.level.root=INFO
logging.level.com.main.utin=DEBUG
logging.level.org.springframework.security=DEBUG
```

### Environment-Specific Configuration

#### Development (`application-dev.properties`)

```properties
# Development specific settings
spring.jpa.show-sql=true
logging.level.org.springframework.web=DEBUG
```

#### Production (`application-prod.properties`)

```properties
# Production Database (PostgreSQL example)
spring.datasource.url=jdbc:postgresql://localhost:5432/cmeddb
spring.datasource.username=${DB_USERNAME}
spring.datasource.password=${DB_PASSWORD}
spring.jpa.hibernate.ddl-auto=validate

# Security
spring.h2.console.enabled=false
logging.level.root=WARN
```

### Environment Variables

For production, use environment variables:

```bash
export DB_USERNAME=your_db_user
export DB_PASSWORD=your_db_password
export JWT_SECRET=your_super_secret_key_here
export CORS_ALLOWED_ORIGINS=https://yourdomain.com
```

## 🎮 Running the Application

### Development Mode

```bash
# Run with Maven
mvn spring-boot:run

# Run with specific profile
mvn spring-boot:run -Dspring-boot.run.profiles=dev

# Run built JAR
java -jar target/utin-0.0.1-SNAPSHOT.jar
```

The application will start on `http://localhost:8089`

### Production Mode

```bash
# Build production JAR
mvn clean package -Pprod

# Run with production profile
java -jar target/utin-0.0.1-SNAPSHOT.jar --spring.profiles.active=prod
```

### H2 Console Access

During development, access the H2 database console:

```
URL: http://localhost:8089/h2-console
JDBC URL: jdbc:h2:mem:cmeddb
Username: sa
Password: (leave empty)
```

## 📡 API Documentation

### Base URL

```
http://localhost:8089/api/v1
```

### Authentication Endpoints

#### Register User

```http
POST /api/v1/auth/register
Content-Type: application/json

Request Body:
{
  "username": "doctor1",
  "password": "securePassword123",
  "fullName": "Dr. John Smith",
  "email": "john.smith@cmedhealth.com",
  "specialty": "General Practice",
  "licenseNumber": "MED-12345"
}

Response: 200 OK
{
  "id": 1,
  "username": "doctor1",
  "fullName": "Dr. John Smith",
  "email": "john.smith@cmedhealth.com",
  "specialty": "General Practice",
  "licenseNumber": "MED-12345"
}
```

#### Login

```http
POST /api/v1/auth/login
Content-Type: application/json

Request Body:
{
  "username": "doctor1",
  "password": "securePassword123"
}

Response: 200 OK
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "username": "doctor1",
    "fullName": "Dr. John Smith",
    "email": "john.smith@cmedhealth.com",
    "specialty": "General Practice"
  }
}
```

### Prescription Endpoints

All prescription endpoints require authentication (JWT token in Authorization header).

#### Get All Prescriptions

```http
GET /api/v1/prescriptions?startDate=2024-01-01&endDate=2024-12-31
Authorization: Bearer {jwt-token}

Response: 200 OK
[
  {
    "id": 1,
    "patientName": "Jane Doe",
    "patientAge": 35,
    "patientGender": "Female",
    "diagnosis": "Common Cold",
    "prescriptionDate": "2024-11-09",
    "nextVisitDate": "2024-11-16",
    "medications": [
      {
        "id": 1,
        "drugName": "Paracetamol",
        "dosage": "500mg",
        "frequency": "3 times daily",
        "duration": "5 days"
      }
    ],
    "doctorName": "Dr. John Smith",
    "createdAt": "2024-11-09T10:30:00"
  }
]
```

#### Get Prescription by ID

```http
GET /api/v1/prescriptions/{id}
Authorization: Bearer {jwt-token}

Response: 200 OK
{prescription-object}
```

#### Create Prescription

```http
POST /api/v1/prescriptions
Authorization: Bearer {jwt-token}
Content-Type: application/json

Request Body:
{
  "patientName": "Jane Doe",
  "patientAge": 35,
  "patientGender": "Female",
  "diagnosis": "Common Cold",
  "prescriptionDate": "2024-11-09",
  "nextVisitDate": "2024-11-16",
  "medications": [
    {
      "drugName": "Paracetamol",
      "dosage": "500mg",
      "frequency": "3 times daily",
      "duration": "5 days"
    }
  ]
}

Response: 201 Created
{prescription-object}
```

#### Update Prescription

```http
PUT /api/v1/prescriptions/{id}
Authorization: Bearer {jwt-token}
Content-Type: application/json

Request Body: {same as create}

Response: 200 OK
{updated-prescription-object}
```

#### Delete Prescription

```http
DELETE /api/v1/prescriptions/{id}
Authorization: Bearer {jwt-token}

Response: 204 No Content
```

### Drug Interaction Endpoints

#### Check Drug Interactions

```http
POST /api/v1/drug-interactions/check
Authorization: Bearer {jwt-token}
Content-Type: application/json

Request Body:
{
  "drugNames": ["Aspirin", "Warfarin", "Ibuprofen"]
}

Response: 200 OK
[
  {
    "drug1": "Aspirin",
    "drug2": "Warfarin",
    "severity": "Major",
    "description": "Increased risk of bleeding",
    "recommendation": "Avoid combination if possible"
  }
]
```

#### Get Drug Information

```http
GET /api/v1/drug-interactions/drug/{drugName}
Authorization: Bearer {jwt-token}

Response: 200 OK
{
  "name": "Aspirin",
  "description": "Non-steroidal anti-inflammatory drug",
  "sideEffects": ["Stomach upset", "Bleeding"],
  "contraindications": ["Peptic ulcer", "Hemophilia"]
}
```

#### Get All Drugs

```http
GET /api/v1/drug-interactions/drugs
Authorization: Bearer {jwt-token}

Response: 200 OK
[
  {
    "name": "Aspirin",
    "category": "NSAID"
  },
  {
    "name": "Paracetamol",
    "category": "Analgesic"
  }
]
```

### Error Responses

All endpoints may return these error responses:

```http
400 Bad Request
{
  "timestamp": "2024-11-09T10:30:00",
  "status": 400,
  "error": "Bad Request",
  "message": "Validation failed",
  "path": "/api/v1/prescriptions"
}

401 Unauthorized
{
  "timestamp": "2024-11-09T10:30:00",
  "status": 401,
  "error": "Unauthorized",
  "message": "Invalid or expired token",
  "path": "/api/v1/prescriptions"
}

404 Not Found
{
  "timestamp": "2024-11-09T10:30:00",
  "status": 404,
  "error": "Not Found",
  "message": "Prescription not found with id: 123",
  "path": "/api/v1/prescriptions/123"
}

500 Internal Server Error
{
  "timestamp": "2024-11-09T10:30:00",
  "status": 500,
  "error": "Internal Server Error",
  "message": "An unexpected error occurred",
  "path": "/api/v1/prescriptions"
}
```

## 🗄️ Database Schema

### User Entity

```sql
CREATE TABLE users (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    specialty VARCHAR(100),
    license_number VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### Prescription Entity

```sql
CREATE TABLE prescriptions (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    patient_name VARCHAR(100) NOT NULL,
    patient_age INT NOT NULL,
    patient_gender VARCHAR(20) NOT NULL,
    diagnosis TEXT,
    prescription_date DATE NOT NULL,
    next_visit_date DATE,
    doctor_id BIGINT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (doctor_id) REFERENCES users(id)
);
```

### Medication Entity

```sql
CREATE TABLE medications (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    prescription_id BIGINT NOT NULL,
    drug_name VARCHAR(100) NOT NULL,
    dosage VARCHAR(50) NOT NULL,
    frequency VARCHAR(50) NOT NULL,
    duration VARCHAR(50) NOT NULL,
    FOREIGN KEY (prescription_id) REFERENCES prescriptions(id) ON DELETE CASCADE
);
```

### Drug Interaction Entity

```sql
CREATE TABLE drug_interactions (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    drug1 VARCHAR(100) NOT NULL,
    drug2 VARCHAR(100) NOT NULL,
    severity VARCHAR(20) NOT NULL,
    description TEXT,
    recommendation TEXT,
    UNIQUE(drug1, drug2)
);
```

## 🔒 Security

### JWT Authentication

The application uses JWT (JSON Web Tokens) for authentication:

1. **Login:** User sends credentials to `/api/v1/auth/login`
2. **Token Generation:** Server validates credentials and generates JWT
3. **Token Storage:** Client stores token (typically in localStorage)
4. **Authenticated Requests:** Client includes token in Authorization header
5. **Token Validation:** Server validates token on each request

### Security Configuration

Key security features:

- **Password Encryption:** BCrypt with strength 10
- **JWT Token:** HMAC SHA-256 signature
- **CORS:** Configured for frontend origin
- **CSRF:** Disabled for REST API
- **Session Management:** Stateless

### Protected Endpoints

All endpoints except authentication require a valid JWT token:

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Password Requirements

Implement in your validation:
- Minimum 8 characters
- At least one uppercase letter
- At least one lowercase letter
- At least one number
- At least one special character (recommended)

## 🧪 Testing

### Run All Tests

```bash
mvn test
```

### Run Specific Test Class

```bash
mvn test -Dtest=PrescriptionServiceTest
```

### Run with Coverage

```bash
mvn clean test jacoco:report
```

### Test Categories

- **Unit Tests:** Service and utility classes
- **Integration Tests:** Controller and repository layers
- **Security Tests:** Authentication and authorization

### Example Test

```java
@SpringBootTest
class PrescriptionServiceTest {
    
    @Autowired
    private PrescriptionService prescriptionService;
    
    @Test
    void testCreatePrescription() {
        // Arrange
        PrescriptionDTO dto = new PrescriptionDTO();
        dto.setPatientName("Test Patient");
        
        // Act
        PrescriptionDTO result = prescriptionService.create(dto);
        
        // Assert
        assertNotNull(result.getId());
        assertEquals("Test Patient", result.getPatientName());
    }
}
```

## 🐛 Troubleshooting

### Application Won't Start

**Port 8089 already in use:**
```bash
# Change port in application.properties
server.port=8090

# Or use command line
mvn spring-boot:run -Dspring-boot.run.arguments=--server.port=8090
```

**Database connection errors:**
- Check H2 configuration in application.properties
- Verify database URL and credentials
- Check if database file permissions are correct

### Authentication Issues

**JWT token errors:**
- Verify `jwt.secret` is set and long enough (minimum 256 bits)
- Check token expiration time
- Ensure Authorization header format: `Bearer {token}`

**CORS errors:**
- Add frontend URL to `cors.allowed.origins`
- Check CORS configuration in SecurityConfig
- Verify OPTIONS requests are allowed

### Build Failures

**Dependency resolution errors:**
```bash
mvn clean install -U
```

**Test failures:**
```bash
# Skip tests temporarily
mvn clean install -DskipTests

# Run specific failing test
mvn test -Dtest=FailingTest
```

### Runtime Errors

**EntityNotFoundException:**
- Verify entity exists in database
- Check ID is correct
- Ensure proper cascade settings

**DataIntegrityViolationException:**
- Check unique constraints
- Verify foreign key relationships
- Validate required fields

## 📊 Performance Optimization

### Database Optimization

```properties
# Connection pooling
spring.datasource.hikari.maximum-pool-size=10
spring.datasource.hikari.minimum-idle=5

# Query optimization
spring.jpa.properties.hibernate.jdbc.batch_size=20
spring.jpa.properties.hibernate.order_inserts=true
```

### Caching

Add caching for frequently accessed data:

```java
@Cacheable("drugs")
public List<Drug> getAllDrugs() {
    return drugRepository.findAll();
}
```

## 📚 Additional Resources

- [Spring Boot Documentation](https://docs.spring.io/spring-boot/docs/current/reference/html/)
- [Spring Security Documentation](https://docs.spring.io/spring-security/reference/)
- [Spring Data JPA Documentation](https://docs.spring.io/spring-data/jpa/docs/current/reference/html/)
- [JWT Introduction](https://jwt.io/introduction)

## 🤝 Contributing

When contributing to the backend:

1. Follow Java coding conventions
2. Write unit tests for new features
3. Update API documentation
4. Use proper exception handling
5. Follow RESTful API design principles
6. Add JavaDoc comments for public methods
7. Ensure backward compatibility

## 📝 Code Style

- Use Spring Boot best practices
- Follow SOLID principles
- Implement proper layering (Controller → Service → Repository)
- Use DTOs for API contracts
- Handle exceptions gracefully
- Log appropriately (INFO, DEBUG, ERROR)

---

**Back to:** [Main README](../README.md)

Made with ☕ Spring Boot and ❤️

