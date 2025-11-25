# Clothica — Online Clothing Store

Full-stack e-commerce platform for clothing, developed as a team project during the GoIT Fullstack course. Clothica provides a modern, responsive interface for browsing products, filtering, placing orders, and managing user accounts.

## Live Demo
- **Frontend live:** [Clothica Frontend](https://clothica-go-it-prod-team-2-front.vercel.app/)
- **Backend API docs:** [Clothica Backend Documentation](https://clothica-go-it-prod-team-2-back.onrender.com/api/docs/)

## Repositories
- **Frontend:** [GitHub](https://github.com/ArtemNyow/Clothica-Go-IT-prod-team-2-Front)  
- **Backend:** [GitHub](https://github.com/ArtemNyow/Clothica-Go-IT-prod-team-2-Back)

## Role
Team Lead / Full-stack Developer — coordinated front-end and back-end development, led the team, ensured integration, optimized API requests, and maintained code quality.

## Team Members
- Artem Lykhatskyi (Team Lead / Full-stack Developer)  
- Olha Khurtenko  
- Vitalii Kalamuniak  
- Ivashchenko Bohdan  
- Yana Khovbosha  
- Yana Savovska  
- Dmytro Basamyhin  
- Artem Pobehailo  
- Anna Bohriakova  
- Korotchenko Maksym  
- Oleksandr Honchar  
- Roman Garelchenkov
- Liubov Nesterchuk (Backend)  
- Vladyslav Putinets (Backend)  

## Features
- **Routing:** Public and private pages with Next.js App Router, dynamic routes (`/goods/[goodId]`)
- **State Management:** Zustand for global stores (auth, cart, filters), optimized selectors
- **Data Fetching:** Backend integration, React Query for caching, invalidation, background refetch
- **Forms & Validation:** Formik + Yup, toast notifications for errors
- **UI/UX:** Responsive design, mobile-first, interactive elements, hover effects, sliders (Swiper.js), reusable components
- **Pages:** Home `/`, Categories `/categories`, Goods `/goods`, Product `/goods/[goodId]`, Basket `/basket`, Order `/order`, Profile `/profile`, Auth `/auth/register` & `/auth/login`

## Tech Stack

**Frontend:**  
`Next.js 15`, `React 18`, `TypeScript`, `Zustand`, `React Query`, `Formik`, `Yup`, `Swiper.js`, `CSS Modules`, `modern-normalize`, `react-hot-toast`, `Prettier`

**Backend:**  
`Node.js`, `Express`, `MongoDB`, `Mongoose`, `JWT`, `Cloudinary`, `Nodemailer`, `Swagger`, `CORS`, `dotenv`

## Getting Started

### 1. Clone Frontend
```bash
git clone https://github.com/ArtemNyow/Clothica-Go-IT-prod-team-2-Front.git
cd Clothica-Go-IT-prod-team-2-Front
npm install
npm run dev
