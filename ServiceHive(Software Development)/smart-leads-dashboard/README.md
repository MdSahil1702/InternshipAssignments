# 🎯 Smart Leads Dashboard

A full-stack Lead Management Dashboard built with the MERN stack and TypeScript.

##  Author
**Mohammed Sahil Siddiqui**
Android & Full Stack Developer Intern
Pursuing MCA from IIIT Vadodara

---

##  Tech Stack

### Frontend
- React.js + TypeScript
- TailwindCSS
- Axios
- React Router DOM
- Vite

### Backend
- Node.js + Express.js + TypeScript
- MongoDB + Mongoose
- JWT Authentication
- bcryptjs

---

## ✨ Features

### Authentication
- User Registration with role selection (Admin / Sales)
- JWT based login
- Protected routes
- Password hashing with bcrypt

### Leads Management
- Create, Read, Update, Delete leads
- Lead fields: Name, Email, Status, Source
- Role based access — only Admin can delete

### Advanced Filtering
- Filter by Status (New, Contacted, Qualified, Lost)
- Filter by Source (Website, Instagram, Referral)
- Search by Name or Email (debounced)
- Sort by Latest or Oldest
- Multiple filters work together

### Pagination
- Backend pagination
- 10 records per page
- Pagination metadata in API response

### Additional Features
- CSV Export of all leads
- Debounced search (500ms)
- Role Based Access Control (Admin / Sales)
- Loading states
- Empty states
- Error handling UI
- Responsive design

---

## Project Structure