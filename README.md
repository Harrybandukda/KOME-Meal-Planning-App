# 🍽️ **KOME - Healthy Food Decider**

A full-stack web application built with React, Node.js, Express, PostgreSQL, and Sequelize. Designed to help users make smart and healthy food choices based on their preferences and dietary needs.

## 👥 **Project Team Members**

| **Name**          | **Student Number** |
|-------------------|--------------------|
| Anna Shibanova    | 101399925          |
| Mo Harry Bandukda | 101451857          |
| Nicole Milmine    | 101462077          |
| Oleg Chystieiev   | 101447469          |
| Shirin Ali        | 101385244          |
---

## 🚀 **Live Demo**
You can check out the deployed version of our project by clicking the link below:

[👉 **Live Project on OVH Server](https://kome.my/)

---
## 🛠️ **Running the Project Locally**

### 1. Clone the repository
git clone 
https://github.com/Harrybandukda/Capstone-COMP3078-WebApp
cd Capstone-COMP3078-WebApp

### 2. Create a .env file
In the root directory, create a .env file and add the following environment variables:
NEXT_PUBLIC_ENV=development
NEXT_PUBLIC_SERVER_URL=https://kome.my
PORT=3000

### 3. Start the app using Docker Compose
docker compose up

This command will:

Spin up the frontend, backend, and PostgreSQL database as separate Docker containers

Automatically install all dependencies and initialize the services

### 4. Access the app
Once the containers are running, open your browser and navigate to:

👉 http://localhost:3000

---

## 🧰 **Tech Stack**
Here are the main technologies and tools we used to build and deploy this project:

###🔹 Frontend
🔹React – Modern JavaScript library for building interactive user interfaces
🔹Next.js – React framework for server-side rendering and routing
🔹Tailwind CSS – Utility-first CSS framework for responsive and clean styling

###🔹 Backend
🔹Node.js – JavaScript runtime environment for server-side logic
🔹Express.js – Fast, minimalist web framework for building RESTful APIs
🔹Sequelize – ORM (Object-Relational Mapping) tool for working with SQL databases
🔹PostgreSQL – Relational database for structured data storage

###🔹 DevOps & Deployment
🔹Docker – Containerization platform for consistent development and deployment environments
🔹Docker Compose – Tool for managing multi-container applications
🔹Nginx – Web server and reverse proxy for routing and performance
🔹OVH Cloud – Cloud infrastructure used for deploying the live application
🔹Let's Encrypt – Free SSL certificate authority for HTTPS security
