# E-Commerce Full-Stack Application

A monolithic full-stack real-time e-commerce web application built with modern technologies.

## Tech Stack

### Backend
- Node.js with Express
- MongoDB for data storage
- RabbitMQ for asynchronous messaging
- Memcached for caching

### Frontend
- React with React Router
- Tailwind CSS for styling
- Responsive design with dark/light mode

### DevOps
- Docker for containerization
- Kubernetes for orchestration

## Project Structure

```
ecommerce-app/
├── backend/                  # Node.js app
│   ├── routes/               # API routes
│   ├── controllers/          # Request handlers
│   ├── models/               # Mongoose schemas
│   ├── services/             # Business logic
│   ├── config/               # Configuration
│   ├── Dockerfile            # Backend container
│   └── server.js             # Entry point
├── frontend/                 # React + Tailwind CSS
│   ├── public/               # Static assets
│   ├── src/                  # React source code
│   │   ├── components/       # Reusable components
│   │   ├── pages/            # Page components
│   │   ├── App.js            # Main app component
│   │   └── index.js          # Entry point
│   ├── tailwind.config.js    # Tailwind configuration
│   └── Dockerfile            # Frontend container
├── docker-compose.yml        # Local development setup
├── k8s/                      # Kubernetes manifests
│   ├── backend-deployment.yaml
│   ├── frontend-deployment.yaml
│   ├── mongo-deployment.yaml
│   ├── rabbitmq-deployment.yaml
│   ├── memcached-deployment.yaml
│   └── ingress.yaml
└── README.md                 # Documentation
```

## Features

- Product browsing and searching
- Shopping cart functionality
- Order placement and history
- Real-time notifications via RabbitMQ
- Performance optimization with Memcached
- Responsive design with dark/light mode

## Local Setup

### Prerequisites
- Docker and Docker Compose
- Node.js (for development)

### Steps to Run

1. Clone the repository:
   ```
   git clone <repository-url>
   cd ecommerce-app
   ```

2. Start the application using Docker Compose:
   ```
   docker-compose up --build
   ```

3. Access the application:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000/api/products

4. Seed the database with sample data:
   ```
   docker-compose exec backend npm run seed
   ```

## Kubernetes Deployment

1. Build and push Docker images:
   ```
   docker build -t ecommerce-backend:latest ./backend
   docker build -t ecommerce-frontend:latest ./frontend
   ```

2. Apply Kubernetes manifests:
   ```
   kubectl apply -f k8s/
   ```

3. Access the application through the configured Ingress.

## API Endpoints

- `GET /api/products` - Get all products
- `GET /api/products/featured` - Get featured products
- `GET /api/products/:id` - Get a single product
- `GET /api/cart` - Get user's cart
- `POST /api/cart` - Add item to cart
- `GET /api/orders` - Get user's orders
- `POST /api/orders` - Create a new order
- `GET /health` - Health check endpoint

## Development

For local development without Docker:

1. Start MongoDB, RabbitMQ, and Memcached (using Docker or locally)
2. Configure environment variables in backend/.env
3. Run the backend:
   ```
   cd backend
   npm install
   npm run dev
   ```
4. Run the frontend:
   ```
   cd frontend
   npm install
   npm start
   ```