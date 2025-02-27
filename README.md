# 🛠 Admin Dashboard

Welcome to the **Admin Dashboard**! This is a web-based administrative interface to help you manage and monitor your application. Follow the instructions below to set up, run, and interact with the project.


## 📥 Clone the Repository

To get started, clone the repository and navigate to your project folder:

```sh
git clone https://github.com/mahmoudmorsy201/admin-dashboard.git
cd admin-dashboard
```

---

## 📦 Install Dependencies

Before running the application, install the necessary dependencies:

```sh
npm install
```

---

## Running the Application

You have two options for running the Admin Dashboard: locally or using Docker.

### 🚀 Start the Project Locally

Once the dependencies are installed, start the application:

```sh
npm run build
npm start
```

Open your browser and navigate to:

🔗 [http://localhost:3000](http://localhost:3000)

---

### 🐳 Start the Project With Docker

Alternatively, you can run the Admin Dashboard using Docker.

#### 🏗 Build the Docker Image

First, build the Docker image:

```sh
docker build -t admin-dashboard .
```

#### ▶ Run the Docker Container

Then, run the Docker container:

```sh
docker run -p 3000:80 admin-dashboard
```

Now, open your browser and visit:

🔗 [http://localhost:3000](http://localhost:3000)

---

## Login Credentials

Use the following login credentials to access the dashboard:

- **Username**: mor_2314
- **Password**: 83r5^_

---

## Troubleshooting

If you encounter any issues, please check the following:

- Ensure all dependencies are correctly installed.
- If the application is not loading, verify that your server is running and accessible at [http://localhost:3000](http://localhost:3000).
- For Docker-related issues, check the Docker logs for errors using `docker logs <container-id>`.

---

Let me know if you need any changes or further details!