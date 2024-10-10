# Express.js Application

This is a basic Express.js application with MongoDB integration, CORS support, and a health check endpoint.

## Features

- Express.js server
- MongoDB connection
- CORS enabled
- Static file serving
- Health check endpoint
- Environment variable configuration

## Prerequisites

- Node.js
- npm
- MongoDB

## Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd <project-directory>
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the root directory and add the following variables:
   ```
   PORT=3000
   MONGODB_URL=<your-mongodb-url>
   MONGODB_NAME=<your-database-name>
   APP_KEY=<your-app-key>
   ```

## Usage

To start the server:

```
npm start
```

The server will start on the port specified in your `.env` file (default is 3000).

## API Endpoints

### Health Check

- **URL**: `/health`
- **Method**: `GET`
- **Description**: Returns the health status of the application, including database connection status, app key status, timezone, and current time.

## Configuration

The application uses a configuration file located at `./config/env.config.js`. Make sure this file exists and contains the necessary configuration options.

## Dependencies

- express
- dotenv
- mongoose
- cors
- date-fns

## License

[MIT](https://choosealicense.com/licenses/mit/)