# DevTech

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![MERN Stack](https://img.shields.io/badge/Stack-MERN-blue.svg)](#-technical-stack)
[![Deployment](https://img.shields.io/badge/Deployment-AWS-orange.svg)](#-deployment--infrastructure)

A professional, production-ready full-stack networking platform built using the MERN stack. DevConnect allows professionals and developers to discover peers, manage connection lifecycles, and engage in instant, low-latency communication through an integrated real-time chat architecture.

---

## 🚀 Project Overview

DevConnect is designed to bridge the gap in professional networking by providing a fluid, real-time interface for user discovery and interaction. Users can securely onboard, curate highly customizable profiles, evaluate peer cards via a dedicated discovery workflow, manage bidirectional connection states, and instantly message active connections. The entire system is optimized for performance and deployed securely on cloud infrastructure.

## 🛠️ Core Features & Architecture

* **User Authentication & Secure Sessions:** Implemented robust user onboarding and secure session management utilizing JSON Web Tokens (JWT) or OAuth protocols. Features strict password hashing via bcrypt and protected, middleware-gated REST API endpoints.
* **Dynamic Matching & Discovery Workflow:** Developed an interactive profile discovery engine that algorithmically surfaces peer profiles, allowing users to seamlessly execute `Connect` or `Decline` actions.
* **Bidirectional Connection Request Lifecycle:** Engineered a stateful relationship management system that safely transitions data schemas across distinct transactional states: `Pending Request`, `Accepted (Connected)`, and `Declined`.
* **Real-Time Bidirectional Communication:** Integrated a persistent, full-duplex communication layer using **Socket.io / WebSockets** to handle instant messaging, real-time message delivery receipts, and active user presence states.
* **Interactive Profile Management:** Designed a rich, comprehensive user profile module enabling real-time updates for professional skills, custom biographical data, and structural personal information.

---

## 💻 Technical Stack

### Frontend
* **React.js:** Component-driven, responsive user interface design.
* **Tailwind CSS:** Highly optimized utility-first styling for cross-device fluidity.
* **Redux Toolkit / Context API:** Centralized, predictable global state management for chat streams and session tracking.

### Backend
* **Node.js & Express.js:** Scalable, non-blocking asynchronous event loop running a RESTful API architecture.

### Database
* **MongoDB & Mongoose ODM:** Document-based storage leveraging advanced relational referencing (`$lookup`, object profiling) for scalable connection schemas.

### Real-Time Interaction
* **Socket.io / WebSockets:** Persistent, event-driven web sockets for instant data propagation.

### Deployment & Infrastructure
* **AWS (EC2 / S3):** Highly available cloud compute instances paired with secure Simple Storage Service buckets for profile asset storage.
* **Nginx:** High-performance reverse proxy server handling client requests and SSL/TLS termination.
* **Git:** Rigid version control and collaborative branching strategies.

---

## ⚙️ Local Installation & Setup

Follow these steps to configure and run DevConnect locally on your machine:

### Prerequisites
* Node.js installed (v16.x or higher recommended)
* MongoDB instance (Local or Atlas cluster URI)
* An AWS account (optional, for asset storage configuration)

### 1. Clone the Repository
```bash
git clone [https://github.com/your-username/devconnect.git](https://github.com/your-username/devconnect.git)
cd devconnect

## Deployment in AWs
`
To deploy the application in AWS, you can follow these steps:

1. **Set Up AWS Account**: If you don't have an AWS account, create one at [AWS](https://aws.amazon.com/).
2. **Create an EC2 Instance**: Go to the EC2 dashboard and launch a new instance. Choose an appropriate Amazon Machine Image (AMI) and instance type based on your requirements.
3. **Configure Security Group**: Set up a security group to allow inbound traffic on the necessary ports (e.g., HTTP port 80, HTTPS port 443, and any other ports your application requires).
4. **Connect to the Instance**: Use SSH to connect to your EC2 instance. You can find the connection details in the EC2 dashboard.
5. **Install Required Software**: Install any necessary software on the instance, such as a web server (e.g., Apache, Nginx) and any dependencies your application requires.
6. **Deploy Your Application**: Upload your application files to the EC2 instance. You can use SCP, SFTP, or any other file transfer method.
7. **Configure the Web Server**: Set up your web server to serve your application. This may involve creating a virtual host configuration and pointing it to your application directory.

   ### For Frontend

   - If you are using a frontend framework (e.g., React, Angular, Vue), you can build the production version of your frontend and serve it using a web server like Nginx.
   - `npm install` to install dependencies.
   - `npm run build` to create a production build of your frontend application.
   - `sudo apt update` to update the package list.
   - `sudo apt install nginx` to install Nginx.
   - `sudo systemctl start nginx` to start the Nginx service.
   - `sudo systemctl enable nginx` to enable Nginx to start on boot.
   - `sudo scp -r dist/* /var/www/html/` to copy the built frontend files to the Nginx web root directory.

   ### For Backend

    - update the package list and install necessary dependencies (e.g., Node.js, npm).
    - `npm install` to install backend dependencies.
    - `npm install pm2 -g` to install PM2 globally for process management.
    - `pm2 start npm -- start` to start your backend application using PM2.
      - `pm2 save` to save the PM2 process list and ensure it restarts on server reboot.
      - `pm2 startup` to generate a startup script for PM2.
      - `pm2 list` to verify that your application is running.
      - `pm2 logs` to view the logs of your application.
      - `pm2 stop <app_name>` to stop your application if needed.
      - `pm2 restart <app_name>` to restart your application if needed.
      - `pm2 delete <app_name>` to delete your application from PM2 if needed.
      - `pm2 start npm --name "backend" -- start` to start your backend application with a specific name in PM2.

      ### Configure Domain and SSL (Optional)

      - Frontend : http://98.130.129.15/
      - Backend : http://98.130.129.15/api
      - nginx config :
      ```
      server_name 98.130.129.15;
      location /api/ {
        proxy_pass http://localhost:3000/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
      ```
         - `sudo nano /etc/nginx/sites-available/default` to edit the default Nginx configuration file and add the above server block.
      - `sudo scp -r dist/* /var/www/html/`
      - `sudo systemctl restart nginx` to apply the new Nginx configuration.
