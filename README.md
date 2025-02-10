# **🩺 Patient Management System** 🚀

A **full-stack Patient Management System** built with **.NET 8 (Web API)**, **Angular 18**, and **SQL Server**. It includes **JWT authentication, role-based authorization (Admin/User), and CRUD operations for managing patients**.

---

## **📌 Features**
✅ **User Authentication & Authorization (JWT)**  
✅ **Role-Based Access (Admin/User)**  
✅ **Admin can:**
   - Add, edit, delete, and view patient reports  
✅ **User can:**
   - Only add patients  
✅ **Search Patients by ID**  
✅ **Angular Guards for Route Protection**  
✅ **Bootstrap UI with Table Shadows & Styling**  

---

# **📦 Project Setup Instructions**

## **🔹 Step 1: Install Prerequisites**
Make sure you have the following installed:  
- **[.NET 8 SDK](https://dotnet.microsoft.com/en-us/download)**  
- **[SQL Server & SSMS](https://www.microsoft.com/en-us/sql-server/sql-server-downloads)**  
- **[Node.js (Latest LTS)](https://nodejs.org/)**  
- **[Angular CLI](https://angular.io/cli)** (Run: `npm install -g @angular/cli`)  

---

## **🔹 Step 2: Clone the Repository**
Run the following command in your terminal:
```bash
git clone https://github.com/your-username/patient-management-system.git
cd patient-management-system
```
---
# **📦Setp 3 Backend Setup (ASP.NET 8 Web API)**

## **🔹Step 4 Install Dependencies**
Run the following:

```bash
dotnet restore
```

---

## **Step 5: Configure SQL Server Connection**
Modify `appsettings.json` inside `PatientManagementSystem/` and set your SQL Server connection string:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=YOUR_SERVER_NAME;Database=PatientDB;Trusted_Connection=True;TrustServerCertificate=True;"
  }
}
```

Replace `YOUR_SERVER_NAME` with your actual SQL Server instance name.

## Step 6: Apply Database Migrations

Run the following commands to apply database migrations:

```bash
dotnet ef migrations add InitialCreate
dotnet ef database update
```
## Step 7: Run the Backend API

Start the backend API by running:

```bash
dotnet run
```

## Step 8: Navigate to the Frontend Folder

```bash
cd ../patient-management-frontend
```

## Step 9: Install Dependencies

```bash
npm install
```

## Step 10: Configure API URL

Modify `src/environments/environment.ts` and update the backend API URL:

```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:5242/api'
};
```

## Step 11: Run the Angular App

```bash
ng serve --open
```

✅ The frontend will start on [http://localhost:4200/](http://localhost:4200/).

## 🔐 User Roles & Login Details

| Role  | Username | Password  | Access         |
|-------|---------|----------|---------------|
| Admin | admin   | admin123 | Full Access   |
| User  | user    | user123  | Add Patients Only |

To create new users, use the `/api/auth/register` API.

## 📌 API Endpoints (Postman Testing)

### ✅ Authentication

| Method | Endpoint           | Description            |
|--------|-------------------|------------------------|
| POST   | /api/auth/register | Register a new user    |
| POST   | /api/auth/login    | Login & get JWT token  |

### ✅ Patient Management

| Method | Endpoint                | Access      | Description           |
|--------|-------------------------|------------|-----------------------|
| POST   | /api/patient/add         | Admin/User | Add a new patient     |
| GET    | /api/patient/list        | Admin      | Get all patients      |
| GET    | /api/patient/search/{id} | Admin      | Get a patient by ID   |
| PUT    | /api/patient/edit/{id}   | Admin      | Edit patient details  |
| DELETE | /api/patient/delete/{id} | Admin      | Delete a patient      |

## 🛡️ Role-Based Access (Angular Guards)

| Protected Route    | Access      |
|--------------------|------------|
| /patient-report   | Admin Only |
| /add-patient      | Admin & User |
| /edit-patient/:id | Admin Only |

👨‍💻 Implemented using Angular `CanActivate` Guards.