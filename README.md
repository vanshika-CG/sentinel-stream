# Sentinel Stream

A real-time monitoring and streaming platform built with a microservices architecture.

## 🏗️ Architecture

This project follows a microservices architecture with the following components:

- **Frontend**: User interface for monitoring and visualization
- **API**: Backend REST API service for data management
- **Worker**: Background processing service for handling asynchronous tasks
- **Docker Compose**: Containerized deployment orchestration

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- [Docker](https://docs.docker.com/get-docker/) (version 20.10 or higher)
- [Docker Compose](https://docs.docker.com/compose/install/) (version 2.0 or higher)
- [Node.js](https://nodejs.org/) (version 16 or higher) - for local development
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/) - for package management

## 🚀 Quick Start

### Using Docker Compose (Recommended)

1. Clone the repository:
```bash
git clone https://github.com/vanshika-CG/sentinel-stream.git
cd sentinel-stream
```

2. Start all services:
```bash
docker-compose up -d
```

3. Access the application:
- Frontend: `http://localhost:3000`
- API: `http://localhost:5000`

4. Stop all services:
```bash
docker-compose down
```

### Local Development

#### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

#### API Setup

```bash
cd api
npm install
npm run dev
```

#### Worker Setup

```bash
cd worker
npm install
npm run dev
```

## 📁 Project Structure

```
sentinel-stream/
├── api/                    # Backend API service
│   ├── src/               # Source code
│   ├── package.json       # API dependencies
│   └── Dockerfile         # API container configuration
├── frontend/              # Frontend application
│   ├── src/              # Source code
│   ├── public/           # Static assets
│   ├── package.json      # Frontend dependencies
│   └── Dockerfile        # Frontend container configuration
├── worker/               # Background worker service
│   ├── src/             # Source code
│   ├── package.json     # Worker dependencies
│   └── Dockerfile       # Worker container configuration
├── docker-compose.yml   # Docker Compose configuration
└── .gitignore          # Git ignore rules
```

## 🔧 Configuration

### Environment Variables

Create `.env` files in respective directories:

#### API (.env)
```env
PORT=5000
NODE_ENV=development
DATABASE_URL=your_database_url
REDIS_URL=redis://localhost:6379
```

#### Frontend (.env)
```env
REACT_APP_API_URL=http://localhost:5000
```

#### Worker (.env)
```env
REDIS_URL=redis://localhost:6379
QUEUE_NAME=sentinel-queue
```

## 🐳 Docker Services

The `docker-compose.yml` file orchestrates the following services:

- **frontend**: React/Vue/Angular application
- **api**: Node.js/Express backend server
- **worker**: Background job processor
- **redis** (optional): In-memory data store for caching and queuing
- **database** (optional): PostgreSQL/MongoDB database

## 📊 Features

- Real-time data streaming and monitoring
- Scalable microservices architecture
- Containerized deployment with Docker
- Background job processing
- RESTful API endpoints
- Modern frontend interface
- Automated CI/CD ready

## 🛠️ Development

### Running Tests

```bash
# Frontend tests
cd frontend
npm test

# API tests
cd api
npm test

# Worker tests
cd worker
npm test
```

### Building for Production

```bash
# Build all services
docker-compose build

# Build specific service
docker-compose build api
```

### Logs

```bash
# View all logs
docker-compose logs -f

# View specific service logs
docker-compose logs -f api
docker-compose logs -f frontend
docker-compose logs -f worker
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 API Documentation

API documentation is available at `http://localhost:5000/api-docs` when running in development mode.

## 🔒 Security

- Keep dependencies up to date
- Never commit sensitive credentials
- Use environment variables for configuration
- Follow security best practices for production deployment

## 🐛 Troubleshooting

### Common Issues

**Port already in use:**
```bash
# Check what's using the port
lsof -i :3000
# Kill the process or change the port in docker-compose.yml
```

**Container fails to start:**
```bash
# Check container logs
docker-compose logs [service-name]
# Rebuild containers
docker-compose up --build
```

**Database connection issues:**
- Ensure database service is running
- Verify connection string in environment variables
- Check network connectivity between services

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- **Vanshika** - [@vanshika-CG](https://github.com/vanshika-CG)

## 🙏 Acknowledgments

- Thanks to all contributors
- Inspired by modern microservices architecture patterns
- Built with industry-standard tools and frameworks

## 📞 Support

For support, please open an issue in the GitHub repository or contact the maintainers.

---
