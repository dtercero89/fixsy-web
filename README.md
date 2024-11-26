# 
<div style="text-align: center;">
<img src="https://fixsy.vercel.app/_next/image?url=%2Fimages%2Ffixsy.png&w=3840&q=75" alt="Fixsy Logo" width="300" height="auto"/>
</div>
Connects users in need of plumbing, carpentry, remodeling, and other services with local providers.

---

## 📝 Description

**Fixsy** is a platform that bridges the gap between users looking for various home services (e.g., plumbing, carpentry, remodeling) and local handymen. Administrators manage the services and job assignments, ensuring a seamless user experience.

---

## ✨ Features

### Admin Features
- **Register Handymen**: Admins can register new service providers with details such as name, expertise, and availability.
- **Assign Jobs**: Admins assign handymen to specific jobs based on skills and availability.
- **Manage Job Content**: Admins can create, update, or delete job details such as descriptions, schedules, and requirements.
- **Update Job Status**: Admins can update the status of a job (e.g., "Pending," "In Progress," "Completed").

### User Features
- **Register an Account**: Users can sign up to create an account and access the platform.
- **Post a Job**: Users can request services by posting a job with details like type, preferred time, and specific requirements.
- **Monitor Job Status**: Users can view the status of their job and receive updates as it progresses.

---

## 🚀 Prerequisites

Before running the app locally, ensure that you have the following installed:

- **Node.js** (for running the Next.js application)
- **.NET Core 8** (for backend services)
- **PostgreSQL 16** (for database management)

---

## 📥 Installation Steps

### 1. Clone the Repository
Clone the repository to your local machine:
```bash
git clone https://github.com/dtercero89/fixsy-web.git
```

### 2. Navigate to the Project Directory
Change into the project directory:
```bash
cd fixsy-web
```

### 3. Install Dependencies
Run the following command to install all necessary dependencies:
```bash
npm install
```
### 4. Configure Environment Variables
Create a .env.local file in the project root and add the following environment variables to run the app locally:
```bash
AUTH_SECRET="YOUR-SECRET-KEY-123456"
NEXT_PUBLIC_WEB_API_ENDPOINT="http://localhost:8855/api/v1"
NEXTAUTH_SECRET="YOUR-AUTH-SECRET-KEY-654321"
NEXTAUTH_URL="http://localhost:3100"

```
### 5. Services
See instructions in the follow link to setup backend project.
<br/>**[Fixsy Services Repository](https://github.com/dtercero89/fixsy-services.git)**

## ⚙️ Technologies Used

- **Next.js:** React framework for building the user interface.
- **NextAuth.js:** Authentication for Next.js applications.
- **Radix UI:** A set of unstyled, accessible UI components.
- **Tailwind CSS:** Utility-first CSS framework for styling.
- **Zod:** Type-safe schema validation.

## 🌐 Deployment
This application is deployed on Vercel, a platform optimized for Next.js applications. You can access the live application here:
<br/>[Production URL: Fixsy](https://fixsy.vercel.app)

## 📧 Contact

**Denis Tercero**
<br/>*Software Developer*
<br/>**GitHub** [dtercero89](https://github.com/dtercero89) 
<br/>**Email:** dennistercero@hotmail.com
