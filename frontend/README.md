Modern React-based frontend application for CMED Health LTD.
const interactions = await drugInteractionService.checkInteractions(drugNames);

// Get drug info
const drugInfo = await drugInteractionService.getDrugInfo(drugName);
```

### API Response Handling

```javascript
try {
  setLoading(true);
  const data = await prescriptionService.getAll();
  setPrescriptions(data);
} catch (error) {
  console.error('Error:', error);
  alert('Failed to fetch prescriptions');
} finally {
  setLoading(false);
}
```

## 🧪 Form Validation

Validation utilities in `src/utils/validation.js`:

```javascript
import { 
  validateEmail, 
  validateRequired, 
  formatDate, 
  formatDisplayDate 
} from '../utils/validation';

// Validate email
const isValid = validateEmail(email);

// Validate required field
const error = validateRequired(value, 'Field Name');

// Format date for API (YYYY-MM-DD)
const apiDate = formatDate(date);

// Format date for display (DD/MM/YYYY)
const displayDate = formatDisplayDate(apiDate);
```

## 🐛 Troubleshooting

### Development Server Issues

**Port already in use:**
```bash
# Change port in vite.config.js
server: { port: 3001 }
```

**Hot reload not working:**
```bash
# Clear Vite cache
rm -rf node_modules/.vite
npm run dev
```

### Build Issues

**Module not found errors:**
```bash
rm -rf node_modules package-lock.json
npm install
```

**Tailwind styles not working:**
```bash
# Ensure tailwind.config.js content paths are correct
content: [
  "./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",
]
```

### API Connection Issues

**CORS errors:**
- Verify backend CORS configuration
- Check API URL in `src/services/api.js`
- Ensure backend is running

**401 Unauthorized:**
- Check JWT token in localStorage
- Verify token expiration
- Re-login if necessary

### Runtime Errors

**White screen:**
- Check browser console for errors
- Verify all imports are correct
- Check for syntax errors

**Component not rendering:**
- Verify component export/import
- Check route configuration in `App.jsx`
- Ensure PrivateRoute is used correctly

## 📱 Responsive Design

The application is fully responsive with breakpoints:

- **Mobile:** < 640px
- **Tablet:** 640px - 1024px
- **Desktop:** > 1024px

Tailwind responsive prefixes:
```jsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
  {/* 1 column on mobile, 2 on tablet, 3 on desktop */}
</div>
```

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

### Serve Static Files

The `dist/` folder can be served with any static file server:

```bash
# Using Python
python -m http.server -d dist

# Using Node serve
npx serve dist

# Using nginx, apache, etc.
```

### Environment-Specific Builds

```bash
# Production
npm run build

# Staging (with .env.staging)
npm run build --mode staging
```

## 📚 Additional Resources

- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [React Router Documentation](https://reactrouter.com/)
- [Axios Documentation](https://axios-http.com/)

## 🤝 Contributing

When contributing to the frontend:

1. Follow the existing code structure
2. Use functional components with hooks
3. Maintain consistent styling with Tailwind
4. Add proper error handling
5. Include loading states
6. Test on multiple screen sizes
7. Document complex logic

## 📝 Code Style

- Use functional components
- Use ES6+ syntax
- Follow React hooks rules
- Use descriptive variable names
- Add comments for complex logic
- Keep components focused and small
- Extract reusable logic into hooks

---

**Back to:** [Main README](../README.md)

Made with ⚛️ React and ❤️
# 🎨 CMED Health LTD - Frontend


## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Configuration](#configuration)
- [Available Scripts](#available-scripts)
- [Component Documentation](#component-documentation)
- [Styling Guide](#styling-guide)
- [State Management](#state-management)
- [API Integration](#api-integration)
- [Troubleshooting](#troubleshooting)

## 🎯 Overview

The frontend is a single-page application (SPA) built with React and Vite. It provides a modern, responsive user interface for managing clinic operations, including prescriptions, drug interactions, and reporting.

## ✨ Features

- **Authentication System:** Login, registration, and JWT-based authentication
- **Responsive Design:** Works seamlessly on desktop, tablet, and mobile devices
- **Real-time Updates:** Dynamic data fetching and updates
- **Interactive Charts:** Visual analytics using Recharts
- **Form Validation:** Client-side validation for all forms
- **Error Handling:** Comprehensive error handling and user feedback
- **Loading States:** Skeleton screens and loading indicators
- **Modals & Confirmations:** User-friendly confirmation dialogs

## 🛠 Technology Stack

### Core
- **React** 18.3.1 - UI library
- **React Router DOM** 6.22.0 - Client-side routing
- **Vite** 5.1.4 - Build tool and dev server

### Styling
- **Tailwind CSS** 3.4.1 - Utility-first CSS framework
- **PostCSS** 8.4.35 - CSS processing
- **Autoprefixer** 10.4.17 - CSS vendor prefixing

### Data & API
- **Axios** 1.6.7 - HTTP client
- **date-fns** 3.3.1 - Date manipulation
- **Recharts** 2.12.0 - Charting library

### Development
- **@vitejs/plugin-react** 4.2.1 - React support for Vite
- **ESLint** - Code linting

## 📁 Project Structure

```
frontend/
├── public/
│   └── vite.svg                    # Vite logo
│
├── src/
│   ├── assets/                     # Static assets
│   │   ├── logo.png               # Application logo
│   │   └── react.svg              # React logo
│   │
│   ├── components/                 # Reusable components
│   │   ├── Layout.jsx             # Main layout wrapper
│   │   ├── Modal.jsx              # Confirmation modal
│   │   ├── Navbar.jsx             # Navigation bar
│   │   └── PrivateRoute.jsx       # Protected route wrapper
│   │
│   ├── context/                    # React Context
│   │   └── AuthContext.jsx        # Authentication context
│   │
│   ├── pages/                      # Page components
│   │   ├── Dashboard.jsx          # Dashboard page
│   │   ├── DrugInteraction.jsx    # Drug interaction checker
│   │   ├── Login.jsx              # Login page
│   │   ├── PrescriptionForm.jsx   # Create/Edit prescription
│   │   ├── PrescriptionList.jsx   # Prescription listing
│   │   ├── Register.jsx           # Registration page
│   │   └── Reports.jsx            # Reports and analytics
│   │
│   ├── services/                   # API services
│   │   ├── api.js                 # Axios instance configuration
│   │   ├── authService.js         # Authentication API calls
│   │   ├── drugInteractionService.js  # Drug API calls
│   │   └── prescriptionService.js # Prescription API calls
│   │
│   ├── utils/                      # Utility functions
│   │   └── validation.js          # Form validation utilities
│   │
│   ├── App.css                     # Global app styles
│   ├── App.jsx                     # Main App component
│   ├── index.css                   # Global CSS with Tailwind
│   └── main.jsx                    # Application entry point
│
├── .eslintrc.js                    # ESLint configuration
├── index.html                      # HTML template
├── package.json                    # Dependencies and scripts
├── postcss.config.js              # PostCSS configuration
├── tailwind.config.js             # Tailwind CSS configuration
├── vite.config.js                 # Vite configuration
└── README.md                      # This file
```

## 🚀 Installation

### Prerequisites

- Node.js >= 18.0.0
- npm >= 9.0.0

### Install Dependencies

```bash
npm install
```

This will install all required packages listed in `package.json`.

## ⚙️ Configuration

### Environment Variables

Create a `.env` file in the frontend root directory:

```env
# API Base URL
VITE_API_URL=http://localhost:8089/api/v1

# App Configuration
VITE_APP_NAME=CMED Health LTD
VITE_APP_VERSION=1.0.0
```

### API Configuration

Edit `src/services/api.js` to configure the API base URL:

```javascript
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8089/api/v1';
```

### Vite Configuration

The `vite.config.js` file contains build and dev server configuration:

```javascript
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
    proxy: {
      '/api': {
        target: 'http://localhost:8089',
        changeOrigin: true,
      }
    }
  }
})
```

## 📜 Available Scripts

### Development

```bash
# Start development server
npm run dev
```
- Starts Vite dev server at `http://localhost:3000`
- Hot module replacement (HMR) enabled
- Opens browser automatically

### Production Build

```bash
# Build for production
npm run build
```
- Creates optimized production build in `dist/` directory
- Minifies JavaScript and CSS
- Optimizes assets

### Preview Production Build

```bash
# Preview production build locally
npm run preview
```
- Serves the production build locally
- Useful for testing before deployment

### Linting

```bash
# Run ESLint
npm run lint
```
- Checks code for errors and style issues
- Follows ESLint configuration

## 🧩 Component Documentation

### Layout Components

#### `Layout.jsx`
Main layout wrapper that includes the navigation bar and provides consistent page structure.

```jsx
import Layout from '../components/Layout';

function MyPage() {
  return (
    <Layout>
      <div>Page content</div>
    </Layout>
  );
}
```

#### `Navbar.jsx`
Top navigation bar with logo, navigation links, and user information.

**Features:**
- Logo with link to dashboard
- Navigation menu items
- User profile display
- Logout functionality
- Active route highlighting

#### `Modal.jsx`
Reusable confirmation modal component.

```jsx
<Modal
  isOpen={showModal}
  onClose={() => setShowModal(false)}
  onConfirm={handleConfirm}
  title="Confirm Action"
  message="Are you sure you want to proceed?"
/>
```

#### `PrivateRoute.jsx`
Protected route wrapper that requires authentication.

```jsx
<Route
  path="/dashboard"
  element={
    <PrivateRoute>
      <Dashboard />
    </PrivateRoute>
  }
/>
```

### Page Components

#### `Dashboard.jsx`
Main dashboard showing statistics and recent prescriptions.

**Features:**
- Prescription statistics cards
- Recent prescriptions table
- Quick action buttons
- Loading states

#### `PrescriptionList.jsx`
List view of all prescriptions with search and filter.

**Features:**
- Date range filtering
- Patient name search
- Sortable table
- Edit and delete actions
- Empty state handling

#### `PrescriptionForm.jsx`
Form for creating and editing prescriptions.

**Features:**
- Patient information fields
- Multiple medications support
- Date pickers
- Form validation
- Add/remove medication rows

#### `DrugInteraction.jsx`
Drug interaction checker and information lookup.

**Features:**
- Multi-drug selection
- Interaction severity display
- Drug information cards
- Search functionality

#### `Reports.jsx`
Analytics and reporting page with charts.

**Features:**
- Prescription trend charts
- Most prescribed medications
- Patient demographics
- Date range selection

#### `Login.jsx` & `Register.jsx`
Authentication pages.

**Features:**
- Form validation
- Error handling
- Redirect after login
- Links between pages

## 🎨 Styling Guide

### Tailwind CSS Utility Classes

The project uses Tailwind CSS for styling. Common patterns:

```jsx
// Buttons
<button className="btn-primary">Primary Action</button>
<button className="btn-secondary">Secondary Action</button>
<button className="btn-danger">Delete</button>

// Input Fields
<input className="input-field" />

// Cards
<div className="card">
  <h2>Card Title</h2>
  <p>Card content</p>
</div>

// Error Text
<span className="error-text">Error message</span>
```

### Custom CSS Classes

Defined in `src/index.css`:

```css
.btn-primary {
  /* Primary button styles */
}

.btn-secondary {
  /* Secondary button styles */
}

.btn-danger {
  /* Danger/delete button styles */
}

.input-field {
  /* Input field styles */
}

.card {
  /* Card container styles */
}

.error-text {
  /* Error message text styles */
}
```

### Color Palette

Primary colors defined in `tailwind.config.js`:

```javascript
colors: {
  primary: {
    50: '#eff6ff',
    100: '#dbeafe',
    // ... more shades
    900: '#1e3a8a',
  }
}
```

## 🔄 State Management

### AuthContext

Global authentication state using React Context API.

```jsx
import { useAuth } from '../context/AuthContext';

function MyComponent() {
  const { user, login, logout, isAuthenticated } = useAuth();
  
  // Use authentication state and methods
}
```

**Available Methods:**
- `login(credentials)` - Authenticate user
- `logout()` - Clear authentication
- `isAuthenticated` - Boolean authentication status
- `user` - Current user object

### Local State

Component-level state uses React hooks:

```jsx
const [data, setData] = useState([]);
const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);
```

## 🌐 API Integration

### Service Layer

API calls are organized in the `services/` directory:

#### `api.js`
Base Axios instance with interceptors:

```javascript
import api from './services/api';

// Automatically adds JWT token to requests
// Handles 401 unauthorized responses
// Provides consistent error handling
```

#### `authService.js`
Authentication related API calls:

```javascript
import { authService } from './services/authService';

// Register user
await authService.register(userData);

// Login user
const { token, user } = await authService.login(credentials);
```

#### `prescriptionService.js`
Prescription management API calls:

```javascript
import { prescriptionService } from './services/prescriptionService';

// Get all prescriptions
const prescriptions = await prescriptionService.getAll(startDate, endDate);

// Create prescription
await prescriptionService.create(prescriptionData);

// Update prescription
await prescriptionService.update(id, prescriptionData);

// Delete prescription
await prescriptionService.delete(id);
```

#### `drugInteractionService.js`
Drug interaction API calls:

```javascript
import { drugInteractionService } from './services/drugInteractionService';

// Check interactions

