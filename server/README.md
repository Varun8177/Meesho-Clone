# express-mongo-starter-template

This README provides an overview and explanation of the structure and components of the Express server code. The server is designed to handle HTTP requests and includes middleware for security, logging, error handling, and routing.

## Table of Contents

- [Dependencies](#dependencies)
- [Configuration](#configuration)
- [Database Connection](#database-connection)
- [Middleware](#middleware)
- [Routes](#routes)
- [Error Handling](#error-handling)
- [Running the Server](#running-the-server)

## Dependencies

The server uses the following Node.js packages:

- **express**: A fast, unopinionated, minimalist web framework for Node.js.
- **cors**: Middleware for enabling Cross-Origin Resource Sharing.
- **morgan**: HTTP request logger middleware.
- **helmet**: Security middleware for setting HTTP headers.
- **compression**: Middleware for compressing response bodies.
- **dotenv**: Loads environment variables from a `.env` file.
- **envalid**: Lightweight library for validating and accessing environment variables.
- **mongoose**: MongoDB object modeling tool.
- **nodemon**: Development dependency for automatically restarting the server during development.

Make sure to install these dependencies using:

```bash
npm install
```

## Configuration

The server reads environment variables from a `.env` file using the `dotenv` package. The configuration is stored in the `env` module, which is then imported where needed.

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Example .env file
PORT=3000
MONGO_URL=mongodb://localhost:27017/your-database-name
# Add other configuration variables as needed
```

### Database Connection

The `connectToDatabase` function in `config/db.js` establishes a connection to the MongoDB database using the URL specified in the environment variables.

### Middleware

Middleware functions enhance the server functionality. Key middleware includes:

- **CORS**: Configures Cross-Origin Resource Sharing to allow specified origins, methods, and credentials.
- **Helmet**: Enhances security by setting various HTTP headers.
- **Morgan**: Logs HTTP requests in the development environment.
- **Compression**: Compresses response bodies for efficient data transfer.
- **Body Parsing**: Parses incoming JSON and URL-encoded data.

### Routes

The server defines routes for handling HTTP requests. The default route responds with a welcome message, and custom routes are defined in the `Routes` array.

### Error Handling

The `errorMiddleware` handles errors globally, ensuring consistent error responses. It is applied after all route handling middleware.

### Running the Server

The server listens on the port specified in the environment variables. To start the server, run:

```bash
npm run dev
```
